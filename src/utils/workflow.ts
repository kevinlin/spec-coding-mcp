// Workflow step definitions
export interface WorkflowStep {
  step_number: number;
  name: string;
  description: string;
  tool: string;
  deliverable: string;
}

export interface WorkflowOverview {
  total_steps: number;
  current_step: string;  // Change to step name
  current_step_number: number;  // Keep number for progress display
  steps: WorkflowStep[];
}

// Step name constants
export const STEP_NAMES = {
  GOAL_CONFIRMATION: 'Goal Confirmation',
  REQUIREMENTS: 'Requirements Gathering',
  DESIGN: 'Design Documentation',
  TASKS: 'Task Planning',
  EXECUTION: 'Task Execution'
} as const;

// Workflow step constants
export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step_number: 1,
    name: STEP_NAMES.GOAL_CONFIRMATION,
    description: 'Clarify the feature development goal through conversation',
    tool: 'spec_coding_workflow_start → spec_coding_goal_confirmed',
    deliverable: 'Clear feature goal and feature_name'
  },
  {
    step_number: 2,
    name: STEP_NAMES.REQUIREMENTS,
    description: 'Generate requirements document in EARS format',
    tool: 'spec_coding_requirements_start → spec_coding_requirements_confirmed',
    deliverable: 'docs/specs/{feature_name}/requirements.md'
  },
  {
    step_number: 3,
    name: STEP_NAMES.DESIGN,
    description: 'Create technical design document based on requirements',
    tool: 'spec_coding_design_start → spec_coding_design_confirmed',
    deliverable: 'docs/specs/{feature_name}/design.md'
  },
  {
    step_number: 4,
    name: STEP_NAMES.TASKS,
    description: 'Generate executable development task list',
    tool: 'spec_coding_tasks_start → spec_coding_tasks_confirmed',
    deliverable: 'docs/specs/{feature_name}/tasks.md'
  },
  {
    step_number: 5,
    name: STEP_NAMES.EXECUTION,
    description: 'Execute development tasks one by one',
    tool: 'spec_coding_execute_start',
    deliverable: 'Actual code implementation'
  }
];

// Get workflow overview helper function
export function getWorkflowOverview(currentStepName: string): WorkflowOverview {
  const currentStep = WORKFLOW_STEPS.find(step => step.name === currentStepName);
  const stepNumber = currentStep?.step_number || 1;
  
  return {
    total_steps: WORKFLOW_STEPS.length,
    current_step: currentStepName,
    current_step_number: stepNumber,
    steps: WORKFLOW_STEPS
  };
}