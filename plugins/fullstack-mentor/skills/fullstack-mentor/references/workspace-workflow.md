# Course Workspace Workflow

Use a learner-visible project workspace so lessons result in code that can be opened, run, debugged, and reviewed in an editor. Apply this workflow for an ongoing course whenever the active workspace is writable. Keep the structure proportional to the lesson and adapt file extensions and commands to the language or tool being taught.

## Course root

Create the course root only after the learner opts into ongoing study:

```text
fullstack-learning/
├── README.md
├── learning-plan.md
├── progress.md
├── session-log.md
└── lessons/
    └── <lesson-id>-<short-slug>/
        ├── theory.md
        ├── demo.<ext>
        ├── hands-on.<ext>
        ├── hands-on.test.<ext>
        ├── challenge.<ext>
        ├── challenge.test.<ext>
        └── quiz/
            ├── attempt-01.<ext>
            ├── attempt-01.test.<ext>
            └── feedback-01.md
```

This is a pattern, not a requirement to create empty lesson placeholders. `README.md` contains the exact commands needed to run the current work. `learning-plan.md` lists the complete curriculum as a checklist, `progress.md` follows the template in [assessment.md](assessment.md), and `session-log.md` records concise evidence and remarks for every learning session.

## Planning and tracking files

Create the three tracking files before beginning the first lesson of an ongoing course:

- `learning-plan.md`: show every stable lesson ID, title, phase, and current gate state. Mark a checkbox `[x]` only after that lesson's quiz is recorded as `PASS`; an unlocked, in-progress, or quiz-pending lesson remains unchecked. Keep the current lesson visibly labeled and record its pass date and score when complete.
- `progress.md`: store the authoritative current position, quiz attempts, mastery evidence, gaps, artifacts, reset history, and next actions. Never erase failed attempts when a learner restarts; if prior progress exists, archive or preserve it and append the reset decision.
- `session-log.md`: append one row per session with a stable session number, date, lesson ID, stage, outcome, evidence path, and a short remark. A session may end without a quiz or lesson pass; record that honestly.

At the end of every session, update `session-log.md` and `progress.md`. Update the checklist only when a gate changes or the current lesson moves. These files must agree; `progress.md` is authoritative if there is a discrepancy.

## Lesson lifecycle

### 1. Theory first

Before assigning editor work, teach the lesson's purpose and mental model in Thai, preserving English technical terms. Create or update `theory.md` with:

- the lesson ID, objective, and prerequisites;
- the mental model and essential syntax;
- one small example and one counterexample;
- the expected run or test commands;
- a short prediction or retrieval prompt.

Do not turn `theory.md` into an exhaustive textbook. Teach it interactively before asking the learner to edit starter code.

### 2. Demonstrate

Put the smallest useful worked example in `demo.<ext>` and run it when tools permit. Explain inputs, outputs, state, constraints, and observed evidence. The demo may be complete because its purpose is explanation; do not reuse its solution unchanged in the independent work or quiz.

### 3. Guided hands-on

Create `hands-on.<ext>` with valid starter code, explicit TODOs, acceptance criteria, and no completed solution. Add executable tests when the lesson can be tested meaningfully. Ask the learner to edit the file in their code editor and report when ready. Inspect the saved file and run its verification command; do not grade from a pasted claim alone when the workspace is accessible.

Once the learner begins, treat answer files as learner-owned. Do not silently patch their solution. Offer the hint ladder from [lesson-protocol.md](lesson-protocol.md), point to evidence, and let the learner make revisions. Edit an answer file only when the learner explicitly asks for direct intervention, then require a fresh variation to demonstrate independence.

### 4. Independent challenge

Create the challenge only after guided work is understood. It must differ enough from the demo and guided task to prevent mechanical copying, include at least one edge case, and have an observable verification method. Review both the result and the learner's explanation.

### 5. Open the quiz

Do not create or reveal quiz files until the hands-on work and independent challenge have been reviewed and the learner is ready for `quiz_pending`. Then create a bounded attempt under `quiz/` following [quiz-gates.md](quiz-gates.md). Include the prompt, starter code, acceptance criteria, permitted references, and exact submission or verification command. Never include an answer key or a nearly complete solution.

Use zero-padded immutable attempts such as `attempt-01`, `attempt-02`, and matching feedback files. Do not overwrite or repurpose a failed attempt. A retake must be a fresh equivalent variation.

### 6. Review and record

Inspect the saved attempt, run appropriate checks, ask a focused oral defense only when authorship or understanding is ambiguous, and write the score plus evidence to `feedback-NN.md`. Append the attempt to `progress.md` and update the current and next lesson gate states.

When a quiz passes, mark that lesson `[x]` in `learning-plan.md`, record the date and score, unlock the next lesson, and append the session result to `session-log.md`. When it does not pass, leave the checklist unchecked and record the remediation target.

Automated tests support the Build and Debug evidence but do not replace assessment of explanation, reasoning, maintainability, accessibility, security, or tradeoffs when those matter.

## Safety and repository hygiene

- Keep all course artifacts inside `fullstack-learning/` unless the learner deliberately chooses another location.
- Inspect existing files before creating the course root and preserve unrelated work.
- Never place secrets in exercises, fixtures, command output, or version control. Use placeholders and `.env.example` where configuration is taught.
- Do not require installing a dependency when the existing language runtime can teach the objective adequately.
- Prefer commands the learner can rerun locally. Record non-obvious setup in the course README.
- If the workspace is read-only or unavailable, mirror the same lifecycle in conversation, clearly state that files and cross-chat progress cannot be persisted, and do not claim to have run or inspected code.
