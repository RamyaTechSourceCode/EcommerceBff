export type AgentStatus = "idle" | "running" | "completed" | "failed";

export type AgentRun = {
  id: string;
  task: string;
  status: AgentStatus;
  output?: string;
};