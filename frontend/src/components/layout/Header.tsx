import { useAuth } from "../../contexts/AuthContext";

interface HeaderProps {
    onMenuClick: () => void;
}

function Header({
    onMenuClick,
}: HeaderProps) {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">

            <div className="flex h-16 items-center justify-between px-4 sm:px-6">

                <div className="flex items-center gap-3">

                    <button
                        type="button"
                        onClick={onMenuClick}
                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
                        aria-label="Open menu"
                    >
                        ☰
                    </button>

                    <div className="lg:hidden">
                        <p className="text-sm font-bold text-slate-900">
                            Universal POS
                        </p>
                    </div>

                    <div className="hidden lg:block">
                        <p className="text-sm text-slate-500">
                            Welcome back,
                        </p>

                        <p className="text-sm font-semibold text-slate-900">
                            {user?.name}
                        </p>
                    </div>

                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>

            </div>

        </header>
    );
}

export default Header;