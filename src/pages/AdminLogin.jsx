
import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post("/auth/admin/login", { email, password });
			if (response.data.success) {
				localStorage.setItem("token", response.data.token);
				if (response.data.permissions) {
					localStorage.setItem("permissions", JSON.stringify(response.data.permissions));
				}
				navigate("/admin");
				
			}
		} catch (error) {
			console.error("Login failed", error);
			alert(error.response?.data?.message || "Login failed");
		}
	};

	return (
		<div className="bg-[#fffaf9]  flex  justify-center py-20 px-2">
			<div className="bg-white rounded-lg shadow max-w-md w-full p-8 border border-[#ececec]">
				<div className="flex flex-col items-center mb-6">
					<span className="font-bold text-xl text-[#3b2a23]">Login</span>
				</div>
				<form className="flex flex-col gap-4" onSubmit={handleLogin}>
					<div>
						<label className="block text-sm font-semibold text-[#3b2a23] mb-1">Email*</label>
					
						<input 
							type="email" 
							placeholder="Enter Email" 
							className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" 
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label className="block text-sm font-semibold text-[#3b2a23] mb-1">Password</label>
						<input 
							type="password" 
							placeholder="Enter Password" 
							className="w-full border border-[#ececec] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ab8351] bg-[#fffaf9]" 
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="flex items-center justify-between mt-8">
						<button type="submit" className="hover:bg-[#643e2f] bg-[#ab8351] cursor-pointer text-white px-8 py-2 rounded text-base font-semibold shadow transition">Login</button>
						<a href="/admin-registor" className="text-[#3b2a23] hover:underline text-sm">Create Account</a>
					</div>
				</form>
			</div>
		</div>
	);
}
