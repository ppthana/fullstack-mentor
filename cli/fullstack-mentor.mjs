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

const HELP = `Full-stack Mentor Agent Skill installer

Usage:
  npx github:ppthana/fullstack-mentor install [options]
  npx github:ppthana/fullstack-mentor uninstall [options]

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
  if (args[0] === "install" || args[0] === "uninstall") {
    options.command = args.shift();
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

    mkdirSync(dirname(destination), { recursive: true });
    if (existsSync(destination)) {
      const backup = `${destination}.backup-${timestamp()}`;
      renameSync(destination, backup);
      console.log(`Backed up existing skill: ${backup}`);
    }
    cpSync(SKILL_SOURCE, destination, { recursive: true });
    writeFileSync(
      join(destination, MARKER_NAME),
      `${JSON.stringify(
        {
          name: SKILL_NAME,
          source: "https://github.com/ppthana/fullstack-mentor",
          installedAt: new Date().toISOString(),
        },
        null,
        2,
      )}\n`,
    );
    console.log(`Installed ${SKILL_NAME}: ${destination}`);
  }
}

function uninstall(destinations, options) {
  const unmanaged = destinations.filter(
    (destination) =>
      existsSync(destination) &&
      !existsSync(join(destination, MARKER_NAME)),
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

    const marker = join(destination, MARKER_NAME);
    const metadata = JSON.parse(readFileSync(marker, "utf8"));
    if (metadata.name !== SKILL_NAME) {
      throw new Error(`Invalid install marker: ${marker}`);
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
