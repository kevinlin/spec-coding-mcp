---
name: spec-coding
description: Guide users through the complete spec-driven development workflow - from goal confirmation to working implementation. Use when: (1) Starting development of a new feature, (2) User wants structured, specification-driven approach, (3) User explicitly invokes /spec-coding, (4) Feature requires clear documentation before implementation, (5) User wants to execute tasks from existing spec documents. Supports both creating new specs (5-stage workflow: goal confirmation → requirements → design → task planning → execution) and executing tasks from existing specs.
---

# Spec-Driven Development Workflow

A comprehensive workflow for developing features through specification-first approach. This workflow guides you through goal confirmation, requirements gathering, design documentation, task planning, and execution.

## Workflow Overview

This workflow consists of 5 sequential stages:

1. **Goal Confirmation** - Establish clear development goals
2. **Requirements Gathering** - Document EARS-format requirements
3. **Design Documentation** - Create detailed technical design
4. **Task Planning** - Generate implementation checklist
5. **Task Execution** - Execute tasks incrementally

Each stage generates documentation in `docs/specs/{feature_name}/` directory.

## Important Notes

- Use TodoWrite tool to track progress through workflow stages
- Each stage requires explicit user approval before proceeding to the next
- All documentation is created in `docs/specs/{feature_name}/` directory
- The feature_name should be kebab-case (e.g., 'user-authentication', 'payment-integration')

---

## Stage 0: Goal Confirmation

First, establish a clear understanding of the development goal through iterative dialogue with the user. This is the foundation for all subsequent work.

### Constraints

- MUST engage in thorough dialogue with the user to understand their development goals
- MUST ask clarifying questions about:
  - What problem the feature solves
  - Who will use the feature
  - What the expected outcome should be
  - Any technical constraints or requirements
- MUST NOT proceed to the next stage until the user explicitly confirms the goal
- MUST summarize the understood goal and wait for user confirmation
- MUST generate a suitable feature_name based on the confirmed goal (e.g., 'user-authentication', 'payment-integration')
- SHOULD ask targeted questions to clarify ambiguous aspects
- SHOULD suggest refinements if the goal seems too broad or unclear
- MUST use the exact phrase "Goal confirmation complete" when ready to proceed
- MUST NOT proceed until the user has explicitly approved the goal summary

### TodoWrite

Create todos for the workflow stages:
```
- Goal confirmation (in_progress)
- Requirements gathering (pending)
- Design documentation (pending)
- Task planning (pending)
- Task execution (pending)
```

---

## Stage 1: Requirements Gathering

Generate an initial set of requirements in EARS format based on the feature idea, then iterate with the user to refine them until they are complete and accurate.

Don't focus on code exploration in this phase. Focus on writing requirements which will later be turned into a design.

### Constraints

- MUST create a `docs/specs/{feature_name}/requirements.md` file if it doesn't already exist
- MUST generate an initial version of the requirements document based on the user's rough idea WITHOUT asking sequential questions first
- MUST format the initial requirements.md document with:
  - A clear introduction section that summarizes the feature
  - A hierarchical numbered list of requirements where each contains:
    - A user story in the format "As a [role], I want [feature], so that [benefit]"
    - A numbered list of acceptance criteria in EARS format (Easy Approach to Requirements Syntax)
  - Example format:
    ```markdown
    # Feature Requirements: {Feature Name}

    ## Introduction

    [Brief description of the feature and its purpose]

    ## Requirements

    ### 1. [Requirement Title]

    **User Story:** As a [role], I want [feature], so that [benefit]

    **Acceptance Criteria:**
    1. WHEN [trigger/condition], THE SYSTEM SHALL [behavior]
    2. WHERE [precondition], THE SYSTEM SHALL [behavior]
    3. IF [condition], THEN THE SYSTEM SHALL [behavior]
    ```
- SHOULD consider edge cases, user experience, technical constraints, and success criteria in the initial requirements
- After updating the requirement document, MUST ask the user "Do the requirements look good? If so, we can move on to the design."
- MUST make modifications to the requirements document if the user requests changes or does not explicitly approve
- MUST ask for explicit approval after every iteration of edits to the requirements document
- MUST NOT proceed to the design document until receiving clear approval (such as "yes", "approved", "looks good", etc.)
- MUST continue the feedback-revision cycle until explicit approval is received
- SHOULD suggest specific areas where the requirements might need clarification or expansion
- MAY ask targeted questions about specific aspects of the requirements that need clarification
- MAY suggest options when the user is unsure about a particular aspect
- MUST proceed to the design phase after the user accepts the requirements

### TodoWrite

Mark goal confirmation as completed and requirements gathering as in_progress.

---

## Stage 2: Design Documentation

After the user approves the Requirements, develop a comprehensive design document based on the feature requirements, conducting necessary research during the design process.

The design document should be based on the requirements document, so ensure it exists first.

### Constraints

- MUST create a `docs/specs/{feature_name}/design.md` file if it doesn't already exist
- MUST identify areas where research is needed based on the feature requirements
- MUST conduct research and build up context in the conversation thread
- SHOULD NOT create separate research files, but instead use the research as context for the design and implementation plan
- MUST summarize key findings that will inform the feature design
- SHOULD cite sources and include relevant links in the conversation
- MUST create a detailed design document at `docs/specs/{feature_name}/design.md`
- MUST incorporate research findings directly into the design process
- MUST include the following sections in the design document:
  - Overview
  - Architecture
  - Components and Interfaces
  - Data Models
  - Error Handling
  - Testing Strategy
- SHOULD include diagrams or visual representations when appropriate (use Mermaid for diagrams if applicable)
- MUST ensure the design addresses all feature requirements identified during the clarification process
- SHOULD highlight design decisions and their rationales
- MAY ask the user for input on specific technical decisions during the design process
- After updating the design document, MUST ask the user "Does the design look good? If so, we can move on to the implementation plan."
- MUST make modifications to the design document if the user requests changes or does not explicitly approve
- MUST ask for explicit approval after every iteration of edits to the design document
- MUST NOT proceed to the implementation plan until receiving clear approval (such as "yes", "approved", "looks good", etc.)
- MUST continue the feedback-revision cycle until explicit approval is received
- MUST incorporate all user feedback into the design document before proceeding
- MUST offer to return to feature requirements clarification if gaps are identified during design

### TodoWrite

Mark requirements gathering as completed and design documentation as in_progress.

---

## Stage 3: Task Planning

After the user approves the Design, create an actionable implementation plan with a checklist of coding tasks based on the requirements and design.

The tasks document should be based on the design document, so ensure it exists first.

### Constraints

- MUST create a `docs/specs/{feature_name}/tasks.md` file if it doesn't already exist
- MUST return to the design step if the user indicates any changes are needed to the design
- MUST return to the requirement step if the user indicates that we need additional requirements
- MUST create an implementation plan at `docs/specs/{feature_name}/tasks.md`
- MUST use the following specific instructions when creating the implementation plan:
  ```
  Convert the feature design into a series of prompts for a code-generation LLM that will implement each step in a test-driven manner. Prioritize best practices, incremental progress, and early testing, ensuring no big jumps in complexity at any stage. Make sure that each prompt builds on the previous prompts, and ends with wiring things together. There should be no hanging or orphaned code that isn't integrated into a previous step. Focus ONLY on tasks that involve writing, modifying, or testing code.
  ```
- MUST format the implementation plan as a numbered checkbox list with a maximum of two levels of hierarchy:
  - Top-level items (like epics) should be used only when needed
  - Sub-tasks should be numbered with decimal notation (e.g., 1.1, 1.2, 2.1)
  - Each item must be a checkbox
  - Simple structure is preferred
- MUST ensure each task item includes:
  - A clear objective as the task description that involves writing, modifying, or testing code
  - Additional information as sub-bullets under the task
  - Specific references to requirements from the requirements document (referencing granular sub-requirements, not just user stories)
- MUST ensure that the implementation plan is a series of discrete, manageable coding steps
- MUST ensure each task references specific requirements from the requirement document
- MUST NOT include excessive implementation details that are already covered in the design document
- MUST assume that all context documents (feature requirements, design) will be available during implementation
- MUST ensure each step builds incrementally on previous steps
- SHOULD prioritize test-driven development where appropriate
- MUST ensure the plan covers all aspects of the design that can be implemented through code
- SHOULD sequence steps to validate core functionality early through code
- MUST ensure that all requirements are covered by the implementation tasks
- MUST offer to return to previous steps (requirements or design) if gaps are identified during implementation planning
- MUST ONLY include tasks that can be performed by a coding agent (writing code, creating tests, etc.)
- MUST NOT include tasks related to user testing, deployment, performance metrics gathering, or other non-coding activities
- MUST focus on code implementation tasks that can be executed within the development environment
- MUST ensure each task is actionable by a coding agent by following these guidelines:
  - Tasks should involve writing, modifying, or testing specific code components
  - Tasks should specify what files or components need to be created or modified
  - Tasks should be concrete enough that a coding agent can execute them without additional clarification
  - Tasks should focus on implementation details rather than high-level concepts
  - Tasks should be scoped to specific coding activities (e.g., "Implement X function" rather than "Support X feature")
- MUST explicitly avoid including the following types of non-coding tasks in the implementation plan:
  - User acceptance testing or user feedback gathering
  - Deployment to production or staging environments
  - Performance metrics gathering or analysis
  - Running the application to test end to end flows (however, writing automated tests for end-to-end flows is acceptable)
  - User training or documentation creation
  - Business process changes or organizational changes
  - Marketing or communication activities
  - Any task that cannot be completed through writing, modifying, or testing code
- After updating the tasks document, MUST ask the user "Do the tasks look good?"
- MUST make modifications to the tasks document if the user requests changes or does not explicitly approve
- MUST ask for explicit approval after every iteration of edits to the tasks document
- MUST NOT consider the workflow complete until receiving clear approval (such as "yes", "approved", "looks good", etc.)
- MUST continue the feedback-revision cycle until explicit approval is received
- MUST stop once the task document has been approved

### Important

This workflow is ONLY for creating design and planning artifacts. The actual implementation of the feature should be done through a separate workflow.

- MUST NOT attempt to implement the feature as part of this workflow
- MUST clearly communicate to the user that this workflow is complete once the design and planning artifacts are created
- MUST inform the user that they can begin executing tasks by using this skill again or asking Claude to execute specific tasks from the tasks.md file

### TodoWrite

Mark design documentation as completed and task planning as in_progress.

---

## Stage 4: Task Execution

Execute tasks from the task list one at a time, with user review after each task completion.

### Prerequisites

Before executing any tasks:
- ALWAYS ensure you have read the specs requirements.md, design.md and tasks.md files
- Executing tasks without the requirements or design will lead to inaccurate implementations

### Constraints

- Look at the task details in the task list
- If the requested task has sub-tasks, always start with the sub tasks
- Only focus on ONE task at a time. Do not implement functionality for other tasks
- Verify your implementation against any requirements specified in the task or its details
- Once you complete the requested task, stop and let the user review. DO NOT just proceed to the next task in the list
- If the user doesn't specify which task they want to work on, look at the task list for that spec and make a recommendation on the next task to execute
- When you are done with a task, modify the `docs/specs/{feature_name}/tasks.md` file to mark the task as implemented

### Task Questions

The user may ask questions about tasks without wanting to execute them. Don't always start executing tasks in cases like this.

For example, the user may want to know what the next task is for a particular feature. In this case, just provide the information and don't start any tasks.

### TodoWrite

When executing tasks, create a new todo list that tracks individual task execution:
```
- Task 1.1: [Task description] (in_progress)
- Task 1.2: [Task description] (pending)
```

Update the status as you complete each task.

---

## Summary

This workflow ensures thorough planning before implementation:
1. Clear goals → 2. Detailed requirements → 3. Technical design → 4. Implementation tasks → 5. Incremental execution

Each stage builds on the previous one and requires explicit user approval before proceeding.
