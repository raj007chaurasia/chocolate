
import React, { useState } from "react";
import { FiUser, FiLogOut, FiMapPin, FiList } from "react-icons/fi";
import { Navigate } from "react-router-dom";
import AccountOrders from "../components/userDashboard/AccountOrders";
import AccountAddress from "../components/userDashboard/AccountAddress";
import AccountDetails from "../components/userDashboard/AccountDetails";


const sections = [
	{ key: "orders", label: "Orders", icon: <FiList /> },
	{ key: "address", label: "Address", icon: <FiMapPin /> },
	{ key: "details", label: "Account Details", icon: <FiUser /> },
	{ key: "logout", label: "Logout", icon: <FiLogOut /> },
];

export default function Account() {
	const [active, setActive] = useState("orders");
	const [loggedOut, setLoggedOut] = useState(false);

	let content;
	if (loggedOut) {
		return <Navigate to="/" />;
	} else if (active === "orders") {
		content = <AccountOrders />;
	} else if (active === "address") {
		content = <AccountAddress />;
	} else if (active === "details") {
		content = <AccountDetails />;
	} else if (active === "logout") {
		return <Navigate to="/login" />;
	}

	return (
		<div className="bg-[#fffaf9] min-h-screen pb-12">
			<div className="bg-[#ab8351] text-white px-6 py-3 flex items-center justify-between">
				<h1 className="text-xl lg:ml-20 font-bold tracking-wide">My Account</h1>
			</div>
			<div className="max-w-5xl mx-auto mt-10 px-2">
				<div className="flex flex-col md:flex-row gap-8">
					{/* Sidebar */}
					<aside className="w-full md:w-64 max-h-60 bg-white rounded-lg shadow p-4 border border-[#ececec] flex md:flex-col flex-row gap-2 md:gap-0 mb-4 md:mb-0">
						{sections.map(sec => (
							<button
								key={sec.key}
								className={`flex items-center cursor-pointer gap-2 px-4 py-3 rounded font-semibold text-sm w-full md:mb-2 transition-colors duration-200
									${active === sec.key ? "bg-[#ab8351] text-white" : "bg-[#f7f7f7] text-[#3b2a23] hover:bg-[#ffedea]"}`}
								onClick={() => setActive(sec.key)}
							>
								<span className="text-lg">{sec.icon}</span> {sec.label}
							</button>
						))}
					</aside>
					{/* Content */}
					<main className="flex-1 bg-white rounded-lg shadow p-6 border border-[#ececec] min-h-[120px] flex flex-col justify-center">
						{content}
					</main>
				</div>
			</div>
		</div>
	);
}
