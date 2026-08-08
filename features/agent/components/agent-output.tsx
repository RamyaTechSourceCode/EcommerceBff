type AgentOutputProps = {
  output?: string;
};

export function AgentOutput({ output ,isRunning }: AgentOutputProps & { isRunning: boolean }) {
  return (
    <section className="rounded-xl border border-white/[0.07] bg-zinc-900/70 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] font-bold tracking-[0.15em] text-zinc-600">
            LIVE OUTPUT
          </p>

          <h2 className="mt-1 text-sm font-semibold text-white">
            Agent response
          </h2>
        </div>

        <span className="flex items-center gap-1 text-[8px] text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          LIVE
        </span>
      </div>

      <div className="mt-5 text-[25px] leading-7 text-zinc-400">
        <p>
          {isRunning ? (
          <span className="flex items-center gap-2 text-[10px] text-yellow-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
            RUNNING
          </span>
        ) : (
          <span className="flex items-center gap-2 text-[10px] text-green-400">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            READY
          </span>
        )}
        </p>

      </div>

         <div className="mt-5 text-[25px] leading-7 text-zinc-400">
        <p>
          {output ??
            "Start an agent run to see the live response."}
        </p>

      </div>
    </section>
  );
}