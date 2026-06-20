# Contributing

Thanks for your interest in this template. It is a starter that research groups **fork and adapt**, which shapes what "contributing" means here.

## Two kinds of contribution

**1. Improving the template itself.**
Fixes and improvements to the shared starter: the Quartz configuration (`quartz.config.ts`, `quartz.layout.ts`), the `content/` scaffold and worked examples, the `build.sh` workflows, and the documentation. These belong as pull requests against this repository.

**2. Your own group's content.**
The meetings, summaries, and atoms you write once you have forked. These belong in *your fork*, not here. Please don't open pull requests adding your group's notes to the template — keeping it generic is what makes it useful as a starting point for others.

## Proposing a change to the template

1. **Open an issue first** for anything beyond a typo — a bug, a config improvement, a new example, a docs fix. It is easier to agree on the shape of a change before it is written.
2. **Fork and branch.** Make your change on a branch in your fork.
3. **Keep it focused.** One concern per pull request.
4. **Build before you submit.** Run a local build and confirm the site still compiles and serves:
   ```bash
   npm install
   npx quartz build --serve
   ```
   If you changed the `content/` examples, check that backlinks, the graph view, and `[[wikilinks]]` still resolve.
5. **Match the existing voice.** The documentation is plain and unhurried. Examples are minimal — one per folder, just enough to show the pattern.

## Conventions

These mirror the conventions the template already uses:

- **Markdown:** every page is ordinary Markdown, readable in any editor or in Obsidian.
- **Frontmatter:** keep the YAML frontmatter consistent with the worked examples in each `content/` folder.
- **Wikilinks:** use `[[wikilinks]]` to connect meetings and summaries to atoms (people, works, concepts, threads).
- **Atoms stay small:** one subject per atom page; let the graph view show the connections.
- **House style:** if you edit with the help of an assistant, `AGENTS.md` describes the conventions to follow.

## Questions

If you are unsure whether something belongs in the template or in your own fork, open an issue and ask.
