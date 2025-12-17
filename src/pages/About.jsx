
import { FiBox, FiHeadphones, FiTruck, FiShield } from 'react-icons/fi';

export default function About() {
  return (
    <div className="bg-[#fffaf9] min-h-screen pb-12">
      {/* Header Bar */}
      <div className="bg-[#ab8351] text-white px-6 py-3 flex items-center justify-between">
        <span className="text-xl lg:ml-20 font-semibold">About Us</span>
      
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          {/* Left: Text */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3b2a23] mb-4">About The Glory Maa Bhagwati Product</h2>
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
                <span className="text-xs text-[#3b2a23] mt-1">Vendors</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[#51381a] text-2xl font-bold">23k</span>
                <span className="text-xs text-[#3b2a23] mt-1">Customers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[#51381a] text-2xl font-bold">2k</span>
                <span className="text-xs text-[#3b2a23] mt-1">Products</span>
              </div>
            </div>
          </div>
          {/* Right: Image */}
          <div className="flex-1 flex justify-center items-center">
            <img src="/images/about.png" alt="About Chocolate" className="rounded-lg shadow-lg w-full max-w-md object-cover" />
          </div>
        </div>

        {/* Features Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            {
              title: 'Product Packing',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
              icon: <FiBox className="text-3xl text-[#ab8351]" />,
            },
            {
              title: '24x7 Support',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
              icon: <FiHeadphones className="text-3xl text-[#51381a]" />,
            },
            {
              title: 'Delivery in 5 Days',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
              icon: <FiTruck className="text-3xl text-[#51381a]" />,
            },
            {
              title: 'Payment Secure',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
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