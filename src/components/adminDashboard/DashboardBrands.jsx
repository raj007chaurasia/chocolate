import React, { useEffect, useId, useMemo, useState } from "react";
import { FiEdit2, FiImage, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";

const DEFAULT_BRANDS = [
  { id: "brand-cadbury", name: "Cadbury", isActive: true, imageDataUrl: "", imageName: "" },
  { id: "brand-amul", name: "Amul", isActive: true, imageDataUrl: "", imageName: "" },
  { id: "brand-nestle", name: "Nestle", isActive: true, imageDataUrl: "", imageName: "" },
  { id: "brand-ferrero", name: "Ferrero", isActive: true, imageDataUrl: "", imageName: "" },
  { id: "brand-hersheys", name: "Hershey's", isActive: true, imageDataUrl: "", imageName: "" },
  { id: "brand-lindt", name: "Lindt", isActive: true, imageDataUrl: "", imageName: "" },
  { id: "brand-other", name: "Other", isActive: true, imageDataUrl: "", imageName: "" },
];

function normalizeBrandName(name) {
  return String(name ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-label={label}
      className={`cursor-pointer inline-flex items-center h-7 w-12 rounded-full border transition-colors duration-150 ${
        checked ? "bg-[#ab8351] border-[#ab8351]" : "bg-[#f7f7f7] border-[#ececec]"
      }`}
    >
      <span
        className={`h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform duration-150 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
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

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export default function DashboardBrands({ brands: brandsProp, setBrands: setBrandsProp }) {
  const formId = useId();

  const pageSize = 8;
  const [page, setPage] = useState(1);

  const [localBrands, setLocalBrands] = useState(() => DEFAULT_BRANDS.map((b) => ({ ...b })));
  const brands = brandsProp ?? localBrands;
  const setBrands = setBrandsProp ?? setLocalBrands;
  const [query, setQuery] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [draftName, setDraftName] = useState("");
  const [draftImage, setDraftImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const sorted = useMemo(() => {
    return [...brands].sort((a, b) => a.name.localeCompare(b.name));
  }, [brands]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter((b) => String(b.name ?? "").toLowerCase().includes(q));
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

  const closeModal = () => {
    setModalOpen(false);
    setModalMode("add");
    setEditingId(null);
    setDraftName("");
    setDraftImage(null);
  };

  const openAdd = () => {
    setModalMode("add");
    setEditingId(null);
    setDraftName("");
    setDraftImage(null);
    setModalOpen(true);
  };

  const openEdit = (id) => {
    const current = brands.find((b) => b.id === id);
    if (!current) return;
    setModalMode("edit");
    setEditingId(id);
    setDraftName(current.name ?? "");
    setDraftImage(null);
    setModalOpen(true);
  };

  const upsert = async () => {
    const name = String(draftName ?? "").trim().replace(/\s+/g, " ");
    if (!name) {
      window.alert("Please enter brand name.");
      return;
    }

    const norm = normalizeBrandName(name);
    const isDuplicate = brands.some((b) => {
      if (modalMode === "edit" && b.id === editingId) return false;
      return normalizeBrandName(b.name) === norm;
    });

    if (isDuplicate) {
      window.alert("This brand already exists.");
      return;
    }

    let imageDataUrl = "";
    let imageName = "";
    if (draftImage) {
      try {
        imageDataUrl = await fileToDataUrl(draftImage);
        imageName = draftImage.name ?? "";
      } catch {
        window.alert("Failed to read image.");
        return;
      }
    }

    if (modalMode === "add") {
      const id = `brand-${Date.now()}`;
      setBrands((prev) => [{ id, name, isActive: true, imageDataUrl, imageName }, ...prev]);
      closeModal();
      return;
    }

    if (modalMode === "edit" && editingId) {
      setBrands((prev) =>
        prev.map((b) => {
          if (b.id !== editingId) return b;
          return {
            ...b,
            name,
            imageDataUrl: imageDataUrl || b.imageDataUrl || "",
            imageName: imageName || b.imageName || "",
          };
        })
      );
      closeModal();
    }
  };

  const onDelete = (id) => {
    const current = brands.find((b) => b.id === id);
    const ok = window.confirm(`Delete brand “${current?.name ?? ""}”?`);
    if (!ok) return;
    setBrands((prev) => prev.filter((b) => b.id !== id));
  };

  const onToggleActive = (id, next) => {
    setBrands((prev) => prev.map((b) => (b.id === id ? { ...b, isActive: next } : b)));
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
            <h3 className="text-base font-bold text-[#3b2a23]">Brand List</h3>
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
                  placeholder="Search brand..."
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
              <FiPlus /> Add Brand
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#fffaf9] text-[#3b2a23]">
              <tr>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">SL</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Image</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Brand Name</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Status</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-[#7c6a5a]">
                    No brands found.
                  </td>
                </tr>
              ) : (
                pageItems.map((b, idx) => (
                  <tr
                    key={b.id}
                    className="border-t border-[#ececec] hover:bg-[#fffaf9] transition-colors duration-150"
                  >
                    <td className="px-6 py-5 text-[#3b2a23]">{(safePage - 1) * pageSize + idx + 1}</td>
                    <td className="px-6 py-5">
                      {b.imageDataUrl ? (
                        <img
                          src={b.imageDataUrl}
                          alt={b.name}
                          className="w-12 h-12 rounded-md border border-[#ececec] object-cover bg-white"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-md border border-[#ececec] bg-[#f7f7f7] flex items-center justify-center text-[#7c6a5a]">
                          <FiImage />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-5 text-[#3b2a23]">
                      <div className="font-semibold">{b.name}</div>
                      <div className="text-xs text-[#7c6a5a]">ID: {b.id}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <Toggle
                          checked={!!b.isActive}
                          onChange={(next) => onToggleActive(b.id, next)}
                          label="Toggle active"
                        />
                        <span className={`text-xs font-bold ${b.isActive ? "text-green-700" : "text-red-700"}`}>
                          {b.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(b.id)}
                          className="cursor-pointer w-10 h-10 rounded-md border border-[#ab8351] text-[#ab8351] hover:bg-[#fffaf9] flex items-center justify-center transition-colors duration-150"
                          aria-label="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(b.id)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true">
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
                  {modalMode === "add" ? "Add Brand" : "Edit Brand"}
                </h4>
                <div className="text-xs text-[#7c6a5a] mt-1">Enter brand details and save.</div>
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
                Brand name <span className="text-[#ab8351]">*</span>
              </label>
              <div className="mt-2">
                <TextInput
                  id={`${formId}-name`}
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  placeholder="Enter brand name"
                />
              </div>
            </div>

            <div className="mt-5">
              <div className="text-sm font-semibold text-[#3b2a23]">Brand image</div>
              <div className="text-xs text-[#7c6a5a] mt-1">Upload a logo/image (optional).</div>

              <input
                id={`${formId}-image`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setDraftImage(e.target.files?.[0] ?? null)}
              />

              <label
                htmlFor={`${formId}-image`}
                className="mt-3 flex h-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#ececec] bg-white px-4 text-center hover:bg-[#ffedea] transition-colors"
              >
                <div className="mb-2 text-[#ab8351] text-2xl">
                  <FiImage />
                </div>
                <div className="text-sm font-semibold text-[#3b2a23]">Click to upload</div>
                <div className="text-xs text-[#7c6a5a]">or drag and drop</div>
                {draftImage?.name ? (
                  <div className="mt-3 text-xs font-semibold text-[#3b2a23] break-all">{draftImage.name}</div>
                ) : null}
              </label>
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
