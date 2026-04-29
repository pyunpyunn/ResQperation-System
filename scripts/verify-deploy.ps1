[CmdletBinding()]
param(
    [switch]$SkipMobileValidation
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$RepoRoot = Split-Path -Parent $PSScriptRoot

function Write-Step {
    param([string]$Message)

    Write-Host ""
    Write-Host "==> $Message" -ForegroundColor Cyan
}

function Assert-CommandExists {
    param([string]$Name)

    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "Required command '$Name' was not found in PATH."
    }
}

function Invoke-StepCommand {
    param(
        [string]$Label,
        [string]$WorkingDirectory,
        [string]$FilePath,
        [string[]]$Arguments
    )

    Write-Step $Label
    Push-Location $WorkingDirectory
    try {
        $renderedArgs = if ($Arguments.Count -gt 0) { $Arguments -join ' ' } else { '' }
        Write-Host "$FilePath $renderedArgs" -ForegroundColor DarkGray
        & $FilePath @Arguments

        if ($LASTEXITCODE -ne 0) {
            throw "'$FilePath $renderedArgs' failed with exit code $LASTEXITCODE."
        }
    } finally {
        Pop-Location
    }
}

function Assert-NoNodeProcessLock {
    param(
        [string]$WorkingDirectory,
        [string]$Label
    )

    $normalizedPath = $WorkingDirectory.Replace('\', '\\')
    $matchingProcesses = Get-CimInstance Win32_Process |
        Where-Object {
            $_.Name -eq 'node.exe' -and
            $_.CommandLine -and
            $_.CommandLine -match [regex]::Escape($WorkingDirectory)
        } |
        Select-Object -ExpandProperty CommandLine

    if ($matchingProcesses) {
        $details = $matchingProcesses -join [Environment]::NewLine
        throw "$Label cannot run while node-based dev processes are using $WorkingDirectory. Close those processes first, then rerun the check.`n$details"
    }
}

Write-Step "Checking local toolchain"
foreach ($command in @('git', 'rg', 'php', 'composer', 'node', 'npm', 'npx')) {
    Assert-CommandExists -Name $command
}

Write-Step "Scanning for unresolved merge markers"
$mergeMarkers = & rg -uu -n --glob '!**/vendor/**' --glob '!**/node_modules/**' --glob '!**/public/build/**' --glob '!**/.expo/**' --glob '!**/.git/**' "^(<<<<<<<|=======|>>>>>>>)" $RepoRoot
if ($LASTEXITCODE -eq 0) {
    throw "Unresolved merge markers were found:`n$($mergeMarkers -join [Environment]::NewLine)"
}
if ($LASTEXITCODE -gt 1) {
    throw "rg failed while scanning for merge markers."
}

Write-Step "Checking required environment templates"
$requiredEnvExamples = @(
    'ResQperation-Backend\.env.example',
    'ResQperation-Admin\.env.example',
    'ResQperation-Household\.env.example',
    'ResQperation-Rescuer\.env.example'
)
foreach ($relativePath in $requiredEnvExamples) {
    $fullPath = Join-Path $RepoRoot $relativePath
    if (-not (Test-Path $fullPath)) {
        throw "Missing required environment template: $relativePath"
    }
}

Write-Step "Checking repository layout"
$gitLinks = & git -C $RepoRoot ls-tree HEAD ResQperation-Household ResQperation-Rescuer
if ($LASTEXITCODE -ne 0) {
    throw "Unable to inspect root repository tree."
}
if ((-not (Test-Path (Join-Path $RepoRoot '.gitmodules'))) -and ($gitLinks -match '^160000')) {
    Write-Warning 'The mobile apps are stored as gitlinks without a .gitmodules file. Deploying from this local workspace is fine, but a fresh clone of the root repo may not contain those app contents unless you normalize the repo structure first.'
}

$adminPath = Join-Path $RepoRoot 'ResQperation-Admin'
$backendPath = Join-Path $RepoRoot 'ResQperation-Backend'
$householdPath = Join-Path $RepoRoot 'ResQperation-Household'
$rescuerPath = Join-Path $RepoRoot 'ResQperation-Rescuer'

Invoke-StepCommand -Label 'Admin tests' -WorkingDirectory $adminPath -FilePath 'composer' -Arguments @('test')
Assert-NoNodeProcessLock -WorkingDirectory $adminPath -Label 'Admin clean install'
Invoke-StepCommand -Label 'Admin production build install' -WorkingDirectory $adminPath -FilePath 'npm' -Arguments @('ci')
Invoke-StepCommand -Label 'Admin production build' -WorkingDirectory $adminPath -FilePath 'npm' -Arguments @('run', 'build')
Invoke-StepCommand -Label 'Admin production optimize' -WorkingDirectory $adminPath -FilePath 'php' -Arguments @('artisan', 'optimize')
Invoke-StepCommand -Label 'Admin optimize cleanup' -WorkingDirectory $adminPath -FilePath 'php' -Arguments @('artisan', 'optimize:clear')

Invoke-StepCommand -Label 'Backend tests' -WorkingDirectory $backendPath -FilePath 'composer' -Arguments @('test')
Assert-NoNodeProcessLock -WorkingDirectory $backendPath -Label 'Backend clean install'
Invoke-StepCommand -Label 'Backend production build install' -WorkingDirectory $backendPath -FilePath 'npm' -Arguments @('ci')
Invoke-StepCommand -Label 'Backend production build' -WorkingDirectory $backendPath -FilePath 'npm' -Arguments @('run', 'build')
Invoke-StepCommand -Label 'Backend production optimize' -WorkingDirectory $backendPath -FilePath 'php' -Arguments @('artisan', 'optimize')
Invoke-StepCommand -Label 'Backend optimize cleanup' -WorkingDirectory $backendPath -FilePath 'php' -Arguments @('artisan', 'optimize:clear')

Assert-NoNodeProcessLock -WorkingDirectory $householdPath -Label 'Household clean install'
Invoke-StepCommand -Label 'Household install' -WorkingDirectory $householdPath -FilePath 'npm' -Arguments @('ci')
Invoke-StepCommand -Label 'Household lint' -WorkingDirectory $householdPath -FilePath 'npm' -Arguments @('run', 'lint')

if (-not $SkipMobileValidation) {
    Invoke-StepCommand -Label 'Household Expo doctor' -WorkingDirectory $householdPath -FilePath 'npx' -Arguments @('expo-doctor')
}

Assert-NoNodeProcessLock -WorkingDirectory $rescuerPath -Label 'Rescuer clean install'
Invoke-StepCommand -Label 'Rescuer install' -WorkingDirectory $rescuerPath -FilePath 'npm' -Arguments @('ci')
Invoke-StepCommand -Label 'Rescuer lint' -WorkingDirectory $rescuerPath -FilePath 'npm' -Arguments @('run', 'lint')

if (-not $SkipMobileValidation) {
    Invoke-StepCommand -Label 'Rescuer Expo doctor' -WorkingDirectory $rescuerPath -FilePath 'npx' -Arguments @('expo-doctor')
}

Write-Step "Deployment verification completed successfully"
Write-Host "All configured checks passed." -ForegroundColor Green
