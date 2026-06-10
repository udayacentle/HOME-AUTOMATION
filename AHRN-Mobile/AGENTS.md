# AHRN Mobile — agent workflow

## Active dev target

All future mobile changes go here:

`d:\PROJECTS\HOME AUTOMATION\AHRN-Mobile`

Run and verify on the **Pixel_6 emulator** with the installed **AHRN** app (`com.ahrn.mobile`).

## Run after edits

From `d:\PROJECTS\HOME AUTOMATION`:

```powershell
.\launch-ahrn.ps1
```

Uses **one Metro port: 8081**. Keep Metro running while testing.

## Expo Go (alternative)

```powershell
.\launch-expo-go.ps1
```

## Data

Demo data: `src/data/ahrnData.ts` (mirrors `D:\PROJECTS\AHRN\AHRN-platform-develop\apps\web` pages).

## Expo SDK

Read https://docs.expo.dev/versions/v56.0.0/ before changing Expo APIs.
