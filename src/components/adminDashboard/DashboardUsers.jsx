import React, { useEffect, useMemo, useState } from "react";
import { FiDownload, FiSearch } from "react-icons/fi";

function toCsv(rows) {
  const escape = (value) => {
    const str = String(value ?? "");
    if (/[\n\r,\"]/g.test(str)) return `"${str.replace(/\"/g, '""')}"`;
    return str;
  };

  const headers = ["SL", "Name", "Email", "Phone", "Role", "Orders"];
  const lines = [headers.map(escape).join(",")];
  rows.forEach((u, idx) => {
    lines.push([idx + 1, u.name, u.email, u.phone, u.role, u.orders].map(escape).join(","));
  });
  return lines.join("\n");
}

export default function DashboardUsers() {
  const pageSize = 8;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const [users] = useState(() => [
    { id: "u-1001", name: "Aarav Sharma", email: "aarav@example.com", phone: "+91 98765 43210", role: "User", orders: 5 },
    { id: "u-1002", name: "Ananya Gupta", email: "ananya@example.com", phone: "+91 98123 45678", role: "User", orders: 2 },
    { id: "u-1003", name: "Rohan Verma", email: "rohan@example.com", phone: "+91 98989 12345", role: "User", orders: 0 },
    { id: "u-1004", name: "Priya Singh", email: "priya@example.com", phone: "+91 90000 11111", role: "User", orders: 11 },
    { id: "u-1005", name: "Karan Patel", email: "karan@example.com", phone: "+91 91234 56789", role: "User", orders: 3 },
    { id: "u-1006", name: "Neha Kapoor", email: "neha@example.com", phone: "+91 97654 32109", role: "User", orders: 7 },
    { id: "u-1007", name: "Vivek Mehta", email: "vivek@example.com", phone: "+91 99887 77665", role: "User", orders: 0 },
    { id: "u-1008", name: "Simran Kaur", email: "simran@example.com", phone: "+91 93456 78901", role: "User", orders: 4 },
    { id: "u-1009", name: "Ishaan Roy", email: "ishaan@example.com", phone: "+91 90909 22222", role: "User", orders: 1 },
    { id: "u-1010", name: "Meera Nair", email: "meera@example.com", phone: "+91 93333 44444", role: "User", orders: 6 },
    { id: "u-1011", name: "Arjun Yadav", email: "arjun@example.com", phone: "+91 95555 66666", role: "User", orders: 9 },
    { id: "u-1012", name: "Sanya Jain", email: "sanya@example.com", phone: "+91 97777 88888", role: "User", orders: 0 },
    { id: "u-1013", name: "Rahul Kumar", email: "rahul@example.com", phone: "+91 96666 55555", role: "User", orders: 2 },
    { id: "u-1014", name: "Pooja Desai", email: "pooja@example.com", phone: "+91 98888 11111", role: "User", orders: 8 },
    { id: "u-1015", name: "Aditi Mishra", email: "aditi@example.com", phone: "+91 90012 34567", role: "User", orders: 3 },
    { id: "u-1016", name: "Sahil Khan", email: "sahil@example.com", phone: "+91 90123 98765", role: "User", orders: 0 },
    { id: "u-1017", name: "Nikhil Joshi", email: "nikhil@example.com", phone: "+91 92222 33333", role: "User", orders: 10 },
    { id: "u-1018", name: "Ritika Bose", email: "ritika@example.com", phone: "+91 94444 77777", role: "User", orders: 1 },
    { id: "u-1019", name: "Deepak Soni", email: "deepak@example.com", phone: "+91 91111 22222", role: "User", orders: 5 },
    { id: "u-1020", name: "Kavya Iyer", email: "kavya@example.com", phone: "+91 98876 54321", role: "User", orders: 4 },
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => {
      const hay = `${u.name} ${u.email} ${u.phone} ${u.role} ${u.id} ${u.orders}`.toLowerCase();
      return hay.includes(q);
    });
  }, [users, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const onExport = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `users-${stamp}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full">
      <section className="bg-white rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-[#ececec] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-[#3b2a23]">Users List</h3>
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
                  placeholder="Search users..."
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
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Name</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Email</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Phone</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Role</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Orders</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-[#7c6a5a]">
                    No users found.
                  </td>
                </tr>
              ) : (
                pageItems.map((u, idx) => (
                  <tr
                    key={u.id}
                    className="border-t border-[#ececec] hover:bg-[#fffaf9] transition-colors duration-150"
                  >
                    <td className="px-6 py-5 text-[#3b2a23]">{(safePage - 1) * pageSize + idx + 1}</td>
                    <td className="px-6 py-5 text-[#3b2a23]">
                      <div className="font-semibold">{u.name}</div>
                    </td>
                    <td className="px-6 py-5 text-[#7c6a5a] font-semibold whitespace-nowrap">{u.email}</td>
                    <td className="px-6 py-5 text-[#7c6a5a] font-semibold whitespace-nowrap">{u.phone}</td>
                    <td className="px-6 py-5 text-[#7c6a5a] font-semibold whitespace-nowrap">{u.role}</td>
                    <td className="px-6 py-5 text-[#3b2a23] font-semibold whitespace-nowrap">{Number(u.orders ?? 0)}</td>
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
