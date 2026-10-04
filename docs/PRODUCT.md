# Product

> Draft plan. Nothing here is built yet, and all of it is open to change.

## The problem

People launching a product post across Reddit, X, YouTube, Instagram and
community servers. Posting is the easy part. The hard part is everything
around it: deciding what goes where and when, preparing each post in each
platform's format, remembering what is due, noticing what is missing, and
learning which posts worked. Open-source tools are schedulers that start at
the moment of posting. Tools that plan and learn are paid cloud services
built for brand accounts. Nothing local and open covers the whole loop,
especially for communities like subreddits, where each one has its own rules
and posting is done by hand.

## Who it is for

1. Solo founders and indie developers launching a product.
2. Small teams running a launch or content campaign.
3. Creators who post regularly across several platforms.

## The loop

Plan → Prepare → Post → Collect → Learn → Plan again.

## Principles

- **Plan-driven.** Campaigns, phases, a decision rule, and a calendar that
  warns before anything is late.
- **Community-aware.** Each channel has its own rules, timing and templates.
- **Manual posting is first-class.** Copy, open, post, mark as posted.
  Automatic posting is an optional connector, never the default.
- **Works without a model.** Calendar, reminders, format checks and tracking
  are mechanical. A local or hosted model is an optional boost: drafting in
  your voice, sorting comments, learning from your edits, weekly reviews.
- **Agent-ready.** Every action is available to any agent through MCP.
- **Yours.** Local-first. Self-host with one Docker image.

## Screens

| Screen | What it shows |
|---|---|
| Home | A notifications feed: due today, overdue, warnings, content still to create, results to log, suggestions to approve |
| Calendar | Month, week and list views; each day shows platform-labelled chips; click a day for its list, a chip for the post |
| Platforms | One tab per platform, grouped by channel and status |
| Post | Text, media, platform settings, format checks, status, results |
| Media | The project's media library, checked against each platform |
| Learn | Results by hook, format, channel and platform; comment patterns; playbook |
| Settings | Overlay: projects, accounts, connectors, model provider, theme |

## Modes

**Plan** (campaigns, phases, slots) → **Create** (write, attach media made
elsewhere, validate) → **Post** (ready queue: copy and open, or send via a
connector) → **Learn** (results, insights, playbook).

## Not in scope for now

Creating images or video inside the app, web-wide social listening, team
permissions beyond workspace members, paid ads.
