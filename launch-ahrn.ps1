# Launch standalone AHRN release APK - same as releases/AHRN-1.0.0.apk (no Metro).
$ErrorActionPreference = "Continue"
$sdk = "$env:LOCALAPPDATA\Android\Sdk"
$adb = "$sdk\platform-tools\adb.exe"
$apk = "d:\PROJECTS\HOME AUTOMATION\releases\AHRN-1.0.0.apk"

Write-Host "=== AHRN Standalone Launch (no Metro) ==="

if (-not (Test-Path $apk)) {
  Write-Host "Building release APK..."
  Set-Location "d:\PROJECTS\HOME AUTOMATION"
  & ".\build-ahrn-apk.ps1"
}

& $adb start-server 2>$null | Out-Null
$devices = & $adb devices 2>&1 | Out-String
if ($devices -notmatch "emulator-\d+\s+device|\tdevice") {
  Write-Host "Starting Pixel_6 emulator..."
  Start-Process "$sdk\emulator\emulator.exe" -ArgumentList "-avd","Pixel_6" -WindowStyle Normal
  $deadline = (Get-Date).AddMinutes(5)
  while ((Get-Date) -lt $deadline) {
    $devices = & $adb devices 2>&1 | Out-String
    if ($devices -match "emulator-\d+\s+device") { break }
    Start-Sleep -Seconds 4
  }
}

& $adb wait-for-device
Start-Sleep -Seconds 10

Write-Host "Installing standalone APK..."
& $adb uninstall com.ahrn.mobile 2>$null | Out-Null
$result = & $adb install -r $apk 2>&1 | Out-String
Write-Host $result.Trim()

if ($result -notmatch "Success") {
  Write-Host "Install failed. Rebuilding APK with emulator support..."
  Set-Location "d:\PROJECTS\HOME AUTOMATION"
  & ".\build-ahrn-apk.ps1"
  $result = & $adb install -r $apk 2>&1 | Out-String
  if ($result -notmatch "Success") { throw "Install failed: $result" }
}

Write-Host "Launching AHRN..."
& $adb shell am force-stop com.ahrn.mobile
Start-Sleep -Seconds 1
& $adb shell am start -n com.ahrn.mobile/.MainActivity
Start-Sleep -Seconds 8

& $adb shell screencap -p /sdcard/ahrn_release.png
& $adb pull /sdcard/ahrn_release.png "d:\PROJECTS\HOME AUTOMATION\ahrn-emulator-running.png" 2>$null

Write-Host ""
Write-Host "Done. Standalone app running from:"
Write-Host "  $apk"
Write-Host "No Metro required - full app is inside the APK."
