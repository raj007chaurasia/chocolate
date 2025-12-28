
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
			<div className="bg-[#ab8351] text-white px-4 py-3 md:px-6 flex items-center justify-between">
				<h1 className="text-lg md:text-xl lg:ml-20 font-bold tracking-wide">My Account</h1>
			</div>
			<div className="max-w-5xl mx-auto mt-6 md:mt-10 px-4 md:px-2">
				<div className="flex flex-col md:flex-row gap-6 md:gap-8">
					{/* Sidebar */}
					<aside className="w-full md:w-64 h-fit bg-white rounded-lg shadow p-3 md:p-4 border border-[#ececec] grid grid-cols-2 gap-2 md:flex md:flex-col md:gap-0">
						{sections.map(sec => (
							<button
								key={sec.key}
								className={`flex items-center justify-center md:justify-start cursor-pointer gap-2 px-3 py-2 md:px-4 md:py-3 rounded font-semibold text-xs md:text-sm w-full md:mb-2 transition-colors duration-200
									${active === sec.key ? "bg-[#ab8351] text-white" : "bg-[#f7f7f7] text-[#3b2a23] hover:bg-[#ffedea]"}`}
								onClick={() => setActive(sec.key)}
							>
								<span className="text-base md:text-lg">{sec.icon}</span> {sec.label}
							</button>
						))}
					</aside>
					{/* Content */}
					<main className="flex-1 bg-white rounded-lg shadow p-4 md:p-6 border border-[#ececec] min-h-[300px] flex flex-col">
						{content}
					</main>
				</div>
			</div>
		</div>
	);
}
