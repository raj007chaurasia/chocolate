import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#fffaf9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 py-12 ">
          {/* LEFT - Text */}
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold leading-tight text-[#3b2418] whitespace-pre-line">
              {t("hero.title")}
            </h1>

            <p className="mt-6 max-w-xl text-sm sm:text-lg text-[#6b4f46]">
              {t("hero.subtitle")}
            </p>

            <div className="mt-8">
              <Link
                to="/product"
                className="inline-block bg-[#2f1d19] text-white text-sm font-semibold px-16 py-3 rounded-sm shadow-[0_16px_28px_rgba(47,29,25,0.25)] transform transition hover:-translate-y-0.5"
                aria-label={t("hero.shopNow")}
              >
                {t("hero.shopNow").toUpperCase()}
              </Link>
            </div>
          </div>

          {/* RIGHT - Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-full max-w-[420px] lg:max-w-[450px]">
              <img
                src='./images/hero.png'
                alt="Happy chocolate character"
                className="w-full h-auto object-contain"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
