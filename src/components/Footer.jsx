
import { useTranslation } from "react-i18next";
import { useSiteSettings } from "./SiteSettingsContext";

export default function Footer() {
	const { t } = useTranslation();
	const { settings } = useSiteSettings();

	const instagramHandle = settings?.footer?.instagramHandle || "@glory.confectionery";
	const openingHoursLines =
		Array.isArray(settings?.footer?.openingHoursLines) && settings.footer.openingHoursLines.length > 0
			? settings.footer.openingHoursLines
			: [t("footer.hours.monSat"), t("footer.hours.sunday"), t("footer.hours.holidays")];
	const usefulLinks =
		Array.isArray(settings?.footer?.usefulLinks) && settings.footer.usefulLinks.length > 0
			? settings.footer.usefulLinks
			: [
				{ label: t("nav.wishlist"), href: "/wishlist" },
				{ label: t("footer.privacyPolicy"), href: "#" },
				{ label: t("footer.orderTracking"), href: "#" },
			];
	const addressLines =
		Array.isArray(settings?.footer?.addressLines) && settings.footer.addressLines.length > 0
			? settings.footer.addressLines
			: ["Maa Bhagwati Product , Gram Girwai , Lashkar , Gwalior", "474001, India"];

	return (
		<footer className="bg-[#3b2418] pt-8 pb-2 text-white ">
			<div className=" text-[#3b2a23] flex justify-center items-center h-10 mb-2 relative  px-2 sm:px-0">
				<span className="relative bg-white w-[500px] -top-2 z-10 px-2 rounded-xl sm:px-4 text-center py-2  text-xs xs:text-sm md:text-base whitespace-nowrap overflow-x-auto">
					{t("footer.followInstagram")} <span className="font-bold ">{instagramHandle}</span>
				</span>
			</div>

			<div className="max-w-6xl mx-auto px-2 xs:px-4 md:px-8 py-6 sm:py-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center md:text-left">
					<div>
						<h3 className="uppercase text-xs sm:text-sm font-semibold tracking-widest mb-3 sm:mb-4">{t("footer.openingHours")}</h3>
						<p className="text-xs sm:text-sm leading-5 sm:leading-6">
							{openingHoursLines.map((line, idx) => (
								<span key={idx}>
									{line}
									{idx < openingHoursLines.length - 1 ? <br /> : null}
								</span>
							))}
						</p>
					</div>
					<div>
						<h3 className="uppercase text-xs sm:text-sm font-semibold tracking-widest mb-3 sm:mb-4">{t("footer.usefulLinks")}</h3>
						<ul className="text-xs sm:text-sm space-y-1">
							{usefulLinks.map((l, idx) => (
								<li key={idx}>
									<a href={l?.href || "#"} className="hover:underline">{l?.label || "—"}</a>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3 className="uppercase text-xs sm:text-sm font-semibold tracking-widest mb-3 sm:mb-4">{t("footer.addressTitle")}</h3>
						<p className="text-xs sm:text-sm leading-5 sm:leading-6">
							{addressLines.map((line, idx) => (
								<span key={idx}>
									{line}
									{idx < addressLines.length - 1 ? <br /> : null}
								</span>
							))}
						</p>
					</div>
				</div>
			</div>

			<div className="text-center text-[10px] xs:text-xs text-[#d1c5be] py-2 px-2">
				{t("footer.copyright")}
			</div>
		</footer>
	);
}
