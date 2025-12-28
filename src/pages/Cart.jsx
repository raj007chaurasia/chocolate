import React, { useState } from "react";
import PopularProducts from "../components/PopularProducts";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const initialCart = [
	{
		id: 1,
		name: "Organic Lemon",
		price: 56,
		img: "/images/c1.png",
		qty: 1,
	},
	{
		id: 2,
		name: "Apple Juice",
		price: 75,
		img: "/images/c2.png",
		qty: 1,
	},
	{
		id: 3,
		name: "Watermelon 5kg Pack",
		price: 48,
		img: "/images/c3.png",
		qty: 1,
	},
	{
		id: 4,
		name: "Pomegranate 5 kg pack",
		price: 90,
		img: "/images/c4.png",
		qty: 1,
	},
	{
		id: 5,
		name: "Organic Peach Fruits",
		price: 50,
		img: "/images/c5.png",
		qty: 1,
	},
];

export default function Cart() {
	const { t } = useTranslation();
	const [cart, setCart] = useState(initialCart);
	const Navigate = useNavigate();

	const updateQty = (id, delta) => {
		setCart(cart =>
			cart.map(item =>
				item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
			)
		);
	};

	const removeItem = id => {
		setCart(cart => cart.filter(item => item.id !== id));
	};

	const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

			return (
				<div className="bg-[#fffaf9] min-h-screen pb-12">
					{/* Header Bar */}
					<div className="bg-[#ab8351] text-white px-6 py-3 flex items-center justify-between">
						<h1 className="text-xl lg:ml-20 font-bold tracking-wide">{t("cart.title")}</h1>
					</div>

					<div className="max-w-5xl mx-auto mt-10">
						{/* Mobile Card/List Layout */}
						<div className="block md:hidden space-y-4">
							{cart.map(item => (
								<div key={item.id} className="flex items-center bg-white rounded-lg shadow-sm px-3 py-3 gap-3 border border-[#ececec]">
									<img src={item.img} alt={item.name} className="w-14 h-14 object-contain rounded bg-white border shadow-sm" />
									<div className="flex-1">
										<div className="font-semibold text-[#3b2a23] text-sm leading-tight">{item.name}</div>
										<div className="text-xs text-[#7c6a5a]">200 ml</div>
										<div className="flex items-center gap-2 mt-2">
											<button onClick={() => updateQty(item.id, -1)} className="bg-[#ececec] cursor-pointer px-2 py-1 rounded text-[#3b2a23] font-bold text-lg hover:bg-[#ffedea]">-</button>
											<span className="px-3 py-1 bg-white border rounded text-[#3b2a23] font-semibold min-w-8 text-center">{item.qty}</span>
											<button onClick={() => updateQty(item.id, 1)} className="bg-[#ab8351] cursor-pointer px-2 py-1 rounded text-white font-bold text-lg hover:bg-[#51381a]">+</button>
										</div>
									</div>
									<div className="flex flex-col items-end min-w-[60px]">
										<span className="text-[#3b2a23] font-bold text-base">₹{item.price}</span>
										<span className="text-xs text-[#b7b7b7] line-through">₹{(item.price + 1).toFixed(2)}</span>
									</div>
									<button onClick={() => removeItem(item.id)} className="text-[#ff4d3d] hover:text-[#c03d31] cursor-pointer text-lg p-2 rounded-full transition ml-2" title="Remove">
										<AiFillDelete />
									</button>
								</div>
							))}
						</div>

						{/* Desktop Table Layout */}
						<div className="hidden md:block overflow-x-auto rounded-lg shadow-sm">
							<table className="w-full min-w-[700px] bg-[#f7f7f7] rounded-lg">
								<thead>
									<tr className="bg-[#ececec] text-[#3b2a23] text-sm">
										<th className="py-3 px-4 text-left font-semibold">{t("cart.product")}</th>
										<th className="py-3 px-4 font-semibold">{t("cart.price")}</th>
										<th className="py-3 px-4 font-semibold">{t("cart.quantity")}</th>
										<th className="py-3 px-4 font-semibold">{t("cart.total")}</th>
										<th className="py-3 px-4 font-semibold">{t("cart.action")}</th>
									</tr>
								</thead>
								<tbody>
									{cart.map(item => (
										<tr key={item.id} className="border-b border-[#ececec] hover:bg-[#fffaf3] transition">
											<td className="py-4 px-4 flex items-center gap-4">
												<img src={item.img} alt={item.name} className="w-14 h-14 object-contain rounded bg-white border shadow-sm" />
												<span className="text-[#3b2a23] font-semibold text-base">{item.name}</span>
											</td>
											<td className="py-4 px-4 text-center text-[#ab8351] font-bold text-base">₹{item.price.toFixed(2)}</td>
											<td className="py-4 px-4 text-center">
												<div className="flex items-center gap-2 justify-center">
													<button onClick={() => updateQty(item.id, -1)} className="bg-[#ececec] cursor-pointer px-2 py-1 rounded text-[#3b2a23] font-bold text-lg hover:bg-[#ffedea]">-</button>
													<span className="px-3 py-1 bg-white border rounded text-[#3b2a23] font-semibold min-w-8 text-center">{item.qty}</span>
													<button onClick={() => updateQty(item.id, 1)} className="bg-[#ab8351] cursor-pointer px-2 py-1 rounded text-white font-bold text-lg hover:bg-[#51381a]">+</button>
												</div>
											</td>
											<td className="py-4 px-4 text-center text-[#ab8351] font-bold text-base ">₹{(item.price * item.qty).toFixed(2)}</td>
											<td className="py-4 px-4 text-center">
												<button onClick={() => removeItem(item.id)} className="text-[#ff4d3d] hover:text-[#c03d31] cursor-pointer text-lg p-2 rounded-full transition" title={t("cart.remove")}>
													<AiFillDelete />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className="flex flex-col sm:flex-row justify-between items-center mt-8">
							<a href="/product" className="text-[#ab8351] hover:underline text-base font-semibold mb-4 sm:mb-0">{t("cart.continueShopping")}</a>
							<div className="flex items-center gap-6">
								<span className="font-bold text-[#3b2a23] text-lg">{t("cart.total")}: ₹{total.toFixed(2)}</span>
								<button onClick={()=>{Navigate("/checkout")}} className="bg-[#ab8351] hover:bg-[#51381a] text-white px-8 py-2 rounded-full text-base font-semibold shadow cursor-pointer transition">{t("cart.checkout")}</button>
							</div>
						</div>
					</div>
					<PopularProducts/>
				</div>
			);
	}
