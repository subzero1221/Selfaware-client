import React from "react";

interface PaginationManagerProps {
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalItems: number;
}

export default function PaginationManager({
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  totalItems,
}: PaginationManagerProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-wood-surface border-[4px] border-wood-border p-4 rounded shadow-[0_3px_6px_rgba(0,0,0,0.6)] gap-4 transition-colors">
  
      <div className="flex items-center gap-3">
        <label className="text-xs font-serif font-bold text-wood-text-secondary uppercase tracking-wider drop-shadow-sm">
          ჩვენება // Show:
        </label>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="bg-wood-base border-2 border-wood-border rounded px-2 py-1 text-sm font-mono text-wood-text-primary shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] focus:outline-none focus:border-wood-accent cursor-pointer"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-wood-base border-2 border-wood-border rounded text-xs font-serif font-bold uppercase tracking-wider text-wood-text-primary shadow-sm hover:border-wood-accent hover:text-wood-accent disabled:opacity-40 disabled:cursor-not-allowed transition-all active:translate-y-px"
        >
          ⬅️ უკან
        </button>

        <span className="font-mono text-sm text-wood-text-primary bg-wood-base/50 px-3 py-1 rounded border border-wood-border/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 bg-wood-base border-2 border-wood-border rounded text-xs font-serif font-bold uppercase tracking-wider text-wood-text-primary shadow-sm hover:border-wood-accent hover:text-wood-accent disabled:opacity-40 disabled:cursor-not-allowed transition-all active:translate-y-px"
        >
          შემდეგი ➡️
        </button>
      </div>
    </div>
  );
}
