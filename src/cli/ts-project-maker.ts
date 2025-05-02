#!/usr/bin/env node

import { program } from "commander";
import * as readline from "readline";
import * as path from "path";
import * as fs from "fs";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      resolve(ans);
    })
  );
}

async function copyTemplateFiles(templatePath: string, destinationPath: string) {
  const files = fs.readdirSync(templatePath);
  for (const file of files) {
    const srcFile = path.join(templatePath, file);
    const destFile = path.join(destinationPath, file);
    if (srcFile.includes("node_modules")) {
      continue;
    }
    if (fs.statSync(srcFile).isDirectory()) {
      console.log(`[COPY] Creating directory: ${destFile}`);
      fs.mkdirSync(destFile, { recursive: true });
      await copyTemplateFiles(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  }
}

program
  .description("Creates a typescript project template")
  .option("-t, --type <type>", "api|discord-bot|web-app-react")
  .option("-n, --name <name>", "Project name")
  .option("-v, --version <version>", "Project version", "1.0.0")
  .option("-a, --author <author>", "Project author")
  .action(async (options) => {
    const { type } = options;
    let { name, version, author } = options;
    switch (type) {
      case "api":
        console.log("Creating API project template...");
        break;
      case "discord-bot":
        console.log("Creating Discord bot project template...");
        break;
      case "web-app-react":
        console.log("Creating web app (React) project template...");
        break;
      default:
        console.error("Invalid project type. Please specify: api|discord-bot|web-app-react");
        process.exit(1);
    }

    if (!type) {
      console.error("Please specify a project type: api|discord-bot|web-app-react");
      process.exit(1);
    }

    if (!name) {
      name = await askQuestion("Enter project name: ");
    }

    if (!version) {
      version = await askQuestion("Enter project version (default: 1.0.0): ") || "1.0.0";
    }

    if (!author) {
      author = await askQuestion("Enter project author: ");
    }

    const projectNameRegex = /^[a-zA-Z0-9-_]+$/;
    if (!projectNameRegex.test(name)) {
      console.error("Invalid project name. Only alphanumeric characters, dashes, and underscores are allowed.");
      process.exit(1);
    }
    const versionRegex = /^\d+\.\d+\.\d+$/;
    if (!versionRegex.test(version)) {
      console.error("Invalid version format. Use semantic versioning (e.g., 1.0.0).");
      process.exit(1);
    }
    const authorRegex = /^[a-zA-Z0-9-_ ]+$/;
    if (!authorRegex.test(author)) {
      console.error("Invalid author name. Only alphanumeric characters, dashes, underscores, and spaces are allowed.");
      process.exit(1);
    }

    console.log(`Creating project ${name} version ${version} by ${author}`);

    fs.mkdirSync(path.join(process.cwd() + "/" + name), { recursive: true });
    await copyTemplateFiles(path.join(__dirname, `../../templates/${type}`), path.join(process.cwd() + "/" + name))
    
    const packageJsonPath = path.join(process.cwd() + "/" + name, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    packageJson.name = name;
    packageJson.version = version;
    packageJson.author = author;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf-8");
    
    rl.close();

  });

program.parse(process.argv);