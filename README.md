# Frontend Budget PREB

Angular application for budget management built with modern tools and practices.

## Tech Stack

- **Angular 20+** - Modern Angular framework with standalone components
- **Bun** - Fast package manager and task runner
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Component library for TailwindCSS
- **Biome** - Fast linter and formatter
- **Jest** - Testing framework with Angular preset
- **Playwright** - End-to-end testing
- **Husky** - Git hooks for code quality
- **Standard Version** - Automated versioning and changelog

## Development

Start the development server:
```bash
bun run start
```

The application will be available at `http://localhost:4200/` with hot reload.

## Scripts

### Development
```bash
bun run start        # Start development server
bun run watch        # Build and watch for changes
```

### Testing
```bash
bun run test         # Run unit tests
bun run test:watch   # Run tests in watch mode
bun run test:coverage # Run tests with coverage report
bun run e2e          # Run end-to-end tests
```

### Code Quality
```bash
bun run biome:check  # Check linting and formatting
bun run typecheck    # Run TypeScript type checking
```

### Build
```bash
bun run build        # Build for production
```

### Release
```bash
bun run release:dry  # Preview release changes
bun run release      # Create automated release
bun run release:patch # Create patch release (0.0.1 -> 0.0.2)
bun run release:minor # Create minor release (0.0.1 -> 0.1.0)
bun run release:major # Create major release (0.0.1 -> 1.0.0)
```

## Project Structure

```
src/
├── app/          # Application components and modules
│   ├── app.ts    # Root component
│   ├── app.config.ts # Application configuration
│   └── app.routes.ts # Route definitions
└── main.ts       # Application bootstrap
```

## Git Hooks

This project uses Husky for automated code quality checks:

- **Pre-commit**: Runs linting, type checking, and tests
- **Pre-push**: Runs full test coverage and build

## Conventional Commits

This project follows [Conventional Commits](https://www.conventionalcommits.org/) for automated versioning:

- `feat:` - New features
- `fix:` - Bug fixes  
- `docs:` - Documentation changes
- `test:` - Test additions or changes
- `chore:` - Maintenance tasks

## Installation

```bash
bun install
```

## Package Manager

This project uses **Bun** as the package manager. Always use `bun` commands instead of `npm` or `yarn`.
