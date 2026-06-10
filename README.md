# HOME AUTOMATION

Home automation and **AHRN** (Asset Health & Reliability Network) mobile development workspace.

Repository: [github.com/udayacentle/HOME-AUTOMATION](https://github.com/udayacentle/HOME-AUTOMATION)

## Contents

| Path | Description |
|------|-------------|
| [AHRN-Mobile/](AHRN-Mobile/) | Expo SDK 56 React Native app (5-tab AHRN UI) |
| [build-ahrn-apk.ps1](build-ahrn-apk.ps1) | Build shareable release APK |
| [data/](data/) | Demo JSON export (`ahrn-app-data.json`) |
| [launch-ahrn.ps1](launch-ahrn.ps1) | Start Metro + AHRN on Android emulator |
| [launch-expo-go.ps1](launch-expo-go.ps1) | Start Metro + Expo Go |
| [AHRN-Mobile-README.md](AHRN-Mobile-README.md) | Mobile runbook |

`Rocket.Chat.ReactNative/` is intentionally not tracked (large upstream clone). Clone from [RocketChat/Rocket.Chat.ReactNative](https://github.com/RocketChat/Rocket.Chat.ReactNative) if needed.

## Quick start (AHRN mobile)

```powershell
cd AHRN-Mobile
npm install
cd ..
.\launch-ahrn.ps1
```

- Emulator: **Pixel_6** (`emulator-5554`)
- App package: `com.ahrn.mobile`
- Metro: **http://localhost:8081**

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
