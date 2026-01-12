# MCP Server to Skill Migration Guide

This document explains the conversion of the spec-coding MCP server to a Claude Code Skill.

## Overview

The spec-driven development workflow has been converted from an MCP (Model Context Protocol) server to a native Claude Code Skill. This provides a more seamless integration with Claude Code's conversation flow while maintaining all the original functionality.

## What Changed

### Before (MCP Server)

- Separate MCP server process running via stdio transport
- 9 distinct MCP tools that Claude needed to call explicitly
- Session management with generated session IDs
- Tool-based state transitions between workflow stages

### After (Claude Code Skill)

- Single skill file: [.claude/skills/spec-coding.md](.claude/skills/spec-coding.md)
- Integrated into Claude Code's natural conversation flow
- No separate server process needed
- State managed through conversation context
- TodoWrite tool integration for progress tracking

## Functionality Mapping

| MCP Tool | Skill Equivalent |
|----------|------------------|
| `spec_coding_workflow_start` | Skill invocation + Stage 0 |
| `spec_coding_goal_confirmed` | Transition from Stage 0 → Stage 1 |
| `spec_coding_requirements_start` | Stage 1 start |
| `spec_coding_requirements_confirmed` | Transition from Stage 1 → Stage 2 |
| `spec_coding_design_start` | Stage 2 start |
| `spec_coding_design_confirmed` | Transition from Stage 2 → Stage 3 |
| `spec_coding_tasks_start` | Stage 3 start |
| `spec_coding_tasks_confirmed` | Transition from Stage 3 → Stage 4 |
| `spec_coding_execute_start` | Stage 4 execution |

## Workflow Stages (Unchanged)

The 5-stage workflow remains identical:

1. **Goal Confirmation** - Clarify feature goals through dialogue
2. **Requirements Gathering** - Create EARS-format requirements
3. **Design Documentation** - Develop technical architecture
4. **Task Planning** - Generate implementation checklist
5. **Task Execution** - Execute tasks incrementally

## Key Benefits of Skill Approach

### 1. **Simpler Setup**
- No separate MCP server configuration needed
- No need to configure stdio transport
- Works immediately with Claude Code

### 2. **Better Integration**
- Natural conversation flow without explicit tool calls
- Claude can reference the skill directly
- TodoWrite integration for progress tracking

### 3. **Easier Maintenance**
- Single markdown file vs. multiple TypeScript files
- Clear, readable format
- Easy to customize and extend

### 4. **No Dependencies**
- No Node.js runtime needed
- No package dependencies
- No build process required

### 5. **Better Context Management**
- Conversation context naturally maintained
- No need for session IDs
- State transitions are conversational

## How to Use the Skill

### Invocation

Users can trigger the skill by:

1. **Explicit invocation**: `/spec-coding`
2. **Natural language**: "I want to use the spec-coding workflow to build [feature]"
3. **Direct request**: "Let's follow the spec-driven development process for [feature]"

### Workflow Progression

Claude will automatically:
- Guide through each stage with appropriate prompts
- Ask for explicit approval before stage transitions
- Use TodoWrite to track progress
- Create documentation in `docs/specs/{feature_name}/`

### Task Execution

To execute tasks from a completed spec:
```
Execute task 1.1 from the user-auth spec
```

or

```
What's the next task for the payment-integration feature?
```

## File Structure

### Before (MCP Server)
```
spec-coding-mcp/
├── src/
│   ├── index.ts              # Entry point
│   ├── server.ts             # MCP server setup
│   ├── tools/                # Tool implementations
│   │   ├── workflow.ts
│   │   ├── goal.ts
│   │   ├── requirements.ts
│   │   ├── requirements_confirmed.ts
│   │   ├── design.ts
│   │   ├── design_confirmed.ts
│   │   ├── tasks.ts
│   │   ├── tasks_confirmed.ts
│   │   └── execute.ts
│   └── utils/
│       └── template.ts       # Template loader
├── templates/                # Workflow templates
│   ├── ask-goal.md
│   ├── gen-requirement.md
│   ├── gen-design.md
│   ├── gen-tasks.md
│   └── execute-task.md
├── package.json
├── tsconfig.json
└── README.md
```

### After (Skill)
```
spec-coding-mcp/
├── .claude/
│   └── skills/
│       └── spec-coding/
│           ├── SKILL.md      # Main skill file
│           └── README.md     # Usage documentation
├── src/                      # (Legacy - can be archived)
├── templates/                # (Integrated into skill)
├── SKILL_MIGRATION.md        # This document
└── README.md
```

## Backward Compatibility

The MCP server implementation remains in the codebase for reference and backward compatibility. It can still be used if needed by:

```bash
npm install
npm run build
npm start
```

However, the recommended approach is to use the Claude Code Skill for all new work.

## Migration for Existing Users

If you were using the MCP server:

1. **No action required** - The skill is ready to use
2. **Remove MCP configuration** (optional):
   - Remove the MCP server from your Claude Code settings
   - Remove any startup scripts or configuration

3. **Start using the skill**:
   - Simply invoke `/spec-coding` in any conversation
   - All existing workflows and patterns remain the same

## Testing the Skill

To verify the skill works correctly:

1. Start Claude Code
2. Type `/spec-coding` or "I want to use spec-coding to build a test feature"
3. Verify Claude begins Stage 0 (Goal Confirmation)
4. Test stage transitions and document creation

## Future Enhancements

Potential improvements to consider:

- [ ] Add sub-skills for individual stages
- [ ] Create skill variants for different project types
- [ ] Add examples gallery with common feature types
- [ ] Integrate with project templates
- [ ] Add retrospective/lessons learned stage

## Questions or Issues?

If you encounter any problems with the skill:

1. Check the skill file: [.claude/skills/spec-coding/SKILL.md](.claude/skills/spec-coding/SKILL.md)
2. Review the README: [.claude/skills/spec-coding/README.md](.claude/skills/spec-coding/README.md)
3. Compare behavior with original templates in `/templates/`
4. Open an issue with specific details about the problem

## Credits

Original MCP server implementation converted to Claude Code Skill format, maintaining all workflow logic and constraints while simplifying the architecture and improving integration.
