#!/usr/bin/env node

import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SKILL_NAME = "fullstack-mentor";
const PACKAGE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SKILL_SOURCE = join(
  PACKAGE_ROOT,
  "plugins",
  "fullstack-mentor",
  "skills",
  SKILL_NAME,
);
const MARKER_NAME = ".fullstack-mentor-install.json";
const PACKAGE_VERSION = JSON.parse(
  readFileSync(join(PACKAGE_ROOT, "package.json"), "utf8"),
).version;

const HELP = `Full-stack Mentor Agent Skill installer

Usage:
  npx github:ppthana/fullstack-mentor <command> [options]

Commands:
  install, add        Install the skill; refuse to overwrite by default
  update, upgrade     Replace managed installations with the latest bundle
  status              Show installation state and installed version
  uninstall, remove   Remove installations created by this CLI

Options:
  --target <name>  all, agents, codex, claude, cursor, or gemini
                   Default: all
  --dir <path>     Install into a custom skills parent directory
  --force          Back up and replace an existing installation
  --dry-run        Show destinations without changing files
  -h, --help       Show this help

Default "all" destinations:
  ~/.agents/skills/fullstack-mentor   Cursor, Gemini CLI, and compatible agents
  ~/.claude/skills/fullstack-mentor   Claude Code
  ~/.codex/skills/fullstack-mentor    Codex

For another Agent Skills-compatible AI, pass the parent directory it scans:
  npx github:ppthana/fullstack-mentor install --dir /path/to/skills
`;

function parseArgs(argv) {
  const options = {
    command: "install",
    target: "all",
    customDir: null,
    force: false,
    dryRun: false,
    help: false,
  };

const args = [...argv];
  const commandAliases = {
    install: "install",
    add: "install",
    update: "update",
    upgrade: "update",
    status: "status",
    uninstall: "uninstall",
    remove: "uninstall",
  };
  if (args[0] && Object.hasOwn(commandAliases, args[0])) {
    options.command = commandAliases[args.shift()];
  }

  while (args.length > 0) {
    const arg = args.shift();
    if (arg === "--target") {
      options.target = requireValue(arg, args.shift());
    } else if (arg === "--dir") {
      options.customDir = requireValue(arg, args.shift());
    } else if (arg === "--force") {
      options.force = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function requireValue(flag, value) {
  if (!value || value.startsWith("-")) {
    throw new Error(`${flag} requires a value`);
  }
  return value;
}

function targetParents(home) {
  return {
    agents: join(home, ".agents", "skills"),
    codex: join(home, ".codex", "skills"),
    claude: join(home, ".claude", "skills"),
    cursor: join(home, ".cursor", "skills"),
    gemini: join(home, ".gemini", "skills"),
  };
}

function resolveDestinations(options, env = process.env) {
  if (options.customDir) {
    return [join(resolve(options.customDir), SKILL_NAME)];
  }

  const home = env.FULLSTACK_MENTOR_HOME || homedir();
  const parents = targetParents(home);
  if (options.target === "all") {
    return [parents.agents, parents.claude, parents.codex].map((parent) =>
      join(parent, SKILL_NAME),
    );
  }
  if (!Object.hasOwn(parents, options.target)) {
    throw new Error(
      `Unknown target: ${options.target}. Use all, agents, codex, claude, cursor, or gemini.`,
    );
  }
  return [join(parents[options.target], SKILL_NAME)];
}

function timestamp() {
  return new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
}

function readMarker(destination) {
  const marker = join(destination, MARKER_NAME);
  if (!existsSync(marker)) {
    return null;
  }
  try {
    const metadata = JSON.parse(readFileSync(marker, "utf8"));
    return metadata.name === SKILL_NAME ? metadata : null;
  } catch {
    return null;
  }
}

function writeMarker(destination, previous = null) {
  const now = new Date().toISOString();
  writeFileSync(
    join(destination, MARKER_NAME),
    `${JSON.stringify(
      {
        name: SKILL_NAME,
        packageVersion: PACKAGE_VERSION,
        source: "https://github.com/ppthana/fullstack-mentor",
        installedAt: previous?.installedAt || now,
        updatedAt: previous ? now : undefined,
      },
      null,
      2,
    )}\n`,
  );
}

function copyWithBackup(destination, previous = null) {
  mkdirSync(dirname(destination), { recursive: true });
  let backup = null;
  if (existsSync(destination)) {
    backup = `${destination}.backup-${timestamp()}`;
    renameSync(destination, backup);
  }

  try {
    cpSync(SKILL_SOURCE, destination, { recursive: true });
    writeMarker(destination, previous);
  } catch (error) {
    if (existsSync(destination)) {
      rmSync(destination, { recursive: true, force: true });
    }
    if (backup) {
      renameSync(backup, destination);
    }
    throw error;
  }
  return backup;
}

function install(destinations, options) {
  if (!existsSync(join(SKILL_SOURCE, "SKILL.md"))) {
    throw new Error(`Packaged skill is missing: ${SKILL_SOURCE}`);
  }

  const existing = destinations.filter(existsSync);
  if (existing.length > 0 && !options.force) {
    throw new Error(
      `Already installed at:\n${existing.map((path) => `  ${path}`).join("\n")}\nRun again with --force to back up and replace it.`,
    );
  }

  for (const destination of destinations) {
    if (options.dryRun) {
      console.log(`[dry-run] install -> ${destination}`);
      continue;
    }

    const backup = copyWithBackup(destination);
    if (backup) {
      console.log(`Backed up existing skill: ${backup}`);
    }
    console.log(`Installed ${SKILL_NAME} ${PACKAGE_VERSION}: ${destination}`);
  }
}

function update(destinations, options) {
  const unmanaged = destinations.filter(
    (destination) => existsSync(destination) && !readMarker(destination),
  );
  if (unmanaged.length > 0) {
    throw new Error(
      `Refusing to update unmanaged directories:\n${unmanaged.map((path) => `  ${path}`).join("\n")}\nUse install --force if you intentionally want to replace them.`,
    );
  }

  const managed = destinations
    .map((destination) => ({ destination, marker: readMarker(destination) }))
    .filter(({ marker }) => marker);
  if (managed.length === 0) {
    throw new Error("No managed installation found. Run install first.");
  }

  for (const { destination, marker } of managed) {
    if (marker.packageVersion === PACKAGE_VERSION && !options.force) {
      console.log(
        `Already current ${SKILL_NAME} ${PACKAGE_VERSION}: ${destination}`,
      );
      continue;
    }
    if (options.dryRun) {
      console.log(
        `[dry-run] update ${marker.packageVersion || "unknown"} -> ${PACKAGE_VERSION}: ${destination}`,
      );
      continue;
    }
    const backup = copyWithBackup(destination, marker);
    console.log(`Backed up previous skill: ${backup}`);
    console.log(
      `Updated ${SKILL_NAME} ${marker.packageVersion || "unknown"} -> ${PACKAGE_VERSION}: ${destination}`,
    );
  }
}

function status(destinations) {
  for (const destination of destinations) {
    if (!existsSync(destination)) {
      console.log(`not installed  ${destination}`);
      continue;
    }
    const marker = readMarker(destination);
    if (!marker) {
      console.log(`unmanaged      ${destination}`);
      continue;
    }
    console.log(
      `installed ${marker.packageVersion || "unknown"}  ${destination}`,
    );
  }
}

function uninstall(destinations, options) {
  const unmanaged = destinations.filter(
    (destination) =>
      existsSync(destination) &&
      !readMarker(destination),
  );
  if (unmanaged.length > 0) {
    throw new Error(
      `Refusing to remove unmanaged directories:\n${unmanaged.map((path) => `  ${path}`).join("\n")}`,
    );
  }

  for (const destination of destinations) {
    if (!existsSync(destination)) {
      console.log(`Not installed: ${destination}`);
      continue;
    }

    if (options.dryRun) {
      console.log(`[dry-run] uninstall -> ${destination}`);
      continue;
    }
    rmSync(destination, { recursive: true, force: false });
    console.log(`Removed ${SKILL_NAME}: ${destination}`);
  }
}

export function main(argv = process.argv.slice(2), env = process.env) {
  const options = parseArgs(argv);
  if (options.help) {
    console.log(HELP);
    return;
  }

  const destinations = resolveDestinations(options, env);
  if (options.command === "install") {
    install(destinations, options);
  } else if (options.command === "update") {
    update(destinations, options);
  } else if (options.command === "status") {
    status(destinations);
  } else {
    uninstall(destinations, options);
  }
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    main();
  } catch (error) {
    console.error(`fullstack-mentor: ${error.message}`);
    process.exitCode = 1;
  }
}
