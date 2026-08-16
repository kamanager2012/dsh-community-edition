# Agent notes for dsh-community

This is a community launcher/adapter workspace for official DeepSeek Harness.

- Runtime: published `@deepseek-ai/dsh` only. Pin is `packages/dsh-bridge/src/pin.ts`.
- Official apps today are cli+web. That is an architecture signal, not “official will never ship a TUI”.
- stdout/stderr are diagnostics. IPC is lifecycle only (pid/port/start/crash). No Desktop Runtime Protocol.
- Default: do not rewrite DSH_HOME. Sessions stay in official ~/.dsh so TUI/Web/Desktop share one log.
- Snapshot official surface under contracts/upstream. Do not maintain event-types.ts.
- Foundation is the **currently published** official package, pinned in `packages/dsh-bridge/src/pin.ts` (`@deepseek-ai/dsh@0.1.0-rc.6`). Do not wait for a future official UI. Third-party Desktop/TUI repos are references, not remotes we patch.
- Stable client first. If a DSH plugin can do it, do not put it in this tree. Catalog is read-only; install is official `dsh plugin add`.
- Our TUI product is apps/tui (`dsh-community`). Mount reference Ink as a plugin; do not add it as a dsh.bundle and do not fork its screens.
- Desktop KPI is Official Source Ownership = 0.
- Recommend latest tested from contracts/compatibility, not npm latest.
- Window state, catalog, and host.log live in Electron userData. Never write those under ~/.dsh.
- Publish only to https://github.com/kamanager2012/dsh-community-edition. Do not merge this tree into another community DSH suite.

Read `ARCHITECTURE.md` and `docs/upgrade.md` before changing layout.
