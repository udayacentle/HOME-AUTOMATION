# AHRN Mobile (Home Automation workspace)

**Active dev copy:** `AHRN-Mobile/` — edit here; changes show in the emulator.

## Run on emulator (recommended)

```powershell
cd "d:\PROJECTS\HOME AUTOMATION"
.\launch-ahrn.ps1
```

- Starts **Pixel_6** emulator (if needed)
- Metro on **port 8081 only**
- Opens **AHRN** app (`com.ahrn.mobile`)

Keep Metro running while you use the app.

## Expo Go (alternative)

```powershell
.\launch-expo-go.ps1
```

## Screens

1. Home Dashboard  
2. Failure Forecast  
3. Bid Comparison  
4. Job Progress  
5. Admin Market  

## Data

| Path | Purpose |
|------|---------|
| `AHRN-Mobile/src/data/ahrnData.ts` | In-app demo data |
| `data/ahrn-app-data.json` | JSON export (reference) |

## Sync from platform (optional)

```powershell
robocopy "D:\PROJECTS\AHRN\AHRN-platform-develop\apps\mobile" "d:\PROJECTS\HOME AUTOMATION\AHRN-Mobile" /E /XD node_modules android .expo .git build .gradle /XF *.apk
```
