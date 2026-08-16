# dsh-community-edition

> **DEPRECATED / ARCHIVED.** 本仓已合流进 [`dsh-community`](https://github.com/kamanager2012/dsh-community)，不再发行、不再扩功能。用户下载只走 [dsh-community/releases](https://github.com/kamanager2012/dsh-community/releases)。

这是历史冻结树（Merge & Archive），不是正式产品，不是第二套客户端。有用的启动器 UX 已经晋升到旗舰仓。不要再 clone 本仓当日常入口，也不要从本仓 Releases 装东西。

[English](README.en.md) · [Canonical Product](https://github.com/kamanager2012/dsh-community) · [Stable](https://github.com/kamanager2012/dsh-community/releases/latest) · [All releases](https://github.com/kamanager2012/dsh-community/releases)

开发基础当时是已发布的官方包 `@deepseek-ai/dsh@0.1.0-rc.6`。这个事实只对读历史代码有用。日常开发去旗舰仓。

[Architecture](ARCHITECTURE.md) · [重构说明](docs/reconstruction.md) · [Upgrade](docs/upgrade.md)

## 六仓生态中的位置

本仓是 **Merge & Archive（合流归档）**。它保留历史发行线和可复用实现，
但不再发展成第二个稳定产品。新的用户下载、Release 和正式版本统一进入
[`dsh-community`](https://github.com/kamanager2012/dsh-community/releases/latest)。

| 仓库 | 定位 | 入口 |
|---|---|---|
| [`dsh-community`](https://github.com/kamanager2012/dsh-community) | Canonical Product，唯一正式产品 | [最新 Release](https://github.com/kamanager2012/dsh-community/releases/latest) |
| [`deepseek-harness-suite`](https://github.com/kamanager2012/deepseek-harness-suite) | Community Labs，实验源 | [Labs](https://github.com/kamanager2012/deepseek-harness-suite) |
| [`deepseek-harness-handbook`](https://github.com/kamanager2012/deepseek-harness-handbook) | Knowledge / Evidence | [在线手册](https://kamanager2012.github.io/deepseek-harness-handbook/) |
| [`dsh-community-plugins`](https://github.com/kamanager2012/dsh-community-plugins) | 插件兼容性注册表 | [Registry](https://github.com/kamanager2012/dsh-community-plugins) |
| [`dsh-marketplace`](https://github.com/kamanager2012/dsh-marketplace) | 发现和安装体验 | [Marketplace](https://github.com/kamanager2012/dsh-marketplace) |
| `dsh-community-edition` | Merge & Archive | 本仓库 |

官方 [DeepSeek Harness Runtime](https://github.com/deepseek-ai/deepseek-harness) 才是执行核心。
归档仓不应重新实现 Agent loop、Session persistence、Tool execution 或官方 core packages。

## 不要从这里开始用

日常入口是旗舰仓：

```sh
git clone https://github.com/kamanager2012/dsh-community.git
cd dsh-community
pnpm install
export DEEPSEEK_API_KEY=...
pnpm start
```

下载安装包也只走 [dsh-community/releases](https://github.com/kamanager2012/dsh-community/releases)。本仓的 clone / `pnpm start` / 本仓 Releases 都不是用户路径。

装完后同一入口也叫 `dsh-community`（`dsh-community-tui` 仍可用）。本仓历史 AppImage 不再是下载入口。

## 硬边界

| 做 | 不做 |
|---|---|
| 依赖已发布的 `@deepseek-ai/dsh` | 不 vendor 官方 `packages/*`（Official Source Ownership = 0） |
| Desktop 子进程启动 `dsh web`，只管理生命周期 | 不把 stdout 解析成业务协议 |
| 默认共用官方 `~/.dsh` session 真源 | 不把 DSH 数据迁进 Desktop AppData |
| 我们的 TUI 自己组合、自己列官方 session | 不把参考 TUI 当上游，不维护第二套 session log |
| 只读插件目录，安装走官方 `dsh plugin add` | 不把 Ink 手感、免审批、上下文压缩、语音等做成壳内功能 |
| `contracts/` 快照官方表面 | 不维护一套社区 `event-types.ts` |

## 成功标准

1. 官方源代码 vendor = 0
2. TUI 对官方 Cordis row 的覆盖数量显著下降（33 → 15 → 8 → 只剩 TUI 自己的 insert）
3. TUI/Desktop 不实现 Agent loop、Session persistence、Tool execution；插件能解决的不进壳
4. 一次 upstream rc bump，业务 UI 原则上零修改
5. TUI / Desktop / 官方 Web 能共享同一 Session 真源
6. 新版本兼容问题首先在 contract CI 爆

当前：1 / 3 / 5 按设计成立；2 我们的 TUI 自有面 8 行（参考物 33）。第 4 条是官方发新包时的回归，不挡我们继续做发行面。

## 仓库布局

```
contracts/              官方表面快照 + compatibility matrix
packages/dsh-bridge     解析官方 bin、生命周期、数据目录
packages/tui-adapter    我们的 TUI 薄 patch + KPI
packages/shared-types   社区自己的类型，不是官方 event fork
apps/desktop            官方 `dsh web` 壳 + 官方 session 列表
apps/tui                官方 `dsh --profile` / `--resume` 启动器
tests/upstream-contract vendor=0、pin、CLI
```

## License

MIT。运行时版权与第三方声明见 [NOTICE](NOTICE) 和官方包。
