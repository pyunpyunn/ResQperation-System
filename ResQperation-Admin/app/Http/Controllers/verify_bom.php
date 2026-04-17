<?php
$file = __DIR__ . '/../Requests/Auth/LoginRequest.php';
$bytes = file_get_contents($file, false, null, 0, 10);
echo "First 10 bytes (hex): ";
for ($i = 0; $i < strlen($bytes); $i++) {
    echo bin2hex($bytes[$i]) . " ";
}
echo "\n";
if (strpos($bytes, "\xEF\xBB\xBF") === 0) {
    echo "❌ ERROR: BOM DETECTED\n";
} else {
    echo "✅ OK: No BOM\n";
}
echo "First char: " . bin2hex($bytes[0]) . "\n";
