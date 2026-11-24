---
name: visual-review-loop
description: Look at your own visual work before showing it. Use whenever you make or change something people will look at — carousel slides, social posts, thumbnails, posters, slide decks, app screenshots, mockups, UI screens or videos — and before you say it is done, send a preview, or ask for feedback. Renders every deliverable at its real size, puts it on a contact sheet, checks it against the request and a checklist, fixes what fails and repeats, then reports what was checked and what could not be.
license: MIT
metadata:
  version: "1.0.0"
---

# Visual review loop

You made something visual. The person should not be the first one to look at it.

Code has tests. Images and videos usually have nothing, so the person ends up doing the QA: "slide 1 is the wrong image", "the title is cut", "the phone is cropped", "the TikTok version is broken". Each of those is a round trip that you could have caught yourself. This skill is the loop that catches them first.

**The rule:** never present, send or call finished a visual you have not looked at in its final form, at its final size, in every format you deliver.

## The loop

### 1. Write the checklist before you render

Turn the request into checks you can answer with yes or no by looking.

- **The request, line by line.** Every instruction the person gave, in their words: "no names under the bubbles", "phones not cropped", "two phones on slide 6", "white end slide". Include instructions from earlier in the conversation that still apply.
- **The project's own rules.** If `.claude/visual-checklist.md` (or `.agents/visual-checklist.md`) exists in the project, read it and add every line.
- **The universal checks** below.

Write the checklist down (in your reply draft or a `REVIEW.md` next to the files). A check you did not write down is a check you will skip.

### 2. Render the real thing

- Render every deliverable at its **final pixel size** and in **every format** you ship (for example 1080×1350 and 1080×1920). A layout that works in one format often breaks in the other.
- Render from the **same source and command** that produce the files you deliver. Do not review a preview built a different way.
- Measure crop and zoom coordinates on the source file at its **real pixel size**, not on a scaled-down preview: a 1170 px screenshot shown at 924 px puts every coordinate off by 27 %.
- One file per slide or page. Do not cut one wide render into slides with a crop tool unless you verify the crop offsets: a wrong offset silently swaps slides.

### 3. Look at it

You cannot review what you have not opened. Use your image-reading tool on the actual files.

- **Static work (slides, posts, screens):** build a contact sheet with every slide side by side, all formats (`scripts/contact_sheet.mjs`), and read it. Then open full size every slide that carries small text, a screenshot or a detail the person asked for.
- **Video:** extract frames at the start, the end, each scene's midpoint and every transition (for example `ffmpeg -i video.mp4 -vf "fps=1/2,scale=480:-1" frames/%03d.png`), put them on a contact sheet and read it. If the tool you render with has its own review command (HyperFrames `snapshot --review`, Remotion `still`), use it. For sound, check levels and silences (`ffmpeg -i video.mp4 -af volumedetect -f null -`, or a waveform image) and listen-check by reading the timeline: voice not covered by music, no clipping, no dead air.
- **App screens or UI:** take the screenshot on the real device size, light and dark mode if both exist.

### 4. Check every line

Go through the checklist one line at a time and mark each one **pass**, **fail** or **can't check** with what you saw. "Looks good" is not a result.

### 5. Fix and go again

Fix every **fail**, re-render, and look again — at the whole set, not only the slide you touched: fixes move things. Stop after three rounds and tell the person what is still wrong instead of looping forever.

### 6. Report honestly

When you present the work, say in a few lines:

- what you checked and how (contact sheet, full-size slides, which formats, frames or audio);
- what you found and fixed yourself;
- what you **could not** check (taste, real-device rendering, sound you could not hear, facts you could not verify).

Do not write "perfect" or "all good" unless every line passed. Never claim a check you did not run.

## Universal checks

**Right content**
- Every asset is the one intended: right screenshot on the right slide, right order, no duplicate, no leftover placeholder ("Your photo", lorem ipsum, TODO).
- Numbers, names and claims match the source (the real app, the real data, what the person said).
- Nothing private that was not meant to be shown: personal names, emails, phone numbers, addresses, invite codes, notifications.

**Readable**
- No text cut, overflowing, hidden behind another element or awkwardly wrapped (a single word or a lone "?" on the last line, a number split from its unit).
- Text readable at the size people will see it (a phone feed thumbnail), with enough contrast on its background.
- Nothing important inside the platform's overlay zones (for vertical video: the bottom and right edges where captions and buttons sit).

**Clean**
- Device mockups and screenshots are complete (not cropped unless that was the intent), not stretched, not blurry.
- Alignment, margins and spacing consistent from one slide to the next; one visual template across a set.
- The first slide or frame works on its own; the last one has the intended call to action.

**Every format**
- All requested sizes exist, each one looked at, each one with the same content.

## When not to use it

A quick sketch the person explicitly asked to see rough, or a one-line text answer. Even then, open what you send.

## Files

- `scripts/contact_sheet.mjs` — builds a contact sheet (all images of one or more folders, side by side, with file names) as a PNG, using a local Chrome or Chromium in headless mode. `node scripts/contact_sheet.mjs out.png folderA [folderB …]`.
