"use client";
import { useAgentRun } from "../hooks/use-agent-run";
import { AgentComposer } from "./agent-composer";
import { AgentOutput } from "./agent-output";



export function AgentDashboard() {
  const { run, execute } = useAgentRun();
 
  return (
    <div className="min-h-screen bg-[#08090d] text-white">
     
      <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-8">
        <AgentComposer
        
          onSubmit={execute}
        />

       
            <AgentOutput output={run?.output}  isRunning={run.status === "running"}/>
          
      </main>
    </div>
  );
}