# HOME AUTOMATION

Home automation and **AHRN** (Asset Health & Reliability Network) mobile development workspace.

Repository: [github.com/udayjalluri04/HOME-AUTOMATION](https://github.com/udayjalluri04/HOME-AUTOMATION)

## Contents

| Path | Description |
|------|-------------|
| [AHRN-Mobile/](AHRN-Mobile/) | Expo SDK 56 React Native app (5-tab AHRN UI) |
| [build-ahrn-apk.ps1](build-ahrn-apk.ps1) | Build shareable release APK |
| [install-ahrn-release.ps1](install-ahrn-release.ps1) | Install release APK on device |
| `releases/AHRN-1.1.0.apk` | Standalone app (no Metro) for sharing |
| [data/](data/) | Demo JSON export (`ahrn-app-data.json`) |
| [launch-ahrn.ps1](launch-ahrn.ps1) | Start Metro + AHRN on Android emulator |
| [launch-expo-go.ps1](launch-expo-go.ps1) | Start Metro + Expo Go |
| [AHRN-Mobile-README.md](AHRN-Mobile-README.md) | Mobile runbook |

`Rocket.Chat.ReactNative/` is intentionally not tracked (large upstream clone). Clone from [RocketChat/Rocket.Chat.ReactNative](https://github.com/RocketChat/Rocket.Chat.ReactNative) if needed.

## Quick start (standalone APK — recommended)

The release APK has the **full app embedded** (no Metro, no red screen).

```powershell
.\build-ahrn-apk.ps1          # build once
.\install-ahrn-release.ps1     # install on phone/emulator
```

Share: `releases/AHRN-1.1.0.apk` (~62 MB, works on real Android phones)

## Dev mode (Metro — for code changes only)

```powershell
cd AHRN-Mobile
npm install
npx expo start --port 8081 --localhost
```

- App package: `com.ahrn.mobile`
- Metro: **http://localhost:8081** (keep running while testing debug builds)

## Screens

1. Home Dashboard  
2. Failure Forecast  
3. Bid Comparison  
4. Job Progress  
5. Admin Market  

## Sync from AHRN platform (optional)

```powershell
robocopy "D:\PROJECTS\AHRN\AHRN-platform-develop\apps\mobile" ".\AHRN-Mobile" /E /XD node_modules android .expo .git build .gradle /XF *.apk
```

## Expo Go APK

Download [Expo Go 56](https://github.com/expo/expo-go-releases) for the emulator. Do not commit `.apk` files (see `.gitignore`).
