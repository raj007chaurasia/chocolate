
import { FiBox, FiHeadphones, FiTruck, FiShield } from 'react-icons/fi';
import { useTranslation } from "react-i18next";

export default function About() {
	const { t } = useTranslation();

  return (
    <div className="bg-[#fffaf9] min-h-screen pb-12">
      {/* Header Bar */}
      <div className="bg-[#ab8351] text-white px-6 py-3 flex items-center justify-between">
        <span className="text-xl lg:ml-20 font-semibold">{t("about.title")}</span>
      
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          {/* Left: Text */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3b2a23] mb-4">{t("about.heading")}</h2>
            <p className="text-[#7c6a5a] text-sm mb-3 leading-relaxed">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, recusandae necessitatibus quasi incidunt alias adipisci pariatur earum illum beatae assumenda rerum quod. Temporibus magni autem ut voluptatibus neque.
            </p>
            <p className="text-[#7c6a5a] text-sm mb-3 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At vitae rerum cum accusamus magni consequuntur architecto, ipsam deleniti sapiente doloribus suscipit voluptatum eius perferendis amet.
            </p>
            <p className="text-[#7c6a5a] text-sm mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, maxime amet architecto est exercitationem optio ea maiores corporis beatae, dolores doloribus libero molestiae qui illum? Voluptates deserunt adipisci voluptatem magni iusto sed blanditiis quod aspernatur iusto?
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 bg-white rounded-lg shadow border border-[#ececec] p-4 mb-6">
              <div className="flex flex-col items-center">
                <span className="text-[#51381a] text-2xl font-bold">0.1k</span>
                <span className="text-xs text-[#3b2a23] mt-1">{t("about.vendors")}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[#51381a] text-2xl font-bold">23k</span>
                <span className="text-xs text-[#3b2a23] mt-1">{t("about.customers")}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[#51381a] text-2xl font-bold">2k</span>
                <span className="text-xs text-[#3b2a23] mt-1">{t("about.products")}</span>
              </div>
            </div>
          </div>
          {/* Right: Image */}
          <div className="flex-1 flex justify-center items-center">
            <img src="/images/about.png" alt="About Chocolate" className="rounded-lg shadow-lg w-full max-w-md object-cover" />
          </div>
        </div>
       
       
        {/* Image Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-12 h-[300px]">
          <div className="bg-white rounded-lg shadow border border-[#ececec] overflow-hidden">
            <img src="/images/about1.png" alt="About Image 1" className="w-full h-auto object-cover" />
            <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique repudiandae optio facere.</h1>
          </div>
          <div className="bg-white rounded-lg shadow border border-[#ececec] overflow-hidden">
            <img src="/images/about2.png" alt="About Image 2" className="w-full h-auto object-cover" />
          </div>
         
        </div>

        {/* Features Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            {
              title: t('about.features.packing'),
              desc: t('about.features.lorem'),
              icon: <FiBox className="text-3xl text-[#ab8351]" />,
            },
            {
              title: t('about.features.support'),
              desc: t('about.features.lorem'),
              icon: <FiHeadphones className="text-3xl text-[#51381a]" />,
            },
            {
              title: t('about.features.delivery'),
              desc: t('about.features.lorem'),
              icon: <FiTruck className="text-3xl text-[#51381a]" />,
            },
            {
              title: t('about.features.secure'),
              desc: t('about.features.lorem'),
              icon: <FiShield className="text-3xl text-[#ab8351]" />,
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white rounded-lg border border-[#ececec] shadow hover:shadow-lg transition p-6 group cursor-pointer text-center"
            >
              <div className="mb-3 group-hover:scale-110 transition-transform">{card.icon}</div>
              <h4 className="font-bold text-[#3b2a23] mb-2 text-base group-hover:text-[#ab8351] transition-colors">{card.title}</h4>
              <p className="text-xs text-[#7c6a5a]">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}