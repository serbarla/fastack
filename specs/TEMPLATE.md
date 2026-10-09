Read the nearest `AGENTS.md` (target workspace, then parents up to repo root) before executing. If reality diverges from this spec: stop, append the divergence under Testing criteria, NEVER improvise outside the objectives.

## 1. Objectives

*Numbered, ordered. Each: one verb sentence, its requirements, exact commands. Check off when done.*

- [ ] 1. <objective> — requirements: <requirements>; commands: `<command>`
- [ ] 2. <objective> — requirements: <requirements>; commands: `<command>`

## 2. No-go

*Implementations explicitly NOT carried out in this spec. The agent MUST NOT do these.*

- <no-go item>

## 3. Testing criteria

*All boxes checked = spec done.*

- [ ] `bun run build && bun run test` passes (repo root)
- [ ] <objective N>: `<command>` → <expected output>
- [ ] every objective in section 1 is checked
