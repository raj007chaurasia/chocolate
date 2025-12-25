import React, { useMemo, useState } from "react";
import {
  FiArchive,
  FiCheckCircle,
  FiClock,
  FiDownload,
  FiEye,
  FiPackage,
  FiSearch,
  FiTruck,
} from "react-icons/fi";

const STATUSES = [
  "Pending",
  "Confirmed",
  "Packaging",
  "Out for Delivery",
  "Partially Delivered",
  "Delivered",
];

const STATUS_META = {
  Pending: { icon: <FiClock /> },
  Confirmed: { icon: <FiCheckCircle /> },
  Packaging: { icon: <FiPackage /> },
  "Out for Delivery": { icon: <FiTruck /> },
  "Partially Delivered": { icon: <FiTruck /> },
  Delivered: { icon: <FiArchive /> },
};

function StatusPill({ status }) {
  const base = "px-3 py-1 rounded-md text-xs font-semibold";
  switch (status) {
    case "Delivered":
      return <span className={`${base} bg-green-50 text-green-700`}>{status}</span>;
    case "Confirmed":
      return <span className={`${base} bg-green-50 text-green-700`}>{status}</span>;
    case "Pending":
      return <span className={`${base} bg-blue-50 text-blue-700`}>{status}</span>;
    case "Packaging":
      return <span className={`${base} bg-red-50 text-red-700`}>{status}</span>;
    case "Out for Delivery":
      return <span className={`${base} bg-emerald-50 text-emerald-700`}>{status}</span>;
    case "Partially Delivered":
      return <span className={`${base} bg-amber-50 text-amber-700`}>{status}</span>;
    default:
      return <span className={`${base} bg-[#f7f7f7] text-[#3b2a23]`}>{status}</span>;
  }
}

export default function DashboardOrders() {
  const [activeStatus, setActiveStatus] = useState("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [draftStatus, setDraftStatus] = useState(() => ({}));
  const [draftPaid, setDraftPaid] = useState(() => ({}));

  const getOrderTotalQty = (order) => {
    const items = Array.isArray(order?.items) ? order.items : [];
    return items.reduce((sum, item) => {
      const qty = Number(item?.qty ?? item?.quantity ?? 0) || 0;
      return qty > 0 ? sum + qty : sum;
    }, 0);
  };

  const getOrderProductsLabel = (order) => {
    const items = Array.isArray(order?.items) ? order.items : [];
    const names = items
      .map((it) => String(it?.name ?? it?.title ?? "").trim())
      .filter(Boolean);
    if (names.length === 0) return "—";
    const uniqueNames = Array.from(new Set(names));
    return uniqueNames.join(", ");
  };

  const formatMultipliedProduce = (variant, totalQty) => {
    const v = String(variant ?? "").trim();
    const q = Number(totalQty ?? 0) || 0;
    if (q <= 0) return "—";

    const match = v.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)\b/);
    if (!match) return v ? `${v} × ${q}` : `Qty × ${q}`;

    const baseValue = Number(match[1]);
    const unit = match[2];
    if (!Number.isFinite(baseValue) || baseValue <= 0) return v ? `${v} × ${q}` : `Qty × ${q}`;

    const total = baseValue * q;
    const totalText = Number.isInteger(total) ? String(total) : total.toFixed(2).replace(/\.00$/, "");
    const unitText = unit.toLowerCase() === "pcs" ? ` ${unit}` : unit;
    return `${v} × ${q} = ${totalText}${unitText}`;
  };

  const [orders, setOrders] = useState(() => [
      {
        id: "100195",
        date: "22 Sep 2025, 07:30 PM",
        customerName: "Robert Downey",
        customerPhone: "+15551112222",
        store: "Bicycle Shop",
        amount: 223.0,
        paid: true,
        status: "Delivered",
        items: [
          { name: "Dark Chocolate Bar", variant: "100g", sku: "DC-100", qty: 2 },
          { name: "Hazelnut Praline", variant: "200g", sku: "HZP-200", qty: 1 },
        ],
      },
      {
        id: "100194",
        date: "22 Sep 2025, 07:30 PM",
        customerName: "Chris Evans",
        customerPhone: "+15553334444",
        store: "6valley CMS",
        amount: 1725.0,
        paid: true,
        status: "Delivered",
        items: [
          { name: "Almond Truffle Box", variant: "12 pcs", sku: "ATB-12", qty: 2 },
          { name: "Dark Chocolate Bar", variant: "100g", sku: "DC-100", qty: 3 },
        ],
      },
      {
        id: "100193",
        date: "22 Sep 2025, 07:29 PM",
        customerName: "Robert Downey",
        customerPhone: "+15551112222",
        store: "Book Store",
        amount: 165.5,
        paid: true,
        status: "Delivered",
        items: [
          { name: "Milk Chocolate Bar", variant: "100g", sku: "MC-100", qty: 1 },
          { name: "Dark Chocolate Bar", variant: "100g", sku: "DC-100", qty: 1 },
        ],
      },
      {
        id: "100192",
        date: "22 Sep 2025, 07:29 PM",
        customerName: "Chris Evans",
        customerPhone: "+15553334444",
        store: "Bicycle Shop",
        amount: 1150.0,
        paid: true,
        status: "Delivered",
        items: [
          { name: "Almond Truffle Box", variant: "12 pcs", sku: "ATB-12", qty: 1 },
          { name: "Hazelnut Praline", variant: "200g", sku: "HZP-200", qty: 2 },
        ],
      },
      {
        id: "100191",
        date: "22 Sep 2025, 07:28 PM",
        customerName: "Robert Downey",
        customerPhone: "+15551112222",
        store: "6valley CMS",
        amount: 798.0,
        paid: true,
        status: "Delivered",
        items: [
          { name: "Milk Chocolate Bar", variant: "100g", sku: "MC-100", qty: 4 },
          { name: "Almond Truffle Box", variant: "6 pcs", sku: "ATB-6", qty: 1 },
        ],
      },
      {
        id: "100190",
        date: "22 Sep 2025, 07:25 PM",
        customerName: "Chris Evans",
        customerPhone: "+15553334444",
        store: "Chocolate Store",
        amount: 349.0,
        paid: false,
        status: "Pending",
        items: [
          { name: "Dark Chocolate Bar", variant: "100g", sku: "DC-100", qty: 2 },
          { name: "Almond Truffle Box", variant: "6 pcs", sku: "ATB-6", qty: 1 },
        ],
      },
      {
        id: "100189",
        date: "22 Sep 2025, 07:20 PM",
        customerName: "Robert Downey",
        customerPhone: "+15551112222",
        store: "Chocolate Store",
        amount: 999.0,
        paid: false,
        status: "Packaging",
        items: [
          { name: "Hazelnut Praline", variant: "200g", sku: "HZP-200", qty: 2 },
          { name: "Dark Chocolate Bar", variant: "100g", sku: "DC-100", qty: 1 },
        ],
      },
      {
        id: "100188",
        date: "22 Sep 2025, 07:18 PM",
        customerName: "Chris Evans",
        customerPhone: "+15553334444",
        store: "Chocolate Store",
        amount: 129.99,
        paid: true,
        status: "Confirmed",
        items: [{ name: "Milk Chocolate Bar", variant: "100g", sku: "MC-100", qty: 2 }],
      },
      {
        id: "100187",
        date: "21 Sep 2025, 11:05 AM",
        customerName: "Robert Downey",
        customerPhone: "+15551112222",
        store: "Chocolate Store",
        amount: 560.0,
        paid: true,
        status: "Out for Delivery",
        items: [
          { name: "Almond Truffle Box", variant: "12 pcs", sku: "ATB-12", qty: 1 },
          { name: "Dark Chocolate Bar", variant: "100g", sku: "DC-100", qty: 2 },
        ],
      },
      {
        id: "100186",
        date: "21 Sep 2025, 10:22 AM",
        customerName: "Chris Evans",
        customerPhone: "+15553334444",
        store: "Chocolate Store",
        amount: 210.0,
        paid: false,
        status: "Partially Delivered",
        items: [
          { name: "Milk Chocolate Bar", variant: "100g", sku: "MC-100", qty: 1 },
          { name: "Almond Truffle Box", variant: "6 pcs", sku: "ATB-6", qty: 2 },
        ],
      },
    ]);

  const getSelectedStatus = (id, fallback) => {
    const next = draftStatus?.[id];
    return next ?? fallback;
  };

  const getSelectedPaid = (id, fallback) => {
    const next = draftPaid?.[id];
    return next ?? fallback;
  };

  const onChangeDraftStatus = (id, next) => {
    setDraftStatus((prev) => ({ ...prev, [id]: next }));
  };

  const onChangeDraftPaid = (id, next) => {
    setDraftPaid((prev) => ({ ...prev, [id]: next }));
  };

  const onUpdateOrder = (id) => {
    const current = orders.find((o) => o.id === id);
    if (!current) return;

    const nextStatus = getSelectedStatus(id, current.status);
    const nextPaid = getSelectedPaid(id, current.paid);

    const statusChanged = Boolean(nextStatus) && nextStatus !== current.status;
    const paidChanged = typeof nextPaid === "boolean" && nextPaid !== current.paid;
    if (!statusChanged && !paidChanged) return;

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        return {
          ...o,
          ...(statusChanged ? { status: nextStatus } : null),
          ...(paidChanged ? { paid: nextPaid } : null),
        };
      })
    );

    if (statusChanged) {
      setDraftStatus((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }

    if (paidChanged) {
      setDraftPaid((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  const hasOrderDraftChanges = (order) => {
    if (!order) return false;
    const nextStatus = getSelectedStatus(order.id, order.status);
    const nextPaid = getSelectedPaid(order.id, order.paid);
    const statusChanged = Boolean(nextStatus) && nextStatus !== order.status;
    const paidChanged = typeof nextPaid === "boolean" && nextPaid !== order.paid;
    return statusChanged || paidChanged;
  };

  const summary = useMemo(() => {
    const counts = STATUSES.reduce((acc, s) => {
      acc[s] = 0;
      return acc;
    }, {});
    for (const o of orders) counts[o.status] = (counts[o.status] ?? 0) + 1;
    return counts;
  }, [orders]);

  const filtered = useMemo(() => {
    const q = query.trim();
    return orders.filter((o) => {
      const matchStatus = activeStatus === "All" ? true : o.status === activeStatus;
      const matchQuery = q === "" ? true : o.id.includes(q);
      return matchStatus && matchQuery;
    });
  }, [orders, activeStatus, query]);

  const productionSummary = useMemo(() => {
    const map = new Map();
    let totalUnits = 0;

    for (const order of filtered) {
      const items = Array.isArray(order.items) ? order.items : [];
      for (const item of items) {
        const name = String(item?.name ?? item?.title ?? "").trim() || "Unknown Product";
        const variant = String(item?.variant ?? "").trim();
        const sku = String(item?.sku ?? item?.id ?? "").trim();
        const qty = Number(item?.qty ?? item?.quantity ?? 0) || 0;
        if (qty <= 0) continue;

        const key = `${sku}__${name}__${variant}`;
        const existing = map.get(key) ?? {
          sku,
          name,
          variant,
          totalQty: 0,
          orderIds: new Set(),
        };

        existing.totalQty += qty;
        existing.orderIds.add(order.id);
        map.set(key, existing);
        totalUnits += qty;
      }
    }

    const rows = Array.from(map.values())
      .map((r) => ({
        sku: r.sku,
        name: r.name,
        variant: r.variant,
        totalQty: r.totalQty,
        ordersCount: r.orderIds.size,
      }))
      .sort((a, b) => b.totalQty - a.totalQty || a.name.localeCompare(b.name));

    return {
      rows,
      totalUnits,
      distinctProducts: rows.length,
    };
  }, [filtered]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageOrders = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const totalOrdersCount = orders.length;

  const tableTitle = activeStatus === "All" ? "All Orders" : `${activeStatus} Orders`;

  const onPickStatus = (status) => {
    setActiveStatus(status);
    setPage(1);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-[#3b2a23]">All Orders</h2>
        <span className="text-xs font-bold bg-[#f7f7f7] border border-[#ececec] px-2 py-1 rounded-full text-[#3b2a23]">
          {totalOrdersCount}
        </span>
      </div>

      {/* Summary */}
      <section className="bg-white rounded-lg shadow border border-[#ececec] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#ececec]">
          <h3 className="text-base font-bold text-[#3b2a23]">Current Order Summary</h3>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STATUSES.map((status) => {
            const meta = STATUS_META[status];
            const isActive = activeStatus === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => onPickStatus(status)}
                className={`cursor-pointer text-left rounded-lg border px-5 py-4 flex items-center justify-between transition-colors duration-150 ${
                  isActive
                    ? "border-[#ab8351] bg-[#fffaf9]"
                    : "border-[#ececec] bg-[#f7f7f7] hover:bg-[#fffaf9]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#ab8351] text-lg">{meta.icon}</span>
                  <span className="font-semibold text-[#3b2a23]">{status}</span>
                </div>
                <span className={`font-bold `}>{summary[status] ?? 0}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Product-wise quantity (Make List) */}
      <section className="bg-white rounded-lg shadow border border-[#ececec] overflow-hidden mt-6">
        <div className="px-6 py-4 border-b border-[#ececec] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-[#3b2a23]">Product-wise Quantity</h3>
            <span className="text-xs font-bold bg-[#f7f7f7] border border-[#ececec] px-2 py-1 rounded-full text-[#3b2a23]">
              Products: {productionSummary.distinctProducts}
            </span>
            <span className="text-xs font-bold bg-[#fffaf9] border border-[#ececec] px-2 py-1 rounded-full text-[#3b2a23]">
              Grand Total Qty: {productionSummary.totalUnits}
            </span>
          </div>

        
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#fffaf9] text-[#3b2a23]">
              <tr>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Product</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Variant</th>
                <th className="text-right font-bold px-6 py-4 whitespace-nowrap">Total Qty</th>
                <th className="text-right font-bold px-6 py-4 whitespace-nowrap">Orders</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Produce</th>
              </tr>
            </thead>
            <tbody>
              {productionSummary.rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-[#7c6a5a]">
                    No product items found for the current filter.
                  </td>
                </tr>
              ) : (
                productionSummary.rows.map((row) => (
                  <tr
                    key={`${row.sku || row.name}-${row.variant}`}
                    className="border-t border-[#ececec] hover:bg-[#fffaf9] transition-colors duration-150"
                  >
                    <td className="px-6 py-5 text-[#3b2a23]">
                      <div className="font-semibold">{row.name}</div>
                      {row.sku ? <div className="text-xs text-[#7c6a5a]">SKU: {row.sku}</div> : null}
                    </td>
                    <td className="px-6 py-5 text-[#7c6a5a]">{row.variant || "—"}</td>
                    <td className="px-6 py-5 text-right">
                      <span className="inline-flex items-center justify-center min-w-10 px-3 py-1 rounded-md bg-[#f7f7f7] border border-[#ececec] text-[#3b2a23] font-bold">
                        {row.totalQty}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right text-[#3b2a23] font-semibold">{row.ordersCount}</td>
                    <td className="px-6 py-5 text-[#3b2a23] font-semibold whitespace-nowrap">
                      {formatMultipliedProduce(row.variant, row.totalQty)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* List */}
      <section className="bg-white rounded-lg shadow border border-[#ececec] overflow-hidden mt-6">
        <div className="px-6 py-4 border-b border-[#ececec] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-[#3b2a23]">{tableTitle}</h3>
            <span className="text-xs font-bold bg-[#f7f7f7] border border-[#ececec] px-2 py-1 rounded-full text-[#3b2a23]">
              {filtered.length}
            </span>
         
          </div>

          <div className="w-full md:w-[380px]">
            <div className="flex items-stretch border border-[#ececec] rounded-md overflow-hidden bg-white focus-within:border-[#ab8351]">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by Order ID"
                className="flex-1 px-4 py-2 text-sm outline-none text-[#3b2a23]"
              />
              <div className="w-11 border-l border-[#ececec] flex items-center justify-center text-[#3b2a23]">
                <FiSearch />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#fffaf9] text-[#3b2a23]">
              <tr>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">SL</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Order ID</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Order Date</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Customer Info</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Product</th>
                <th className="text-right font-bold px-6 py-4 whitespace-nowrap">Total Qty</th>
                <th className="text-right font-bold px-6 py-4 whitespace-nowrap">Total Amount</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Order Status</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-10 text-center text-[#7c6a5a]">
                    No orders found.
                  </td>
                </tr>
              ) : (
                pageOrders.map((o, idx) => (
                  <tr key={o.id} className="border-t border-[#ececec] hover:bg-[#fffaf9] transition-colors duration-150">
                    <td className="px-6 py-5 text-[#3b2a23]">{(safePage - 1) * pageSize + idx + 1}</td>
                    <td className="px-6 py-5 font-semibold text-[#3b2a23]">{o.id}</td>
                    <td className="px-6 py-5 text-[#3b2a23]">{o.date}</td>
                    <td className="px-6 py-5 text-[#3b2a23]">
                      <div className="font-semibold text-[#7c6a5a]">{o.customerName}</div>
                      <div className="text-[#7c6a5a]">{o.customerPhone}</div>
                    </td>
                    <td className="px-6 py-5 font-semibold text-[#3b2a23]">{getOrderProductsLabel(o)}</td>
                    <td className="px-6 py-5 text-right text-[#3b2a23]">
                      <span className="inline-flex items-center justify-center min-w-10 px-3 py-1 rounded-md bg-[#f7f7f7] border border-[#ececec] text-[#3b2a23] font-bold">
                        {getOrderTotalQty(o)}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right text-[#3b2a23]">
                      <div className="font-semibold">₹{o.amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                      <div className="mt-2 flex items-center justify-end gap-2">
                        <select
                          value={getSelectedPaid(o.id, o.paid)}
                          onChange={(e) => onChangeDraftPaid(o.id, e.target.value === "true")}
                          className="w-[120px] rounded-md border border-[#ececec] bg-white px-3 py-2 text-xs text-[#3b2a23] outline-none focus:border-[#ab8351]"
                          aria-label="Payment status"
                        >
                          <option value="true">Paid</option>
                          <option value="false">Unpaid</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <select
                          value={getSelectedStatus(o.id, o.status)}
                          onChange={(e) => onChangeDraftStatus(o.id, e.target.value)}
                          className="w-[190px] rounded-md border border-[#ececec] bg-white px-3 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
                          aria-label="Order status"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onUpdateOrder(o.id)}
                          disabled={!hasOrderDraftChanges(o)}
                          className="cursor-pointer inline-flex items-center justify-center rounded-md bg-[#ab8351] px-3 py-2 text-xs font-bold text-white hover:opacity-95 disabled:opacity-50"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="cursor-pointer w-10 h-10 rounded-md border border-[#ab8351] text-[#ab8351] hover:bg-[#fffaf9] flex items-center justify-center transition-colors duration-150"
                          aria-label="View"
                        >
                          <FiEye />
                        </button>
                        <button
                          type="button"
                          className="cursor-pointer w-10 h-10 rounded-md border border-[#ab8351] text-[#ab8351] hover:bg-[#fffaf9] flex items-center justify-center transition-colors duration-150"
                          aria-label="Download"
                        >
                          <FiDownload />
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
        <div className="px-6 py-4 border-t border-[#ececec] flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="cursor-pointer w-9 h-9 rounded-md bg-[#f7f7f7] text-[#3b2a23] border border-[#ececec] disabled:opacity-50"
            disabled={safePage === 1}
            aria-label="Previous page"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 8).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={`cursor-pointer w-9 h-9 rounded-md border ${
                p === safePage
                  ? "bg-[#ab8351] text-white border-[#ab8351]"
                  : "bg-[#f7f7f7] text-[#3b2a23] border-[#ececec]"
              }`}
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
      </section>
    </div>
  );
}
