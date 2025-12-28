import React, { useState } from "react";
import PopularProducts from "../components/PopularProducts";
import { useTranslation } from "react-i18next";

const product = {
	id: 1,
	name: "Seeds Of Change Organic Quinoa, Brown",
	description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In iure minus error doloribus saepe natus?",
	brand: "ESTA BETTERU CO",
	flavor: "Super Saver Pack",
	diet: "Vegetarian",
	weight: "200 Grams",
	tags: ["Gluten Free", "Sugar Free", "Egg Free", "Allergen-Free"],
	info: [
		{ label: "Items", value: "1" },
	],
	price: 120.25,
	oldPrice: 150.25,
	rating: 4.7,
	reviews: 75,
	images: [
		"/images/c1.png",
		"/images/c2.png",
		"/images/c3.png",
		"/images/c4.png",
		"/images/c5.png",
		"/images/c6.png",
	],
	packetsPerJar: 10,
};

export default function ProductDetails() {
	const { t } = useTranslation();

	const [selectedImg, setSelectedImg] = useState(product.images[0]);
	const [quantity, setQuantity] = useState(1);
	const [tab, setTab] = useState("description");

	return (
		<div className=" min-h-screen bg-[#fffaf9] py-8 px-2 md:px-0">
			<div className="max-w-5xl mx-auto bg-[#4e2d2a]/10 rounded-lg shadow p-6 md:p-10 flex flex-col md:flex-row gap-8">
				{/* Left: Images */}
				<div className="flex flex-col items-center md:w-1/2">
					<img src={selectedImg} alt={product.name} className="w-60 h-64 object-contain rounded mb-4 border border-[#ececec] bg-[#fffaf9]" />
					<div className="flex gap-2 mt-2 flex-wrap justify-center">
						{product.images.map((img, idx) => (
							<button
								key={idx}
								className={`border rounded p-1 w-14 h-14 flex items-center justify-center ${selectedImg === img ? "border-[#AB8E6A]" : "border-[#ececec]"}`}
								onClick={() => setSelectedImg(img)}
							>
								<img src={img} alt="thumb" className="w-10 h-10 object-contain shadow-2xl" />
							</button>
						))}
					</div>


					
				</div>

				{/* Right: Details */}
				<div className="flex-1 flex flex-col gap-2">
					<h2 className="text-xl md:text-2xl font-bold text-[#3b2a23] mb-1">{product.name}</h2>
					<p className="text-sm text-[#7c6a5a] mb-2">{product.description}</p>
					<div className="flex items-center gap-2 mb-2">
						<span className="text-[#AB8E6A] font-semibold">★ {product.rating} Rating</span>
					</div>
					<div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mb-2">
						<div><span className="font-bold">{t("productDetails.brand")}</span> {product.brand}</div>
						<div><span className="font-bold">{t("productDetails.flavor")}</span> {product.flavor}</div>
						<div><span className="font-bold">{t("productDetails.dietType")}</span> {product.diet}</div>
						{/* <div><span className="font-bold">{t("productDetails.weight")}</span> {product.weight}</div> */}
						<div className="col-span-2"><span className="font-bold">{t("productDetails.tags")}</span> {product.tags.join(", ")}</div>
						{product.info.map((i, idx) => (
							<div key={idx}><span className="font-bold">Stock:</span> {i.value}</div>
						))}
					</div>
					<div className="flex items-end gap-3 mb-3">
						<span className="text-[#AB8E6A] font-bold text-2xl">₹{product.price}</span>
						<span className="text-xs line-through text-[#b7b7b7]">₹{product.oldPrice}</span>
					</div>
					<div className="bg-[#fffaf9] border border-[#AB8E6A]/30 rounded-lg p-4 mb-5 shadow-sm">
						<div className="flex justify-between items-center mb-2">
							<span className="text-sm text-[#5a4a3a]">Packets in 1 Jar</span>
							<span className="font-bold text-[#3b2a23]">{product.packetsPerJar} Packets</span>
						</div>
						<div className="border-t border-dashed border-[#AB8E6A]/30 my-2"></div>
						<div className="flex justify-between items-center">
							<div className="flex flex-col">
								<span className="text-sm font-semibold text-[#3b2a23]">Total Packets</span>
								<span className="text-xs text-[#7c6a5a]">Based on {quantity} Jar{quantity > 1 ? 's' : ''}</span>
							</div>
							<span className="font-bold text-2xl text-[#AB8E6A]">{quantity * product.packetsPerJar}</span>
						</div>
					</div>
					<div className="flex gap-2 mb-4">
						<input 
							type="number" 
							min="1" 
							value={quantity} 
							onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
							className="w-16 border rounded px-2 py-1 text-sm" 
						/>
						<button className="hover:bg-[#51381a] bg-[#AB8E6A] text-white px-6 py-2 rounded text-sm font-semibold cursor-pointer">{t("productDetails.addToCart")}</button>
					</div>
				</div>
			</div>

			{/* Tabs Section */}
			<div className="max-w-5xl mx-auto mt-8 bg-white rounded-lg shadow p-6">
				<div className="flex border-b mb-4">
					<button
						className={`px-4 py-2 font-semibold text-sm border-b-2 transition ${tab === "description" ? "border-[#AB8E6A] text-[#AB8E6A]" : "border-transparent text-[#3b2a23]"}`}
						onClick={() => setTab("description")}
					>
						{t("productDetails.description")}
					</button>
					<button
						className={`px-4 py-2 font-semibold text-sm border-b-2 transition ${tab === "information" ? "border-[#AB8E6A] text-[#AB8E6A]" : "border-transparent text-[#3b2a23]"}`}
						onClick={() => setTab("information")}
					>
						{t("productDetails.information")}
					</button>
					
				</div>
				{tab === "description" && (
					<div>
						<p className="text-sm text-[#3b2a23] mb-4">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero sapiente dicta, odio dolore vero tempora voluptatum, consectetur, quasi accusamus consequatur. Qui sequi doloremque, consequatur, odio autem dignissimos consectetur atque vero in perferendis provident quis.
						</p>
						<h4 className="font-semibold mb-2">{t("productDetails.packagingDelivery")}</h4>
						<p className="text-sm text-[#3b2a23]">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero perferendis dolor! Qui vel consequatur, odio autem dignissimos consectetur atque vero in perferendis provident quis.
						</p>
					</div>
				)}
				{tab === "information" && (
					<div>
						<p className="text-sm text-[#3b2a23]">
							{t("productDetails.infoPlaceholder")}
						</p>
					</div>
				)}
				
			</div>

            {/* Recommended Products Section  */}
					<PopularProducts/>
		</div>
	);
}
