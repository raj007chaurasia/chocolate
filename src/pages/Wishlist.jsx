import React, { useState } from 'react';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useTranslation } from "react-i18next";

const initialWishlist = [
	{
		id: 1,
		name: 'Organic Lemon',
		price: 56,
		img: '/images/c1.png',
	},
	{
		id: 2,
		name: 'Apple Juice',
		price: 75,
		img: '/images/c2.png',
	},
	{
		id: 3,
		name: 'Watermelon 5kg Pack',
		price: 48,
		img: '/images/c3.png',
	},
];

export default function Wishlist() {
	const { t } = useTranslation();
	const [wishlist, setWishlist] = useState(initialWishlist);

	const [activeHearts, setActiveHearts] = useState(wishlist.map(item => item.id));

	const toggleHeart = id => {
		setActiveHearts(prev =>
			prev.includes(id)
				? prev.filter(i => i !== id)
				: [...prev, id]
		);
		// Remove from wishlist if unfilled
		if (activeHearts.includes(id)) {
			setWishlist(wishlist.filter(item => item.id !== id));
		}
	};

	return (
		<div className="bg-[#fffaf9] min-h-screen pb-12">
			{/* Header Bar */}
			<div className="bg-[#ab8351] text-white px-6 py-3 flex items-center justify-between">
				<h1 className="text-xl lg:ml-10 font-bold tracking-wide">{t("wishlist.title")}</h1>
			</div>

			<div className="max-w-4xl mx-auto mt-10 px-2">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{wishlist.length === 0 ? (
						<div className="col-span-full text-center text-[#7c6a5a] text-lg font-semibold py-12">
							<FiHeart className="mx-auto text-4xl mb-2 animate-pulse text-[#ab8351]" />
							{t("wishlist.empty")}
						</div>
					) : (
						wishlist.map(item => (
							<div
								key={item.id}
								className="bg-white rounded-lg border border-[#ececec] shadow hover:shadow-lg transition flex flex-col items-center p-6 group relative"
							>
								<img
									src={item.img}
									alt={item.name}
									className="w-24 h-28 object-contain mb-3 rounded-lg group-hover:scale-105 transition-transform duration-300"
								/>
								<h3 className="text-base font-bold text-[#3b2a23] mb-1 text-center group-hover:text-[#ab8351] transition-colors duration-200">
									{item.name}
								</h3>
								<span className="text-[#ab8351] font-bold text-lg mb-2">₹{item.price}</span>
								<div className="flex gap-3 mt-auto">
									<button
										className="flex items-center gap-1 hover:bg-[#51381a] bg-[#ab8351] text-white px-4 py-2 rounded-full text-xs font-semibold shadow transition cursor-pointer active:scale-95"
										title={t("wishlist.addToCart")}
									>
										<FiShoppingCart className="text-base" /> {t("wishlist.addToCart")}
									</button>
								</div>
								<button
									className="absolute top-3 right-3 text-xl group-hover:scale-125 transition-transform duration-200 cursor-pointer"
									onClick={() => toggleHeart(item.id)}
									title={t("wishlist.remove")}
								>
									{activeHearts.includes(item.id) ? (
										<AiFillHeart className="text-[#ff4d3d]" />
									) : (
										<AiOutlineHeart className="text-[#ff4d3d]" />
									)}
								</button>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
