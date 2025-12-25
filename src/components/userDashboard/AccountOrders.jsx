import React from 'react'

const orders = [
	{
		id: 'ORD-20251216-001',
		date: '16 Dec 2025',
		status: 'Delivered',
		total: 320,
		items: [
			{ name: 'Organic Lemon', qty: 1, price: 56 },
			{ name: 'Apple Juice', qty: 2, price: 75 },
		],
	},
	{
		id: 'ORD-20251210-002',
		date: '10 Dec 2025',
		status: 'Shipped',
		total: 150,
		items: [
			{ name: 'Watermelon 5kg Pack', qty: 1, price: 48 },
			{ name: 'Organic Peach Fruits', qty: 1, price: 50 },
		],
	},
];

const AccountOrders = () => (
	<div className="flex flex-col h-full">
		<h2 className="text-lg font-bold text-[#3b2a23] mb-4">My Orders</h2>
		{orders.length === 0 ? (
			<div className="text-[#7c6a5a] h-full w-full flex justify-center items-center">You have not placed any orders yet.</div>
		) : (
			<div className="space-y-6">
				{orders.map(order => (
					<div key={order.id} className="bg-[#fffaf9] border border-[#ececec] rounded-lg shadow p-4">
						<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
							<div className="text-[#3b2a23] font-semibold text-sm">Order ID: <span className="text-[#ab8351]">{order.id}</span></div>
							<div className="text-xs text-[#7c6a5a]">{order.date}</div>
							<span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.status}</span>
						</div>
						<ul className="divide-y divide-[#ececec] mb-2">
							{order.items.map((item, idx) => (
								<li key={idx} className="flex justify-between items-center py-2 text-sm">
									<span className="text-[#3b2a23]">{item.name} <span className="text-[#7c6a5a]">x{item.qty}</span></span>
									<span className="text-[#ab8351] font-semibold">₹{(item.price * item.qty).toFixed(2)}</span>
								</li>
							))}
						</ul>
						<div className="flex justify-between items-center mt-2">
							<span className="font-bold text-[#3b2a23]">Total:</span>
							<span className="font-bold text-[#ab8351]">₹{order.total.toFixed(2)}</span>
						</div>
					</div>
				))}
			</div>
		)}
	</div>
);

export default AccountOrders;