# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development mode
npm run dev

# Build the project
npm run build

# Start built version
npm start

# Install dependencies (Node.js 18+ required)
npm install
```

## Project Architecture

This is an MCP (Model Context Protocol) server that implements a spec-driven development workflow. The architecture follows a tool-based approach where each workflow stage is implemented as a separate MCP tool.

### Core Components

- **Entry Point** (`src/index.ts`): Starts the MCP server with stdio transport
- **Server** (`src/server.ts`): Defines all 9 workflow tools and handles tool execution
- **Workflow Tools** (`src/tools/`): Each file implements a specific workflow stage
- **Utilities** (`src/utils/`): Shared workflow logic and templates

### Workflow Architecture

The spec-driven development workflow consists of 5 sequential stages, each with specific tools:

1. **Goal Confirmation**: `spec_coding_workflow_start` → `spec_coding_goal_confirmed`
2. **Requirements Gathering**: `spec_coding_requirements_start` → `spec_coding_requirements_confirmed`
3. **Design Documentation**: `spec_coding_design_start` → `spec_coding_design_confirmed`
4. **Task Planning**: `spec_coding_tasks_start` → `spec_coding_tasks_confirmed`
5. **Task Execution**: `spec_coding_execute_start`

Each stage generates documentation in `docs/specs/{feature_name}/` directory:
- `requirements.md` (EARS format)
- `design.md` (technical architecture)
- `tasks.md` (implementation checklist)

### Tool Implementation Pattern

All workflow tools follow a consistent pattern:
- Accept `session_id` and `feature_name` parameters
- Return structured text responses with guidance
- Use templates from `src/utils/template.ts`
- Track workflow state through step progression

### TypeScript Configuration

- ES2022 target with ESNext modules
- Strict mode enabled with comprehensive type checking
- Output to `dist/` directory
- Source maps and declarations generated

### Code Style Guidelines

From `.cursor/rules/typescript.mdc`:
- Prefer interfaces over types for object definitions
- Use PascalCase for types, camelCase for variables
- Explicit return types for public functions
- Avoid JSDoc documentation
- Use async/await over Promises
- Implement proper error handling with custom error types