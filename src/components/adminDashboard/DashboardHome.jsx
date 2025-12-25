import React, { useMemo, useState } from "react";
import {
  FiTrendingUp,
  FiFileText,
  FiHome,
  FiBox,
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiPackage,
  FiTruck,
  FiArchive,
  FiXCircle,
  FiCornerUpLeft,
  FiAlertCircle,
} from "react-icons/fi";

export default function DashboardHome({ onNavigate }) {
  const [range, setRange] = useState("year");

  const summaryCards = [
    { title: "Total order", value: 5, icon: <FiFileText /> },
    { title: "Total categories", value: 0, icon: <FiHome /> },
    { title: "Total Products", value: 0, icon: <FiBox /> },
    { title: "Total Customers", value: 0, icon: <FiUsers /> },
  ];

  const statusCards = [
    { title: "Pending", value: 0, icon: <FiClock />, tone: "neutral" },
    { title: "Confirmed", value: 0, icon: <FiCheckCircle />, tone: "ok" },
    { title: "Packaging", value: 0, icon: <FiPackage />, tone: "neutral" },
    { title: "Out for delivery", value: 0, icon: <FiTruck />, tone: "neutral" },
    { title: "Partially delivered", value: 0, icon: <FiTruck />, tone: "neutral" },
    { title: "Delivered", value: 5, icon: <FiArchive />, tone: "ok" },
   
  ];

  const toneClasses = {
    neutral: "bg-[#f7f7f7]",
    ok: "bg-[#f7f7f7]",
    bad: "bg-[#f7f7f7]",
  };

  const orderStats = useMemo(() => {
    const year = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      inhouse: [0, 0, 0, 0, 0, 0, 0, 0, 2600, 0, 0, 0],
      maxY: 3000,
    };
    const month = {
      labels: ["W1", "W2", "W3", "W4"],
      inhouse: [0, 0, 2600, 0],
      maxY: 3000,
    };
    const week = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      inhouse: [0, 0, 0, 2600, 0, 0, 0],
      maxY: 3000,
    };

    if (range === "month") return month;
    if (range === "week") return week;
    return year;
  }, [range]);

  const userOverview = useMemo(() => {
    // Total users on the platform
    const users = 21;
    // Total customers (subset of users)
    const customers = 7;

    const safeCustomers = Math.max(0, Math.min(customers, users));
    const otherUsers = Math.max(0, users - safeCustomers);
    const customersPct = users === 0 ? 0 : (safeCustomers / users) * 100;

    return {
      total: users,
      items: [
        { label: `Total Users (${users})`, value: users, color: "#3b2a23" },
        { label: `Total Customers (${safeCustomers})`, value: safeCustomers, color: "#ab8351" },
      ],
      gradient: `conic-gradient(#ab8351 0% ${customersPct}%, #3b2a23 ${customersPct}% 100%)`,
      otherUsers,
    };
  }, []);

  const bestSellers = useMemo(
    () =>
      [
        { id: "p-1", name: "Truffle Chocolate", image: "/images/Truffle.png", orders: 128 },
        { id: "p-2", name: "Bonbon Chocolate", image: "/images/Bonbon.png", orders: 96 },
        { id: "p-3", name: "Classic Chocolate", image: "/images/Chocolate.png", orders: 74 },
        { id: "p-4", name: "Lollipop Chocolate", image: "/images/Lollipop.png", orders: 61 },
        { id: "p-5", name: "Chocolate Mix", image: "/images/Chocolate1.png", orders: 49 },
      ].sort((a, b) => b.orders - a.orders),
    []
  );

  const topCustomers = useMemo(
    () =>
      [
        { id: "c-1", name: "Robert Downey", phone: "+91 99999 11111", orders: 26, spent: 12890 },
        { id: "c-2", name: "Chris Evans", phone: "+91 99999 22222", orders: 21, spent: 10450 },
        { id: "c-3", name: "Scarlett", phone: "+91 99999 33333", orders: 18, spent: 8950 },
        { id: "c-4", name: "Tom Holland", phone: "+91 99999 44444", orders: 14, spent: 7120 },
        { id: "c-5", name: "Mark Ruffalo", phone: "+91 99999 55555", orders: 11, spent: 5890 },
        { id: "c-5", name: "Mark Ruffalo", phone: "+91 99999 55555", orders: 11, spent: 5890 },
      ].sort((a, b) => b.orders - a.orders),
    []
  );

  const renderLineChart = ({ labels, inhouse, maxY }) => {
    const width = 720;
    const height = 260;
    const padLeft = 52;
    const padRight = 16;
    const padTop = 12;
    const padBottom = 42;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    const xAt = (index) => {
      if (labels.length <= 1) return padLeft;
      return padLeft + (index / (labels.length - 1)) * chartW;
    };
    const yAt = (value) => {
      const clamped = Math.max(0, Math.min(maxY, value));
      const t = maxY === 0 ? 0 : clamped / maxY;
      return padTop + (1 - t) * chartH;
    };

    const pointsFor = (values) => values.map((v, i) => `${xAt(i)},${yAt(v)}`).join(" ");

    const yTicks = [0, 600, 1200, 1800, 2400, 3000];
    const xTicks = labels;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[280px]">
        {/* Grid */}
        {yTicks.map((t) => (
          <g key={t}>
            <line
              x1={padLeft}
              y1={yAt(t)}
              x2={width - padRight}
              y2={yAt(t)}
              stroke="#ececec"
              strokeDasharray="6 6"
            />
            <text x={padLeft - 10} y={yAt(t) + 4} textAnchor="end" fontSize="12" fill="#7c6a5a">
              {t === 0 ? "₹0" : `₹${t}`}
            </text>
          </g>
        ))}

        {xTicks.map((label, i) => (
          <g key={label}>
            <line
              x1={xAt(i)}
              y1={padTop}
              x2={xAt(i)}
              y2={padTop + chartH}
              stroke="#ececec"
              strokeDasharray="6 6"
            />
            <text x={xAt(i)} y={padTop + chartH + 24} textAnchor="middle" fontSize="12" fill="#3b2a23">
              {label}
            </text>
          </g>
        ))}

        {/* Baseline */}
        <line x1={padLeft} y1={padTop + chartH} x2={width - padRight} y2={padTop + chartH} stroke="#ececec" />

        {/* Lines */}
        <polyline
          points={pointsFor(inhouse)}
          fill="none"
          stroke="#ab8351"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Dots */}
        {inhouse.map((v, i) => (
          <circle key={`i-${i}`} cx={xAt(i)} cy={yAt(v)} r="3" fill="#ab8351" />
        ))}
      </svg>
    );
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#3b2a23]">Welcome Admin</h2>
        <p className="text-[#7c6a5a] mt-1">Monitor your business analytics and statistics.</p>
      </div>

      <section className="bg-white rounded-lg shadow p-6 border border-[#ececec]">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="text-[#ab8351] text-xl">
              <FiTrendingUp />
            </span>
            <h3 className="text-base font-bold text-[#3b2a23]">Business Analytics</h3>
          </div>

        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {summaryCards.map((card) => {
            const isTotalOrders = card.title === "Total order";

            return (
              <div
                key={card.title}
                onClick={isTotalOrders ? () => onNavigate?.("orders") : undefined}
                className="bg-white rounded-lg cursor-pointer border border-[#ececec] shadow p-5 flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-semibold text-[#3b2a23]">{card.title}</div>
                  <div className="text-2xl font-bold text-[#3b2a23] mt-2">{card.value}</div>
                </div>
                <div className="text-2xl text-[#ab8351]">{card.icon}</div>
              </div>
            );
          })}
        </div>

        {/* Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 cursor-pointer">
          {statusCards.map((card) => (
            <div
              key={card.title}
              className={`rounded-lg border border-[#ececec] ${toneClasses[card.tone]} px-4 py-4 flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[#ab8351] text-lg">{card.icon}</span>
                <span className="font-semibold text-[#3b2a23] text-sm">{card.title}</span>
              </div>
              <span className="font-bold text-[#3b2a23]">{card.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <section className="lg:col-span-2 bg-white rounded-lg shadow border border-[#ececec] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#ececec] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[#ab8351] text-xl">
                <FiTrendingUp />
              </span>
              <h3 className="text-base font-bold text-[#3b2a23]">Order Statistics</h3>
            </div>

            <div className="bg-white border border-[#ececec] rounded-md p-1 flex items-center gap-1">
              {["year", "month", "week"].map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setRange(k)}
                  className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors duration-150 ${
                    range === k ? "bg-[#ab8351] text-white" : "text-[#3b2a23] hover:bg-[#f7f7f7]"
                  }`}
                >
                  {k === "year" ? "This Year" : k === "month" ? "This Month" : "This Week"}
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 pt-4">
            <div className="flex items-center justify-center gap-8 text-sm text-[#3b2a23] mb-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ab8351" }} />
                <span>Inhouse</span>
              </div>
            </div>
          </div>

          <div className="px-2 pb-4">{renderLineChart(orderStats)}</div>
        </section>

        <section className="bg-white rounded-lg shadow border border-[#ececec] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#ececec]">
            <h3 className="text-base font-bold text-[#3b2a23]">User Overview</h3>
          </div>

          <div className="p-6 flex flex-col items-center">
            <div
              className="w-60 h-60 rounded-full flex items-center justify-center"
              style={{ background: userOverview.gradient }}
            >
              <div className="w-36 h-36 rounded-full bg-white border border-[#ececec] flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-[#3b2a23]">{userOverview.total}</div>
                <div className="text-[#7c6a5a] text-sm mt-1">Total</div>
                <div className="text-[#7c6a5a] text-sm">Users</div>
              </div>
            </div>

            <div className="w-full mt-6 space-y-3">
              {userOverview.items.map((it) => (
                <div key={it.label} className="flex items-center gap-3 text-sm">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: it.color }} />
                  <span className="font-semibold" style={{ color: it.color }}>
                    {it.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

<section className="flex flex-wrap justify-between items-center ">
      {/* Best Selling Products */}
      <section className="bg-white rounded-lg w-[48%] shadow border border-[#ececec] overflow-hidden mt-6">
        <div className="px-6 py-4 border-b border-[#ececec] flex items-center justify-between">
          <h3 className="text-base font-bold text-[#3b2a23]">Best Selling Products</h3>
          <span className="text-xs font-bold bg-[#f7f7f7] border border-[#ececec] px-2 py-1 rounded-full text-[#3b2a23]">
            Top {bestSellers.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#fffaf9] text-[#3b2a23]">
              <tr>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Rank</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Product</th>
                <th className="text-right font-bold px-6 py-4 whitespace-nowrap">Total Orders</th>
              </tr>
            </thead>
            <tbody>
              {bestSellers.map((p, idx) => (
                <tr key={p.id} className="border-t border-[#ececec] hover:bg-[#fffaf9] transition-colors duration-150">
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-[#f7f7f7] border border-[#ececec] font-bold text-[#3b2a23]">
                      {idx + 1}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg border border-[#ececec] bg-white overflow-hidden flex items-center justify-center">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-[#3b2a23]">{p.name}</div>
                        <div className="text-xs text-[#7c6a5a]">Top selling</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="inline-flex items-center gap-2">
                      <span className="font-bold text-[#3b2a23]">{p.orders}</span>
                      <span className="text-xs font-semibold text-[#ab8351]">orders</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Top Customers */}
      <section className="bg-white rounded-lg  w-[48%] shadow border border-[#ececec] overflow-hidden mt-6">
        <div className="px-6 py-4 border-b border-[#ececec] flex items-center justify-between">
          <h3 className="text-base font-bold text-[#3b2a23]">Top Customers</h3>
          <span className="text-xs font-bold bg-[#f7f7f7] border border-[#ececec] px-2 py-1 rounded-full text-[#3b2a23]">
            Top {topCustomers.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#fffaf9] text-[#3b2a23]">
              <tr>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Rank</th>
                <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Customer</th>
                <th className="text-right font-bold px-6 py-4 whitespace-nowrap">Total Orders</th>
                <th className="text-right font-bold px-6 py-4 whitespace-nowrap">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((c, idx) => (
                <tr key={c.id} className="border-t border-[#ececec] hover:bg-[#fffaf9] transition-colors duration-150">
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-[#f7f7f7] border border-[#ececec] font-bold text-[#3b2a23]">
                      {idx + 1}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                  
                      <div>
                        <div className="font-bold text-[#3b2a23]">{c.name}</div>
                        <div className="text-xs text-[#7c6a5a]">{c.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="font-bold text-[#3b2a23]">{Number(c.orders).toLocaleString("en-IN")}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="font-bold text-[#3b2a23]">₹{Number(c.spent).toLocaleString("en-IN")}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      </section>
    </div>
  );
}
