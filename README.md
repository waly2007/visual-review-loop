# visual-review-loop

**Claude says your carousel is done. It never looked at it.**

A free [Claude Code](https://claude.com/claude-code) skill that makes Claude look at its own visual work before showing it to you: carousels, social posts, thumbnails, slide decks, app screenshots, mockups, videos.

Code has tests. Images and videos have nothing, so *you* end up doing the QA: "slide 1 is the wrong picture", "the title is cut", "the phone is cropped", "the TikTok version is broken". Every one of those is a round trip. This skill is the loop that catches them first.

[Lire en français](README.fr.md)

## What it does

1. **Writes a checklist before rendering**: your request line by line, your project's own rules (`.claude/visual-checklist.md`), and universal checks (right asset on the right slide, no cut text, nothing private on screen, every format).
2. **Renders the real thing**: final pixel size, every format you ship (e.g. 1080×1350 and 1080×1920).
3. **Looks at it**: builds a contact sheet of every slide or video frame and actually reads it, then opens the risky slides full size.
4. **Marks every check pass / fail / can't check.** "Looks good" is not a result.
5. **Fixes and goes again**, up to three rounds.
6. **Reports honestly**: what it checked, what it fixed, what it could not check.

## Real run

First real use, on a 9-slide Instagram + TikTok carousel (18 images) for a travel app:

- **Round 1:** 4 failures found before the person saw anything: a key number hidden behind a zoom card, a selection row cut off, zoom cards covering the phone, a title badly wrapped in the vertical format.
- **Round 2:** 1 failure: zoom cards still showed the wrong area (coordinates measured on a scaled-down preview). That lesson is now in the skill.
- **Round 3:** everything passed, in both formats.

Before this skill, the same kind of carousel took several back-and-forths with the person pointing out each mistake.

## Install

Copy the skill folder into your skills directory:

```bash
# for every project on your machine
git clone https://github.com/waly2007/visual-review-loop
cp -R visual-review-loop/skills/visual-review-loop ~/.claude/skills/

# or only for one project
cp -R visual-review-loop/skills/visual-review-loop your-project/.claude/skills/
```

Claude Code picks it up automatically when you ask for something visual. You can also call it by name: `/visual-review-loop`.

### Optional: your own checklist

Add a `.claude/visual-checklist.md` to your project with your brand rules, one per line. Example:

```markdown
- No emojis in images or captions.
- Brand colors only: #1B9CE8, #0E2A47.
- Every post exists in 1080×1350 and 1080×1920.
- Last slide is the shared end slide.
```

## Requirements

- Claude Code (or any agent that reads `SKILL.md` skills).
- For contact sheets: Node.js and a local Chrome or Chromium (`scripts/contact_sheet.mjs`, no dependencies).
- For video: `ffmpeg` to extract frames and check audio levels.

## License

MIT
