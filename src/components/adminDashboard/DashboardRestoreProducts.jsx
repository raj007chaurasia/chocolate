import React, { useEffect, useMemo, useState } from "react";

export default function DashboardRestoreProducts({ categories: categoriesProp, brands: brandsProp }) {
  const pageSize = 8;
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const categories = useMemo(() => {
    const fallback = ["Truffles", "Chocolates", "Spreads", "Lollipops"];
    if (!Array.isArray(categoriesProp)) return fallback;
    return categoriesProp.map((c) => c?.name).filter(Boolean);
  }, [categoriesProp]);

  const brands = useMemo(() => {
    const fallback = ["Cadbury", "Amul", "Nestle", "Ferrero", "Hershey's", "Lindt", "Other"];
    if (!Array.isArray(brandsProp)) return fallback;
    return brandsProp.map((b) => b?.name).filter(Boolean);
  }, [brandsProp]);

  const [items, setItems] = useState(() => [
    { id: "p-1", name: "Truffle Chocolate", category: "Truffles", brand: "Ferrero", stockQty: 12, isActive: true },
    { id: "p-2", name: "Bonbon Chocolate", category: "Chocolates", brand: "Lindt", stockQty: 7, isActive: true },
    { id: "p-3", name: "Classic Chocolate", category: "Chocolates", brand: "Cadbury", stockQty: 26, isActive: true },
    { id: "p-4", name: "Chocolate Spread", category: "Spreads", brand: "Nestle", stockQty: 4, isActive: true },
    { id: "p-5", name: "Lollipop Chocolate", category: "Lollipops", brand: "Amul", stockQty: 0, isActive: false },
    { id: "p-6", name: "Dark Chocolate Bar", category: "Chocolates", brand: "Hershey's", stockQty: 2, isActive: false },
    { id: "p-7", name: "Hazelnut Truffle", category: "Truffles", brand: "Ferrero", stockQty: 9, isActive: true },
    { id: "p-8", name: "Milk Chocolate Bar", category: "Chocolates", brand: "Cadbury", stockQty: 18, isActive: true },
    { id: "p-9", name: "Almond Spread", category: "Spreads", brand: "Other", stockQty: 5, isActive: true },
    { id: "p-10", name: "Fruit & Nut Chocolate", category: "Chocolates", brand: "Amul", stockQty: 3, isActive: true },
  ]);

  const [draftQty, setDraftQty] = useState(() => ({}));

  const filtered = useMemo(() => {
    return items.filter((p) => {
      if (category && p.category !== category) return false;
      if (brand && p.brand !== brand) return false;
      return true;
    });
  }, [items, category, brand]);

  const lowStock = useMemo(() => {
    return [...items]
      .sort((a, b) => (a.stockQty ?? 0) - (b.stockQty ?? 0))
      .slice(0, 5);
  }, [items]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const getDraft = (id) => {
    const raw = draftQty[id];
    if (raw === undefined || raw === null) return "";
    return String(raw);
  };

  const setDraft = (id, value) => {
    setDraftQty((prev) => ({ ...prev, [id]: value }));
  };

  const bumpDelta = (id, delta) => {
    const n = Number(getDraft(id));
    const base = Number.isFinite(n) ? n : 0;
    const next = base + delta;
    setDraft(id, String(Math.max(0, next)));
  };

  const readDelta = (id) => {
    const n = Number(getDraft(id));
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.floor(n));
  };

  const clearDraft = (id) => {
    setDraftQty((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const onAddQty = (id) => {
    const delta = readDelta(id);
    if (delta <= 0) return;

    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stockQty: (p.stockQty ?? 0) + delta } : p))
    );
    clearDraft(id);
  };

  const onRemoveQty = (id) => {
    const delta = readDelta(id);
    if (delta <= 0) return;

    setItems((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const next = Math.max(0, (p.stockQty ?? 0) - delta);
        return { ...p, stockQty: next };
      })
    );
    clearDraft(id);
  };

  const onToggleActive = (id) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)));
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#3b2a23]">Stock & Restore</h2>
        <p className="text-[#7c6a5a] mt-1 text-sm">Check remaining quantity, update stock, and restore products.</p>
      </div>

      {/* Low stock */}
      <section className="bg-white rounded-lg border border-[#ececec] overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-[#ececec] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-[#3b2a23]">Low Stock (Top)</h3>
            <span className="text-xs font-bold bg-[#fffaf9] border border-[#ececec] px-2 py-1 rounded-full text-[#3b2a23]">
              {lowStock.length}
            </span>
          </div>
          <div className="text-xs text-[#7c6a5a]">Lowest quantity products first</div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lowStock.map((p) => (
            <div key={p.id} className="rounded-lg border border-[#ececec] bg-[#f7f7f7] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-[#3b2a23]">{p.name}</div>
                  <div className="text-xs text-[#7c6a5a] mt-1">
                    {p.category} • {p.brand}
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full border ${p.stockQty <= 5 ? "bg-[#fffaf9] border-[#ab8351] text-[#3b2a23]" : "bg-white border-[#ececec] text-[#3b2a23]"}`}>
                  Qty: {p.stockQty}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onToggleActive(p.id)}
                  className={`cursor-pointer text-xs font-bold px-3 py-2 rounded-md border ${
                    p.isActive
                      ? "bg-white border-[#ececec] text-green-700"
                      : "bg-white border-[#ab8351] text-red-700"
                  }`}
                  aria-label="Toggle active status"
                >
                  {p.isActive ? "Active" : "Inactive"}
                </button>
               
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* List */}
      <section className="bg-white rounded-lg border border-[#ececec] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#ececec] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-[#3b2a23]">Product Stock List</h3>
            <span className="text-xs font-bold bg-[#f7f7f7] border border-[#ececec] px-2 py-1 rounded-full text-[#3b2a23]">
              {filtered.length}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="w-full sm:w-[220px] rounded-md border border-[#ececec] bg-white px-4 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
                setPage(1);
              }}
              className="w-full sm:w-[220px] rounded-md border border-[#ececec] bg-white px-4 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
              aria-label="Filter by brand"
            >
              <option value="">All Brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#fffaf9] text-[#3b2a23]">
              <tr>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">SL</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Product Name</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Category</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Brand</th>
                <th className="text-right font-bold px-6 py-4 whitespace-nowrap">Remaining Qty</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap w-full flex justify-center items-center">Adjust Qty</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-[#7c6a5a]">
                    No products found.
                  </td>
                </tr>
              ) : (
                pageItems.map((p, idx) => {
                  const current = p.stockQty ?? 0;
                  const isLow = current <= 5;
                  return (
                    <tr
                      key={p.id}
                      className={`border-t border-[#ececec] hover:bg-[#fffaf9] transition-colors duration-150 ${
                        isLow ? "bg-[#fffaf9]" : ""
                      }`}
                    >
                      <td className="px-6 py-5 text-[#3b2a23]">{(safePage - 1) * pageSize + idx + 1}</td>
                      <td className="px-6 py-5 text-[#3b2a23]">
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-xs text-[#7c6a5a]">ID: {p.id}</div>
                      </td>
                      <td className="px-6 py-5 text-[#7c6a5a] font-semibold whitespace-nowrap">{p.category || "—"}</td>
                      <td className="px-6 py-5 text-[#7c6a5a] font-semibold whitespace-nowrap">{p.brand || "—"}</td>
                      <td className="px-6 py-5 text-right">
                        <span
                          className={`inline-flex items-center justify-center min-w-12 px-3 py-1 rounded-md border font-bold ${
                            isLow ? "bg-white border-[#ab8351] text-[#3b2a23]" : "bg-[#f7f7f7] border-[#ececec] text-[#3b2a23]"
                          }`}
                        >
                          {current}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col items-center gap-2">

                          <div className="flex gap-2">
                             <button
                            type="button"
                            onClick={() => bumpDelta(p.id, -1)}
                            className="cursor-pointer w-9 h-9 rounded-md bg-[#f7f7f7] text-[#3b2a23] border border-[#ececec]"
                            aria-label="Decrease"
                          >
                            −
                          </button>
                          <input
                            value={getDraft(p.id)}
                            onChange={(e) => setDraft(p.id, e.target.value)}
                            inputMode="numeric"
                            className="w-24 rounded-md border border-[#ececec] bg-white px-3 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
                            placeholder="0"
                            aria-label="Quantity change amount"
                          />
                          <button
                            type="button"
                            onClick={() => bumpDelta(p.id, 1)}
                            className="cursor-pointer w-9 h-9 rounded-md bg-[#f7f7f7] text-[#3b2a23] border border-[#ececec]"
                            aria-label="Increase"
                          >
                            +
                          </button>
                         
                          </div>
                            <div className="flex items-center gap-4">
                                 <button
                            type="button"
                            onClick={() => onAddQty(p.id)}
                            className="cursor-pointer rounded-md border border-[#ab8351] text-[#ab8351] bg-white px-3 py-2 text-xs font-bold hover:bg-[#fffaf9]"
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemoveQty(p.id)}
                            className="cursor-pointer rounded-md border border-[#ececec] text-[#3b2a23] bg-[#f7f7f7] px-3 py-2 text-xs font-bold hover:bg-[#fffaf9]"
                          >
                            Remove
                          </button>
                            </div>
                         
                        </div>
                       
                      </td>
                      <td className="px-6 py-5">
                        <button
                          type="button"
                          onClick={() => onToggleActive(p.id)}
                          className={`cursor-pointer text-xs font-bold px-3 py-2 rounded-md border ${
                            p.isActive
                              ? "bg-white border-[#ececec] text-green-700"
                              : "bg-white border-[#ab8351] text-red-700"
                          }`}
                          aria-label="Toggle active status"
                        >
                          {p.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[#ececec] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm text-[#7c6a5a]">
            Page <span className="font-semibold text-[#3b2a23]">{safePage}</span> of{" "}
            <span className="font-semibold text-[#3b2a23]">{totalPages}</span>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="cursor-pointer w-9 h-9 rounded-md bg-[#f7f7f7] text-[#3b2a23] border border-[#ececec] disabled:opacity-50"
              disabled={safePage === 1}
              aria-label="Previous page"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(0, 8)
              .map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`cursor-pointer w-9 h-9 rounded-md border text-sm font-bold transition-colors duration-150 ${
                    p === safePage
                      ? "bg-[#ab8351] text-white border-[#ab8351]"
                      : "bg-[#f7f7f7] text-[#3b2a23] border-[#ececec] hover:bg-[#fffaf9]"
                  }`}
                  aria-label={`Page ${p}`}
                >
                  {p}
                </button>
              ))}

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="cursor-pointer w-9 h-9 rounded-md bg-[#f7f7f7] text-[#3b2a23] border border-[#ececec] disabled:opacity-50"
              disabled={safePage === totalPages}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
