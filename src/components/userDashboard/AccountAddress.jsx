import React from 'react'



const addresses = [
	{
		name: 'Amit Kumar',
		address: '123, Chocolate Street, Delhi, India',
		city: 'Delhi',
		pincode: '110001',
		phone: '9876543210',
		type: 'Home',
	},
	{
		name: 'Amit Kumar',
		address: '456, Sweet Lane, Noida, India',
		city: 'Noida',
		pincode: '201301',
		phone: '9876543210',
		type: 'Office',
	},
];

const AccountAddress = () => (
	<div className="flex flex-col h-full">
		<h2 className="text-lg font-bold text-[#3b2a23] mb-4">My Address</h2>
		{addresses.length === 0 ? (
			<div className="text-[#7c6a5a] h-full w-full flex justify-center items-center">No address saved.</div>
		) : (
			<div className="space-y-6">
				{addresses.map((addr, idx) => (
					<div key={idx} className="bg-[#fffaf9] border border-[#ececec] rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
						<div>
							<div className="font-semibold text-[#3b2a23] text-sm mb-1">{addr.name} <span className="ml-2 px-2 py-1 rounded-full text-xs font-bold bg-[#ececec] text-[#ab8351]">{addr.type}</span></div>
							<div className="text-xs text-[#7c6a5a]">{addr.address}</div>
							<div className="text-xs text-[#7c6a5a]">{addr.city} - {addr.pincode}</div>
							<div className="text-xs text-[#7c6a5a]">Phone: {addr.phone}</div>
						</div>
						<button className="bg-[#ab8351] hover:bg-[#51381a] text-white px-4 py-2 rounded-full text-xs font-semibold shadow transition active:scale-95">Edit</button>
					</div>
				))}
			</div>
		)}
	</div>
);

export default AccountAddress;