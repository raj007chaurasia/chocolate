import React from "react";
import { useTranslation } from "react-i18next";

export default function Products() {
  const { t } = useTranslation();

  const items = [
    { id: 1, label: t("home.categories.chocolateBars"), img: './images/Chocolate.png' },
    { id: 2, label: t("home.categories.truffles"), img: './images/Truffle.png' },
    { id: 3, label: t("home.categories.lollipops"), img: './images/Lollipop.png' },
    { id: 4, label: t("home.categories.fruitsAndNuts"), img: './images/Bonbon.png' },
    { id: 5, label: t("home.categories.sugarFree"), img: './images/Chocolate.png' },
    { id: 6, label: t("home.categories.spreads"), img: './images/Chocolate1.png' },
  ];

  return (
    <section aria-labelledby="our-products" className="bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 sm:py-16">

        {/* Heading */}
        <header className="text-center">
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3b2418] tracking-wide">
            {t("home.productsTitle").toUpperCase()}
          </h2>

          <p className="mt-4 max-w-3xl mx-auto text-sm sm:text-base text-[#6b4f46]">
            {t("home.productsSubtitle")}
          </p>
        </header>

        {/* Product items */}
        <div className="mt-10">
          <ul className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10">
            {items.map((item) => (
              <li key={item.id} className="w-28 sm:w-32 flex flex-col items-center text-center">
                
                {/* Circular Image Container */}
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#FFC471]/55 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                  />
                </div>

                {/* Label */}
                <span className="mt-3 text-xs sm:text-sm font-semibold text-[#2f1d19]">
                  {item.label}
                </span>

              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
