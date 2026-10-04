# Roadmap

> Draft plan. Nothing here is built yet, and all of it is open to change.

## Phase 0 — Foundation
- [ ] Repos, hooks, licence
- [ ] Brand generator (constants, desktop config, icons from logo.svg)
- [ ] Design import, all theme modes, component registry
- [ ] Go skeleton: desktop / server / mcp modes, health, SQLite, empty registry
- [ ] Frontend skeleton: Home and Calendar shells
- [ ] Tauri shell with sidecar; Docker image
- [ ] All test gates running

## Phase 1 — Mechanical core
- [ ] Workspaces, projects, accounts, campaigns, channels, items, statuses
- [ ] Calendar (month, week, list) with platform chips; platform tabs
- [ ] Post editor with validation and readiness warnings
- [ ] Platform specs: Reddit, X, YouTube, Instagram, Discord
- [ ] Media library with per-platform checks
- [ ] Home feed, reminders, OS notifications
- [ ] Results (manual), Learn screen
- [ ] Import from the prototype post desk
- [ ] Postiz-compatible export
- [ ] appId change migrates the data directory

## Phase 2 — Agent interface
- [ ] Registry generates REST, MCP (stdio + Streamable HTTP) and CLI
- [ ] MCP resources: voice layers, plan, playbook

## Phase 3 — Optional intelligence
- [ ] Providers: none, local, hosted
- [ ] Drafting with layered voice; reply drafts
- [ ] Comment sorting; edit learning; weekly review → playbook

## Phase 4 — Connectors and collectors
- [ ] Postiz connector (send drafts, read analytics)
- [ ] Full self-host compose file (our image + official Postiz images)
- [ ] Permitted collectors (e.g. YouTube Data API)

## Phase 5 — Releases
- [ ] Signed desktop builds for Windows, macOS, Linux
- [ ] Published Docker image
- [ ] Final name and logo; trademark
