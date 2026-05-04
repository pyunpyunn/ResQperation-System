[CmdletBinding()]
param()

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
        & $FilePath @Arguments

        if ($LASTEXITCODE -ne 0) {
            throw "'$FilePath $($Arguments -join ' ')' failed with exit code $LASTEXITCODE."
        }
    } finally {
        Pop-Location
    }
}

Write-Step "Checking local toolchain"
foreach ($command in @('git', 'rg', 'php', 'composer', 'node', 'npm')) {
    Assert-CommandExists -Name $command
}

Write-Step "Scanning for unresolved merge markers"
$mergeMarkers = & rg -uu -n --glob '!**/vendor/**' --glob '!**/node_modules/**' --glob '!**/public/build/**' --glob '!**/.git/**' "^(<<<<<<<|=======|>>>>>>>)" $RepoRoot
if ($LASTEXITCODE -eq 0) {
    throw "Unresolved merge markers were found:`n$($mergeMarkers -join [Environment]::NewLine)"
}
if ($LASTEXITCODE -gt 1) {
    throw "rg failed while scanning for merge markers."
}

Write-Step "Checking required folders"
foreach ($relativePath in @('backend', 'web', 'mobile', 'shared', 'docs')) {
    if (-not (Test-Path (Join-Path $RepoRoot $relativePath))) {
        throw "Missing required folder: $relativePath"
    }
}

Write-Step "Checking required environment templates"
foreach ($relativePath in @('backend\.env.example')) {
    if (-not (Test-Path (Join-Path $RepoRoot $relativePath))) {
        throw "Missing required environment template: $relativePath"
    }
}

$backendPath = Join-Path $RepoRoot 'backend'
$webPath = Join-Path $RepoRoot 'web'
$mobilePath = Join-Path $RepoRoot 'mobile'

Invoke-StepCommand -Label 'Backend tests' -WorkingDirectory $backendPath -FilePath 'composer' -Arguments @('test')
Invoke-StepCommand -Label 'Web production build' -WorkingDirectory $webPath -FilePath 'npm' -Arguments @('run', 'build')
Invoke-StepCommand -Label 'Mobile production build' -WorkingDirectory $mobilePath -FilePath 'npm' -Arguments @('run', 'build')

Write-Step "Deployment verification completed successfully"
Write-Host "All configured checks passed." -ForegroundColor Green
