# Install the standalone AHRN release APK (no Metro required).
$ErrorActionPreference = "Continue"
$sdk = "$env:LOCALAPPDATA\Android\Sdk"
$adb = "$sdk\platform-tools\adb.exe"
$apk = "d:\PROJECTS\HOME AUTOMATION\releases\AHRN-1.0.0.apk"

if (-not (Test-Path $apk)) {
  throw "Release APK not found. Run .\build-ahrn-apk.ps1 first."
}

& $adb start-server 2>$null | Out-Null
$devices = & $adb devices 2>&1 | Out-String
if ($devices -notmatch "emulator-\d+\s+device|^\w.+\s+device") {
  Write-Host "No device found. Start Pixel_6 emulator first."
  exit 1
}

Write-Host "Installing standalone AHRN APK..."
$result = & $adb install -r $apk 2>&1 | Out-String
Write-Host $result

if ($result -notmatch "Success") {
  Write-Host "Note: arm64 APK may not install on x86 emulator. Use a real Android phone."
  exit 1
}

Write-Host "Launching AHRN..."
& $adb shell am force-stop com.ahrn.mobile
& $adb shell am start -n com.ahrn.mobile/.MainActivity
Write-Host "Done. App runs standalone - no Metro needed."
