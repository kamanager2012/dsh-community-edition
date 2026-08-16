# 0.1.2-preview

Community distribution around official `@deepseek-ai/dsh@0.1.0-rc.6`.

**Published only from** https://github.com/kamanager2012/dsh-community-edition

This is a stable launcher, not a second harness. Plugin features stay plugins (`dsh plugin add`).

## Linux desktop

1. Download `dsh-community-0.1.2.AppImage`
2. `chmod +x dsh-community-0.1.2.AppImage`
3. Set `DEEPSEEK_API_KEY`, then `./dsh-community-0.1.2.AppImage`

## From source

```sh
git clone https://github.com/kamanager2012/dsh-community-edition.git
cd dsh-community-edition
pnpm install
export DEEPSEEK_API_KEY=...
pnpm start      # continues newest official ~/.dsh session
pnpm new        # fresh chat
pnpm desktop
pnpm doctor
```
