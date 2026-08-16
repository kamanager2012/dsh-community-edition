# dsh-community-edition

> **DEPRECATED / ARCHIVED.** Merged into [`dsh-community`](https://github.com/kamanager2012/dsh-community). Do not download from this repo. Users go to [dsh-community/releases](https://github.com/kamanager2012/dsh-community/releases).

[简体中文](README.md) | **English**

This repository is the frozen historical edition of the DeepSeek Harness community
work. It is kept for migration, contract, and implementation reference. It is not a
second stable product, not the current download channel, and not the official client.

## Current status

This tree is archived. New user downloads, releases, and product work belong only to
[`dsh-community`](https://github.com/kamanager2012/dsh-community). Do not clone this
repository as a daily client and do not install from this repository's Releases.

The execution core is the official [DeepSeek Harness Runtime](https://github.com/deepseek-ai/deepseek-harness).
This tree must not reimplement the official Agent loop, Session persistence, tool
execution, or core packages.

## Position in the six-repository ecosystem

| Repository | Role | Entry |
|---|---|---|
| [`dsh-community`](https://github.com/kamanager2012/dsh-community) | Canonical Product and only normal download entry | [Latest release](https://github.com/kamanager2012/dsh-community/releases/latest) |
| [`deepseek-harness-suite`](https://github.com/kamanager2012/deepseek-harness-suite) | Community Labs for experiments | [Labs](https://github.com/kamanager2012/deepseek-harness-suite) |
| [`deepseek-harness-handbook`](https://github.com/kamanager2012/deepseek-harness-handbook) | Knowledge, evidence, and operations | [Online handbook](https://kamanager2012.github.io/deepseek-harness-handbook/) |
| [`dsh-community-plugins`](https://github.com/kamanager2012/dsh-community-plugins) | Plugin compatibility registry | [Registry](https://github.com/kamanager2012/dsh-community-plugins) |
| [`dsh-marketplace`](https://github.com/kamanager2012/dsh-marketplace) | Discovery and install UX | [Marketplace](https://github.com/kamanager2012/dsh-marketplace) |
| `dsh-community-edition` | Merge & Archive | This repository |

## Historical source usage

The existing source can be inspected with Node.js 22+ and pnpm. Treat its commands,
assets, and compatibility claims as historical; confirm the current behavior in the
canonical repository and the Handbook before distributing anything.

```sh
git clone https://github.com/kamanager2012/dsh-community-edition.git
cd dsh-community-edition
pnpm install
pnpm typecheck
pnpm test
```

The historical architecture documents remain useful for understanding the process
boundary, TUI adapter, version manager, and contract snapshots:

- [Architecture](ARCHITECTURE.md)
- [Release guide](docs/release.md)
- [Upgrade notes](docs/upgrade.md)
- [Contract snapshots](contracts/README.md)
- [TUI adapter](docs/tui-adapter.md)
- [Version manager](docs/version-manager.md)

Do not publish this repository as `@deepseek-ai/dsh`, `dsh-tui`, or a replacement for
the canonical product. For current ecosystem boundaries, read the
[DeepSeek Harness Handbook](https://kamanager2012.github.io/deepseek-harness-handbook/)
and the [Community Labs handoff](https://github.com/kamanager2012/deepseek-harness-suite/blob/main/docs/ECOSYSTEM_HANDOFF.en.md).

## License

MIT. Runtime and third-party notices remain subject to the official package metadata.
