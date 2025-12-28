import React, { useEffect, useMemo, useState } from "react";
import {
  FiHome,
  FiBox,
  FiTag,
  FiBookmark,
  FiUsers,
  FiShoppingCart,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiChevronRight,
  FiPlus,
  FiList,
  FiRefreshCcw,
} from "react-icons/fi";
import DashboardHome from "./DashboardHome";
import DashboardOrders from "./DashboardOrders";
import DashboardProducts from "./DashboardProducts";
import DashboardAddProduct from "./DashboardAddProduct";
import DashboardRestoreProducts from "./DashboardRestoreProducts";
import DashboardCategories from "./DashboardCategories";
import DashboardBrands from "./DashboardBrands";
import DashboardFlavors from "./DashboardFlavors";
import DashboardUsers from "./DashboardUsers";
import DashboardSettings from "./DashboardSettings";
import { Navigate } from "react-router-dom";

export default function AdminPanel() {
  const [active, setActive] = useState("home");
  const [loggedOut, setLoggedOut] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const [categories, setCategories] = useState(() => [
    { id: "cat-truffles", name: "Truffles", isActive: true },
    { id: "cat-chocolates", name: "Chocolates", isActive: true },
    { id: "cat-spreads", name: "Spreads", isActive: true },
    { id: "cat-lollipops", name: "Lollipops", isActive: true },
  ]);

  const [brands, setBrands] = useState(() => [
    { id: "brand-cadbury", name: "Cadbury", isActive: true, imageDataUrl: "", imageName: "" },
    { id: "brand-amul", name: "Amul", isActive: true, imageDataUrl: "", imageName: "" },
    { id: "brand-nestle", name: "Nestle", isActive: true, imageDataUrl: "", imageName: "" },
    { id: "brand-ferrero", name: "Ferrero", isActive: true, imageDataUrl: "", imageName: "" },
    { id: "brand-hersheys", name: "Hershey's", isActive: true, imageDataUrl: "", imageName: "" },
    { id: "brand-lindt", name: "Lindt", isActive: true, imageDataUrl: "", imageName: "" },
    { id: "brand-other", name: "Other", isActive: true, imageDataUrl: "", imageName: "" },
  ]);

  const [flavors, setFlavors] = useState(() => [
    { id: "flav-dark", name: "Dark Chocolate", isActive: true },
    { id: "flav-milk", name: "Milk Chocolate", isActive: true },
    { id: "flav-white", name: "White Chocolate", isActive: true },
    { id: "flav-hazelnut", name: "Hazelnut", isActive: true },
    { id: "flav-caramel", name: "Caramel", isActive: true },
  ]);

  const sections = useMemo(
    () => [
      { key: "home", label: "Dashboard", icon: <FiHome /> },
      { key: "orders", label: "Orders", icon: <FiShoppingCart /> },
      { key: "products", label: "Products", icon: <FiBox /> },
      { key: "categories", label: "Category", icon: <FiTag /> },
      { key: "brands", label: "Brand", icon: <FiBookmark /> },
      { key: "flavors", label: "Flavor", icon: <FiBookmark /> },
      { key: "users", label: "Users", icon: <FiUsers /> },
      { key: "settings", label: "Settings", icon: <FiSettings /> },
      { key: "logout", label: "Logout", icon: <FiLogOut /> },
    ],
    []
  );

  const isProductsActive = active.startsWith("products");

  useEffect(() => {
    if (active === "logout") setLoggedOut(true);
  }, [active]);

  useEffect(() => {
    if (isProductsActive) setProductsOpen(true);
  }, [isProductsActive]);

  let content;
  if (loggedOut) {
    content = (
      <Navigate to="/login" />
    );
  } else if (active === "home") {
    content = <DashboardHome onNavigate={setActive} />;
  } else if (active === "orders") {
    content = <DashboardOrders />;
  } else if (active === "products-list") {
    content = <DashboardProducts categories={categories} brands={brands} flavors={flavors} />;
  } else if (active === "products-add") {
    content = <DashboardAddProduct categories={categories} brands={brands} flavors={flavors} />;
  } else if (active === "products-restore") {
    content = <DashboardRestoreProducts categories={categories} brands={brands} flavors={flavors} />;
  } else if (active === "categories") {
    content = <DashboardCategories categories={categories} setCategories={setCategories} />;
  } else if (active === "brands") {
    content = <DashboardBrands brands={brands} setBrands={setBrands} />;
  } else if (active === "flavors") {
    content = <DashboardFlavors flavors={flavors} setFlavors={setFlavors} />;
  } else if (active === "users") {
    content = <DashboardUsers />;
  } else if (active === "settings") {
    content = <DashboardSettings />;
  }

  return (
    <div className="bg-[#fffaf9] min-h-screen pb-12">
      <div className="bg-[#ab8351] text-white px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl lg:ml-20 font-bold tracking-wide">Admin Panel</h1>
      </div>
      <div className=" mx-auto mt-10 px-2">
        <div className="flex flex-col md:flex-row gap-8 min-w-0">
          {/* Sidebar */}
          <aside
            className="w-full md:w-64 bg-white rounded-lg shadow p-4 border border-[#ececec] h-[600px] flex md:flex-col flex-row gap-2 md:gap-0 mb-4 md:mb-0 md:sticky md:top-24 md:h-[calc(100vh-120px)] md:overflow-y-auto admin-sidebar-scroll"
          >
            {sections.map((sec) => {
              if (sec.key !== "products") {
                return (
                  <button
                    key={sec.key}
                    className={`flex items-center gap-2 cursor-pointer px-4 py-3 rounded font-semibold text-sm w-full md:mb-2 transition-colors duration-200
                      ${active === sec.key ? "bg-[#ab8351] text-white" : "bg-[#f7f7f7] text-[#3b2a23] hover:bg-[#ffedea]"}`}
                    onClick={() => setActive(sec.key)}
                  >
                    <span className="text-lg">{sec.icon}</span> {sec.label}
                  </button>
                );
              }

              return (
                <div key={sec.key} className="w-full md:mb-2">
                  <button
                    className={`flex items-center justify-between cursor-pointer px-4 py-3 rounded font-semibold text-sm w-full transition-colors duration-200
                      ${isProductsActive ? "bg-[#ab8351] text-white" : "bg-[#f7f7f7] text-[#3b2a23] hover:bg-[#ffedea]"}`}
                    onClick={() => {
                      setProductsOpen((prev) => {
                        const next = !prev;
                        if (next) {
                          setActive((cur) => (cur.startsWith("products") ? cur : "products-list"));
                        }
                        return next;
                      });
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{sec.icon}</span>
                      {sec.label}
                    </span>
                    <span className="text-lg">{productsOpen ? <FiChevronDown /> : <FiChevronRight />}</span>
                  </button>

                  {productsOpen && (
                    <div className="mt-2 flex flex-col gap-2">

                      <button
                        className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded font-semibold text-sm w-full transition-colors duration-200
                          ${active === "products-list" ? "bg-[#ab8351] text-white" : "bg-[#f7f7f7] text-[#3b2a23] hover:bg-[#ffedea]"}`}
                        onClick={() => setActive("products-list")}
                      >
                        <span className="text-base">
                          <FiList />
                        </span>
                        Product List
                      </button>

                      <button
                        className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded font-semibold text-sm w-full transition-colors duration-200
                          ${active === "products-add" ? "bg-[#ab8351] text-white" : "bg-[#f7f7f7] text-[#3b2a23] hover:bg-[#ffedea]"}`}
                        onClick={() => setActive("products-add")}
                      >
                        <span className="text-base">
                          <FiPlus />
                        </span>
                        Add New Product
                      </button>

                      <button
                        className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded font-semibold text-sm w-full transition-colors duration-200
                          ${active === "products-restore" ? "bg-[#ab8351] text-white" : "bg-[#f7f7f7] text-[#3b2a23] hover:bg-[#ffedea]"}`}
                        onClick={() => setActive("products-restore")}
                      >
                        <span className="text-base">
                          <FiRefreshCcw />
                        </span>
                        Restore Product List
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </aside>
          {/* Content */}
          <main className="flex-1 min-w-0 bg-white rounded-lg shadow p-6 border border-[#ececec] min-h-80 flex flex-col">
            {content}
          </main>
        </div>
      </div>
    </div>
  );
}
