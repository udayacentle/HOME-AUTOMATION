# Launch AHRN in Expo Go - Metro port 8081 only
# KEEP THIS WINDOW OPEN while using the app.
$ErrorActionPreference = "Stop"
$sdk = "$env:LOCALAPPDATA\Android\Sdk"
$adb = "$sdk\platform-tools\adb.exe"
$mobile = "d:\PROJECTS\HOME AUTOMATION\AHRN-Mobile"
$port = 8081

if ($env:CI) { Remove-Item Env:CI }

Write-Host "0. Clearing stale Metro ports..."
$devPorts = 8081,8082,8083,8090,8095,19000,19001
foreach ($p in $devPorts) {
  Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue | ForEach-Object {
    $procId = $_.OwningProcess
    if ($procId) { Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue }
  }
}
Start-Sleep -Seconds 1

Write-Host "1. Checking emulator..."
$devices = & $adb devices 2>&1 | Out-String
if ($devices -notmatch "emulator-\d+\s+device") {
  Write-Host "   Starting Pixel_6..."
  Start-Process "$sdk\emulator\emulator.exe" -ArgumentList "-avd", "Pixel_6" -WindowStyle Normal
  $deadline = (Get-Date).AddMinutes(4)
  while ((Get-Date) -lt $deadline) {
    $devices = & $adb devices 2>&1 | Out-String
    if ($devices -match "emulator-\d+\s+device") { break }
    Start-Sleep -Seconds 3
  }
}

Write-Host "2. Setting up port forwarding (adb reverse)..."
& $adb reverse --remove-all 2>$null
& $adb reverse "tcp:$port" "tcp:$port" | Out-Null
Write-Host "   adb reverse tcp:$port tcp:$port"

Write-Host "3. Starting Metro on port $port ..."
Write-Host "   Wait 30-60s after Expo logo for first bundle."
Write-Host ""

Set-Location $mobile
Remove-Item Env:CI -ErrorAction SilentlyContinue
npx expo start --go --android --localhost --port $port --clear
