
import React from 'react';
import { useTranslation } from "react-i18next";

export default function Login() {
	const { t } = useTranslation();

	return (
		<div className="bg-[#fffaf9]  flex  justify-center py-20 px-2">
			<div className="bg-white rounded-lg shadow max-w-md w-full p-8 border border-[#ececec]">
				<div className="flex flex-col items-center mb-6">
					<span className="font-bold text-xl text-[#3b2a23]">{t("auth.login")}</span>
				</div>
				<form className="flex flex-col gap-4">
					<div>
						<label className="block text-sm font-semibold text-[#3b2a23] mb-1">Email*</label>
						<input type="email" placeholder={t("auth.enterEmail")} className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
					</div>
					<div>
						<label className="block text-sm font-semibold text-[#3b2a23] mb-1">{t("auth.password")}</label>
						<input type="password" placeholder={t("auth.enterPassword")} className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
					</div>
				</form>
				<div className="flex items-center justify-between mt-8">
					<button type="submit" className="hover:bg-[#643e2f] bg-[#ab8351] cursor-pointer text-white px-8 py-2 rounded text-base font-semibold shadow transition">{t("auth.login")}</button>
					<a href="/registor" className="text-[#3b2a23] hover:underline text-sm">{t("auth.createAccount")}</a>
				</div>
			</div>
		</div>
	);
}
