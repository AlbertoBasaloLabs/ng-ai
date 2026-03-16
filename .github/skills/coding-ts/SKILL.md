---
name: coding-ts
description: TypeScript coding conventions and best practices for Angular projects. Use for writing clean, maintainable, and consistent TypeScript code. 
---
# TypeScript Conventions

- Strict typing: Enable `strict` mode in `tsconfig.json` for better type safety and error detection.
- Use `interface` for defining object shapes and `type` for unions, intersections, and primitive types.
- Prefer `const` for variables that won't be reassigned and `let` for those that will be.
- Use arrow functions for concise syntax and to preserve `this` context.
- Use accurate types: prefer `Record<PropertyKey, unknown>` over `object` or `any`.
- Avoid meaningless null/undefined parameters; design strict function contracts
- Never log user private information (API keys, etc.)
- Use `console.error` in catch blocks
