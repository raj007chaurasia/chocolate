import React from 'react'



const AccountDetails = () => (
	<div>
		<h2 className="text-lg font-bold text-[#3b2a23] mb-4">Account Details</h2>
		<form className="space-y-4 max-w-md">
			<div>
				<label className="block text-xs font-semibold text-[#7c6a5a] mb-1">Full Name</label>
				<input type="text" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]" value="Amit Kumar" readOnly />
			</div>
			<div>
				<label className="block text-xs font-semibold text-[#7c6a5a] mb-1">Email</label>
				<input type="email" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]" value="amit@example.com" readOnly />
			</div>
			<div>
				<label className="block text-xs font-semibold text-[#7c6a5a] mb-1">Number</label>
				<input type="number" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]" value="9876543210" readOnly />
			</div>
			<div>
				<label className="block text-xs font-semibold text-[#7c6a5a] mb-1">Current password</label>
				<input type="password" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]" value="" placeholder="Enter current password" />
			</div>
			<div>
				<label className="block text-xs font-semibold text-[#7c6a5a] mb-1">New password</label>
				<input type="password" className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]" value="" placeholder="Enter new password" />
			</div>
			<button className="bg-[#ab8351] cursor-pointer text-white px-4 py-2 rounded hover:bg-[#9a7245] transition-colors duration-200">Update Details</button>
		</form>
	</div>
);

export default AccountDetails;
