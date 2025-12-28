import React, { useState } from 'react';

const initialAddresses = [
	{
		id: 1,
		name: 'Amit Kumar',
		type: 'Home',
		address: '123, Chocolate Street',
		city: 'Delhi',
		pincode: '110001',
		state: 'Delhi',
		country: 'India',
		phone: '9876543210',
	},
	{
		id: 2,
		name: 'Amit Kumar',
		type: 'Office',
		address: '456, Sweet Lane',
		city: 'Noida',
		pincode: '201301',
		state: 'Uttar Pradesh',
		country: 'India',
		phone: '9876543210',
	},
];

const AccountAddress = () => {
	const [addresses, setAddresses] = useState(initialAddresses);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [formData, setFormData] = useState({
		name: '',
		type: 'Home',
		address: '',
		city: '',
		pincode: '',
		state: '',
		country: '',
		phone: ''
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const openAddModal = () => {
		setEditingId(null);
		setFormData({
			name: '',
			type: 'Home',
			address: '',
			city: '',
			pincode: '',
			state: '',
			country: '',
			phone: ''
		});
		setIsModalOpen(true);
	};

	const openEditModal = (addr) => {
		setEditingId(addr.id);
		setFormData(addr);
		setIsModalOpen(true);
	};

	const handleSave = (e) => {
		e.preventDefault();
		if (editingId) {
			// Edit existing
			setAddresses(addresses.map(addr => addr.id === editingId ? { ...formData, id: editingId } : addr));
		} else {
			// Add new
			setAddresses([...addresses, { ...formData, id: Date.now() }]);
		}
		setIsModalOpen(false);
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this address?")) {
			setAddresses(addresses.filter(addr => addr.id !== id));
		}
	};

	return (
		<div className="flex flex-col h-full relative">
			<div className="flex flex-wrap justify-between items-center mb-4 gap-2">
				<h2 className="text-lg font-bold text-[#3b2a23]">My Address</h2>
				{addresses.length > 0 && (
					<button 
						onClick={openAddModal}
						className="bg-[#ab8351] hover:bg-[#51381a] cursor-pointer text-white px-4 py-2 rounded text-xs font-semibold shadow transition"
					>
						+ Add New
					</button>
				)}
			</div>

			{addresses.length === 0 ? (
				<div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-[#ececec] rounded-lg bg-[#fffaf9]">
					<p className="text-[#7c6a5a] mb-4">No address saved.</p>
					<button 
						onClick={openAddModal}
						className="bg-[#ab8351] hover:bg-[#51381a] cursor-pointer text-white px-6 py-2 rounded-full text-sm font-semibold shadow transition"
					>
						Add Address
					</button>
				</div>
			) : (
				<div className="space-y-4 overflow-y-auto pb-4">
					{addresses.map((addr) => (
						<div key={addr.id} className="bg-[#fffaf9] border border-[#ececec] rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
							<div className="flex-1">
								<div className="flex items-center gap-2 mb-2">
									<span className="px-2 py-1 rounded text-xs font-bold bg-[#ececec] text-[#ab8351] uppercase tracking-wide">{addr.type}</span>
								</div>
								<div className="text-sm font-bold text-[#3b2a23] mb-1">{addr.name}</div>
								<div className="text-xs text-[#7c6a5a] leading-relaxed">
									{addr.address},<br />
									{addr.city} - {addr.pincode},<br />
									{addr.state}, {addr.country}
								</div>
								<div className="text-xs text-[#7c6a5a] mt-2 font-semibold">Phone: {addr.phone}</div>
							</div>
							<div className="flex gap-2 self-start sm:self-center">
								<button 
									onClick={() => openEditModal(addr)}
									className="bg-[#ab8351] hover:bg-[#51381a] cursor-pointer text-white px-4 py-2 rounded-full text-xs font-semibold shadow transition active:scale-95"
								>
									Edit
								</button>
								<button 
									onClick={() => handleDelete(addr.id)}
									className="bg-red-600/70 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded-full text-xs font-semibold shadow transition active:scale-95"
								>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
						<div className="bg-[#ab8351] px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center shrink-0">
							<h3 className="text-white font-bold text-lg">{editingId ? 'Edit Address' : 'Add New Address'}</h3>
							<button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white text-2xl leading-none cursor-pointer">&times;</button>
						</div>
						<form onSubmit={handleSave} className="p-4 sm:p-6 space-y-4 overflow-y-auto">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
								<div className="sm:col-span-2">
									<label className="block text-xs font-bold text-[#3b2a23] mb-1">Full Name</label>
									<input 
										type="text" 
										name="name" 
										value={formData.name} 
										onChange={handleInputChange}
										required 
										className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]"
										placeholder="Enter Name"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-[#3b2a23] mb-1">Phone Number</label>
									<input 
										type="tel" 
										name="phone" 
										value={formData.phone} 
										onChange={handleInputChange}
										required 
										className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]"
										placeholder="Enter Phone"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-[#3b2a23] mb-1">Address Type</label>
									<select 
										name="type" 
										value={formData.type} 
										onChange={handleInputChange}
										className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]"
									>
										<option value="Home">Home</option>
										<option value="Office">Office</option>
										<option value="Other">Other</option>
									</select>
								</div>
								<div className="sm:col-span-2">
									<label className="block text-xs font-bold text-[#3b2a23] mb-1">Address (House No, Building, Street)</label>
									<textarea 
										name="address" 
										value={formData.address} 
										onChange={handleInputChange}
										required 
										rows="2"
										className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]"
										placeholder="Enter Address"
									></textarea>
								</div>
								<div>
									<label className="block text-xs font-bold text-[#3b2a23] mb-1">City</label>
									<input 
										type="text" 
										name="city" 
										value={formData.city} 
										onChange={handleInputChange}
										required 
										className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]"
										placeholder="City"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-[#3b2a23] mb-1">Pincode</label>
									<input 
										type="text" 
										name="pincode" 
										value={formData.pincode} 
										onChange={handleInputChange}
										required 
										className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]"
										placeholder="Pincode"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-[#3b2a23] mb-1">State</label>
									<input 
										type="text" 
										name="state" 
										value={formData.state} 
										onChange={handleInputChange}
										required 
										className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]"
										placeholder="State"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-[#3b2a23] mb-1">Country</label>
									<input 
										type="text" 
										name="country" 
										value={formData.country} 
										onChange={handleInputChange}
										required 
										className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351]"
										placeholder="Country"
									/>
								</div>
							</div>
							<div className="flex gap-3 mt-6">
								<button 
									type="button" 
									onClick={() => setIsModalOpen(false)}
									className="flex-1 border cursor-pointer border-[#ececec] text-[#7c6a5a] py-2 rounded font-semibold text-sm hover:bg-gray-50 transition"
								>
									Cancel
								</button>
								<button 
									type="submit" 
									className="flex-1 cursor-pointer bg-[#ab8351] hover:bg-[#51381a] text-white py-2 rounded font-semibold text-sm shadow transition"
								>
									Save Address
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default AccountAddress;