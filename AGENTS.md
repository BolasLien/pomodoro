# Repository Guidelines

## Project Structure & Module Organization
This is a Vue 3 SPA Pomodoro app (Vite + Pinia + Tailwind CSS 4). Keep feature logic close to existing folders:
- `src/views/`: route pages (`Home.vue`, `List.vue`, `Finish.vue`, `Settings.vue`)
- `src/components/`: reusable UI parts (for example `Timer.vue`)
- `src/store/`: Pinia stores (`src/store/pomodoro.js`)
- `src/router/`: Vue Router 4 route definitions
- `src/style/`: global Tailwind entry (`src/style/main.css`)
- `src/config/`: runtime settings (for example `src/config/runtime.js`)
- `public/`: static assets and alarm audio in `public/alarms/`
- `tests/e2e/`: Playwright end-to-end tests
- `docs/`: project specs, migration docs, ADRs

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start local dev server (Vite, default port `5173`).
- `npm run build`: build production bundle to `dist/`.
- `npm run preview`: preview the built app locally.
- `npm run lint`: run ESLint.
- `npm run test:e2e`: run Playwright E2E tests headless.
- `npm run test:e2e:ui`: open Playwright UI mode.
- `npm run test:e2e:debug`: run E2E in debug mode.

## Coding Style & Naming Conventions
- Indentation: 2 spaces (`.editorconfig`).
- Follow ESLint rules in `.eslintrc.js`; run lint before commit.
- Vue file naming: PascalCase for SFC files (for example `Timer.vue`).
- Keep mutation and method names action-oriented (`addTodo`, `setStatus`, `finish`).
- Prefer small, focused components and avoid cross-folder coupling.

## Testing Guidelines
- E2E framework: Playwright (`playwright.config.js`).
- Place tests in `tests/e2e/` using `*.spec.js` naming.
- Add/update smoke coverage for route rendering and key flows:
  task creation, timer actions, finish list behavior, settings behavior.
- For migration work, treat E2E passing as a release gate.

## Commit & Pull Request Guidelines
- Existing history uses short, task-focused messages in both zh-TW and English.
- Use concise imperative commits, e.g.:
  - `新增 Playwright smoke tests`
  - `refactor: migrate timer store logic`
- PRs should include:
  - purpose and scope
  - test evidence (`npm run lint`, `npm run test:e2e`)
  - screenshots/GIFs for UI changes
  - linked issue or checklist item when available

## Configuration & Security Notes
- Runtime behavior is configured in code (`src/config/runtime.js`) using mode checks (`production` / `test`).
- Keep secrets out of repo. This project currently does not require committed `.env` files.
