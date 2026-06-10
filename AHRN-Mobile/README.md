# AHRN Mobile App

React Native (Expo) client for the **Autonomous Home Reliability Network**, matching the web UI in `apps/web`.

Platform prerequisites and completion status: [docs/mobile-pc-requirements.md](../../docs/mobile-pc-requirements.md).

## Prerequisites (on your PC)

1. **Node.js 20+** — [https://nodejs.org](https://nodejs.org)
2. **npm** (included with Node)
3. **Android** — Android Studio + emulator, *or* a USB-connected device with USB debugging
4. **iOS (optional)** — Mac + Xcode, *or* install **Expo Go** on iPhone and scan the QR code

## Procedure — run the mobile app

### 1. Install dependencies

```bash
cd D:\PROJECTS\AHRN\AHRN-platform-develop\apps\mobile
npm install
```

### 2. Start the dev server

```bash
npm start
```

This opens the Expo dev tools in the terminal (and often in the browser).

### 3. Open on a device

| Target | Command / action |
|--------|------------------|
| **Android emulator** | Press `a` in the Expo terminal, or run `npm run android` |
| **Physical phone** | Install **Expo Go**, scan the QR code from `npm start` |
| **iOS simulator** | Press `i` (macOS + Xcode only) |

### 4. (Optional) Run web app side-by-side

In a second terminal:

```bash
cd D:\PROJECTS\AHRN\AHRN-platform-develop
npm run dev
```

Web: [http://localhost:5173](http://localhost:5173) — compare screens with the mobile tabs.

### 5. (Later) Connect to backend API

When the Nest/backend HTTP API is exposed:

```bash
# apps/mobile/.env
EXPO_PUBLIC_API_URL=http://YOUR_PC_LAN_IP:3000
```

Restart Expo after changing env vars. Until then, the app uses the same **demo data** as the web mockups.

## Home Automation copy

Synced copy and JSON data: `d:\PROJECTS\HOME AUTOMATION\AHRN-Mobile` and `data\ahrn-app-data.json`. See `AHRN-Mobile-README.md` in that workspace.

## Project structure

```
apps/mobile/
  App.tsx                 # Entry
  src/
    data/ahrnData.ts      # Shared demo data (mirrors web)
    navigation/           # Bottom tabs (7 screens, scrollable)
    screens/              # Dashboard, Forecast, Bids, Job, Technician, Admin, SuperAdmin
    components/           # Card, PrimaryButton
    theme/tokens.ts       # Colors (matches web)
    api/client.ts         # REST stub
    config.ts             # API URL + demo mode
```

## Store release (Phase 2)

1. Change `com.ahrn.mobile` in `app.json` if needed.
2. Replace icon/splash under `assets/`.
3. Install EAS: `npm i -g eas-cli`, then `eas build` for Android/iOS.

See PC-08 in [mobile-pc-requirements.md](../../docs/mobile-pc-requirements.md).
