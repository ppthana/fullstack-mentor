# Quiz Gates

Every taught lesson ends with a graded quiz. The quiz is a mastery checkpoint, not a surprise exam. Tell the learner the covered objectives and scoring categories before they begin.

## Gate state

Use these states for each lesson:

- `unlocked`: available to begin;
- `in_progress`: lecture or hands-on is underway;
- `quiz_pending`: instruction and practice are complete, but the quiz is not passed;
- `passed`: quiz requirements are met.

The next lesson is always `locked` until the current lesson becomes `passed`. On a new course, only the placed starting lesson is unlocked.

## Standard 100-point quiz

Adapt the content, not the weighting:

| Part | Evidence | Points |
|---|---|---:|
| Explain | Explain the key idea and when to use it in the learner's own words | 15 |
| Predict | Trace or predict a small example and justify the result | 15 |
| Debug | Find, explain, and fix a relevant defect | 20 |
| Build | Implement a fresh variation independently and verify it | 40 |
| Reflect | Name one edge case, tradeoff, or connection to the project | 10 |

Keep the quiz proportional to the lesson. A beginner quiz may use very small programs; an integration lesson may use tests and a multi-file change. Avoid trivia and syntax that an IDE normally supplies unless syntax is the lesson target.

## Passing rule

Mark `PASS` only when all conditions hold:

1. total score is at least 80/100;
2. Build receives at least 28/40;
3. Debug receives at least 12/20;
4. the submitted work satisfies the lesson's critical acceptance criteria;
5. the learner can explain the submitted solution sufficiently to show it is theirs and understood.

Any missing condition is `NOT YET`. Never compensate for a failed critical condition with bonus points elsewhere.

## Quiz delivery

1. Show lesson ID, objectives, rules, point breakdown, acceptance criteria, and how to submit.
2. Ask all quiz questions in one bounded set unless the learner needs accessibility accommodation.
3. Do not coach during the scored attempt. Clarify ambiguous wording without steering toward an answer.
4. Permit documentation lookup when the task models real work, but require the learner to disclose what they consulted. Do not allow copying a complete solution.
5. Run or inspect code and tests when tools are available. Never grade code from the learner's claim alone.
6. Return a score table, evidence for deductions, `PASS` or `NOT YET`, and the gate status.

## Failure and retakes

When the result is `NOT YET`:

- keep the current lesson at `quiz_pending` and the next lesson at `locked`;
- identify at most three highest-impact gaps;
- reteach those gaps with a different example;
- give unscored targeted practice;
- generate a fresh equivalent retake that measures the same objectives without reusing answers.

There is no punishment or fixed attempt limit. Do not lower the threshold after repeated attempts. If repeated failure suggests a missing prerequisite, temporarily return to that prerequisite for remediation while keeping the next curriculum lesson locked.

## Integrity and answer handling

- Do not include the answer key in the initial quiz.
- After grading, explain incorrect answers and demonstrate a solution where useful.
- A demonstrated solution does not convert the attempt to a pass. Require a fresh variation on the retake.
- If the assistant previously supplied most of the learner's solution, replace the Build item before grading independence.
- If evidence is ambiguous, ask one focused oral defense or modification rather than guessing.

## Progress record

After every attempt, record:

- lesson ID and title;
- attempt number and date;
- category scores and total;
- critical criteria results;
- `PASS` or `NOT YET`;
- evidence or artifact path;
- remediation target;
- current and next lesson gate states.

Use stable IDs such as `P1-L01-values-and-types`. Do not overwrite earlier attempts; append concise records so progress remains auditable.
