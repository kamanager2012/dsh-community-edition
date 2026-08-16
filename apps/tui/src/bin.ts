#!/usr/bin/env node
/**
 * Our third-party TUI. Official dsh is the development foundation and runtime.
 */

import { spawnSync } from 'node:child_process'
import { readSync } from 'node:fs'
import { homedir } from 'node:os'
import {
  listOfficialSessions,
  officialSessionRoot,
  resolveOfficialDsh,
  resolveOfficialDshHome,
  type OfficialSessionRef,
} from '@dsh-community/dsh-bridge'
import { composeCommunityTuiPatch } from './compose-patch.js'
import { installProfileDeps, profileNeedsInstall } from './install.js'
import {
  COMMUNITY_TUI_HELP,
  officialAppArgs,
  officialTuiArgv,
  parseCommunityLaunch,
  resumeEnv,
} from './launch.js'
import { ensureCommunityTuiProfile } from './profile.js'
import {
  formatHumanSessions,
  formatPorcelainSessions,
  parsePickChoice,
  resolveResumeTarget,
} from './sessions-text.js'

function fail(message: string, code = 2): never {
  process.stderr.write(`${message}\n`)
  process.exit(code)
}

function readPrompt(question: string): string {
  process.stdout.write(question)
  const chunks: Buffer[] = []
  const byte = Buffer.alloc(1)
  while (readSync(0, byte, 0, 1, null) > 0) {
    if (byte[0] === 10) break
    if (byte[0] !== 13) chunks.push(Buffer.from(byte))
  }
  return Buffer.concat(chunks).toString('utf8').trim()
}

function pickResumeId(sessions: readonly OfficialSessionRef[], root: string): string {
  process.stdout.write(formatHumanSessions(sessions, root))
  if (sessions.length === 0) process.exit(0)
  if (!process.stdin.isTTY) {
    fail('没有交互终端。接着最近一条：dsh-community-tui --resume last')
  }
  const choice = readPrompt('输入序号、last 或 session id：')
  const picked = parsePickChoice(choice, sessions)
  if (!picked.ok) fail(picked.reason)
  return picked.id
}

const dshHome = resolveOfficialDshHome(process.env, homedir())
const launch = parseCommunityLaunch(process.argv.slice(2))

if (launch.kind === 'help') {
  process.stdout.write(COMMUNITY_TUI_HELP)
  process.exit(0)
}

const sessionRoot = officialSessionRoot(dshHome)
const sessions = listOfficialSessions(sessionRoot)

if (launch.kind === 'list') {
  if (launch.porcelain) {
    if (sessions.length === 0) process.stdout.write(`no official sessions under ${sessionRoot}\n`)
    else process.stdout.write(`${formatPorcelainSessions(sessions)}\n`)
  } else {
    process.stdout.write(formatHumanSessions(sessions, sessionRoot))
  }
  process.exit(0)
}

let resumeId: string | undefined
if (launch.kind === 'pick') {
  resumeId = pickResumeId(sessions, sessionRoot)
} else if (launch.kind === 'resume') {
  const resolved = resolveResumeTarget(launch.id, sessions)
  if (!resolved.ok) fail(resolved.reason)
  resumeId = resolved.id
}

if (!process.stdout.isTTY) {
  fail(
    [
      'dsh-community-tui 需要交互终端。',
      '先看对话：dsh-community-tui --list-sessions',
      '或在真正的终端窗口里运行 dsh-community-tui / --resume last',
    ].join('\n'),
  )
}

const { dir, patchPath } = ensureCommunityTuiProfile({
  dshHome,
  communityPatch: composeCommunityTuiPatch(),
})

if (profileNeedsInstall(dir)) {
  process.stderr.write('dsh-community-tui: 第一次启动，正在安装终端插件（只要一次）…\n')
  const pnpm = installProfileDeps(dir)
  if (!pnpm.ok) {
    fail('dsh-community-tui: 官方 profile 目录里 pnpm install 失败', pnpm.status ?? 1)
  }
}

const extra = resumeId === undefined
  ? officialAppArgs({ kind: 'run', rest: launch.kind === 'run' ? launch.rest : [] })
  : officialAppArgs({ kind: 'resume', id: resumeId, rest: launch.kind === 'resume' ? launch.rest : [] })
const env = resumeId === undefined ? process.env : resumeEnv(process.env, resumeId)

const install = resolveOfficialDsh({ from: import.meta.url })
const result = spawnSync(
  process.execPath,
  [install.binPath, ...officialTuiArgv(patchPath, extra)],
  { stdio: 'inherit', cwd: dir, env },
)
process.exit(result.status ?? 1)
