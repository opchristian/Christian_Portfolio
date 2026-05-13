/** Designed preview mocks when no screenshot file exists. Pure presentational. */

import type { ReactNode } from "react";

export function CampusConnectPlaceholder() {
  return (
    <div className="flex h-full min-h-[220px] w-full flex-col bg-gradient-to-b from-zinc-950 via-zinc-900/95 to-zinc-950 p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold tracking-tight text-white sm:text-xs">
          CampusConnect
        </span>
        <div className="flex flex-1 justify-end">
          <div className="h-7 max-w-[140px] flex-1 rounded-full border border-white/10 bg-white/[0.06] sm:max-w-[180px]" />
        </div>
      </div>
      <div className="mb-2 flex gap-2">
        <span className="rounded-lg border border-accent/40 bg-accent/15 px-2 py-1 text-[9px] font-semibold text-accent sm:text-[10px]">
          Services
        </span>
        <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-[9px] font-medium text-zinc-400 sm:text-[10px]">
          Textbooks
        </span>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2 sm:gap-2.5">
        {[
          { title: "Graphing calc", price: "$42" },
          { title: "Chem study pack", price: "$18" },
          { title: "Peer tutoring", price: "$15/hr" },
          { title: "CS textbook set", price: "$89" },
        ].map((item, i) => (
          <div
            key={item.title}
            className="flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.03] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <div
              className="mb-2 aspect-[4/3] w-full rounded-lg bg-gradient-to-br from-accent/25 to-accent/5"
              style={{ opacity: 1 - i * 0.06 }}
            />
            <p className="line-clamp-2 text-[10px] font-semibold leading-tight text-zinc-200 sm:text-[11px]">
              {item.title}
            </p>
            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="text-[10px] font-bold text-accent sm:text-xs">{item.price}</span>
              <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-accent">
                Trusted
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InboxIQPlaceholder() {
  const rows = [
    { tag: "Work", ai: true },
    { tag: null, ai: false },
    { tag: "School", ai: true },
    { tag: null, ai: false },
    { tag: "Updates", ai: false },
    { tag: null, ai: true },
  ];
  return (
    <div className="flex h-full min-h-[220px] w-full overflow-hidden bg-zinc-950">
      <div className="flex w-9 shrink-0 flex-col items-center gap-2 border-r border-white/10 bg-zinc-900/90 py-3 sm:w-11">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-6 w-6 rounded-md border bg-white/[0.04]"
            style={{
              borderColor: i === 1 ? "rgba(34,197,94,0.45)" : "rgba(255,255,255,0.1)",
            }}
          />
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-white/10 px-2 py-2 sm:px-3">
          <div className="h-2.5 w-24 rounded bg-white/15 sm:w-32" />
          <div className="h-6 w-6 rounded border border-white/10 bg-white/5" />
        </div>
        <div className="flex-1 overflow-hidden">
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex items-center gap-2 border-b border-white/[0.06] px-2 py-2 sm:gap-3 sm:px-3"
            >
              <div className="h-3 w-3 shrink-0 rounded-sm border border-white/20 bg-white/[0.03]" />
              <div className="min-w-0 flex-1 space-y-1">
                <div
                  className="h-2 rounded bg-white/20"
                  style={{ width: `${68 - (i % 3) * 8}%` }}
                />
                <div className="h-1.5 w-[42%] rounded bg-white/10" />
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {row.ai ? (
                  <span className="rounded px-1 py-0.5 text-[8px] font-bold uppercase tracking-wide text-accent sm:text-[9px]">
                    AI
                  </span>
                ) : null}
                {row.tag ? (
                  <span className="hidden rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[8px] font-semibold text-accent sm:inline">
                    {row.tag}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MazeGridPlaceholder() {
  const cols = 18;
  const rows = 12;
  const path = new Set(
    [
      [2, 6],
      [3, 6],
      [4, 6],
      [5, 6],
      [6, 6],
      [7, 6],
      [8, 6],
      [8, 5],
      [8, 4],
      [8, 3],
      [8, 2],
      [9, 2],
      [10, 2],
      [11, 2],
      [12, 2],
      [13, 2],
      [14, 2],
      [15, 2],
      [15, 3],
      [15, 4],
      [15, 5],
      [15, 6],
      [15, 7],
      [15, 8],
      [14, 8],
      [13, 8],
      [12, 8],
      [11, 8],
      [10, 8],
      [9, 8],
      [8, 8],
      [7, 8],
      [6, 8],
      [6, 9],
      [6, 10],
    ].map(([c, r]) => `${c},${r}`),
  );
  const start = "2,6";
  const end = "6,10";

  const cells: ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = `${c},${r}`;
      const onPath = path.has(key);
      const isStart = key === start;
      const isEnd = key === end;
      cells.push(
        <div
          key={key}
          className={[
            "aspect-square rounded-[1px] sm:rounded-[2px]",
            onPath
              ? "bg-accent/55 shadow-[0_0_6px_rgba(34,197,94,0.35)]"
              : "bg-zinc-800/80",
            isStart ? "ring-1 ring-white/70 ring-offset-0" : "",
            isEnd ? "ring-1 ring-accent ring-offset-0" : "",
          ].join(" ")}
        />,
      );
    }
  }

  return (
    <div className="flex h-full min-h-[220px] w-full flex-col bg-zinc-950 p-2 sm:p-3">
      <div className="mb-2 flex items-center justify-between px-0.5">
        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:text-[10px]">
          Path find
        </span>
        <span className="text-[9px] text-zinc-400">A → B</span>
      </div>
      <div
        className="grid w-full flex-1 gap-[1px] rounded-lg border border-white/10 bg-zinc-900/50 p-1 sm:gap-0.5"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {cells}
      </div>
    </div>
  );
}

const SUDOKU: (string | null)[] = [
  "5", "3", null, null, "7", null, null, null, null,
  "6", null, null, "1", "9", "5", null, null, null,
  null, "9", "8", null, null, null, null, "6", null,
  "8", null, null, null, "6", null, null, null, "3",
  "4", null, null, "8", null, "3", null, null, "1",
  "7", null, null, null, "2", null, null, null, "6",
  null, "6", null, null, null, null, "2", "8", null,
  null, null, null, "4", "1", "9", null, null, "5",
  null, null, null, null, "8", null, null, "7", "9",
];

export function SudokuPlaceholder() {
  return (
    <div className="flex h-full min-h-[220px] w-full flex-col items-center justify-center bg-zinc-950 p-3 sm:p-4">
      <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-zinc-500 sm:text-[10px]">
        Sudoku
      </p>
      <div className="grid w-full max-w-[min(100%,280px)] grid-cols-9 gap-px rounded-lg border-2 border-zinc-600 bg-zinc-600 p-px shadow-inner sm:max-w-[320px]">
        {SUDOKU.map((v, i) => (
          <div
            key={i}
            className={`flex aspect-square items-center justify-center bg-zinc-950 text-[9px] font-semibold sm:text-[11px] ${
              v ? "text-white" : "text-zinc-600"
            }`}
          >
            {v ?? "\u00a0"}
          </div>
        ))}
      </div>
    </div>
  );
}
