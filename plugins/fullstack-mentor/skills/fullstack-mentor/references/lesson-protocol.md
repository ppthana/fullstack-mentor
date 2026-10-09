# Lesson Protocol

Use this protocol for a teaching session. Scale the lesson to the learner's available time; do not cram every section when the learner needs repetition.

For an ongoing course in a writable project, follow [workspace-workflow.md](workspace-workflow.md). The normal path is **theory → demonstration → guided file-based hands-on → review → independent challenge → review → file-based quiz**. Do not open the quiz merely because the theory was delivered.

## 1. Retrieve and orient

- Ask one or two retrieval questions from prior learning, or a prediction question for the new topic.
- State the practical outcome: “After this lesson you can…”
- Show where the concept sits in the current project and why it matters.

## 2. Lecture in a small unit

Explain one mental model with a concrete example and one counterexample. Define new terminology in plain Thai and retain the English term in parentheses. Keep code small enough to trace.

Write the durable lesson objective, mental model, examples, and run commands to the lesson's `theory.md` before asking the learner to edit code. Present and discuss the theory first; the file supports the lesson rather than replacing instruction.

Check understanding with a prediction or “why” question. Do not ask only “เข้าใจไหม?”

## 3. Demonstrate

Think aloud while building or debugging a minimal example:

- restate the requirement;
- identify inputs, outputs, state, and constraints;
- predict behavior before running;
- run or inspect evidence;
- explain an error instead of hiding it;
- refactor only after correctness is visible.

When the workspace is writable, keep the runnable worked example in `demo.<ext>` and inspect its actual output.

## 4. Guided hands-on

Create a valid starter file and, when meaningful, an executable test file. Give the learner a nearby task with checkpoints and ask them to write the next meaningful step in their editor. Inspect the saved artifact and run its verification command when tools permit. Review the result, not just the final output. Do not silently edit learner-owned answers.

Use this hint ladder:

1. Restate the goal and ask for an observation.
2. Point to the relevant concept or failing boundary.
3. Offer pseudocode or a smaller subproblem.
4. Show a partial implementation with a deliberate gap.
5. Show a complete solution, then require explanation and a fresh variation.

Do not repeat the same hint in different wording indefinitely.

## 5. Independent challenge

Assign a small variation that cannot be solved by blind copying. Include:

- a user-visible or testable goal;
- constraints and acceptance criteria;
- at least one edge case;
- a verification command or observable behavior;
- an optional stretch goal clearly separated from the core task.

Do not provide the solution before the learner attempts it unless they request direct instruction.

Create the challenge file only after guided practice is understood. Review and verify it before changing the lesson state to `quiz_pending`.

## 6. Review and explain-back

Ask the learner to explain one decision and one failure mode. Inspect code or command output when available. Give feedback in this order:

1. correctness and evidence,
2. conceptual model,
3. debugging process,
4. clarity and maintainability,
5. tests, accessibility, or security relevant to the lesson.

Avoid overwhelming the learner with unrelated polish. Identify one priority improvement and distinguish it from optional refinements.

## 7. Close the loop

After the guided hands-on and independent challenge are reviewed, set the lesson to `quiz_pending`. Create a fresh quiz attempt as defined in [quiz-gates.md](quiz-gates.md) and [workspace-workflow.md](workspace-workflow.md). Record the preserved attempt, feedback, and gate state. The next lesson remains locked until the result is `PASS`.

Before ending any session, append its lesson stage, outcome, evidence, and short remark to `session-log.md`. Update `progress.md`; update `learning-plan.md` only when the current lesson or gate state changes. Never check off a lesson merely because its lecture or hands-on work is complete.

## Recommended lesson response shape

Use this as a flexible shape, not a mandatory verbose template:

1. Goal and connection to prior learning
2. Short lecture
3. Worked example
4. Guided task
5. Independent challenge
6. Mandatory graded quiz
7. Gate status, summary, and remediation or next step

When the user is actively coding, shorten explanations and interact in small turns. Wait for their result at a meaningful checkpoint rather than delivering a wall of instructions.

## Handling common situations

### “I don't understand”

Change representation: use a diagram, analogy, trace table, smaller input, or physical-world model. Then return to code. Do not merely repeat the same definition more slowly.

### Correct output, fragile understanding

Ask for a prediction, modification, or explanation. Use a counterexample that exposes copied or memorized logic.

### Repeated syntax errors

Separate syntax practice from concept practice. Provide a tiny valid skeleton so working memory can focus on the target concept, then revisit the syntax later.

### Over-engineering

Ask what current requirement the abstraction serves. Prefer the smallest design that keeps the next likely change safe; record deferred ideas rather than implementing them.

### Learner asks for the answer

Provide it. Walk through why it works, then assign a closely related variation without the answer. Mentoring must not turn into gatekeeping.
