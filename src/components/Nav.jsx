import React, { useState } from "react";
import { FiMenu, FiX, FiUser, FiHeart, FiShoppingCart, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSiteSettings } from "./SiteSettingsContext";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { settings } = useSiteSettings();

  const currentLang = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
  };

  return (
    <header className="w-full bg-white border-b border-[#ececec]">
      <div className="hidden md:flex  justify-center  items-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12">
        <nav className="flex space-x-16 items-center justify-end w-1/2 text-[#2F1D19]  ">
          <Link to="/" className="text-sm font-bold text-[#2F1D19] hover:text-[#AB8E6A] uppercase">{t("nav.home")}</Link>
          <Link to="/product" className="text-sm text-[#2F1D19] font-bold hover:text-[#AB8E6A] uppercase">{t("nav.products")}</Link>
          <Link to="/about" className="text-sm text-[#2F1D19] font-bold hover:text-[#AB8E6A] uppercase">{t("nav.about")}</Link>
          <Link to="/contact" className="text-sm text-[#2F1D19] font-bold hover:text-[#AB8E6A] uppercase">{t("nav.contact")}</Link>
        </nav>
        <div className="text-xs font-bold  text-[#2F1D19] flex  w-1/3 items-center justify-end space-x-3">
          <span className="hidden sm:inline">📞</span>
          <span>{settings?.contactNumber || "+123 ( 456 ) ( 7890 )"}</span>
          <select
            aria-label={t("language.label")}
            value={currentLang}
            onChange={handleLanguageChange}
            className="border border-[#ececec] rounded px-2 py-1 bg-white text-[#2F1D19] text-xs font-semibold"
          >
            <option value="en">{t("language.english")}</option>
            <option value="hi">{t("language.hindi")}</option>
            <option value="zh">{t("language.chinese")}</option>
          </select>
        </div>
      </div>

      {/* Mobile Top Row: Hamburger */}
      <div className="flex md:hidden justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="p-2 rounded-md"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <div className="text-xs text-[#2F1D19] flex items-center space-x-2">
          <span className="hidden xs:inline">📞</span>
          <span>{settings?.contactNumber || "+123 ( 456 ) ( 7890 )"}</span>
          <select
            aria-label={t("language.label")}
            value={currentLang}
            onChange={handleLanguageChange}
            className="border border-[#ececec] rounded px-2 py-1 bg-white text-[#2F1D19] text-[10px] font-semibold"
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="zh">ZH</option>
          </select>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div
        className={`md:hidden transform transition-all duration-200 origin-top ${
          open ? "max-h-screen" : "max-h-0 overflow-hidden"
        } bg-white border-b border-[#ececec]`}
      >
        <div className="px-4 pt-2 pb-6 flex flex-col justify-center space-y-2">
          <Link to="/" onClick={() => setOpen(false)} className="block text-base font-medium tracking-wider py-2">{t("nav.home")}</Link>
          <Link to="/product" onClick={() => setOpen(false)} className="block text-base font-medium tracking-wider py-2">{t("nav.products")}</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="block text-base font-medium tracking-wider py-2">{t("nav.about")}</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="block text-base font-medium tracking-wider py-2">{t("nav.contact")}</Link>
        </div>
      </div>

      {/* Bottom Row: Logo, Search, Icons */}
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-between py-4 gap-4 md:gap-0">
          {/* Logo */}
          <div className="flex items-center shrink-0 mb-2 md:mb-0 absolute">
            <Link to="/" aria-label="Home" className="flex items-center">
              <img src={settings?.logoDataUrl || "./images/logo.png"} alt="Logo" className="h-20 -translate-y-20 md:translate-y-0 lg:h-32 xl:h-38 mb-2 w-auto object-cover" />
            </Link>
          </div>

          {/* Search Bar */}
          <form className="flex items-center border border-[#2F1D19]/50  rounded overflow-hidden bg-white w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder={t("nav.searchPlaceholder")}
              className="px-3 py-2 outline-none w-40 sm:w-56 md:w-full text-sm"
            />
            <select className="border-l border-[#b7e2d2] px-2 py-2 text-xs md:text-sm outline-none w-1/2 bg-white">
              <option className="text-[#2F1D19] font-semibold">{t("nav.allCategories")}</option>
              <option className="text-[#2F1D19] font-semibold">{t("nav.categories.truffles")}</option>
              <option className="text-[#2F1D19] font-semibold">{t("nav.categories.chocolates")}</option>
              <option className="text-[#2F1D19] font-semibold">{t("nav.categories.spreads")}</option>
              <option className="text-[#2F1D19] font-semibold">{t("nav.categories.lollipops")}</option>
            </select>
            <button type="submit" className="bg-[#AB8E6A] px-4 py-4 flex items-end   justify-center">
              <FiSearch className="text-white" size={16} />
            </button>
          </form>

          {/* Icons */}
          <div className="flex items-center space-x-6 text-[#2F1D19] font-semibold text-sm mt-2 md:mt-0">
            <Link to="/account" className="flex items-center space-x-1 hover:text-[#AB8E6A]">
              <FiUser size={20} />
              <span className="">{t("nav.account")}</span>
            </Link>
            <Link to="/wishlist" className="flex items-center space-x-1 hover:text-[#AB8E6A]">
              <FiHeart size={20} />
              <span className="">{t("nav.wishlist")}</span>
            </Link>
            <Link to="/cart" className="flex items-center space-x-1 hover:text-[#AB8E6A]">
              <FiShoppingCart size={20} />
              <span className="">{t("nav.cart")}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
