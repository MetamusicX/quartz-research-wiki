---
title: Welcome
---

This is a research wiki built from [Quartz v4](https://quartz.jzhao.xyz) by [Jacky Zhao](https://jzhao.xyz), configured as a starter for research groups who want to publish their meetings, summaries, and cross-referenced notes as a searchable, linked website.

## What's inside

- **Meetings** — one folder per group or seminar (`meetings-group-a/`, `meetings-group-b/`). Rename or delete as needed.
- **Summaries** — condensed digests of each meeting, written by a human, an AI assistant, or both.
- **Atoms** — small, single-subject notes that travel across meetings: [[atoms/people/example-person|people]], [[atoms/works/example-work|works]], [[atoms/concepts/example-concept|concepts]], and [[atoms/threads/example-thread|threads]].

Each file is plain Markdown with YAML frontmatter and Obsidian-style `[[wikilinks]]`. Open the repository in any text editor or in [Obsidian](https://obsidian.md) and start writing.

## Getting started

1. Clone this template (use the "Use this template" button on the GitHub page).
2. Replace the example files in `content/` with your own.
3. Rename `meetings-group-a` / `meetings-group-b` to match your actual groups, or remove them.
4. Edit `quartz.config.ts` to set your wiki's title, base URL, and theme.
5. Run `npm install` then `./build.sh` to build and deploy.

See [[atoms/concepts/example-concept|how atoms work]] to understand the cross-linking pattern, or read the included `AGENTS.md` for guidance you can hand to AI assistants editing this wiki.
