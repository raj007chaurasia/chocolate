import React, { createContext, useContext, useMemo, useState } from "react";

const SiteSettingsContext = createContext(null);

const defaultSettings = {
  contactNumber: "+123 ( 456 ) ( 7890 )",
  logoDataUrl: "",
  footer: {
    instagramHandle: "@glory.confectionery",
    openingHoursLines: [
      "Mon - Sat: 10:00 AM - 08:00 PM",
      "Sunday: Closed",
      "Holidays: 11:00 AM - 06:00 PM",
    ],
    usefulLinks: [
      { label: "Wishlist", href: "/wishlist" },
      { label: "Privacy Policy", href: "#" },
      { label: "Order Tracking", href: "#" },
    ],
    addressLines: [
      "Maa Bhagwati Product , Gram Girwai , Lashkar , Gwalior",
      "474001, India",
    ],
  },
};

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);

  const value = useMemo(() => ({ settings, setSettings }), [settings]);

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
  }
  return ctx;
}

export { defaultSettings };
