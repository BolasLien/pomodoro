# Repository Guidelines

## Project Structure & Module Organization
This is a Vue 2 SPA Pomodoro app. Keep feature logic close to existing folders:
- `src/views/`: route pages (`Home.vue`, `List.vue`, `Finish.vue`, `Settings.vue`)
- `src/components/`: reusable UI parts (for example `Timer.vue`)
- `src/store/`: Vuex state and mutations
- `src/router/`: route definitions and page titles
- `src/style/`: global Stylus styles
- `public/`: static assets, PWA files, and alarm audio in `public/alarms/`
- `tests/e2e/`: Playwright end-to-end tests

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run serve`: start local dev server (Vue CLI, default port `8080`).
- `npm run build`: build production bundle to `dist/`.
- `npm run lint`: run ESLint (`@vue/standard` rules).
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
- Runtime env values are in `.env.development` and `.env.production`.
- Keep secrets out of repo; use local overrides (for example `.env.local`) when needed.
