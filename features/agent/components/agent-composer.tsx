"use client";

import { useState } from "react";


type AgentComposerProps = {
  loading?: boolean;
  onSubmit: (task: string) => void;
};

export function AgentComposer({
  loading,
  onSubmit,
}: AgentComposerProps) {
  const [task, setTask] = useState("");
 const [isRunning, setIsRunning] = useState(false);

  function handleSubmit() {
    if (!task.trim() || loading) return;

    setIsRunning(true);
    onSubmit(task);
     setIsRunning(false);
  }

  return (
    <section className="rounded-xl border border-white/[0.08] bg-zinc-900/70 p-5">
      <div className="mb-4 flex items-center gap-2 text-[11px] text-zinc-400">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />

        Agent orchestration ready
      </div>

      <textarea
        value={task}
        onChange={(event) => setTask(event.target.value)}
        placeholder="Tell your agents what you want them to accomplish..."
        className="h-24 w-full resize-none border-0 bg-transparent text-lg leading-relaxed text-white outline-none placeholder:text-zinc-600"
      />

      <div className="flex flex-col justify-between gap-3 border-t border-white/[0.06] pt-4 sm:flex-row sm:items-center">
       

        <button
          onClick={handleSubmit}
          disabled={loading || !task.trim()}
          className="rounded-lg bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Running..." : "Run agents →"}
        </button>
      </div>
    </section>
  );
}