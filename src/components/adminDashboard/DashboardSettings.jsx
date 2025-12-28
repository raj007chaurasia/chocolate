import React, { useMemo, useState, useEffect } from "react";
import { FiEdit2, FiPlus, FiSave, FiTrash2, FiUpload, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSiteSettings } from "../SiteSettingsContext";
import api from "../../api/axios";

const TABS = [
  { key: "general", label: "General Settings" },
  { key: "permissions", label: "Admin Permissions" },
  { key: "profile", label: "My Profile" },
];

const PERMISSION_KEYS = [
  { key: "orders", label: "Orders" },
  { key: "products", label: "Products" },
  { key: "categories", label: "Categories" },
  { key: "brands", label: "Brands" },
  { key: "users", label: "Users" },
  { key: "settings", label: "Settings" },
];

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function DashboardSettings() {
  const { settings, setSettings } = useSiteSettings();
  const [tab, setTab] = useState("general");

  const [generalDraft, setGeneralDraft] = useState(() => ({
    contactNumber: settings?.contactNumber || "+123 ( 456 ) ( 7890 )",
    logoDataUrl: settings?.logoDataUrl || "",
    logoFileName: "",
  }));

  const [footerDraft, setFooterDraft] = useState(() => ({
    instagramHandle: settings?.footer?.instagramHandle || "@glory.confectionery",
    openingHoursLines: Array.isArray(settings?.footer?.openingHoursLines)
      ? settings.footer.openingHoursLines.slice(0, 3)
      : ["", "", ""],
    usefulLinks: Array.isArray(settings?.footer?.usefulLinks)
      ? settings.footer.usefulLinks.slice(0, 3).map((l) => ({ label: l?.label || "", href: l?.href || "#" }))
      : [
          { label: "Wishlist", href: "/wishlist" },
          { label: "Privacy Policy", href: "#" },
          { label: "Order Tracking", href: "#" },
        ],
    addressLines: Array.isArray(settings?.footer?.addressLines)
      ? settings.footer.addressLines.slice(0, 2)
      : ["", ""],
  }));

  const [admins, setAdmins] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    limit: 10
  });

  const [profile, setProfile] = useState(() => ({
    name: "Admin",
    email: "admin@example.com",
    password: "",
  }));

  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    username: "",
    password: "",
  });

  const activeTabLabel = useMemo(() => TABS.find((t) => t.key === tab)?.label || "Settings", [tab]);

  const fetchAdmins = async (page = 1) => {
    try {
      const response = await api.get(`/admin/users?page=${page}&limit=${pagination.limit}`);
      if (response.data.success) {
        const mappedAdmins = response.data.data.map(user => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          permissions: {
            orders: false,
            products: false,
            categories: false,
            brands: false,
            users: false,
            settings: false,
          } // Permissions are not in the user list API, initializing to false
        }));
        setAdmins(mappedAdmins);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch admins", error);
    }
  };

  useEffect(() => {
    if (tab === "permissions") {
      fetchAdmins(pagination.currentPage);
    }
  }, [tab, pagination.currentPage]);

  const saveGeneral = () => {
    setSettings((prev) => ({
      ...(prev || {}),
      contactNumber: generalDraft.contactNumber,
      logoDataUrl: generalDraft.logoDataUrl,
      footer: {
        instagramHandle: footerDraft.instagramHandle,
        openingHoursLines: footerDraft.openingHoursLines,
        usefulLinks: footerDraft.usefulLinks,
        addressLines: footerDraft.addressLines,
      },
    }));
  };

  const togglePermission = (adminId, permKey) => {
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === adminId
          ? { ...a, permissions: { ...a.permissions, [permKey]: !a.permissions?.[permKey] } }
          : a
      )
    );
  };

  const removeAdmin = (adminId) => {
    if (!window.confirm("Remove this admin?")) return;
    setAdmins((prev) => prev.filter((a) => a.id !== adminId));
  };

  const openAddAdmin = () => {
    setNewAdmin({
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      username: "",
      password: "",
    });
    setAdminModalOpen(true);
  };

  const addAdmin = () => {
    if (!newAdmin.firstName || !newAdmin.lastName || !newAdmin.email || !newAdmin.username) {
      window.alert("Please fill in all required fields.");
      return;
    }

    const id = `admin-${Date.now()}`;
    setAdmins((prev) => [
      {
        id,
        name: `${newAdmin.firstName} ${newAdmin.lastName}`,
        email: newAdmin.email,
        permissions: PERMISSION_KEYS.reduce((acc, p) => {
          acc[p.key] = false;
          return acc;
        }, {}),
      },
      ...prev,
    ]);
    setAdminModalOpen(false);
  };

  const saveProfile = () => {
    window.alert("Profile updated (in this session only).");
    setProfile((p) => ({ ...p, password: "" }));
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-[#3b2a23]">Settings</h2>
        <span className="text-xs font-bold bg-[#f7f7f7] border border-[#ececec] px-2 py-1 rounded-full text-[#3b2a23]">
          {activeTabLabel}
        </span>
      </div>

      {/* Settings Menu */}
      <section className="bg-white rounded-lg shadow border border-[#ececec] overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-[#ececec]">
          <h3 className="text-base font-bold text-[#3b2a23]">Menu</h3>
        </div>

        <div className="p-4 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`cursor-pointer px-4 py-2 rounded-md border text-sm font-bold transition-colors duration-150 ${
                tab === t.key
                  ? "bg-[#ab8351] text-white border-[#ab8351]"
                  : "bg-[#f7f7f7] text-[#3b2a23] border-[#ececec] hover:bg-[#fffaf9]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* General Settings */}
      {tab === "general" ? (
        <section className="bg-white rounded-lg shadow border border-[#ececec] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#ececec] flex items-center justify-between gap-3">
            <h3 className="text-base font-bold text-[#3b2a23]">General Settings</h3>
            <button
              type="button"
              onClick={saveGeneral}
              className="cursor-pointer inline-flex items-center gap-2 rounded-md bg-[#ab8351] px-4 py-2 text-xs font-bold text-white hover:opacity-95"
            >
              <FiSave /> Save
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-[#ececec] rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#ab8351]"><FiUpload /></span>
                <h4 className="font-bold text-[#3b2a23]">Logo</h4>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const dataUrl = await fileToDataUrl(file);
                  setGeneralDraft((prev) => ({ ...prev, logoDataUrl: dataUrl, logoFileName: file.name }));
                }}
                className="w-full text-sm"
              />

              <div className="mt-4 flex items-center gap-4">
                <div className="w-24 h-24 rounded-md border border-[#ececec] bg-[#fffaf9] flex items-center justify-center overflow-hidden">
                  {generalDraft.logoDataUrl ? (
                    <img src={generalDraft.logoDataUrl} alt="Logo preview" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-xs font-semibold text-[#7c6a5a]">No logo</span>
                  )}
                </div>
                <div className="text-xs text-[#7c6a5a]">
                  {generalDraft.logoFileName ? (
                    <div>Selected: <span className="font-semibold text-[#3b2a23]">{generalDraft.logoFileName}</span></div>
                  ) : (
                    <div>Select a logo image to update.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="border border-[#ececec] rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#ab8351]"><FiEdit2 /></span>
                <h4 className="font-bold text-[#3b2a23]">Contact Number</h4>
              </div>

              <label className="block text-xs font-bold text-[#3b2a23] mb-2">Phone</label>
              <input
                value={generalDraft.contactNumber}
                onChange={(e) => setGeneralDraft((prev) => ({ ...prev, contactNumber: e.target.value }))}
                placeholder="+91..."
                className="w-full rounded-md border border-[#ececec] bg-white px-4 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
              />
              <div className="mt-2 text-xs text-[#7c6a5a]">This updates the phone shown in the website header.</div>
            </div>

            <div className="border border-[#ececec] rounded-lg p-5">
              <h4 className="font-bold text-[#3b2a23] mb-4">Instagram</h4>
              <label className="block text-xs font-bold text-[#3b2a23] mb-2">Handle</label>
              <input
                value={footerDraft.instagramHandle}
                onChange={(e) => setFooterDraft((p) => ({ ...p, instagramHandle: e.target.value }))}
                placeholder="@yourpage"
                className="w-full rounded-md border border-[#ececec] bg-white px-4 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
              />
            </div>

            <div className="border border-[#ececec] rounded-lg p-5">
              <h4 className="font-bold text-[#3b2a23] mb-4">Opening Hours</h4>
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="mb-3">
                  <label className="block text-xs font-bold text-[#3b2a23] mb-2">Line {idx + 1}</label>
                  <input
                    value={footerDraft.openingHoursLines[idx] || ""}
                    onChange={(e) => {
                      const next = e.target.value;
                      setFooterDraft((p) => {
                        const copy = [...p.openingHoursLines];
                        copy[idx] = next;
                        return { ...p, openingHoursLines: copy };
                      });
                    }}
                    className="w-full rounded-md border border-[#ececec] bg-white px-4 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
                  />
                </div>
              ))}
            </div>

            <div className="border border-[#ececec] rounded-lg p-5">
              <h4 className="font-bold text-[#3b2a23] mb-4">Useful Links</h4>
              {footerDraft.usefulLinks.map((l, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-bold text-[#3b2a23] mb-2">Label</label>
                    <input
                      value={l.label}
                      onChange={(e) => {
                        const v = e.target.value;
                        setFooterDraft((p) => {
                          const links = p.usefulLinks.map((x, i) => (i === idx ? { ...x, label: v } : x));
                          return { ...p, usefulLinks: links };
                        });
                      }}
                      className="w-full rounded-md border border-[#ececec] bg-white px-4 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#3b2a23] mb-2">URL</label>
                    <input
                      value={l.href}
                      onChange={(e) => {
                        const v = e.target.value;
                        setFooterDraft((p) => {
                          const links = p.usefulLinks.map((x, i) => (i === idx ? { ...x, href: v } : x));
                          return { ...p, usefulLinks: links };
                        });
                      }}
                      className="w-full rounded-md border border-[#ececec] bg-white px-4 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
                    />
                  </div>
                </div>
              ))}
              <div className="text-xs text-[#7c6a5a]">Keep URLs like “/wishlist” for internal pages.</div>
            </div>

            <div className="border border-[#ececec] rounded-lg p-5">
              <h4 className="font-bold text-[#3b2a23] mb-4">Address</h4>
              {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="mb-3">
                  <label className="block text-xs font-bold text-[#3b2a23] mb-2">Line {idx + 1}</label>
                  <input
                    value={footerDraft.addressLines[idx] || ""}
                    onChange={(e) => {
                      const v = e.target.value;
                      setFooterDraft((p) => {
                        const copy = [...p.addressLines];
                        copy[idx] = v;
                        return { ...p, addressLines: copy };
                      });
                    }}
                    className="w-full rounded-md border border-[#ececec] bg-white px-4 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Admin Permissions */}
      {tab === "permissions" ? (
        <section className="bg-white rounded-lg shadow border border-[#ececec] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#ececec] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-bold text-[#3b2a23]">Admin Permissions</h3>
              <span className="text-xs font-bold bg-[#f7f7f7] border border-[#ececec] px-2 py-1 rounded-full text-[#3b2a23]">
                {admins.length}
              </span>
            </div>
            <button
              type="button"
              onClick={openAddAdmin}
              className="cursor-pointer inline-flex items-center gap-2 rounded-md bg-[#ab8351] px-4 py-2 text-xs font-bold text-white hover:opacity-95"
            >
              <FiPlus /> Add Admin
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#fffaf9] text-[#3b2a23]">
                <tr>
                  <th className="text-left font-bold px-6 py-4 whitespace-nowrap">Admin</th>
                  {PERMISSION_KEYS.map((p) => (
                    <th key={p.key} className="text-center font-bold px-4 py-4 whitespace-nowrap">{p.label}</th>
                  ))}
                  <th className="text-right font-bold px-6 py-4 whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((a) => (
                  <tr key={a.id} className="border-t border-[#ececec] hover:bg-[#fffaf9] transition-colors duration-150">
                    <td className="px-6 py-5">
                      <div className="font-semibold text-[#3b2a23]">{a.name}</div>
                      <div className="text-xs text-[#7c6a5a]">{a.email}</div>
                    </td>
                    {PERMISSION_KEYS.map((p) => (
                      <td key={p.key} className="px-4 py-5 text-center">
                        <input
                          type="checkbox"
                          checked={Boolean(a.permissions?.[p.key])}
                          onChange={() => togglePermission(a.id, p.key)}
                          className="w-4 h-4 accent-[#ab8351]"
                          aria-label={`${a.name} ${p.label}`}
                        />
                      </td>
                    ))}
                    <td className="px-6 py-5 text-right">
                      <button
                        type="button"
                        onClick={() => removeAdmin(a.id)}
                        className="cursor-pointer inline-flex items-center gap-2 rounded-md border border-[#ab8351] text-[#ab8351] px-3 py-2 text-xs font-bold hover:bg-[#fffaf9]"
                      >
                        <FiTrash2 /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-[#ececec] flex items-center justify-between">
              <span className="text-xs text-[#7c6a5a]">
                Showing {(pagination.currentPage - 1) * pagination.limit + 1} to {Math.min(pagination.currentPage * pagination.limit, pagination.totalRecords)} of {pagination.totalRecords} entries
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }))}
                  disabled={pagination.currentPage === 1}
                  className="p-2 rounded-md border border-[#ececec] text-[#3b2a23] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f7f7f7]"
                >
                  <FiChevronLeft />
                </button>
                <span className="text-xs font-bold text-[#3b2a23]">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, currentPage: Math.min(prev.totalPages, prev.currentPage + 1) }))}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="p-2 rounded-md border border-[#ececec] text-[#3b2a23] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f7f7f7]"
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          )}
        </section>
      ) : null}

      {/* My Profile */}
      {tab === "profile" ? (
        <section className="bg-white rounded-lg shadow border border-[#ececec] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#ececec] flex items-center justify-between gap-3">
            <h3 className="text-base font-bold text-[#3b2a23]">My Profile</h3>
            <button
              type="button"
              onClick={saveProfile}
              className="cursor-pointer inline-flex items-center gap-2 rounded-md bg-[#ab8351] px-4 py-2 text-xs font-bold text-white hover:opacity-95"
            >
              <FiSave /> Save
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#3b2a23] mb-2">Name</label>
              <input
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                className="w-full rounded-md border border-[#ececec] bg-white px-4 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3b2a23] mb-2">Email</label>
              <input
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                className="w-full rounded-md border border-[#ececec] bg-white px-4 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-[#3b2a23] mb-2">Change Password</label>
              <input
                type="password"
                value={profile.password}
                onChange={(e) => setProfile((p) => ({ ...p, password: e.target.value }))}
                placeholder="Enter new password"
                className="w-full rounded-md border border-[#ececec] bg-white px-4 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* Add Admin Modal */}
      {adminModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40" onClick={() => setAdminModalOpen(false)} />

          <div className="relative w-full max-w-lg bg-white rounded-lg shadow border border-[#ececec] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#ececec] flex items-center justify-between">
              <h3 className="text-base font-bold text-[#3b2a23]">Add Admin</h3>
              <button
                type="button"
                onClick={() => setAdminModalOpen(false)}
                className="cursor-pointer text-[#3b2a23] font-bold"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-[#3b2a23] mb-2">First Name</label>
                  <input
                    value={newAdmin.firstName}
                    onChange={(e) => setNewAdmin((p) => ({ ...p, firstName: e.target.value }))}
                    className="w-full rounded-md border border-[#ececec] bg-white px-4 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3b2a23] mb-2">Last Name</label>
                  <input
                    value={newAdmin.lastName}
                    onChange={(e) => setNewAdmin((p) => ({ ...p, lastName: e.target.value }))}
                    className="w-full rounded-md border border-[#ececec] bg-white px-4 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3b2a23] mb-2">Email</label>
                  <input
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin((p) => ({ ...p, email: e.target.value }))}
                    className="w-full rounded-md border border-[#ececec] bg-white px-4 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3b2a23] mb-2">Phone No</label>
                  <input
                    value={newAdmin.phoneNo}
                    onChange={(e) => setNewAdmin((p) => ({ ...p, phoneNo: e.target.value }))}
                    className="w-full rounded-md border border-[#ececec] bg-white px-4 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3b2a23] mb-2">Username</label>
                  <input
                    value={newAdmin.username}
                    onChange={(e) => setNewAdmin((p) => ({ ...p, username: e.target.value }))}
                    className="w-full rounded-md border border-[#ececec] bg-white px-4 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3b2a23] mb-2">Password </label>
                  <input
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin((p) => ({ ...p, password: e.target.value }))}
                    className="w-full rounded-md border border-[#ececec] bg-white px-4 py-2 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setAdminModalOpen(false)}
                  className="cursor-pointer rounded-md bg-[#f7f7f7] border border-[#ececec] px-4 py-2 text-xs font-bold text-[#3b2a23] hover:bg-[#fffaf9]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addAdmin}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-md bg-[#ab8351] px-4 py-2 text-xs font-bold text-white hover:opacity-95"
                >
                  <FiPlus /> Add
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
