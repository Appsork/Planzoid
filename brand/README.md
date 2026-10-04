# Brand

Everything that identifies the product lives here and nowhere else.

| File / key | Used for |
|---|---|
| `brand.json` → `displayName` | Window title, UI copy, installer, about screen |
| `shortName` | Tight spaces |
| `tagline` | About screen, empty states |
| `appId` | Data directory name, internal ids |
| `bundleIdentifier` | Desktop bundle id |
| `publisher` | Installer publisher, NOTICE copyright |
| `logo.svg` | Source for every app icon (generated) |
| `forbiddenNames` | Names that must never appear in this repo |
| `allowedFiles` | Files outside `brand/` where the display name may appear (README.md) |
| `logoPlaceholder` | `true` until the final logo exists |

`scripts/gen-brand.mjs` generates the frontend constants, the Go
constants, the desktop config and all icons. `scripts/check-brand.mjs`
fails if the display name or a forbidden name appears outside `brand/`.

**Renaming:** edit this folder, run `node scripts/gen-brand.mjs`, run the
tests. Changing `appId` moves the user data directory; the app migrates
the old one on first start.
