"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function LogoutButton() {
	const [loading, setLoading] = useState(false);

	return (
		<button
			type='button'
			disabled={loading}
			onClick={() => {
				setLoading(true);
				signOut({ callbackUrl: "/login" });
			}}
			className='flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 disabled:opacity-60'
		>
			<LogOut size={18} />
			<span className='hidden sm:inline'>
				{loading ? "Logging out..." : "Logout"}
			</span>
		</button>
	);
}