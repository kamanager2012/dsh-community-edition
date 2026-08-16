import { COMMUNITY_TUI_PROFILE } from './profile.js'

/**
 * Official launcher argv. `dsh` owns --profile/--patch; everything after
 * reaches the booted app. Official help: `dsh --profile tui --resume <session>`.
 */
export function officialTuiArgv(patchPath: string, extra: readonly string[] = []): string[] {
  return ['--profile', COMMUNITY_TUI_PROFILE, '--patch', patchPath, ...extra]
}

export type CommunityLaunch =
  | { readonly kind: 'help' }
  | { readonly kind: 'doctor' }
  | { readonly kind: 'list'; readonly porcelain: boolean }
  | { readonly kind: 'pick' }
  | { readonly kind: 'resume'; readonly id: string; readonly rest: readonly string[] }
  | { readonly kind: 'run'; readonly rest: readonly string[] }

export const COMMUNITY_TUI_HELP = `dsh-community-tui — 社区终端，跑在官方 @deepseek-ai/dsh 上

先这样用：
  dsh-community-tui                 开新对话（要 TTY + DEEPSEEK_API_KEY）
  dsh-community-tui --list-sessions 看官方 ~/.dsh 里的对话
  dsh-community-tui --resume last   接着最近一条
  dsh-community-tui --resume        列出并挑选
  dsh-community-tui --doctor        检查官方包 / TTY / 密钥（不打印密钥）

  -l, --list-sessions [--porcelain]  只读列表（默认给人看）
  --resume last|<id>                 交给官方 dsh --resume <id>
  --resume                           交互挑选（无 TTY 时打印列表）
  --doctor                           自检，不启动 Ink
  -h, --help                         本说明

其它参数原样传给官方 dsh。Session 在官方 ~/.dsh，和 Desktop / Web 是同一份。
这个命令不叫 dsh-tui，也不发到 npm。
`

export function parseCommunityLaunch(argv: readonly string[]): CommunityLaunch {
  const args = argv[0] === '--' ? argv.slice(1) : [...argv]
  if (args[0] === '--help' || args[0] === '-h') return { kind: 'help' }
  if (args[0] === '--doctor') return { kind: 'doctor' }
  if (args[0] === '--list-sessions' || args[0] === '-l') {
    return { kind: 'list', porcelain: args.includes('--porcelain') }
  }
  if (args[0] === '--resume') {
    const id = args[1]
    if (id === undefined || id.length === 0 || id.startsWith('-')) return { kind: 'pick' }
    return { kind: 'resume', id, rest: args.slice(2) }
  }
  return { kind: 'run', rest: args }
}

/** Official app args after launcher flags. */
export function officialAppArgs(launch: Extract<CommunityLaunch, { kind: 'resume' } | { kind: 'run' }>): string[] {
  if (launch.kind === 'resume') return ['--resume', launch.id, ...launch.rest]
  return [...launch.rest]
}

/**
 * The mounted TUI plugin feeds official `ctx.agents.resume` from config.sessionId.
 * That config reads these env names. This is not a second session store.
 */
export function resumeEnv(env: NodeJS.ProcessEnv, id: string): NodeJS.ProcessEnv {
  return {
    ...env,
    DSH_TUI_RESUME_SESSION: id,
    DSH_CC_RESUME_SESSION: id,
  }
}

export function isCommunityListSessions(argv: readonly string[]): boolean {
  return parseCommunityLaunch(argv).kind === 'list'
}
