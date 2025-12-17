import { nav } from "framer-motion/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy cart data (should be replaced with real cart context or props)
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

export default function Checkout() {
  const [cart] = useState(initialCart);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const delivery = subtotal > 0 ? 30 : 0;
  const total = subtotal + tax + delivery;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    navigate("/invoice");

    setTimeout(() => setOrderPlaced(false), 3000);
  };

  return (
    <div className="bg-[#fffaf9] min-h-screen pb-12">
      {/* Header Bar */}
      <div className="bg-[#ab8351] text-white px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl lg:ml-20 font-bold tracking-wide">Checkout</h1>
      </div>

      <div className="max-w-4xl mx-auto mt-10 px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6 border border-[#ececec]">
            <h2 className="text-lg font-bold text-[#3b2a23] mb-4">Order Summary</h2>
            {cart.length === 0 ? (
              <div className="text-[#7c6a5a] text-center py-8">No items in cart.</div>
            ) : (
              <ul className="divide-y divide-[#ececec]">
                {cart.map(item => (
                  <li key={item.id} className="flex items-center py-4 gap-4">
                    <img src={item.img} alt={item.name} className="w-14 h-14 object-contain rounded bg-white border shadow-sm" />
                    <div className="flex-1">
                      <div className="font-semibold text-[#3b2a23] text-sm leading-tight">{item.name}</div>
                      <div className="text-xs text-[#7c6a5a]">Qty: {item.qty}</div>
                    </div>
                    <div className="text-[#ab8351] font-bold text-base">₹{(item.price * item.qty).toFixed(2)}</div>
                  </li>
                ))}
              </ul>
            )}
            {/* Bill Details */}
            <div className="mt-6 border-t border-[#ececec] pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#7c6a5a]">Subtotal</span>
                <span className="font-semibold text-[#3b2a23]">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7c6a5a]">GST (5%)</span>
                <span className="font-semibold text-[#3b2a23]">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7c6a5a]">Delivery</span>
                <span className="font-semibold text-[#3b2a23]">₹{delivery.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t border-[#ececec] pt-2 mt-2">
                <span className="text-[#ab8351]">Total</span>
                <span className="text-[#ab8351]">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Billing Details & Place Order */}
          <div className="bg-white rounded-lg shadow p-6 border border-[#ececec] flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#3b2a23] mb-4">Billing Details</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#7c6a5a] mb-1">Full Name</label>
                  <input type="text" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#7c6a5a] mb-1">Email</label>
                  <input type="email" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#7c6a5a] mb-1">Address</label>
                  <textarea className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]" placeholder="Enter your address" rows={2}></textarea>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-[#7c6a5a] mb-1">City</label>
                    <input type="text" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]" placeholder="City" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-[#7c6a5a] mb-1">Pincode</label>
                    <input type="text" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]" placeholder="Pincode" />
                  </div>
                </div>
              </form>
            </div>
            <button
              className="mt-8 bg-[#ab8351] hover:bg-[#51381a] cursor-pointer text-white px-8 py-3 rounded-full text-base font-bold shadow transition active:scale-95"
              onClick={handlePlaceOrder}
              disabled={cart.length === 0}
            >
              Place Order
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
}
