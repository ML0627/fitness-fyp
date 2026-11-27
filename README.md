# Fitness App FYP

Final Year Project: a fitness application for tracking workouts, progress, and health goals.

## Overview

This repository contains the source code for our Fitness App FYP. The project aims to help users manage exercise routines, monitor progress, and stay motivated toward their fitness goals.

## Set up your own environment

1. **Prerequisites**
   - [Git](https://git-scm.com/)
   - [Node.js](https://nodejs.org/) (LTS recommended)
   - A GitHub account with access to this repository
   - A code editor (e.g. VS Code)

2. **Clone the repository**
   ```bash
   git clone https://github.com/ML0627/fitness-fyp.git
   cd fitness-fyp
   ```

3. **Install dependencies**
   ```bash
   npm ci
   ```
   *(Use `npm ci` so `expo` stays aligned with the locked dependencies in `package-lock.json`.)*

4. **Configure environment variables**
   - Copy the example env file when needed: `cp .env.example .env`
   - Fill in the required values in `.env` (current auth screens run local validation only, so the app runs without `.env` for now)
   - Never commit `.env` — it is ignored by git

5. **Run the app locally**
   - **Web browser (fastest):**
     ```bash
     npm run web
     ```
   - **Expo dev menu (QR code for Expo Go on phone):**
     ```bash
     npm start
     ```
   - **Android Studio Emulator:** See the [Android Studio Emulator guide](#android-studio-emulator-guide-windows) below.

6. **TypeScript check before you commit**
   ```bash
   npx tsc --noEmit --ignoreDeprecations 6.0
   ```

## Android Studio Emulator Guide (Windows)

Because this is a **managed Expo** project (there is no `android/` Gradle folder), **do not** open or build this repository inside Android Studio. Use Android Studio only to manage the Android SDK and Virtual Device (emulator).

### 1. One-time emulator setup

1. Open **Android Studio** → **More Actions → Virtual Device Manager** (or click the **Device Manager** icon on the right toolbar).
2. Click **Create Virtual Device**, select a phone (e.g. **Pixel 7** or **Pixel 8**), download a recent Android system image, and click **Finish**.
3. *(Recommended)* Click `⋮` next to your device → **Edit** → **Show Advanced Settings** and verify RAM is `2048`–`4096 MB` and Graphics is **Hardware - GLES 2.0** (or **Automatic**).
4. Add `ANDROID_HOME` and SDK tools to your Windows User `Path` by running this **once** in PowerShell, then **restarting VS Code**:
   ```powershell
   $sdk = "$env:LOCALAPPDATA\Android\Sdk"
   [Environment]::SetEnvironmentVariable("ANDROID_HOME", $sdk, "User")
   $parts = ([Environment]::GetEnvironmentVariable("Path", "User") -split ';') + "$sdk\platform-tools", "$sdk\emulator" | Where-Object { $_ } | Select-Object -Unique
   [Environment]::SetEnvironmentVariable("Path", ($parts -join ';'), "User")
   ```
5. Verify in a **new** terminal:
   ```powershell
   adb --version
   emulator -list-avds
   ```

### 2. Launch the app on the emulator

1. Boot your virtual device from **Android Studio → Virtual Device Manager** (**▶**), or from the VS Code terminal:
   ```powershell
   Start-Process emulator -ArgumentList "-avd YOUR_AVD_NAME"
   ```
   Wait until the Android home screen finishes booting (do **not** tap the Expo Go icon manually).
2. In the VS Code terminal at the repo root, run:
   ```powershell
   adb reverse tcp:8081 tcp:8081
   npx expo start --localhost --android
   ```
   - Wait 20–30 seconds on the first load while Metro prints `Android Bundling...`.
   - Keep this terminal open while testing (closing it disconnects Metro).
   - Useful shortcuts while running: **`r`** reloads, **`w`** opens web, **`Ctrl + M`** in the emulator opens the Expo menu, **`Ctrl + C`** stops the server.

### 3. What to test

- **Welcome Screen** (`frontend/boundary/WelcomeScreen.tsx`): Displays the `ClubFit` hero and **Log In** / **Create Account** buttons.
- **Log In Screen** (`frontend/boundary/LoginScreen.tsx`): Validates email format and password (≥ 8 characters); valid submission logs to the terminal and shows a `Ready for Supabase` alert.
- **Create Account Screen** (`frontend/boundary/SignUpScreen.tsx`): Validates required name, email format, password (≥ 8 characters), and matching confirm password; valid submission logs to the terminal and shows a `Ready for Supabase` alert.

### 4. Troubleshooting

| Issue | Fix |
| --- | --- |
| `spawn emulator ENOENT` | `ANDROID_HOME` / `PATH` is not loaded in that terminal. Restart VS Code after step 1.4, or run `$env:ANDROID_HOME="$env:LOCALAPPDATA\Android\Sdk"; $env:PATH="$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator;$env:PATH"`. |
| Stuck on white **Expo Go** logo or `fitness-fyp` screen | Run `adb shell am force-stop host.exp.exponent`, then `adb reverse tcp:8081 tcp:8081` and `npx expo start --localhost --android`. If Expo Go still hangs, long-press **Expo Go → App info → Storage & cache → Clear storage** in the emulator, **Cold Boot Now** from Device Manager, or test on a phone with `npx expo start --tunnel`. |
| `ERR_PACKAGE_PATH_NOT_EXPORTED` (`TerminalReporter`) | `expo` and `metro` versions are out of sync. Restore `package.json` and `package-lock.json` from git and run `npm ci`. |

## Automated CI checks

We use GitHub Actions to run checks on every push and pull request to `main`.

Typical CI jobs (as they are added to the project):

| Check | Purpose |
| ----- | ------- |
| Install | Install dependencies with a locked version set |
| Lint | Catch style and common code issues |
| Test | Run unit / integration tests |
| Build | Confirm the app builds successfully |

**What you should do**

- Push your branch and open a PR — CI runs automatically
- Fix any failing checks before requesting review
- Prefer green CI on your branch before merging to `main`

Workflow files live under `.github/workflows/` once CI is configured.

## Upgrade existing development

Keep your local copy and toolchain up to date:

1. **Update your branch from `main`**
   ```bash
   git checkout main
   git pull origin main
   git checkout your-feature-branch
   git merge main
   # or: git rebase main
   ```

2. **Reinstall dependencies after pulls**
   ```bash
   npm install
   ```
   Run this whenever `package.json` or the lockfile changes.

3. **Refresh environment config**
   - Compare your `.env` with `.env.example` after teammates add new variables
   - Add any missing keys locally

4. **Upgrade Node / packages when the team agrees**
   ```bash
   node -v          # confirm you match the project Node version
   npm outdated     # see available upgrades
   npm update       # apply compatible updates (or follow team process)
   ```

5. **Clean install if things break**
   ```bash
   rm -rf node_modules
   npm install
   ```

## Work with the group

1. **Branching**
   - Create a branch from the latest `main`: `git checkout -b feature/short-description`
   - Use clear names: `feature/...`, `fix/...`, `docs/...`

2. **Commits**
   - Commit small, focused changes
   - Write clear messages that explain *why* the change was made

3. **Pull requests**
   - Push your branch and open a PR against `main`
   - Describe what changed and how to test it
   - Link related issues or tasks when relevant
   - Wait for at least one teammate review and green CI before merging

4. **Communication**
   - Assign yourself to tasks so work is not duplicated
   - Flag blockers early in the group chat / project board
   - Prefer PRs over committing directly to `main`

5. **Code ownership habits**
   - Do not commit secrets, API keys, or personal `.env` files
   - Rebase or merge `main` into your branch regularly to reduce conflicts
   - Resolve merge conflicts locally, then push again

## License

To be determined.
