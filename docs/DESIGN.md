# Design system

> Draft plan. Nothing here is built yet, and all of it is open to change.

> `tokens.css` owns the design. Components own the behaviour. Screens own
> the composition.

## Rules

- Zero hardcoded colours, spacing, typography or radii. Tokens only.
- rem for every dimension, never px; the whole UI scales with the user's
  font-size setting. Any exception is documented inside `tokens.css`.
- Every theme mode defined in `tokens.css` is supported and selectable.
- Status is never colour alone; pair it with a word or icon.
- Visible keyboard focus everywhere; reduced motion respected.
- Simple, elegant, efficient: low density, one primary action per screen.

## Control vocabulary

| The choice | Control |
|---|---|
| Yes / no | Toggle |
| One of 2–3 options | Card selection |
| One of 4+ options | Dropdown |
| An action | Button with variant (primary / secondary / ghost / danger) |
| A destructive action | Danger button + confirmation |
| File input | Drag-drop upload |
| Settings, non-page content | Overlay |
| Progress | Steps |
| Status | Badge |

## Layout

Left navigation: Home, Calendar, Platforms, Media, Learn. Project and
campaign switcher at the top. Settings opens as an overlay. The Post editor
opens as a side panel over the calendar or list, so context is never lost.

## App components

| Component | Purpose |
|---|---|
| CalendarMonth / CalendarWeek | Days with platform chips; click day → list, chip → item |
| PlatformChip | Platform label + status, text always present |
| ItemRow | One line per item in lists and Home |
| NotificationFeed | Home: grouped warnings, due, overdue, waiting |
| ReadinessList | Mechanical warnings for one item |
| MediaPicker | Choose project media; per-platform validation shown |
| ResultsTable | Averages per post by hook, format, channel, platform |

Every component is listed in `frontend/src/components/REGISTRY.md` with
its props and defaults, updated in the same commit as the component.
