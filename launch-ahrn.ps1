# Launch AHRN standalone app on Android emulator (single port: 8081)
# KEEP the Metro window open while using the app.
$ErrorActionPreference = "Stop"
$sdk = "$env:LOCALAPPDATA\Android\Sdk"
$adb = "$sdk\platform-tools\adb.exe"
$mobile = "d:\PROJECTS\HOME AUTOMATION\AHRN-Mobile"
$port = 8081

if ($env:CI) { Remove-Item Env:CI }

Write-Host "Clearing stale Metro ports..."
$devPorts = 8081,8082,8083,8090,8095,19000,19001
foreach ($p in $devPorts) {
  Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction SilentlyContinue | ForEach-Object {
    $proc = Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue
    if ($proc -and $proc.ProcessName -eq 'node') {
      Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
    }
  }
}
Start-Sleep -Seconds 1

Write-Host "Checking emulator..."
$devices = & $adb devices 2>&1 | Out-String
if ($devices -notmatch "emulator-\d+\s+device") {
  Write-Host "Starting Pixel_6..."
  Start-Process "$sdk\emulator\emulator.exe" -ArgumentList "-avd", "Pixel_6" -WindowStyle Normal
  $deadline = (Get-Date).AddMinutes(4)
  while ((Get-Date) -lt $deadline) {
    $devices = & $adb devices 2>&1 | Out-String
    if ($devices -match "emulator-\d+\s+device") { break }
    Start-Sleep -Seconds 3
  }
}

& $adb reverse "tcp:$port" "tcp:$port" | Out-Null

$metro = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if (-not $metro) {
  Write-Host "Starting Metro on port $port (keep window open)..."
  Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$mobile'; Remove-Item Env:CI -ErrorAction SilentlyContinue; npx expo start --port $port"
  Start-Sleep -Seconds 15
}

Write-Host "Launching AHRN..."
& $adb shell am force-stop com.ahrn.mobile
& $adb shell am start -n com.ahrn.mobile/.MainActivity
Write-Host "Done. App: com.ahrn.mobile | Metro: http://localhost:$port | Source: $mobile"
