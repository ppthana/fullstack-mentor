import assert from "node:assert/strict";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
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
    assert.equal(
      existsSync(join(skill, "references", "workspace-workflow.md")),
      true,
    );
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

test("upgrade updates a managed installation and keeps a backup", () => {
  const home = tempHome();
  const parent = join(home, "custom-skills");
  const skill = join(parent, "fullstack-mentor");
  const markerPath = join(skill, ".fullstack-mentor-install.json");
  main(["add", "--dir", parent], {});

  const oldMarker = JSON.parse(readFileSync(markerPath, "utf8"));
  oldMarker.packageVersion = "0.1.0";
  writeFileSync(markerPath, `${JSON.stringify(oldMarker)}\n`);

  main(["upgrade", "--dir", parent], {});

  const newMarker = JSON.parse(readFileSync(markerPath, "utf8"));
  assert.equal(newMarker.packageVersion, "0.5.0");
  assert.ok(newMarker.updatedAt);
  assert.equal(
    readdirSync(parent).some((name) =>
      name.startsWith("fullstack-mentor.backup-"),
    ),
    true,
  );
});

test("status reports the installed version and remove is an uninstall alias", () => {
  const home = tempHome();
  const parent = join(home, "custom-skills");
  const output = [];
  const originalLog = console.log;
  try {
    console.log = (message) => output.push(message);
    main(["install", "--dir", parent], {});
    main(["status", "--dir", parent], {});
    main(["remove", "--dir", parent], {});
  } finally {
    console.log = originalLog;
  }

  assert.equal(output.some((line) => line.includes("installed 0.5.0")), true);
  assert.equal(existsSync(join(parent, "fullstack-mentor")), false);
});

test("upgrade is a no-op when the managed installation is current", () => {
  const home = tempHome();
  const parent = join(home, "custom-skills");
  const output = [];
  const originalLog = console.log;
  try {
    console.log = (message) => output.push(message);
    main(["install", "--dir", parent], {});
    main(["upgrade", "--dir", parent], {});
  } finally {
    console.log = originalLog;
  }

  assert.equal(output.some((line) => line.includes("Already current")), true);
  assert.equal(
    readdirSync(parent).some((name) =>
      name.startsWith("fullstack-mentor.backup-"),
    ),
    false,
  );
});
