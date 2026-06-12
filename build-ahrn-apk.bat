@echo off
REM Build AHRN standalone APK (works from CMD or double-click)
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0build-ahrn-apk.ps1"
pause
