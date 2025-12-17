import React, { useState } from "react";
import PopularProducts from "../components/PopularProducts";

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
	sizes: ["50g", "100g", "150g", "200g"],
};

export default function ProductDetails() {
	const [selectedImg, setSelectedImg] = useState(product.images[0]);
	const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
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
						<span className="text-[#AB8E6A] font-semibold">★ {product.rating}</span>
						<span className="text-xs text-[#7c6a5a]">({product.reviews} Review)</span>
					</div>
					<div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mb-2">
						<div><span className="font-bold">Brand:</span> {product.brand}</div>
						<div><span className="font-bold">Flavor:</span> {product.flavor}</div>
						<div><span className="font-bold">Diet Type:</span> {product.diet}</div>
						<div><span className="font-bold">Weight:</span> {product.weight}</div>
						<div className="col-span-2"><span className="font-bold">Tags:</span> {product.tags.join(", ")}</div>
						{product.info.map((i, idx) => (
							<div key={idx}><span className="font-bold">{i.label}:</span> {i.value}</div>
						))}
					</div>
					<div className="flex items-end gap-3 mb-3">
						<span className="text-[#AB8E6A] font-bold text-2xl">₹{product.price}</span>
						<span className="text-xs line-through text-[#b7b7b7]">₹{product.oldPrice}</span>
					</div>
					<div className="flex items-center gap-2 mb-4">
						<span className="font-semibold text-sm">Size/Weight:</span>
						{product.sizes.map(size => (
							<button
								key={size}
								className={`px-3 py-1 rounded border text-xs font-semibold cursor-pointer ${selectedSize === size ? "bg-[#AB8E6A] text-white border-[#AB8E6A]" : "border-[#ececec] text-[#3b2a23]"}`}
								onClick={() => setSelectedSize(size)}
							>
								{size}
							</button>
						))}
					</div>
					<div className="flex gap-2 mb-4">
						<input type="number" min="1" defaultValue={1} className="w-16 border rounded px-2 py-1 text-sm" />
						<button className="hover:bg-[#51381a] bg-[#AB8E6A] text-white px-6 py-2 rounded text-sm font-semibold cursor-pointer">Add To Cart</button>
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
						Description
					</button>
					<button
						className={`px-4 py-2 font-semibold text-sm border-b-2 transition ${tab === "information" ? "border-[#AB8E6A] text-[#AB8E6A]" : "border-transparent text-[#3b2a23]"}`}
						onClick={() => setTab("information")}
					>
						Information
					</button>
					
				</div>
				{tab === "description" && (
					<div>
						<p className="text-sm text-[#3b2a23] mb-4">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero sapiente dicta, odio dolore vero tempora voluptatum, consectetur, quasi accusamus consequatur. Qui sequi doloremque, consequatur, odio autem dignissimos consectetur atque vero in perferendis provident quis.
						</p>
						<h4 className="font-semibold mb-2">Packaging & Delivery</h4>
						<p className="text-sm text-[#3b2a23]">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero perferendis dolor! Qui vel consequatur, odio autem dignissimos consectetur atque vero in perferendis provident quis.
						</p>
					</div>
				)}
				{tab === "information" && (
					<div>
						<p className="text-sm text-[#3b2a23]">
							Information about the product goes here. You can add more details as needed.
						</p>
					</div>
				)}
				
			</div>

            {/* Recommended Products Section  */}
					<PopularProducts/>
		</div>
	);
}
