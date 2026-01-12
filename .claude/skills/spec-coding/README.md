# Spec-Coding Skill

This directory contains the Spec-Driven Development workflow skill for Claude Code.

## Overview

The `spec-coding.md` skill implements a comprehensive 5-stage workflow for feature development:

1. **Goal Confirmation** - Clarify and confirm feature goals
2. **Requirements Gathering** - Create EARS-format requirements
3. **Design Documentation** - Develop technical design
4. **Task Planning** - Generate implementation checklist
5. **Task Execution** - Execute tasks incrementally

## Usage

### Starting the Workflow

To invoke the skill, use the Skill tool or have the user type:

```
/spec-coding
```

or simply say:
```
I want to use the spec-coding workflow to build [feature]
```

### Workflow Stages

The skill guides Claude through each stage automatically:

1. **Goal Stage**: Claude will ask clarifying questions until goals are clear
2. **Requirements Stage**: Creates `docs/specs/{feature_name}/requirements.md`
3. **Design Stage**: Creates `docs/specs/{feature_name}/design.md`
4. **Tasks Stage**: Creates `docs/specs/{feature_name}/tasks.md`
5. **Execution Stage**: Executes tasks from the task list

### Key Features

- **Explicit Approval Gates**: Each stage requires user approval before proceeding
- **Iterative Refinement**: Documents can be revised based on user feedback
- **TodoWrite Integration**: Progress tracking through workflow stages
- **EARS Format**: Requirements use Easy Approach to Requirements Syntax
- **Test-Driven**: Task planning prioritizes TDD approach
- **Incremental Execution**: Tasks are executed one at a time with user review

### Output Structure

All documentation is created in:
```
docs/specs/{feature_name}/
├── requirements.md
├── design.md
└── tasks.md
```

## Migration from MCP Server

This skill replaces the MCP server implementation with equivalent functionality:

| MCP Tool | Skill Stage |
|----------|-------------|
| `spec_coding_workflow_start` | Start of workflow |
| `spec_coding_goal_confirmed` | End of Stage 0 |
| `spec_coding_requirements_start` | Start of Stage 1 |
| `spec_coding_requirements_confirmed` | End of Stage 1 |
| `spec_coding_design_start` | Start of Stage 2 |
| `spec_coding_design_confirmed` | End of Stage 2 |
| `spec_coding_tasks_start` | Start of Stage 3 |
| `spec_coding_tasks_confirmed` | End of Stage 3 |
| `spec_coding_execute_start` | Stage 4 |

The skill provides the same workflow guidance but integrated directly into Claude Code's conversation flow.

## Examples

### Example: Starting a New Feature

```
User: I want to build a user authentication system using the spec-coding workflow

Claude: [Invokes spec-coding skill]
        Let me help you develop this feature using the spec-driven development workflow...

        [Proceeds through Stage 0: Goal Confirmation with clarifying questions]
```

### Example: Executing Tasks

```
User: Execute the next task for the user-auth feature

Claude: [Reads docs/specs/user-auth/requirements.md, design.md, tasks.md]
        Looking at the task list, the next unimplemented task is:

        Task 1.1: Implement user authentication service

        [Executes task and marks it complete when done]
```

## Notes

- The skill automatically uses TodoWrite to track workflow progress
- Each stage includes detailed constraints from the original templates
- The workflow emphasizes incremental progress and early validation
- Task execution focuses only on coding activities (no deployment, user testing, etc.)
