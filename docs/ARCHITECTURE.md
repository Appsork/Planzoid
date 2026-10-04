# Architecture — v1 proposal (feedback welcome)

This is the plan before any code is written. If something here looks wrong,
open an issue or a discussion: changing it now costs nothing.

## Principles

1. **Mechanical core, optional intelligence.** The core never calls a model.
2. **One binary, three deployments.** The same Go binary runs as the desktop
   sidecar, in the self-host Docker image, and in a future hosted service.
3. **One action registry, three interfaces.** Each action is declared once;
   REST (for the UI), MCP tools (for agents) and a CLI are generated from it.
4. **Platforms are plugins.** A platform is a spec file plus optional
   collector code. No platform-specific branching elsewhere.
5. **Multi-user ready.** Workspaces and members exist in the data model from
   day one. Desktop is one workspace, one user, no login.
6. **Nothing posts without consent.**

## Shape

```
Tauri 2 shell (desktop only) — window, tray, OS notifications, starts sidecar
        │
React + TypeScript + Vite UI — served by the shell (desktop) or embedded
        │                       in the Go binary (server)
        │  REST + server-sent events
Go binary  app desktop | app server | app mcp
  ├── core          workspaces, projects, campaigns, channels, items,
  │                 media, schedule, statuses, readiness, results, playbook
  ├── platforms     spec loader, validation, collectors (plugins)
  ├── actions       registry → REST handlers, MCP tools, CLI commands
  ├── scheduler     reminders, collection jobs, backups (injected clock)
  ├── intelligence  providers: none | local | hosted; voice assembly,
  │                 drafting, comment sorting, edit learning
  ├── connectors    manual (built in), postiz
  ├── auth          off in desktop; sessions in server mode
  └── storage       SQLite (pure Go, WAL), project files, migrations
```

Dependency rule: `core` imports nothing above it. `platforms`,
`intelligence`, `connectors` depend on `core`; never the reverse.

## Backend (Go)

```
backend/
  cmd/app/            main: subcommands desktop | server | mcp
  internal/
    core/             domain types and services
    platforms/        spec loader, validators, collectors/
    actions/          registry, rest/, mcp/, cli/
    scheduler/
    intelligence/     providers/, voice/, drafting/, insights/
    connectors/       manual/, postiz/
    auth/
    storage/          sqlite/, files/, migrations/
    httpapi/          router, SSE, static UI (server mode)
    brand/            generated constants (gitignored)
  platforms/          *.yaml platform specs (shipped with the binary)
```

Key libraries: `modernc.org/sqlite` (no cgo, cross-compiles to all three
OSes), the official MCP Go SDK (`modelcontextprotocol/go-sdk`).

## Modes and ports

| Mode | Started by | Listens on | Auth |
|---|---|---|---|
| `desktop` | Tauri shell | `127.0.0.1:0` (OS picks a free port; prints `READY port=<n>`) | none, loopback only, random session token |
| `server` | Docker / systemd | `0.0.0.0:8795` (configurable) | required |
| `mcp` | an agent, as a subprocess | stdio, no port | local user |

When hosted, MCP is also served over Streamable HTTP at `/mcp` on the
server port. MCP stdio mode writes only MCP messages to stdout; logs go to
stderr. SQLite in WAL mode lets the `mcp` process and the running desktop
app share the database safely.

## Storage

```
<user data dir>/<appId>/
  settings.json
  app.db                          SQLite: workspaces, members, projects,
                                  campaigns, channels, items, results,
                                  insights, edit pairs, reminders, accounts
  workspaces/<ws>/projects/<slug>/
    voice.md  plan.md  playbook.md
    media/
    exports/                      Postiz-compatible JSON per item
  backups/                        daily copies of app.db
```

Documents read whole stay Markdown; everything filtered or sorted is in
SQLite. Every table carries `workspace_id`; every query is scoped by it.
Server mode uses the same layout under the container volume.

## Packaging

| Edition | Contents |
|---|---|
| Desktop | Tauri installer with the Go binary as sidecar (Windows .exe/.msi, macOS .dmg, Linux AppImage/.deb) |
| Self-host (light) | One Docker image: Go binary with the UI embedded |
| Self-host (full) | Compose file: our image + official Postiz images, unmodified, connected over an internal network |
| Hosted (future) | Same compose shape, run by us, holding approved platform apps so users get one-click "Connect" |

Postiz is never forked or rebuilt; upgrading it means changing its image tag.

## Intelligence (optional)

Providers: `none` (default), local (any OpenAI-compatible local endpoint,
e.g. Ollama), hosted (any OpenAI-compatible endpoint or vendor adapter).
Small frequent jobs can route to a local model, judgement jobs to a hosted
one. Voice is assembled from four layers (person → project → platform →
channel); the most specific wins; project disclosures are always included.

## Scheduler

Every minute: evaluate reminders and readiness. At 24 h and 7 days after
posting: collect results where a permitted collector exists, otherwise
create a "log results" reminder. Daily: back up `app.db`.

## Platform access

Posting through a platform requires an approved developer app and OAuth.
Collection uses only permitted access. Reddit requires approval for any
API use, so Reddit results are manual by default.
