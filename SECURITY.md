# Security Policy

## Scope

This repository is a configured fork of [Quartz v4](https://quartz.jzhao.xyz). It builds a **static website** from Markdown files — there is no server, database, or user accounts at runtime. The realistic security surface is therefore limited to:

- **Build-time dependencies** — the npm packages used to build the site (`package.json` / `package-lock.json`).
- **The build tooling and configuration** shipped in this template.

Issues in **Quartz itself** are best reported upstream to the [Quartz project](https://github.com/jackyzha0/quartz). Please report problems specific to *this template's* configuration, scaffold, or dependencies here.

## Reporting a vulnerability

Please report security issues **privately** rather than opening a public issue:

- Use GitHub's **private vulnerability reporting** — the **"Report a vulnerability"** button under this repository's **Security** tab. See [GitHub's guide](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) if you haven't used it before.

Please include what you found, how to reproduce it, and the impact you have in mind. You will get an acknowledgement as soon as is reasonable, and credit in any fix unless you would prefer otherwise.

## A note for forkers

Once you fork and add your own meetings and notes, treat your `content/` folder as you would any group material: review what you commit before publishing the site, and keep anything sensitive out of the repository.
