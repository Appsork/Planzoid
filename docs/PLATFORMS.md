# Platform plugins

A platform is a spec file in `backend/platforms/<id>.yaml`, plus optional
collector code. Adding a platform needs no change anywhere else.

```yaml
id: reddit
name: Reddit
postiz_provider: reddit
audience: community          # community | followers
content_types: [text, link, image, video]
fields:
  - { key: subreddit, type: string, required: true, per_channel: true }
  - { key: title, type: string, required: true, max: 300 }
  - { key: type, type: enum, values: [self, link, image, video], required: true }
  - { key: url, type: url, required_when: { type: link } }
  - { key: flair, type: object, required_when: { channel.required_flair: true } }
limits:
  body_max: 40000
media:
  image: { max_mb: 20 }
  video: { max_mb: 1024, max_seconds: 900 }
timing:
  default_days: [tue, wed, thu]
  default_time_utc: "11:30"
collector: manual            # manual | <collector id>; Reddit API needs approval
notes: Each subreddit has its own rules; record them on the channel.
```

Specs ship for Reddit, X, YouTube, Instagram and Discord. Field names and
limits are checked against each platform's and Postiz's current
documentation before release; specs carry a `verified_on` date.
