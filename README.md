# Full-stack Mentor

`fullstack-mentor` is a Thai-first Codex skill that teaches programming from the foundations to job-ready full-stack development with React, TypeScript, Go, PostgreSQL, testing, deployment, and production practices.

Every lesson combines a short lecture, worked example, guided hands-on work, an independent challenge, and a mandatory quiz. The next lesson stays locked until the learner scores at least 80/100 and passes the practical Build and Debug requirements.

## Install globally in Codex

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

Codex can also select the skill automatically when the request clearly asks for teaching or mentoring on this curriculum.

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
10. Portfolio and job-readiness projects

The curriculum advances by demonstrated mastery, not a fixed calendar.

## Repository layout

```text
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
