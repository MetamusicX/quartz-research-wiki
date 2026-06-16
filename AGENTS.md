# AGENTS.md

Instructions for AI assistants (Claude, ChatGPT/Codex, Gemini, Cursor, Aider, and others) working with this repository. If you are a researcher arriving with an AI tool, point it at this file first.

## What this repository is

A research wiki built on [Quartz v4](https://quartz.jzhao.xyz), published as a static site. The source files are plain Markdown with YAML frontmatter and Obsidian-style `[[wikilinks]]`, so any tool that understands Markdown can read, edit, and reason over them.

Researchers typically use this wiki to: trace how a concept evolved across meetings, find every reference to a person or work, draft new atoms in the house style, summarise a thread, or pull cross-cutting connections that are not visible from a single meeting.

## Repository layout

```
content/
  index.md                         Landing page (do not restructure)
  meetings-group-a/                Meeting notes for one group (rename to your group)
  meetings-group-b/                Meeting notes for a second group (rename or delete)
  summaries/                       Condensed digests of each meeting
  atoms/                           Cross-referenced single-subject pages
    people/                        Composers, scholars, writers, anyone cited
    works/                         Books, articles, scores, recordings, exhibitions
    concepts/                      Single ideas or terms that recur
    threads/                       Multi-meeting lines of inquiry
```

Everything outside `content/` is the Quartz engine and site configuration. Do not edit files in `quartz/` unless you know the engine.

## House style — the atoms convention

The wiki's value comes from one rule: **every recurring person, work, concept, or thread gets its own atom**, and every meeting or summary `[[wikilinks]]` to those atoms instead of mentioning them by bare name.

- A person mentioned in three meetings ⇒ one atom in `atoms/people/`, linked from each meeting.
- A book cited twice ⇒ one atom in `atoms/works/`.
- An idea the group keeps returning to ⇒ one atom in `atoms/concepts/`.
- An unresolved question that runs across sessions ⇒ a `threads/` atom that tracks the trajectory.

Atoms are short — usually one screen of text — and they only contain information that is stable across meetings. Meeting-specific commentary belongs in the meeting note, with a wikilink to the atom.

## Wikilink conventions

- Use Obsidian syntax: `[[atoms/concepts/example-concept|situated memory]]` where the part after `|` is the link text.
- Prefer relative paths from inside `atoms/` and `summaries/` (e.g. `[[../meetings-group-a/2026-01-15-example-meeting]]`).
- From `meetings-*/` and `summaries/`, prefer the shortest unique path (Quartz resolves it).
- Use aliases: if a person has a surname-only mention, add it to the atom's frontmatter `aliases:` field so the link still resolves.

## Frontmatter conventions

Every file should open with YAML frontmatter. Minimum:

```yaml
---
title: "Human-readable title"
tags:
  - meeting   # or summary, atom, person, work, concept, thread
---
```

Recommended additions by file type:

- **Meeting notes**: `date`, `group`, `attendees` (as wikilinks where the attendee has a person atom).
- **Summaries**: `date`, `source-meeting` (a wikilink to the meeting), `tags: [summary, <group>]`.
- **Person atoms**: `aliases:` (a list of alternative spellings or surname-only mentions).
- **Work atoms**: `work-type` (book / article / score / recording / exhibition), `author` (wikilink), `year`.
- **Concept atoms**: just `title` and `tags`.
- **Thread atoms**: `status` (open / closed / dormant).

## When asked to add a new meeting

1. Create the file under `meetings-<group>/YYYY-MM-DD-<slug>.md`.
2. Fill in the frontmatter.
3. As you write, replace bare names with wikilinks. If the atom does not yet exist, create it: a one-paragraph stub is enough.
4. If the meeting raises a recurring question, either link to the existing thread atom or create a new one and add the first row to its trajectory table.

## When asked to summarise a meeting

1. Read the meeting note in full.
2. Write to `summaries/YYYY-MM-DD-<slug>.md`.
3. Every named reference in the summary must be a wikilink to its atom. Create missing atoms.
4. End with an "open questions" section that links to any threads the meeting extended.

## When asked to create or extend an atom

- Keep atoms short. One screen.
- Include only information that is stable across meetings. Anything meeting-specific stays in the meeting note.
- Link the atom back to every meeting where it appears (the "Where it appears" section in the example files shows the pattern).
- Cross-link to related atoms.

## What not to do

- Do not invent biographical details, publication dates, or quotations. If you do not know, leave a `[?]` placeholder and flag it.
- Do not restructure `content/` folders without being asked.
- Do not edit anything under `quartz/`.
- Do not commit `node_modules/`, `public/`, `.obsidian/`, `.netlify/`, or `.quartz-cache/` (they are gitignored — leave them that way).
- Do not change the licence file beyond adding your own copyright line.

## Building and previewing

```bash
npx quartz build --serve     # live preview at http://localhost:8080
./build.sh                   # full build + deploy (see the script for two workflows)
```

The build is fast (seconds for small wikis, under a minute for large ones). Always preview locally before deploying.
