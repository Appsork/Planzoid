# Data model

All times stored in UTC, shown in the user's zone. Every row has
`workspace_id`.

| Entity | Key fields |
|---|---|
| Workspace | id, name, created_at |
| Member | id, workspace_id, email?, role (owner / editor / viewer) — desktop has one implicit owner |
| Project | id, slug, name, licence_kind (open source / proprietary), disclosures[], publishing {enabled, connector} |
| SocialAccount | id, project_id, platform, handle, connector_ref?, notes |
| Campaign | id, project_id, name, goal, phases[{n, name, start, end}], current_phase, decision_rule, status |
| Channel | id, project_id, platform, name (r/Sub, @account, Server #channel), rules_checked, self_promo (allowed / thread only / no / unknown), required_flair, timing_override, notes |
| Item | id, campaign_id, channel_id?, type (Post / Engage / Prep / Dev), platform, angle, hook, format, scheduled_at, status, title, body, agent_draft, media_ids[], url, posted_at, notes, payload |
| MediaAsset | id, project_id, path, kind (image / video / audio / document), width, height, duration_s, size_bytes, hash |
| ResultSnapshot | id, item_id, taken_at, source (manual / collector / connector), score, ratio, comments, views, downloads, testers |
| Insight | id, item_id, label (Question / Objection / Request / Praise / Confusion), text, needs_reply |
| EditPair | id, item_id, draft, final, created_at |
| PlaybookEntry | id, project_id, kind (principle / experiment / retired), statement, evidence_item_ids[] |
| Reminder | id, item_id?, rule, due_at, state (pending / shown / dismissed / done) |

## Item status

Idea → Draft → Ready → Posted → Reviewed; Skipped from any state (reason
required). Ready requires validation to pass. Posted requires posted_at.
Reviewed requires a result snapshot at or after 24 h.

## Readiness warnings (mechanical)

- placeholder link present (`[DEMO LINK]`, `[DOWNLOAD LINK]`)
- media missing or invalid for the platform (shape, duration, size)
- required platform field missing (e.g. subreddit flair)
- still Idea or Draft within 3 days of scheduled_at
- channel rules not checked before its first post
- no Engage item in a community at least 5 days before its first Post
- posted over 24 h ago with no result snapshot

## payload (Postiz-compatible)

```json
{
  "provider": "reddit",
  "post": [ { "content": "Body text", "image": [] } ],
  "settings": { "__type": "reddit", "subreddit": [ { "value": {
      "subreddit": "VideoEditing", "title": "Post title", "type": "self",
      "url": "", "is_flair_required": false, "flair": null } } ] }
}
```

Built when an item becomes Ready; cleared when text, channel or media change.

## Import

Phase 1 imports the prototype post desk's `data.json` and its Markdown voice,
plan and playbook files without loss.
