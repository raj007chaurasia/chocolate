import React from "react";
import { useTranslation } from "react-i18next";


const items = [
  { id: "c5", img: "/images/c5.png", label: "DAIRY MILK FRUIT AND NUTS" },
  { id: "c6", img: "/images/c6.png", label: "NESTLE KITKAT" },
  { id: "c7", img: "/images/c7.png", label: "ASSORTED TRUFFLES" },
  { id: "c8", img: "/images/c8.png", label: "NUTELLA SPREADS" },
  { id: "c9", img: "/images/c9.png", label: "CATBARY CRISPELLO" },
  { id: "c10", img: "/images/c10.png", label: "MAGIC LOLLIPOPS" },
];

export default function ProductsDiscover() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#fffaf9] mt-10">
      <div className=" mx-auto px-6 lg:px-8 py-14 ">
        
        
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#3b2418] tracking-wide mb-10">
          {t("home.discoverTitle").toUpperCase()}
        </h2>


        <div className=" rounded-sm py-10 px-4 sm:px-10 flex flex-col items-center">
          <ul
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              gap-y-10
              gap-x-10
              max-w-5xl
              w-full
              mx-auto
              justify-items-center
            "
          >
            {items.map((it) => (
              <li
                key={it.id}
                className="flex flex-col items-center gap-4 w-full"
              >
                
                <div className="w-28 h-28 rounded-full bg-[#FFC471] flex items-center justify-center overflow-hidden mb-2">
                  <img
                    src={it.img}
                    alt={it.label}
                    className="w-20 h-16 object-contain"
                    loading="lazy"
                  />
                </div>
            
                <p className="text-center text-sm sm:text-base font-semibold text-[#2f1d19]">
                  {it.label}
                </p>
              </li>
            ))}
          </ul>
    
          <div className="mt-12 flex justify-center w-full">
            <a
              href="/product"
              className="bg-[#2f1d19] text-white px-8 py-3 rounded-full text-sm font-semibold shadow"
            >
              {t("home.allProduct").toUpperCase()}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
