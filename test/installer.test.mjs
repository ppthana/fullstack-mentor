import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { main } from "../cli/fullstack-mentor.mjs";

function tempHome() {
  return mkdtempSync(join(tmpdir(), "fullstack-mentor-test-"));
}

test("default install copies the skill to shared, Claude, and Codex locations", () => {
  const home = tempHome();
  main(["install"], { FULLSTACK_MENTOR_HOME: home });

  for (const relative of [
    [".agents", "skills"],
    [".claude", "skills"],
    [".codex", "skills"],
  ]) {
    const skill = join(home, ...relative, "fullstack-mentor");
    assert.equal(existsSync(join(skill, "SKILL.md")), true);
    assert.equal(existsSync(join(skill, "references", "lesson-map.md")), true);
  }
});

test("custom directory install and uninstall are reversible", () => {
  const home = tempHome();
  const parent = join(home, "custom-skills");
  const skill = join(parent, "fullstack-mentor");

  main(["install", "--dir", parent], {});
  const marker = JSON.parse(
    readFileSync(join(skill, ".fullstack-mentor-install.json"), "utf8"),
  );
  assert.equal(marker.name, "fullstack-mentor");

  main(["uninstall", "--dir", parent], {});
  assert.equal(existsSync(skill), false);
});

test("installer refuses to replace an existing directory without --force", () => {
  const home = tempHome();
  const parent = join(home, "custom-skills");
  main(["install", "--dir", parent], {});

  assert.throws(
    () => main(["install", "--dir", parent], {}),
    /Already installed/,
  );
});
