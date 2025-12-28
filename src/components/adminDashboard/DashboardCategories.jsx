import React, { useEffect, useId, useMemo, useState } from "react";
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";

const DEFAULT_CATEGORIES = [
  { id: "cat-truffles", name: "Truffles", isActive: true },
  { id: "cat-chocolates", name: "Chocolates", isActive: true },
  { id: "cat-spreads", name: "Spreads", isActive: true },
  { id: "cat-lollipops", name: "Lollipops", isActive: true },
];

function normalizeCategoryName(name) {
  return String(name ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function TextInput({ id, value, onChange, placeholder }) {
  return (
    <input
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-lg border border-[#ececec] bg-white px-4 py-3 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
    />
  );
}

export default function DashboardCategories({ categories: categoriesProp, setCategories: setCategoriesProp }) {
  const formId = useId();

  const pageSize = 8;
  const [page, setPage] = useState(1);

  const [localCategories, setLocalCategories] = useState(() => DEFAULT_CATEGORIES.map((c) => ({ ...c })));
  const categories = categoriesProp ?? localCategories;
  const setCategories = setCategoriesProp ?? setLocalCategories;
  const [query, setQuery] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [draftName, setDraftName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const sorted = useMemo(() => {
    return [...categories].sort((a, b) => a.name.localeCompare(b.name));
  }, [categories]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter((c) => String(c.name ?? "").toLowerCase().includes(q));
  }, [sorted, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const openAdd = () => {
    setModalMode("add");
    setEditingId(null);
    setDraftName("");
    setModalOpen(true);
  };

  const openEdit = (id) => {
    const current = categories.find((c) => c.id === id);
    if (!current) return;
    setModalMode("edit");
    setEditingId(id);
    setDraftName(current.name ?? "");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setDraftName("");
    setEditingId(null);
    setModalMode("add");
  };

  const upsert = () => {
    const name = String(draftName ?? "").trim().replace(/\s+/g, " ");
    if (!name) {
      window.alert("Please enter category name.");
      return;
    }

    const norm = normalizeCategoryName(name);
    const isDuplicate = categories.some((c) => {
      if (modalMode === "edit" && c.id === editingId) return false;
      return normalizeCategoryName(c.name) === norm;
    });

    if (isDuplicate) {
      window.alert("This category already exists.");
      return;
    }

    if (modalMode === "add") {
      const id = `cat-${Date.now()}`;
      setCategories((prev) => [{ id, name, isActive: true }, ...prev]);
      closeModal();
      return;
    }

    if (modalMode === "edit" && editingId) {
      setCategories((prev) => prev.map((c) => (c.id === editingId ? { ...c, name } : c)));
      closeModal();
    }
  };

  const onDelete = (id) => {
    const current = categories.find((c) => c.id === id);
    const ok = window.confirm(`Delete category “${current?.name ?? ""}”?`);
    if (!ok) return;
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const onKeyDown = (e) => {
    if (!modalOpen) return;
    if (e.key === "Escape") closeModal();
  };

  return (
    <div className="w-full" onKeyDown={onKeyDown}>
      <section className="bg-white rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-[#ececec] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-[#3b2a23]">Category List</h3>
            <span className="text-xs font-bold bg-[#f7f7f7] border border-[#ececec] px-2 py-1 rounded-full text-[#3b2a23]">
              {filtered.length}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="w-full sm:w-[320px]">
              <div className="flex items-stretch border border-[#ececec] rounded-md overflow-hidden bg-white focus-within:border-[#ab8351]">
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search category..."
                  className="flex-1 px-4 py-2 text-sm outline-none text-[#3b2a23]"
                />
                <div className="w-11 border-l border-[#ececec] flex items-center justify-center text-[#3b2a23]">
                  <FiSearch />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={openAdd}
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md bg-[#ab8351] px-4 py-2 text-sm font-bold text-white hover:opacity-95"
            >
              <FiPlus /> Add Category
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#fffaf9] text-[#3b2a23]">
              <tr>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">SL</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Category Name</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-[#7c6a5a]">
                    No categories found.
                  </td>
                </tr>
              ) : (
                pageItems.map((c, idx) => (
                  <tr
                    key={c.id}
                    className="border-t border-[#ececec] hover:bg-[#fffaf9] transition-colors duration-150"
                  >
                    <td className="px-6 py-5 text-[#3b2a23]">{(safePage - 1) * pageSize + idx + 1}</td>
                    <td className="px-6 py-5 text-[#3b2a23]">
                      <div className="font-semibold">{c.name}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(c.id)}
                          className="cursor-pointer w-10 h-10 rounded-md border border-[#ab8351] text-[#ab8351] hover:bg-[#fffaf9] flex items-center justify-center transition-colors duration-150"
                          aria-label="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(c.id)}
                          className="cursor-pointer w-10 h-10 rounded-md border border-red-500 text-red-600 hover:bg-[#fffaf9] flex items-center justify-center transition-colors duration-150"
                          aria-label="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
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

      {modalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#3b2a23]/40"
            aria-label="Close"
            onClick={closeModal}
          />

          <div className="relative w-full max-w-md rounded-lg border border-[#ececec] bg-white shadow p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-[#3b2a23]">
                  {modalMode === "add" ? "Add Category" : "Edit Category"}
                </h4>
                <div className="text-xs text-[#7c6a5a] mt-1">Enter category name and save.</div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="cursor-pointer inline-flex items-center justify-center rounded-md border border-[#ececec] bg-[#f7f7f7] px-3 py-2 text-sm font-bold text-[#3b2a23] hover:bg-[#fffaf9]"
              >
                Close
              </button>
            </div>

            <div className="mt-5">
              <label htmlFor={`${formId}-name`} className="text-sm font-semibold text-[#3b2a23]">
                Category name <span className="text-[#ab8351]">*</span>
              </label>
              <div className="mt-2">
                <TextInput
                  id={`${formId}-name`}
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  placeholder="Enter category name"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="cursor-pointer inline-flex items-center justify-center rounded-md border border-[#ececec] bg-[#f7f7f7] px-4 py-2 text-sm font-bold text-[#3b2a23] hover:bg-[#fffaf9]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={upsert}
                className="cursor-pointer inline-flex items-center justify-center rounded-md bg-[#ab8351] px-5 py-2 text-sm font-bold text-white hover:opacity-95"
              >
                {modalMode === "add" ? "Add" : "Save"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
