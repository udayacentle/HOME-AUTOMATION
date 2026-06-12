@echo off
REM Install and launch AHRN on emulator (works from CMD or double-click)
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0launch-ahrn.ps1"
pause
