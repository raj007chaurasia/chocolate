import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


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
  { id: "all", labelKey: "product.categories.all" },
  { id: "dark", labelKey: "product.categories.dark" },
  { id: "milk", labelKey: "product.categories.milk" },
  { id: "truffles", labelKey: "product.categories.truffles" },
  { id: "spreads", labelKey: "product.categories.spreads" },
  { id: "lollipops", labelKey: "product.categories.lollipops" }
];

const weights = ["50g", "100g", "200g", "500g"];
const tags = [
  { id: "vegetarian", labelKey: "product.tagsList.vegetarian" },
  { id: "sugarfree", labelKey: "product.tagsList.sugarfree" },
  { id: "glutenfree", labelKey: "product.tagsList.glutenfree" }
];

export default function Product() {
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([50, 150]);
  const [selectedWeight, setSelectedWeight] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const Navigate = useNavigate();

  // Wishlist state for demo (ids of products in wishlist)
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <div className=" min-h-screen bg-[#fffaf9]  pb-12">
      {/* Header Bar */}
      <div className="bg-[#ab8351] text-white px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl lg:ml-10 font-bold tracking-wide">{t("product.title")}</h1>
      
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 mt-8 px-4">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 h-[650px] bg-white rounded-lg shadow-sm p-4 mb-6 md:mb-0">
          <h2 className="font-bold text-base mb-4">{t("product.category")}</h2>
          <ul className="space-y-2 mb-6">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  className={`text-sm w-full text-left text-[#2F1D19] font-semibold px-2 py-1 rounded hover:bg-[#ffedea] ${selectedCategory === cat.id ? "bg-[#AB8E6A] text-[#d6c7b3]" : "text-[#3b2a23]"}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {t(cat.labelKey)}
                </button>
              </li>
            ))}
          </ul>

          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-2">{t("product.filterByPrice")}</h3>
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
            <h3 className="font-semibold text-sm mb-2">{t("product.weight")}</h3>
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
            <h3 className="font-semibold text-sm mb-2">{t("product.tags")}</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag.id}
                  className={`px-2 py-1 rounded text-xs border ${selectedTags.includes(tag.id) ? "bg-[#AB8E6A] text-white border-[#AB8E6A]" : "border-[#ececec] text-[#3b2a23]"}`}
                  onClick={() => setSelectedTags(selectedTags.includes(tag.id) ? selectedTags.filter(x => x !== tag.id) : [...selectedTags, tag.id])}
                >
                  {t(tag.labelKey)}
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
              <div
                key={product.id}
                className="bg-white rounded-lg border border-[#ececec] shadow hover:shadow-lg transition flex flex-col items-center p-4 group relative"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-28 h-32 object-contain mb-3 rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-sm font-semibold text-center mb-1 text-[#3b2a23] group-hover:text-[#ab8351] transition-colors duration-200">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#AB8E6A] font-bold text-base">₹{product.price}</span>
                  <span className="text-xs line-through text-[#b7b7b7]">₹{product.oldPrice}</span>
                </div>
                <button onClick={()=>{Navigate("/product-details")}} className="mt-auto hover:bg-[#51381a] bg-[#ab8351] text-white px-4 py-2 rounded-full text-xs font-semibold shadow transition cursor-pointer active:scale-95">{t("home.addToCart")}</button>
                <button
                  className="absolute top-3 right-3 text-xl group-hover:scale-125 transition-transform duration-200 cursor-pointer"
                  onClick={() => toggleWishlist(product.id)}
                  title={wishlist.includes(product.id) ? t("product.wishlist.remove") : t("product.wishlist.add")}
                  aria-label="wishlist"
                >
                  {wishlist.includes(product.id) ? (
                    <AiFillHeart className="text-[#ff4d3d] transition-colors duration-200" />
                  ) : (
                    <AiOutlineHeart className="text-[#ff4d3d] transition-colors duration-200" />
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <button className="px-3 py-1 rounded border text-[#AB8E6A] border-[#AB8E6A] hover:bg-[#ffedea] cursor-pointer">{t("product.pagination.previous")}</button>
            <button className="px-3 py-1 rounded border bg-[#51381a] text-white border-[#AB8E6A] cursor-pointer">1</button>
            <button className="px-3 py-1 rounded border text-[#AB8E6A] border-[#AB8E6A] hover:bg-[#ffedea] cursor-pointer">2</button>
            <button className="px-3 py-1 rounded border text-[#AB8E6A] border-[#AB8E6A] hover:bg-[#ffedea] cursor-pointer">{t("product.pagination.next")}</button>
          </div>
        </main>
      </div>
    </div>
  );
}
