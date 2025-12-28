import React, { useEffect, useMemo, useState } from "react";
import { FiDownload, FiEdit2, FiSearch, FiTrash2 } from "react-icons/fi";
import ProductEditForm from "./ProductEditForm";

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

function toCsv(rows) {
  const escape = (value) => {
    const str = String(value ?? "");
    if (/[\n\r,\"]/g.test(str)) return `"${str.replace(/\"/g, '""')}"`;
    return str;
  };

  const headers = ["SL", "Product Name", "Category", "Brand", "Unit Price", "Best Seller", "Active"];
  const lines = [headers.map(escape).join(",")];
  rows.forEach((r, idx) => {
    lines.push(
      [
        idx + 1,
        r.name,
        r.category,
        r.brand,
        r.unitPrice,
        r.isBestSeller ? "Yes" : "No",
        r.isActive ? "Active" : "Inactive",
      ]
        .map(escape)
        .join(",")
    );
  });
  return lines.join("\n");
}

export default function DashboardProducts({ categories, brands, flavors }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [mode, setMode] = useState("list");
  const [editingId, setEditingId] = useState(null);

  const [products, setProducts] = useState(() => [
    {
      id: "p-1",
      name: "Truffle Chocolate",
      description: "Rich truffle chocolates with premium cocoa.",
      information: "Store in a cool, dry place.",
      category: "Truffles",
      brand: "Ferrero",
      flavor: "Chocolate",
      dietType: "Vegetarian",
      weight: "250g",
      tags: ["truffle", "premium"],
      unitPrice: 299,
      stockQty: 50,
      discountAmount: 0,
      thumbnailName: "Truffle.png",
      additionalImageNames: [],
      isBestSeller: true,
      isActive: true,
    },
    {
      id: "p-2",
      name: "Bonbon Chocolate",
      description: "Assorted bonbons with smooth filling.",
      information: "Best before 6 months.",
      category: "Chocolates",
      brand: "Lindt",
      flavor: "Mixed",
      dietType: "Vegetarian",
      weight: "200g",
      tags: ["bonbon"],
      unitPrice: 249,
      stockQty: 35,
      discountAmount: 0,
      thumbnailName: "Bonbon.png",
      additionalImageNames: [],
      isBestSeller: true,
      isActive: true,
    },
    {
      id: "p-3",
      name: "Classic Chocolate",
      description: "Classic chocolate bar for everyday cravings.",
      information: "Contains milk and soy.",
      category: "Chocolates",
      brand: "Cadbury",
      flavor: "Milk",
      dietType: "Vegetarian",
      weight: "150g",
      tags: ["classic"],
      unitPrice: 199,
      stockQty: 80,
      discountAmount: 0,
      thumbnailName: "Chocolate.png",
      additionalImageNames: [],
      isBestSeller: false,
      isActive: true,
    },
    {
      id: "p-4",
      name: "Chocolate Spread",
      description: "Creamy spread for breads and desserts.",
      information: "Refrigerate after opening.",
      category: "Spreads",
      brand: "Nestle",
      flavor: "Chocolate",
      dietType: "Vegetarian",
      weight: "400g",
      tags: ["spread"],
      unitPrice: 349,
      stockQty: 20,
      discountAmount: 0,
      thumbnailName: "Chocolate1.png",
      additionalImageNames: [],
      isBestSeller: false,
      isActive: true,
    },
    {
      id: "p-5",
      name: "Lollipop Chocolate",
      description: "Fun chocolate lollipops for kids.",
      information: "Pack of 10.",
      category: "Lollipops",
      brand: "Amul",
      flavor: "Chocolate",
      dietType: "Vegetarian",
      weight: "10 pcs",
      tags: ["lollipop"],
      unitPrice: 99,
      stockQty: 120,
      discountAmount: 0,
      thumbnailName: "Lollipop.png",
      additionalImageNames: [],
      isBestSeller: true,
      isActive: true,
    },
    {
      id: "p-6",
      name: "Dark Chocolate Bar",
      description: "High cocoa dark chocolate bar.",
      information: "May contain traces of nuts.",
      category: "Chocolates",
      brand: "Hershey's",
      flavor: "Dark",
      dietType: "Vegan",
      weight: "100g",
      tags: ["dark"],
      unitPrice: 179,
      stockQty: 0,
      discountAmount: 0,
      thumbnailName: "Chocolate.png",
      additionalImageNames: [],
      isBestSeller: false,
      isActive: false,
    },
    {
      id: "p-7",
      name: "Hazelnut Truffle",
      description: "Truffle chocolate with hazelnut notes.",
      information: "Contains nuts.",
      category: "Truffles",
      brand: "Ferrero",
      flavor: "Hazelnut",
      dietType: "Vegetarian",
      weight: "250g",
      tags: ["hazelnut", "truffle"],
      unitPrice: 329,
      stockQty: 22,
      discountAmount: 0,
      thumbnailName: "Truffle.png",
      additionalImageNames: [],
      isBestSeller: false,
      isActive: true,
    },
    {
      id: "p-8",
      name: "Milk Chocolate Bar",
      description: "Smooth milk chocolate bar.",
      information: "Contains milk.",
      category: "Chocolates",
      brand: "Cadbury",
      flavor: "Milk",
      dietType: "Vegetarian",
      weight: "120g",
      tags: ["milk"],
      unitPrice: 149,
      stockQty: 60,
      discountAmount: 0,
      thumbnailName: "Chocolate.png",
      additionalImageNames: [],
      isBestSeller: false,
      isActive: true,
    },
    {
      id: "p-9",
      name: "Almond Spread",
      description: "Nutty almond spread.",
      information: "Refrigerate after opening.",
      category: "Spreads",
      brand: "Other",
      flavor: "Almond",
      dietType: "Vegetarian",
      weight: "350g",
      tags: ["almond", "spread"],
      unitPrice: 399,
      stockQty: 14,
      discountAmount: 0,
      thumbnailName: "Chocolate1.png",
      additionalImageNames: [],
      isBestSeller: false,
      isActive: true,
    },
    {
      id: "p-10",
      name: "Fruit & Nut Chocolate",
      description: "Chocolate with fruit and nut mix.",
      information: "Contains nuts.",
      category: "Chocolates",
      brand: "Amul",
      flavor: "Fruit & Nut",
      dietType: "Vegetarian",
      weight: "180g",
      tags: ["fruits", "nuts"],
      unitPrice: 219,
      stockQty: 40,
      discountAmount: 0,
      thumbnailName: "Chocolate.png",
      additionalImageNames: [],
      isBestSeller: true,
      isActive: true,
    },
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const hay = `${p.name} ${p.category} ${p.brand}`.toLowerCase();
      return hay.includes(q);
    });
  }, [products, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage]);

  const onExport = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `products-${stamp}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const setBestSeller = (id, next) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isBestSeller: next } : p)));
  };

  const setActive = (id, next) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isActive: next } : p)));
  };

  const onDelete = (id) => {
    const ok = window.confirm("Delete this product?");
    if (!ok) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    // keep page stable when filtering
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const editingProduct = useMemo(
    () => (editingId ? products.find((p) => p.id === editingId) : null),
    [editingId, products]
  );

  const onEdit = (id) => {
    setEditingId(id);
    setMode("edit");
  };

  const onCancelEdit = () => {
    setMode("list");
    setEditingId(null);
  };

  const onSaveEdit = (updated) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === updated.id
          ? {
              ...updated,
              // keep these flags controlled from list view
              isBestSeller: p.isBestSeller,
              isActive: p.isActive,
            }
          : p
      )
    );
    setMode("list");
    setEditingId(null);
  };

  if (mode === "edit") {
    return (
      <div className="w-full">
        <ProductEditForm
          product={editingProduct}
          onCancel={onCancelEdit}
          onSave={onSaveEdit}
          categories={categories}
          brands={brands}
          flavors={flavors}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="bg-white rounded-lg  overflow-hidden">
        <div className="px-6 py-4 border-b border-[#ececec] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-[#3b2a23]">Product List</h3>
            <span className="text-xs font-bold bg-[#f7f7f7] border border-[#ececec] px-2 py-1 rounded-full text-[#3b2a23]">
              {filtered.length}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="w-full sm:w-[360px]">
              <div className="flex items-stretch border border-[#ececec] rounded-md overflow-hidden bg-white focus-within:border-[#ab8351]">
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search products..."
                  className="flex-1 px-4 py-2 text-sm outline-none text-[#3b2a23]"
                />
                <div className="w-11 border-l border-[#ececec] flex items-center justify-center text-[#3b2a23]">
                  <FiSearch />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onExport}
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md border border-[#ab8351] text-[#ab8351] bg-white px-4 py-2 text-sm font-bold hover:bg-[#fffaf9] transition-colors"
            >
              <FiDownload /> Export
            </button>
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
                <th className="text-right font-bold px-6 py-4 whitespace-nowrap">Unit Price</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Show as best seller</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Active status</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-[#7c6a5a]">
                    No products found.
                  </td>
                </tr>
              ) : (
                pageItems.map((p, idx) => (
                  <tr key={p.id} className="border-t border-[#ececec] hover:bg-[#fffaf9] transition-colors duration-150">
                    <td className="px-6 py-5 text-[#3b2a23]">{(safePage - 1) * pageSize + idx + 1}</td>
                    <td className="px-6 py-5 text-[#3b2a23]">
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs text-[#7c6a5a]">ID: {p.id}</div>
                    </td>
                    <td className="px-6 py-5 text-[#7c6a5a] font-semibold whitespace-nowrap">{p.category || "—"}</td>
                    <td className="px-6 py-5 text-[#7c6a5a] font-semibold whitespace-nowrap">{p.brand || "—"}</td>
                    <td className="px-6 py-5 text-right text-[#3b2a23] font-semibold whitespace-nowrap">
                      ₹{Number(p.unitPrice || 0).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <Toggle
                          checked={!!p.isBestSeller}
                          onChange={(next) => setBestSeller(p.id, next)}
                          label="Toggle best seller"
                        />
                        <span className="text-xs font-bold text-[#3b2a23]">{p.isBestSeller ? "On" : "Off"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <Toggle
                          checked={!!p.isActive}
                          onChange={(next) => setActive(p.id, next)}
                          label="Toggle active"
                        />
                        <span className={`text-xs font-bold ${p.isActive ? "text-green-700" : "text-red-700"}`}>
                          {p.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(p.id)}
                          className="cursor-pointer w-10 h-10 rounded-md border border-[#ab8351] text-[#ab8351] hover:bg-[#fffaf9] flex items-center justify-center transition-colors duration-150"
                          aria-label="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(p.id)}
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
    </div>
  );
}
