import { NavLink } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

interface SidebarProps {
    onLogout: () => void;
}

function Sidebar({
    onLogout,
}: SidebarProps) {
    const { user } = useAuth();

    const navItems = [
        {
            label: "Dashboard",
            path: "/dashboard",
        },
        {
            label: "Categories",
            path: "/categories",
        },
        {
            label: "Products",
            path: "/products",
        },
        {
            label: "Inventory",
            path: "/inventory",
        },
        {
            label: "Customers",
            path: "/customers",
        },
        {
            label: "Transactions",
            path: "/transactions",
        },
        {
            label: "Reports",
            path: "/reports",
        },
        {
            label: "Users",
            path: "/users",
        },
    ];

    return (
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">

            {/* Logo */}
            <div className="border-b border-slate-200 px-6 py-5">
                <h1 className="text-lg font-bold tracking-tight text-slate-900">
                    Universal POS
                </h1>

                <p className="mt-1 text-xs text-slate-500">
                    Point of Sale System
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 overflow-y-auto p-4">

                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `block rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                                isActive
                                    ? "bg-slate-900 text-white"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}

            </nav>

            {/* User */}
            <div className="border-t border-slate-200 p-4">

                <div className="mb-3 rounded-lg bg-slate-50 px-3 py-3">

                    <p className="truncate text-sm font-semibold text-slate-900">
                        {user?.name}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                        {user?.email}
                    </p>

                </div>

                <button
                    type="button"
                    onClick={onLogout}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
                >
                    Logout
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;