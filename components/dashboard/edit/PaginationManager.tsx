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
    <div className="flex flex-col sm:flex-row justify-between items-center bg-brutal-blue border-4 border-brutal-dark p-4 md:p-6 rounded-3xl shadow-[4px_8px_0_0_var(--color-brutal-dark)] gap-6 transition-all -rotate-1 hover:rotate-0">
      <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl border-4 border-brutal-dark shadow-[4px_4px_0_0_var(--color-brutal-dark)]">
        <label className="text-sm font-black text-brutal-dark uppercase tracking-wider">
          ჩვენება:
        </label>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="bg-transparent text-base font-black text-brutal-dark focus:outline-none cursor-pointer"
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
          className="px-5 py-3 cursor-pointer bg-brutal-yellow border-4 border-brutal-dark rounded-2xl text-sm font-black uppercase tracking-wider text-brutal-dark shadow-[4px_4px_0_0_var(--color-brutal-dark)] hover:scale-105 active:scale-95 active:translate-y-[4px] active:shadow-[0px_0px_0_0_var(--color-brutal-dark)] disabled:opacity-50 disabled:pointer-events-none transition-all rotate-2"
        >
          უკან
        </button>

        <span className="font-black text-lg text-white bg-brutal-dark px-4 py-2 rounded-xl shadow-inner border-2 border-white/20">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages}
          className="px-5 py-3 cursor-pointer bg-brutal-green border-4 border-brutal-dark rounded-2xl text-sm font-black uppercase tracking-wider text-white shadow-[4px_4px_0_0_var(--color-brutal-dark)] hover:scale-105 active:scale-95 active:translate-y-[4px] active:shadow-[0px_0px_0_0_var(--color-brutal-dark)] disabled:opacity-50 disabled:pointer-events-none transition-all -rotate-2"
        >
          შემდეგი
        </button>
      </div>
    </div>
  );
}
