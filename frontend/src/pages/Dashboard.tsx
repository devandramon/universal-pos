import {
    useAuth,
} from "../contexts/AuthContext";

interface StatCardProps {
    title: string;
    value: string;
    description: string;
}

function StatCard({
    title,
    value,
    description,
}: StatCardProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
                {title}
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                {value}
            </p>

            <p className="mt-1 text-xs text-slate-500">
                {description}
            </p>
        </div>
    );
}

function Dashboard() {
    const { user } = useAuth();

    return (
        <div className="space-y-6">

            {/* Header */}

            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Welcome back, {user?.name}.
                    Here's what's happening with your business.
                </p>
            </div>

            {/* Statistics */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Today's Sales"
                    value="Rp 0"
                    description="Sales generated today"
                />

                <StatCard
                    title="Transactions"
                    value="0"
                    description="Transactions today"
                />

                <StatCard
                    title="Products"
                    value="0"
                    description="Active products"
                />

                <StatCard
                    title="Low Stock"
                    value="0"
                    description="Products need attention"
                />

            </div>

            {/* Main Content */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                {/* Sales Overview */}

                <div className="rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-2">

                    <div className="border-b border-slate-200 px-5 py-4">

                        <h2 className="font-semibold text-slate-900">
                            Sales Overview
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Sales performance overview
                        </p>

                    </div>

                    <div className="flex min-h-72 items-center justify-center p-6">

                        <div className="text-center">

                            <p className="text-sm font-medium text-slate-700">
                                No sales data yet
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Sales information will appear here once transactions are recorded.
                            </p>

                        </div>

                    </div>

                </div>

                {/* Low Stock */}

                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-200 px-5 py-4">

                        <h2 className="font-semibold text-slate-900">
                            Low Stock
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Products that need attention
                        </p>

                    </div>

                    <div className="flex min-h-72 items-center justify-center p-6">

                        <div className="text-center">

                            <p className="text-sm font-medium text-slate-700">
                                Stock looks good
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                No products are currently low in stock.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* Recent Transactions */}

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-200 px-5 py-4">

                    <h2 className="font-semibold text-slate-900">
                        Recent Transactions
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                        Latest sales transactions
                    </p>

                </div>

                <div className="flex min-h-40 items-center justify-center p-6">

                    <div className="text-center">

                        <p className="text-sm font-medium text-slate-700">
                            No transactions yet
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            Completed transactions will appear here.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;