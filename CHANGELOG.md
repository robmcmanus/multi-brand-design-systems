# Changelog

All notable changes to the design system are recorded here. Versions follow [semantic versioning](https://semver.org): major for breaking changes (including renaming or removing a token), minor for additions, patch for fixes.

## 1.0.0 — 2026-10-24

First tagged release.

### Brands and themes
- Brand 1 (Portfolio): light, indigo, Inter.
- Brand 2 (Movie finder): light, yellow, red and blue, DM Sans, Barlow Condensed and DM Mono.
- Brand 3 (Internal tools): dark by default, with a light mode (`data-theme="light"`), cyan and purple, Space Grotesk.
- Brand switching through `data-brand` on `<html>`.

### Tokens
- Three tiers: primitives, semantic and component, authored in the W3C Design Tokens format and built with Style Dictionary.
- Role-based radius tokens (`border-radius.control` and `border-radius.container`) alongside the base radius scale.
- Component tokens for button, input, select, tabs, link, badge and tag, nav, accordion, list, card, radio, typography, case study metadata, figure, table of contents, callout and pull quote, code block and pagination.
- Figma variable collections mirror the repo by name: `Brand N / Primitives`, `Brand N / Semantic` and `Brand 3 Light / Semantic`.

### Components (code)
- Button, Input, Select, Tabs, Link, Tag, Accordion and Site Header, each with Storybook stories and keyboard and focus support.

### Components (Figma only, not yet in code)
- Lists (resume, links, case studies), Prose, Case study metadata, Figure, Table of contents, Callout, Pull quote, Code block and Pagination.

### Tooling
- GitHub Actions: `build-tokens`, `typecheck` and `storybook-build` are required checks on `main`.
- Storybook deployed to GitHub Pages on every push to `main`.

### Known gaps
- Brand 3 light values have not been through a full contrast audit.
- Code Connect mappings and the Figma to code parity check are not set up yet.
- The design system is not published as a package. Apps in this repository use it through the workspace.
