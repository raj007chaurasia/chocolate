import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const products = [
  {
    id: 1,
    name: "Fresh avocado dark choco bar",
    price: 120,
    oldPrice: 150,
    img: "/images/c1.png",
  },
  {
    id: 2,
    name: "Best mixed nut fresh pack",
    price: 99,
    oldPrice: 120,
    img: "/images/c2.png",
  },
  {
    id: 3,
    name: "Fresh organic spicy lollipops",
    price: 80,
    oldPrice: 100,
    img: "/images/c3.png",
  },
  {
    id: 4,
    name: "Organic fresh nut choco",
    price: 110,
    oldPrice: 130,
    img: "/images/c4.png",
  },
   {
    id: 5,
    name: "Fresh avocado dark choco bar",
    price: 120,
    oldPrice: 150,
    img: "/images/c5.png",
  },
  {
    id: 6,
    name: "Best mixed nut fresh pack",
    price: 99,
    oldPrice: 120,
    img: "/images/c6.png",
  },
  {
    id: 7,
    name: "Fresh organic spicy lollipops",
    price: 80,
    oldPrice: 100,
    img: "/images/c7.png",
  },
  {
    id: 8,
    name: "Organic fresh nut choco",
    price: 110,
    oldPrice: 130,
    img: "/images/c8.png",
  },
   {
    id: 9,
    name: "Fresh avocado dark choco bar",
    price: 120,
    oldPrice: 150,
    img: "/images/c9.png",
  },
  {
    id: 10,
    name: "Best mixed nut fresh pack",
    price: 99,
    oldPrice: 120,
    img: "/images/c10.png",
  },
  {
    id: 11,
    name: "Fresh organic spicy lollipops",
    price: 80,
    oldPrice: 100,
    img: "/images/c1.png",
  },
  {
    id: 12,
    name: "Organic fresh nut choco",
    price: 110,
    oldPrice: 130,
    img: "/images/c2.png",
  },

];

const categories = [
  "All Chocolates",
  "Dark Chocolate",
  "Milk Chocolate",
  "Truffles",
  "Spreads",
  "Lollipops",
];

const weights = ["50g", "100g", "200g", "500g"];
const tags = ["Vegetarian", "Sugarfree", "Glutenfree"];

export default function Product() {
  const [selectedCategory, setSelectedCategory] = useState("All Chocolates");
  const [priceRange, setPriceRange] = useState([50, 150]);
  const [selectedWeight, setSelectedWeight] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const Navigate = useNavigate();

  return (
    <div className=" min-h-screen pt-4 pb-12">
      {/* Header Bar */}
      <div className="bg-[#ab8351] text-white px-6 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold tracking-wide">Product Page</h1>
      
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 mt-8 px-4">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 h-[650px] bg-white rounded-lg shadow-sm p-4 mb-6 md:mb-0">
          <h2 className="font-bold text-base mb-4">Product Category</h2>
          <ul className="space-y-2 mb-6">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  className={`text-sm w-full text-left text-[#2F1D19] font-semibold px-2 py-1 rounded hover:bg-[#ffedea] ${selectedCategory === cat ? "bg-[#AB8E6A] text-[#d6c7b3]" : "text-[#3b2a23]"}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>

          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-2">Filter by Price</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs">₹{priceRange[0]}</span>
              <input
                type="range"
                min="50"
                max="200"
                value={priceRange[0]}
                onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                className="w-full accent-[#AB8E6A]"
              />
              <span className="text-xs">₹{priceRange[1]}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-2">Weight</h3>
            <div className="flex flex-wrap gap-2">
              {weights.map(w => (
                <button
                  key={w}
                  className={`px-2 py-1 rounded text-xs border ${selectedWeight.includes(w) ? "bg-[#AB8E6A] text-white border-[#AB8E6A]" : "border-[#ececec] text-[#3b2a23]"}`}
                  onClick={() => setSelectedWeight(selectedWeight.includes(w) ? selectedWeight.filter(x => x !== w) : [...selectedWeight, w])}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-2">Product Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag}
                  className={`px-2 py-1 rounded text-xs border ${selectedTags.includes(tag) ? "bg-[#AB8E6A] text-white border-[#AB8E6A]" : "border-[#ececec] text-[#3b2a23]"}`}
                  onClick={() => setSelectedTags(selectedTags.includes(tag) ? selectedTags.filter(x => x !== tag) : [...selectedTags, tag])}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Section */}
        <main className="flex-1">
       

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center hover:shadow-md transition">
                <img src={product.img} alt={product.name} className="w-28 h-32 object-contain mb-3" />
                <h3 className="text-sm font-semibold text-center mb-1 text-[#3b2a23]">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#AB8E6A] font-bold text-base">₹{product.price}</span>
                  <span className="text-xs line-through text-[#b7b7b7]">₹{product.oldPrice}</span>
                </div>
                <button onClick={()=>{Navigate("/product-details")}} className="mt-auto  bg-[#51381a] text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#AB8E6A]">Add to Cart</button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <button className="px-3 py-1 rounded border text-[#AB8E6A] border-[#AB8E6A] hover:bg-[#ffedea]">Previous</button>
            <button className="px-3 py-1 rounded border bg-[#AB8E6A] text-white border-[#AB8E6A]">1</button>
            <button className="px-3 py-1 rounded border text-[#AB8E6A] border-[#AB8E6A] hover:bg-[#ffedea]">2</button>
            <button className="px-3 py-1 rounded border text-[#AB8E6A] border-[#AB8E6A] hover:bg-[#ffedea]">Next</button>
          </div>
        </main>
      </div>
    </div>
  );
}
