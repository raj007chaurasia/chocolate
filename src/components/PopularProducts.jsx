import React from 'react'
import { useTranslation } from "react-i18next";

const PopularProducts = () => {
	const { t } = useTranslation();


	const recommended = [
		{
			id: 2,
			name: "Best snakes with hazel nut mix pack 200gm",
			price: 120.25,
			oldPrice: 123.25,
			img: "/images/c1.png",
			rating: 4.5,
		},
		{
			id: 3,
			name: "Sweet snakes crunchy nut mix 250gm pack",
			price: 100.0,
			oldPrice: 110.0,
			img: "/images/c2.png",
			rating: 5.0,
		},
		{
			id: 4,
			name: "Best snakes with hazel nut mix pack 200gm",
			price: 120.25,
			oldPrice: 128.25,
			img: "/images/c3.png",
			rating: 4.5,
		},
		{
			id: 5,
			name: "Sweet snakes crunchy nut mix 250gm pack",
			price: 100.0,
			oldPrice: 110.0,
			img: "/images/c4.png",
			rating: 5.0,
		},
	];


  return (
   <div className="max-w-5xl mx-auto mt-16 mb-8">
						<h2 className="text-2xl font-bold text-center text-[#3b2a23] mb-8">{t("home.popularTitle")}</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
							{recommended.map((item) => (
								<div key={item.id} className="bg-white border border-[#ececec] rounded-lg p-4 flex flex-col items-center hover:shadow-md transition">
									<img src={item.img} alt={item.name} className="w-28 h-32 object-contain mb-3" />
									<div className="text-xs text-[#b7b7b7] mb-1">{t("home.snacks")}</div>
									<div className="flex items-center gap-1 mb-1">
										<span className="text-[#AB8E6A] font-semibold">★</span>
										<span className="text-[#3b2a23]">({item.rating})</span>
									</div>
									<h3 className="text-sm font-semibold text-center mb-1 text-[#3b2a23]">{item.name}</h3>
									<div className="flex items-center gap-2 mb-2">
										<span className="text-[#AB8E6A] font-bold text-base">₹{item.price}</span>
										<span className="text-xs line-through text-[#b7b7b7]">₹{item.oldPrice}</span>
									</div>
									<button className="mt-auto hover:bg-[#51381a] cursor-pointer text-white px-4 py-2 rounded-full text-xs font-semibold bg-[#AB8E6A]">{t("home.addToCart")}</button>
								</div>
							))}
						</div>
					</div>
  )
}

export default PopularProducts