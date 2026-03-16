# NG AI

- {Agents_Folder}:`/.github` You are a coding agent configured at `/.github` folder.
- {Project_Folder}:`/project` The project context will be at `project` folder.

## Product Overview

This is a sample Angular project using AI coding best practices, including TypeScript strictness, signal-based reactivity, and performance optimizations. It serves as a template for building modern Angular applications with AI-generated code.

## Technical Implementation

This will be SPA with Angular v19+, using standalone components, signals for state management, and optimized build configurations. The project will include features like SSR, routing, and a sample component demonstrating best practices.

### Tech Stack
- **Language**: TypeScript
- **Framework**: Angular v19+
- **State Management**: Angular Signals
- **Build Tools**: Angular CLI
- **Testing**: Jasmine/Karma
- **E2E**: Playwright

### Workflow Commands

```bash
# Install dependencies
npm install
# Start development server
npm watch
# Run tests
npm test
# Run app
npm start
# Build for production
npm run build
```

### Folder structure

```txt
├── AGENTS.md             # This file with instructions for AI agents
├── {Agents_Folder}/      # Agents related files (skills, specs, etc)
|   ├── prompts/          # Reusable prompts directory
|   └── skills/           # Custom agent skills
├── {Project_Folder}/     # Project related files (specs, plans, etc)
|   ├── PRD.md            # Product Requirements Document
|   ├── ADD.md            # Architectural Design Document
|   └── specs/            # Specifications and plans
├── CHANGELOG.md          # Project history and changelog
├── README.md             # Human friendly project overview
├── package.json          # NPM package configuration
├── angular.json          # Angular CLI configuration
├── src/                  # Source code with main application code and assets
│   ├── app/              # Angular application configuration and routes
│   │   ├── core/         # Core services and utilities used by the app
│   │   ├── routes/       # Application routes
│   │   └── shared/       # Shared components, directives, and pipes
└── other_files/          # Other relevant files and folders 
```

## Environment

- **OS dev**: Windows 11
- **Terminal**: Git Bash
- **Node Version**: 22.14.0 (managed with fnm)
- **Git remote**: https://github.com/AlbertoBasaloLabs/ng-ai
- **Default branch**: main

### Behavior Guidelines

- Code and documentation must be in English.
- Chat responses must be in the language of the user prompt.
- Sacrifice grammar for conciseness when needed to fit response limits.
- When using templates, ensure to replace {placeholders} with actual values.
