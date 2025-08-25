# Guidelines for Claude Code

This repository is an Angular application for budget management.

## Package Manager

This project uses **bun** as the package manager and task runner. Always use `bun` commands instead of `npm`, `yarn`, or `pnpm`.

## Required checks

When modifying code, run the following commands and ensure they pass:

```bash
bun run biome:check # run biome check for linting and formatting
bun run typecheck # run TypeScript type checking
bun run test # run all tests
bun run test:coverage # run tests with coverage report
bun run build # ensure the application builds successfully
```

## Project Structure

This is a single Angular application with the following structure:

- **src/app/**: Main application components and modules
- **src/**: Application source code including main.ts and setup files
- **tests/**: Test configuration and setup files

## Code Conventions

### TypeScript Configuration

- **Strict TypeScript**: Uses strict mode for type safety
- **Target**: ES2022 with modern module resolution
- **Module system**: ESNext for modern Angular applications

### Code Quality Tools

- **Biome**: Used for linting and formatting instead of ESLint/Prettier
- **Jest**: Testing framework with Angular preset
- **Angular**: Framework version 20+ with standalone components

### File Naming and Structure

- **Test files**: Use `.spec.ts` suffix and live alongside source files
- **Component files**: Angular components with `.ts` extension
- **Config files**: TypeScript configuration and application setup
- **Styles**: TailwindCSS with DaisyUI components

### Testing Conventions

- **Jest**: Primary testing framework with `jest-preset-angular`
- **Test organization**: Test files live alongside source files
- **Coverage**: Aim for 100% test coverage
- **Test structure**: Use `describe` and `it` blocks with clear descriptions

### Build and Development

- **Angular CLI**: Used for building and serving the application
- **Bun**: Fast package manager and task runner
- **TailwindCSS**: Utility-first CSS framework with DaisyUI components
- **Playwright**: E2E testing framework
- **Standard Version**: Automated versioning and changelog generation using Conventional Commits

## Commit conventions

Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages and PR titles.

Examples:
- `feat: add user authentication component`
- `fix: resolve routing navigation issues`
- `test: add unit tests for budget service`
- `chore: update dependencies`

## Development Tools

- **Bun**: Package manager and task runner
- **Biome**: Code formatting and linting tool
- **Angular DevKit**: Angular development tools

## Common Commands

```bash
# Install dependencies
bun install

# Start development server
bun run start

# Build application
bun run build

# Run all tests
bun run test

# Run tests with coverage
bun run test:coverage

# Watch tests during development
bun run test:watch

# Run E2E tests
bun run e2e

# Check code quality
bun run biome:check

# Run TypeScript type checking
bun run typecheck

# Watch and rebuild on changes
bun run watch

# Create semantic release (dry run)
bun run release:dry

# Create semantic release
bun run release

# Create specific version releases
bun run release:patch  # 0.0.1 -> 0.0.2
bun run release:minor  # 0.0.1 -> 0.1.0
bun run release:major  # 0.0.1 -> 1.0.0
```