import React from 'react';
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#fffaf9]  flex  justify-center py-10 px-2">
      <div className="bg-white rounded-lg shadow max-w-2xl w-full p-8 border border-[#ececec]">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">{t("auth.firstName")}</label>
            <input type="text" placeholder={t("auth.enterFirstName")} className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">{t("auth.lastName")}</label>
            <input type="text" placeholder={t("auth.enterLastName")} className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">Email*</label>
            <input type="email" placeholder={t("auth.enterEmail")} className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">{t("auth.phone")}</label>
            <input type="tel" placeholder={t("auth.enterPhone")} className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">{t("auth.address")}</label>
            <input type="text" placeholder={t("auth.address")} className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">{t("auth.city")}</label>
            <input type="text" placeholder={t("auth.city")} className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">{t("auth.postCode")}</label>
            <input type="text" placeholder={t("auth.postCode")} className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">{t("auth.country")}</label>
            <input type="text" placeholder={t("auth.country")} className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">{t("auth.region")}</label>
            <input type="text" placeholder={t("auth.region")} className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
        </form>
        <div className="flex items-center justify-between mt-8">
          <button type="submit" className="hover:bg-[#643e2f] bg-[#ab8351] cursor-pointer text-white px-8 py-2 rounded text-base font-semibold shadow transition">{t("auth.register")}</button>
          <a href="/admin-login" className="text-[#3b2a23] hover:underline text-sm">{t("auth.haveAccount")}</a>
        </div>
      </div>
    </div>
  );
}