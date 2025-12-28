import React from 'react';
import { FiPhone, FiMail, FiClock, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
import { useTranslation } from "react-i18next";

export default function Contact() {
	const { t } = useTranslation();

	return (
		<div className="bg-[#fffaf9] min-h-screen py-10 px-2 flex flex-col items-center">
			<div className="max-w-5xl w-full bg-white rounded-lg shadow p-6 md:p-10 flex flex-col md:flex-row gap-10 border border-[#ececec]">
				{/* Contact Form */}
				<form className="flex-1 flex flex-col gap-4">
					<h2 className="text-2xl font-bold text-[#3b2a23] mb-2">{t("contact.title")}</h2>
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1">
							<label className="block text-sm font-semibold text-[#3b2a23] mb-1">{t("contact.name")}</label>
							<input type="text" placeholder={t("contact.yourName")} className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
						</div>
						<div className="flex-1">
							<label className="block text-sm font-semibold text-[#3b2a23] mb-1">{t("contact.email")}</label>
							<input type="email" placeholder={t("contact.yourEmail")} className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
						</div>
					</div>
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1">
							<label className="block text-sm font-semibold text-[#3b2a23] mb-1">{t("contact.phone")}</label>
							<input type="tel" placeholder={t("contact.yourPhone")} className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
						</div>
					</div>
					<div>
						<label className="block text-sm font-semibold text-[#3b2a23] mb-1">{t("contact.message")}</label>
						<textarea placeholder={t("contact.yourMessage")} rows={4} className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9] resize-none" />
					</div>
					<button type="submit" className="hover:bg-[#643e2f] bg-[#ab8351] cursor-pointer text-white px-8 py-2 rounded text-base font-semibold shadow transition self-start mt-2">{t("contact.send")}</button>
				</form>

				{/* Company Info */}
				<div className="flex-1 flex flex-col gap-4 justify-between">
					<div className='flex flex-col gap-5'>
						<h3 className="text-xl font-bold text-[#ab8351] mb-2">Chocolatewala Enterprise</h3>
						<div className="flex items-center gap-2 mb-2 text-[#3b2a23]">
							<FiPhone className="text-[#ab8351] scale-125" />
							<span>+91 98765 43210</span>
						</div>
						<div className="flex items-center gap-2 mb-2 text-[#3b2a23]">
							<FiMail className="text-[#ab8351] scale-125" />
							<span>info@MaaBhagwatiProduct.com</span>
						</div>
						<div className="flex items-center gap-2 mb-2 text-[#3b2a23]">
							<FiClock className="text-[#ab8351] scale-125" />
							<span>Mon-Sat: 9:00am - 7:00pm</span>
						</div>
						<div className="flex items-center gap-4 mb-2 text-[#3b2a23]">
							<FiMapPin className="text-[#ab8351] scale-200 lg:scale-175" />
							<span>Glory Maa Bhagwati Product , Gram Girwai , Lashkar , Gwalior 474001, India</span>
						</div>
                        <div className="flex gap-4 mt-4">
						<a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-[#ab8351] hover:text-[#643e2f] text-2xl"><FiInstagram /></a>
						<a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-[#ab8351] hover:text-[#643e2f] text-2xl"><FiFacebook /></a>
						<a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-[#ab8351] hover:text-[#643e2f] text-2xl"><FiTwitter /></a>
					</div>
					</div>
					
				</div>
			</div>

			{/* Map Section */}
			<div className="max-w-5xl w-full mt-10 rounded-lg overflow-hidden shadow border border-[#ececec]">
				<iframe
					title="Glory Maa Bhagwati Product"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1823.9415388123462!2d78.10863353209014!3d26.184242664152467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976cf54272e3939%3A0x7e32fd330cda329d!2sGlory%20Maa%20Bhagwati%20Product!5e0!3m2!1sen!2sin!4v1765703508424!5m2!1sen!2sin"
					width="100%"
					height="300"
					style={{ border: 0 }}
					allowFullScreen=""
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</div>
	);
}
