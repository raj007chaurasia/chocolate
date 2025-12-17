import React from "react";
import { useNavigate } from "react-router-dom";

const order = {
  id: "ORD-20251216-001",
  date: "16 Dec 2025",
  name: "Amit Kumar",
  email: "amit@example.com",
  address: "123, Chocolate Street, Delhi, India",
  city: "Delhi",
  pincode: "110001",
  items: [
    { id: 1, name: "Organic Lemon", price: 56, qty: 1, img: "/images/c1.png" },
    { id: 2, name: "Apple Juice", price: 75, qty: 2, img: "/images/c2.png" },
    { id: 3, name: "Watermelon 5kg Pack", price: 48, qty: 1, img: "/images/c3.png" },
  ],
};

const subtotal = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
const tax = Math.round(subtotal * 0.05);
const delivery = subtotal > 0 ? 30 : 0;
const total = subtotal + tax + delivery;

export default function Invoice() {
    const navigate = useNavigate();
  return (
    <div className="bg-[#fffaf9] min-h-screen pb-12">
      {/* Header Bar */}
      <div className="bg-[#ab8351] text-white px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl lg:ml-20 font-bold tracking-wide">Order Invoice</h1>
      </div>
      <div className="max-w-3xl mx-auto mt-10 px-2">
        <div className="bg-white rounded-lg shadow p-8 border border-[#ececec]">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#3b2a23] mb-1">Order Confirmed!</h2>
              <div className="text-[#ab8351] font-semibold text-sm mb-1">Thank you for your purchase.</div>
              <div className="text-xs text-[#7c6a5a]">Order ID: <span className="font-semibold text-[#3b2a23]">{order.id}</span></div>
              <div className="text-xs text-[#7c6a5a]">Order Date: <span className="font-semibold text-[#3b2a23]">{order.date}</span></div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[#ab8351] font-bold text-lg">Total: ₹{total.toFixed(2)}</span>
              <span className="text-xs text-[#7c6a5a]">(incl. GST & Delivery)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-[#3b2a23] mb-2 text-sm">Billing Details</h3>
              <div className="text-xs text-[#7c6a5a]">{order.name}</div>
              <div className="text-xs text-[#7c6a5a]">{order.email}</div>
              <div className="text-xs text-[#7c6a5a]">{order.address}</div>
              <div className="text-xs text-[#7c6a5a]">{order.city} - {order.pincode}</div>
            </div>
            <div>
              <h3 className="font-semibold text-[#3b2a23] mb-2 text-sm">Payment Method</h3>
              <div className="text-xs text-[#7c6a5a]">Cash on Delivery</div>
            </div>
          </div>
          <h3 className="font-semibold text-[#3b2a23] mb-2 text-sm">Order Items</h3>
          <ul className="divide-y divide-[#ececec] mb-6">
            {order.items.map(item => (
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
          <div className="mt-8 text-center">
            <span className="text-[#58aa10] font-semibold text-shadow-2xs">Your order has been placed </span>
          </div>

        </div>
      </div>
      <div className="mt-8 text-center">
        <button
        onClick={()=>{navigate("/product")}}
        className="bg-[#ab8351] hover:bg-[#51381a] cursor-pointer text-white px-6 py-3 rounded-full text-sm font-bold shadow transition active:scale-95">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
