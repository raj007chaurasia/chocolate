import React from 'react';

export default function Register() {
  return (
    <div className="bg-[#fffaf9]  flex  justify-center py-10 px-2">
      <div className="bg-white rounded-lg shadow max-w-2xl w-full p-8 border border-[#ececec]">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">First Name*</label>
            <input type="text" placeholder="Enter Your First Name" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">Last Name*</label>
            <input type="text" placeholder="Enter Your Last Name" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">Email*</label>
            <input type="email" placeholder="Enter Your email" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">Phone Number*</label>
            <input type="tel" placeholder="Enter Your phone number" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">Address*</label>
            <input type="text" placeholder="Address" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">City*</label>
            <input type="text" placeholder="City" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">Post Code</label>
            <input type="text" placeholder="Post Code" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">Country*</label>
            <input type="text" placeholder="Country" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3b2a23] mb-1">Region State*</label>
            <input type="text" placeholder="Region/State" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" />
          </div>
        </form>
        <div className="flex items-center justify-between mt-8">
          <button type="submit" className="hover:bg-[#643e2f] bg-[#ab8351] cursor-pointer text-white px-8 py-2 rounded text-base font-semibold shadow transition">Register</button>
          <a href="/login" className="text-[#3b2a23] hover:underline text-sm">Have an account?</a>
        </div>
      </div>
    </div>
  );
}