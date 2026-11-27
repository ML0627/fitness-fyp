# Fitness App FYP

Final Year Project: a fitness application for tracking workouts, progress, and health goals.

## Overview

This repository contains the source code for our Fitness App FYP. The project aims to help users manage exercise routines, monitor progress, and stay motivated toward their fitness goals.

## Set up your own environment

1. **Prerequisites**
   - [Git](https://git-scm.com/)
   - [Node.js](https://nodejs.org/) (LTS recommended)
   - A GitHub account with access to this repository
   - A code editor (e.g. VS Code / Cursor)

2. **Clone the repository**
   ```bash
   git clone https://github.com/ML0627/fitness-fyp.git
   cd fitness-fyp
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Configure environment variables**
   - Copy the example env file (when available): `cp .env.example .env`
   - Fill in the required values in `.env`
   - Never commit `.env` — it is ignored by git

5. **Run the app locally**
   ```bash
   npm run dev
   ```

6. **Optional checks before you start coding**
   ```bash
   npm run lint
   npm test
   ```

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
