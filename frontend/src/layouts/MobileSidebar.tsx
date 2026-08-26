import { NavLink } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

interface MobileSidebarProps {
    open: boolean;
    onClose: () => void;
    onLogout: () => void;
}

function MobileSidebar({
    open,
    onClose,
    onLogout,
}: MobileSidebarProps) {
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

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 lg:hidden">

            {/* Overlay */}
            <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/40"
            />

            {/* Drawer */}
            <aside className="relative flex h-full w-72 max-w-[85vw] flex-col bg-white shadow-xl">

                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">

                    <div>
                        <h1 className="text-lg font-bold text-slate-900">
                            Universal POS
                        </h1>

                        <p className="text-xs text-slate-500">
                            Point of Sale System
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
                    >
                        ✕
                    </button>

                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto p-4">

                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `block rounded-lg px-4 py-3 text-sm font-medium ${
                                    isActive
                                        ? "bg-slate-900 text-white"
                                        : "text-slate-600 hover:bg-slate-100"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}

                </nav>

                <div className="border-t border-slate-200 p-4">

                    <div className="mb-3 px-3">
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
                        className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600"
                    >
                        Logout
                    </button>

                </div>

            </aside>

        </div>
    );
}

export default MobileSidebar;