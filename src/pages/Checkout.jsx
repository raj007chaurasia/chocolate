import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const initialCart = [
  {
    id: 1,
    name: "Organic Lemon",
    price: 56,
    img: "/images/c1.png",
    qty: 1,
  },
  {
    id: 2,
    name: "Apple Juice",
    price: 75,
    img: "/images/c2.png",
    qty: 2,
  },
  {
    id: 3,
    name: "Watermelon 5kg Pack",
    price: 48,
    img: "/images/c3.png",
    qty: 1,
  },
];

const initialAddresses = [
  {
    id: 1,
    type: "Home",
    address: "123, Chocolate Street, Delhi, India",
    pincode: "Delhi - 110001"
  },
  {
    id: 2,
    type: "Work",
    address: "456, Business Park, Mumbai, India",
    pincode: "Mumbai - 400001"
  },
    {
    id: 3,
    type: "Padosi ka Ghar",
    address: "479, Business Park, Mumbai, India",
    pincode: "Mumbai - 400001"
  }
];

export default function Checkout() {
  const { t } = useTranslation();

  const [cart] = useState(initialCart);
  const [selectedAddress, setSelectedAddress] = useState(initialAddresses[0].id);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = Math.round(subtotal * 0.05); 
  const delivery = subtotal > 0 ? 30 : 0;
  const total = subtotal + tax + delivery;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    navigate("/invoice");

    setTimeout(() => setOrderPlaced(false), 3000);
  };

  return (
    <div className="bg-[#fffaf9] min-h-screen pb-12">
    
      <div className="bg-[#ab8351] text-white px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl lg:ml-20 font-bold tracking-wide">{t("checkout.title")}</h1>
      </div>

      <div className="max-w-4xl mx-auto mt-10 px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
          <div className="bg-white rounded-lg shadow p-6 border border-[#ececec]">
            <h2 className="text-lg font-bold text-[#3b2a23] mb-4">{t("checkout.orderSummary")}</h2>
            {cart.length === 0 ? (
              <div className="text-[#7c6a5a] text-center py-8">{t("checkout.noItems")}</div>
            ) : (
              <ul className="divide-y divide-[#ececec]">
                {cart.map(item => (
                  <li key={item.id} className="flex items-center py-4 gap-4">
                    <img src={item.img} alt={item.name} className="w-14 h-14 object-contain rounded bg-white border shadow-sm" />
                    <div className="flex-1">
                      <div className="font-semibold text-[#3b2a23] text-sm leading-tight">{item.name}</div>
                      <div className="text-xs text-[#7c6a5a]">{t("checkout.qty", { count: item.qty })}</div>
                    </div>
                    <div className="text-[#ab8351] font-bold text-base">₹{(item.price * item.qty).toFixed(2)}</div>
                  </li>
                ))}
              </ul>
            )}
            {/* Bill Details */}
            <div className="mt-6 border-t border-[#ececec] pt-4 space-y-2 text-sm">
              <div className="flex justify-between">

                <span className="text-[#7c6a5a]">{t("checkout.subtotal")}</span>
                <span className="font-semibold text-[#3b2a23]">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7c6a5a]">{t("checkout.gst")}</span>
                <span className="font-semibold text-[#3b2a23]">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7c6a5a]">{t("checkout.delivery")}</span>
                <span className="font-semibold text-[#3b2a23]">₹{delivery.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t border-[#ececec] pt-2 mt-2">
                <span className="text-[#ab8351]">{t("checkout.total")}</span>
                <span className="text-[#ab8351]">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Billing Details & Place Order */}
          <div className="bg-white rounded-lg shadow p-6 border border-[#ececec] flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#3b2a23] mb-4">{t("checkout.billingDetails")}</h2>
              <form className="space-y-4">
                 <div className="mb-6">
                  <h3 className="text-sm font-bold text-[#3b2a23] mb-3">Select Delivery Address</h3>
                  <div className=" gap-2 flex  flex-wrap  w-full ">
                    {initialAddresses.map((addr) => (
                      <div 
                        key={addr.id}
                        onClick={() => setSelectedAddress(addr.id)}
                        className={`cursor-pointer border rounded-lg p-3 flex items-start gap-3 w-[180px] transition-all ${
                          selectedAddress === addr.id 
                            ? "border-[#ab8351] bg-[#fffaf9] ring-1 ring-[#ab8351]" 
                            : "border-[#ececec] hover:border-[#ab8351]"
                        }`}
                      >
                        <div className={`mt-1 w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedAddress === addr.id ? "border-[#ab8351]" : "border-gray-300"
                        }`}>
                          {selectedAddress === addr.id && <div className="w-2 h-2 rounded-full bg-[#ab8351]" />}
                        </div>
                        <div>
                          <div className="font-bold text-[#3b2a23] text-sm">{addr.type}</div>
                          <p className="text-xs text-[#7c6a5a] mt-1">{addr.address}</p>
                          <p className="text-xs text-[#7c6a5a]">{addr.pincode}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                 </div>

                <div>
                  <label className="block text-xs font-semibold text-[#7c6a5a] mb-1">{t("checkout.fullName")}</label>
                  <input type="text" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]" placeholder={t("checkout.enterName")} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#7c6a5a] mb-1">{t("checkout.email")}</label>
                  <input type="email" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]" placeholder={t("checkout.enterEmail")} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#7c6a5a] mb-1">{t("checkout.address")}</label>
                  <textarea className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]" placeholder={t("checkout.enterAddress")} rows={2}></textarea>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-[#7c6a5a] mb-1">{t("checkout.city")}</label>
                    <input type="text" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]" placeholder={t("checkout.city")} />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-[#7c6a5a] mb-1">{t("checkout.pincode")}</label>
                    <input type="text" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]" placeholder={t("checkout.pincode")} />
                  </div>
                </div>
              </form>
            </div>
            <button
              className="mt-8 bg-[#ab8351] hover:bg-[#51381a] cursor-pointer text-white px-8 py-3 rounded-full text-base font-bold shadow transition active:scale-95"
              onClick={handlePlaceOrder}
              disabled={cart.length === 0}
            >
              {t("checkout.placeOrder")}
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
}
