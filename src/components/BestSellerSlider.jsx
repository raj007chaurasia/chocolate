import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { FaStar } from "react-icons/fa";


const products = [
  { id: 1, img: "/images/c1.png", title: "Crispello", price: 140, old: 220, rating: 5 },
  { id: 2, img: "/images/c2.png", title: "Galaxy", price: 140, old: 220, rating: 4 },
  { id: 3, img: "/images/c3.png", title: "Dairy Milk", price: 140, old: 220, rating: 5 },
  { id: 4, img: "/images/c4.png", title: "Dark Chocolate", price: 140, old: 220, rating: 4 },
  { id: 5, img: "/images/c1.png", title: "Crispello", price: 140, old: 220, rating: 5 },
  { id: 6, img: "/images/c2.png", title: "Galaxy", price: 140, old: 220, rating: 4 },
  { id: 7, img: "/images/c3.png", title: "Dairy Milk", price: 140, old: 220, rating: 5 },
  { id: 8, img: "/images/c4.png", title: "Dark Chocolate", price: 140, old: 220, rating: 4 },
];

export default function BestSellerSlider() {
  return (
    <section className="bg-[#3b2418]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white ">
            BEST SELLER
          </h2>
        </div>

        {/* Slider */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            spaceBetween={20}
            centeredSlides={true}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 3 },
            }}
          >
            {products.map((p) => (
              <SwiperSlide key={p.id}>
                <article className="card lg:w-60 bg-white rounded-sm shadow-md overflow-hidden border border-transparent -translate-y-8">
                  {/* Image  */}
                  <div className="p-6 flex justify-center">
                    <div className="w-38 h-56 flex items-center justify-center">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center gap-2 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < p.rating ? "text-yellow-400" : "text-gray-200"}
                        />
                      ))}
                    </div>

                    <h3 className="mt-3 text-base font-semibold text-[#2f1d19]">
                      {p.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-sm text-gray-400 line-through">₹{p.old}</span>
                      <span className="text-sm font-semibold text-[#2f1d19]">₹{p.price}</span>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        /* purple outline around active slide card */
        .swiper-slide-active .card {
          border-width: 4px;
          border-color: #7c3aed;
          box-shadow: 0 10px 30px rgba(124, 58, 237, 0.12);
        }

        .swiper-slide-active .card {
          transform: translateY(-6px);
          transition: transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
        }

        .card {
          transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
        }

        /* pagination bullets */
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #e6d7d4;
          opacity: 1;
          margin: 0 6px !important;
          
        }
        .swiper-pagination-bullet-active {
          background: #3b2418;
          box-shadow: 0 0 0 6px rgba(255,255,255,0.08), 0 0 0 10px rgba(0,0,0,0.04) inset;
        }

        .swiper-pagination {
          bottom: 4px !important;
        }

        @media (max-width: 640px) {
          .swiper-slide-active .card {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </section>
  );
}
