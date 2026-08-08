"use client";

import { useCallback, useState } from "react";
import { runAgent } from "../api/agent-api";
import type { AgentRun } from "../types/agent";

export function useAgentRun() {
 const [run, setRun] = useState<AgentRun>({
  id: "",
  task: "",
  status: "idle" as "idle" | "running" | "completed" | "failed",
   
});

  const execute = useCallback(async (task: string) => {
    if (!task.trim()) return;
    setRun({
      id: crypto.randomUUID(),
      task,
      status: "running",
      output: "",
    });
    try {
        const result = await runAgent(task);

     setRun((current) => ({
        ...current,
        status: "completed",
        output: result.output ?? result,
      }));
  } catch (error) {
    setRun((current) => ({
        ...current,
        status: "failed",
      }));
  }
}, []);

  return {
    run,
    
    execute,
  };
}