# Full-stack Mentor

`fullstack-mentor` is a portable, Thai-first Agent Skill that teaches programming from the foundations to job-ready full-stack development with React, TypeScript, Go, PostgreSQL, testing, deployment, and production practices. It is not tied to one model or vendor.

Every lesson combines a short lecture, worked example, guided hands-on work, an independent challenge, and a mandatory quiz. The next lesson stays locked until the learner scores at least 80/100 and passes the practical Build and Debug requirements.

## Install globally with npx

Install the skill for compatible AI coding agents on your machine:

```bash
npx --yes github:ppthana/fullstack-mentor install
```

The default command installs the same portable skill bundle into:

- `~/.agents/skills/fullstack-mentor` for Cursor, Gemini CLI, and agents that support the shared Agent Skills directory;
- `~/.claude/skills/fullstack-mentor` for Claude Code;
- `~/.codex/skills/fullstack-mentor` for Codex.

Install for only one known agent:

```bash
npx --yes github:ppthana/fullstack-mentor install --target claude
npx --yes github:ppthana/fullstack-mentor install --target cursor
npx --yes github:ppthana/fullstack-mentor install --target gemini
npx --yes github:ppthana/fullstack-mentor install --target codex
```

For any other AI agent that supports `SKILL.md`, point the installer at the global skills directory documented by that agent:

```bash
npx --yes github:ppthana/fullstack-mentor install --dir /path/to/global/skills
```

Existing directories are never overwritten by default. Use `--force` to back up and replace an existing installation. To remove installations created by this CLI:

```bash
npx --yes github:ppthana/fullstack-mentor uninstall
```

Restart the AI agent or reload its skills after installation. Then ask it to use `fullstack-mentor`, for example:

```text
Use the fullstack-mentor skill to assess my level and begin my first lesson in Thai.
```

An AI product must support the Agent Skills `SKILL.md` format or allow a local instructions directory. A plain hosted chat that cannot load local files cannot discover a globally installed skill; upload the skill bundle as project knowledge in that product instead.

## Install as a Codex plugin

Add this GitHub repository as a marketplace:

```bash
codex plugin marketplace add ppthana/fullstack-mentor
```

Install the plugin:

```bash
codex plugin add fullstack-mentor@ppthana
```

Start a new Codex chat after installation. If the plugin is not visible in the desktop app immediately, restart the app once.

To update later:

```bash
codex plugin marketplace upgrade ppthana
codex plugin remove fullstack-mentor
codex plugin add fullstack-mentor@ppthana
```

## Manual installation

The teaching workflow does not depend on Codex tools. The AI agent must support loading a folder containing `SKILL.md` plus its referenced files.

Clone the repository:

```bash
git clone https://github.com/ppthana/fullstack-mentor.git
```

The portable skill bundle is located at:

```text
fullstack-mentor/plugins/fullstack-mentor/skills/fullstack-mentor/
```

Copy that entire folder—not only `SKILL.md`—into the user/global skills directory documented by your AI tool. Keeping the complete folder is required because the skill loads curriculum, assessment, lesson, and quiz rules from `references/`.

If an AI product does not support Agent Skills, provide the entire bundle as project knowledge or custom instructions and ask it to follow `SKILL.md`. Automatic discovery and `$fullstack-mentor` invocation depend on the host product, so they cannot be guaranteed in a plain chat interface.

## Invoke the skill

Explicit invocation:

```text
ใช้ $fullstack-mentor ประเมินพื้นฐานของฉัน และเริ่มบทแรกเป็นภาษาไทย
```

Other useful prompts:

```text
ใช้ $fullstack-mentor สอนบทถัดไป โดยมี lecture, hands-on และ quiz
```

```text
ใช้ $fullstack-mentor ตรวจโค้ดของฉัน ให้คะแนน quiz และบอกว่า PASS หรือ NOT YET
```

```text
Use $fullstack-mentor to continue my course from fullstack-learning/progress.md.
```

Compatible agents can also select the skill automatically when the request clearly asks for teaching or mentoring on this curriculum.

## Quiz gate

Each quiz totals 100 points:

| Part | Points |
|---|---:|
| Explain the concept | 15 |
| Predict or trace behavior | 15 |
| Debug a defect | 20 |
| Build a fresh variation | 40 |
| Reflect on an edge case or tradeoff | 10 |

Passing requires all of the following:

- total score of 80/100 or higher;
- at least 28/40 for Build;
- at least 12/20 for Debug;
- all critical acceptance criteria pass;
- the learner can explain the submitted work.

If the result is `NOT YET`, the skill keeps the next lesson locked, reteaches the weak areas, and creates a fresh equivalent retake. There is no fixed attempt limit and the passing threshold does not decrease.

## Curriculum

1. Computer, terminal, editor, and Git foundations
2. Programming foundations with JavaScript
3. HTML, CSS, browser JavaScript, HTTP, and APIs
4. Professional JavaScript and TypeScript
5. React
6. Backend concepts and Go
7. PostgreSQL and data modeling
8. React + Go + PostgreSQL integration
9. Security, testing, Docker, CI/CD, deployment, and observability
10. DevOps, Kubernetes, rollout, scaling, and incident diagnosis
11. Portfolio and job-readiness projects

The curriculum advances by demonstrated mastery, not a fixed calendar.

The default stack order is React + TypeScript → Go → PostgreSQL → full-stack integration → production engineering → Kubernetes. The mentor may adjust pacing from demonstrated evidence, but it never skips prerequisites or quiz gates.

After the final readiness review, the mentor summarizes the learner's demonstrated strengths and gaps, then asks whether the learner wants to choose a specialization or have the mentor design the next path. Possible continuations include deeper frontend, backend, data, platform/SRE, security, quality engineering, or team engineering.

## Repository layout

```text
package.json
cli/fullstack-mentor.mjs
.agents/plugins/marketplace.json
plugins/fullstack-mentor/
├── plugin.json
├── .codex-plugin/plugin.json
└── skills/fullstack-mentor/
    ├── SKILL.md
    ├── agents/openai.yaml
    └── references/
```

## License

MIT
