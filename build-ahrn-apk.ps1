# Build a shareable AHRN release APK (no Metro required on recipient device).
$ErrorActionPreference = "Stop"
$mobile = "d:\PROJECTS\HOME AUTOMATION\AHRN-Mobile"
$releases = "d:\PROJECTS\HOME AUTOMATION\releases"
$version = "1.0.0"
$apkName = "AHRN-$version.apk"

New-Item -ItemType Directory -Force -Path "D:\gradle", "D:\temp", $releases | Out-Null

$env:GRADLE_USER_HOME = "D:\gradle"
$env:TEMP = "D:\temp"
$env:TMP = "D:\temp"
if ($env:CI) { Remove-Item Env:CI }

Write-Host "Building release APK (arm64 + armeabi-v7a for real phones)..."
Set-Location "$mobile\android"
& .\gradlew.bat assembleRelease "-PreactNativeArchitectures=arm64-v8a,armeabi-v7a"

$built = "$mobile\android\app\build\outputs\apk\release\app-release.apk"
if (-not (Test-Path $built)) {
  throw "APK not found at $built"
}

Copy-Item $built "$releases\$apkName" -Force
Write-Host ""
Write-Host "APK ready to share:"
Write-Host "  $releases\$apkName"
Write-Host ""
Write-Host "Install on a phone: copy APK, open it, allow unknown sources if prompted."
