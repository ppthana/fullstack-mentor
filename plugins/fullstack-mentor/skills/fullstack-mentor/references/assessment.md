# Assessment and Progress

Assess through evidence gathered during real work. A quiz can reveal vocabulary gaps, but it cannot replace implementation and debugging.

## Concept mastery rubric

Score each target from 0–3:

| Score | Evidence |
|---|---|
| 0 — Not yet | Cannot recognize or use the concept even with a direct prompt. |
| 1 — Guided | Can follow or complete it with substantial hints but cannot yet explain the model. |
| 2 — Independent | Can explain and implement a standard case independently, with minor mistakes. |
| 3 — Transfer | Can adapt it to a new case, diagnose mistakes, discuss tradeoffs, and connect it to the system. |

A lesson prerequisite is normally ready at score 2, but advancement still requires the mandatory quiz in `quiz-gates.md`. Critical concepts should reach score 3 through later spiral review.

## Evidence hierarchy

Prefer stronger evidence:

1. Creates a working variation and verifies it.
2. Debugs a relevant failure using evidence.
3. Explains the implementation and tradeoffs in their own words.
4. Correctly traces or predicts behavior.
5. Recognizes the right answer in a quiz.

Record what happened, not personality labels such as “เก่ง” or “ไม่ถนัด.”

## Code review rubric

Evaluate only dimensions relevant to the current stage:

- **Correctness:** acceptance criteria, edge cases, and error paths work.
- **Understanding:** learner can explain the flow and important decisions.
- **Design:** responsibilities and boundaries are proportionate to the problem.
- **Readability:** names and structure make intent visible.
- **Verification:** tests or manual checks prove important behavior.
- **Debugging:** changes follow observations instead of guessing.
- **Frontend quality:** semantics, keyboard access, responsive behavior, and request states.
- **Backend quality:** validation, error contracts, cancellation, concurrency safety, and logs.
- **Data quality:** constraints, transactions, migrations, and query behavior.
- **Security:** authentication, authorization, secrets, injection risks, and safe defaults.

Separate blocking issues from improvement ideas. Give the learner a chance to revise before presenting a polished alternative.

## Project readiness rubric

A portfolio project is credible when the learner can demonstrate:

- a real problem and bounded users;
- independently implemented core flows;
- coherent architecture and explicit tradeoffs;
- robust loading, empty, error, and permission states;
- representative automated tests;
- safe data and authentication boundaries;
- reproducible setup, CI, and deployment;
- ability to debug and extend it live;
- an honest retrospective covering limitations and next steps.

Avoid scoring by feature count or visual polish alone.

## Progress file template

Create this only when the learner opts into ongoing tracking:

```markdown
# Full-stack Learning Progress

## Learner goal and constraints
- Goal:
- Available time:
- Preferred pace:
- Environment:
- Course started:
- Last reset:

## Current position
- Phase:
- Current lesson ID:
- Current lesson status: unlocked
- Next lesson status: locked
- Current project:
- Next lesson:

## Quiz attempts
| Date | Lesson ID | Attempt | Explain /15 | Predict /15 | Debug /20 | Build /40 | Reflect /10 | Total | Result | Evidence |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|---|

## Mastery evidence
| Date | Concept | Score 0–3 | Evidence | Revisit |
|---|---|---:|---|---|

## Completed artifacts
-

## Active misconceptions or gaps
-

## Reset history
| Date | Previous position | New starting lesson | Reason |
|---|---|---|---|

## Next actions
1.
```

Keep entries concise. Append quiz attempts and update gate state; do not turn the file into a transcript or erase failed attempts. Keep the full curriculum checklist in `learning-plan.md` and per-session remarks in `session-log.md`; update both according to [workspace-workflow.md](workspace-workflow.md).

## Initial diagnostic

For a true beginner, verify setup and begin Phase 0 immediately.

For an experienced learner, use a compact practical diagnostic spanning only claimed skills, for example:

- trace a short function and change one requirement;
- inspect a small HTML/CSS/JavaScript page and identify a bug;
- explain an HTTP request and response;
- implement or review a small typed function;
- for claimed React or Go experience, diagnose one realistic component or handler issue.

Stop once the earliest weak prerequisite is clear. Explain placement as a starting point that can move quickly with evidence, not as a judgment.

## Spaced review

Schedule retrieval approximately after the next lesson, several lessons later, and inside a project. Adapt timing to the learner; the invariant is repeated recall over time, not exact intervals.

If a concept repeatedly fails in authentic work, lower its working score and reteach it. If it transfers reliably, raise the score and compress future review.
