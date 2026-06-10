# Build standalone AHRN release APK - full app embedded, no Metro required.
$ErrorActionPreference = "Stop"
$mobile = "d:\PROJECTS\HOME AUTOMATION\AHRN-Mobile"
$releases = "d:\PROJECTS\HOME AUTOMATION\releases"
$version = "1.0.0"
$apkName = "AHRN-$version.apk"

New-Item -ItemType Directory -Force -Path "D:\gradle", "D:\temp", $releases | Out-Null

$env:GRADLE_USER_HOME = "D:\gradle"
$env:TEMP = "D:\temp"
$env:TMP = "D:\temp"
$env:NODE_ENV = "production"
if ($env:CI) { Remove-Item Env:CI }

Write-Host "Building standalone release APK (phones + emulator)..."
Set-Location "$mobile\android"
& .\gradlew.bat :app:createBundleReleaseJsAndAssets --rerun-tasks
& .\gradlew.bat assembleRelease "-PreactNativeArchitectures=arm64-v8a,armeabi-v7a,x86_64"

$built = "$mobile\android\app\build\outputs\apk\release\app-release.apk"
if (-not (Test-Path $built)) {
  throw "APK not found at $built"
}

Copy-Item $built "$releases\$apkName" -Force
Write-Host ""
Write-Host "Standalone APK ready (no Metro needed):"
Write-Host "  $releases\$apkName"
Write-Host ""
Write-Host "Install: copy to phone/emulator or run .\launch-ahrn.ps1"
