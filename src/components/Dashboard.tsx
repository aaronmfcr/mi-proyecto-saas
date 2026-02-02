import { useState } from 'react';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { format } from 'date-fns';
import {
    LayoutDashboard,
    CreditCard,
    BarChart3,
    Settings,
    Search,
    Bell,
    Plus,
    TrendingUp,
    Calendar,
    MoreHorizontal,
    Layers
} from 'lucide-react';
import { SubscriptionModal } from './SubscriptionModal';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

export const Dashboard = () => {
    const { subscriptions, loading, totalMonthlySpend, addSubscription } = useSubscriptions();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const nextRenewal = subscriptions.length > 0
        ? [...subscriptions].sort((a, b) => new Date(a.renewal_date).getTime() - new Date(b.renewal_date).getTime())[0]
        : null;

    return (
        <div className="flex h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 dark:border-border-dark flex flex-col h-screen sticky top-0 bg-white dark:bg-background-dark shadow-sm">
                <div className="p-6 flex items-center gap-3">
                    <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                        <Layers className="size-5" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">SubManager</h1>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-all">
                        <LayoutDashboard className="size-5" />
                        Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-surface-dark transition-colors text-slate-600 dark:text-slate-400">
                        <CreditCard className="size-5" />
                        Subscriptions
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-surface-dark transition-colors text-slate-600 dark:text-slate-400">
                        <BarChart3 className="size-5" />
                        Reports
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-surface-dark transition-colors text-slate-600 dark:text-slate-400">
                        <Settings className="size-5" />
                        Settings
                    </a>
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-border-dark">
                    <div className="flex items-center gap-3 p-2">
                        <div className="size-10 rounded-full bg-gradient-to-tr from-primary to-purple-400" />
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">User Name</span>
                            <span className="text-xs text-slate-500">Premium Account</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <header className="h-16 border-b border-slate-200 dark:border-border-dark flex items-center justify-between px-8 bg-white/50 dark:bg-background-dark/50 backdrop-blur-md sticky top-0 z-10 transition-all">
                    <div className="flex items-center gap-4 flex-1 max-w-xl">
                        <div className="relative w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search subscriptions, bills, or apps..."
                                className="w-full bg-slate-100 dark:bg-surface-dark border-none rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary text-sm transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-surface-dark transition-all">
                            <Bell className="size-5 text-slate-600 dark:text-slate-400" />
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Plus className="size-4" />
                            New Subscription
                        </button>
                    </div>
                </header>

                <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Monthly Spending</span>
                                <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                    <TrendingUp className="size-4" />
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-3xl font-bold">{formatCurrency(totalMonthlySpend)}</h3>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">Projection based on active apps</p>
                        </div>

                        <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Next Renewal</span>
                                <div className="size-8 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500">
                                    <Calendar className="size-4" />
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-2xl font-bold">
                                    {nextRenewal ? format(new Date(nextRenewal.renewal_date), 'MMM dd') : '---'}
                                </h3>
                                <span className="text-slate-400 text-sm font-medium">
                                    ({nextRenewal?.name || 'No records'})
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">Upcoming charge</p>
                        </div>

                        <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Active</span>
                                <div className="size-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
                                    <Plus className="size-4 rotate-45" />
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-3xl font-bold text-emerald-500">
                                    {subscriptions.filter(s => s.status === 'active').length}
                                </h3>
                                <span className="text-slate-400 text-sm font-medium">Apps</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">Active subscriptions</p>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-border-dark flex items-center justify-between">
                            <h2 className="text-lg font-bold">Active Subscriptions</h2>
                            <button className="text-primary text-sm font-semibold hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                                        <th className="px-6 py-4 border-b border-slate-200 dark:border-border-dark">Application</th>
                                        <th className="px-6 py-4 border-b border-slate-200 dark:border-border-dark">Category</th>
                                        <th className="px-6 py-4 border-b border-slate-200 dark:border-border-dark">Price</th>
                                        <th className="px-6 py-4 border-b border-slate-200 dark:border-border-dark">Next Billing</th>
                                        <th className="px-6 py-4 border-b border-slate-200 dark:border-border-dark">Status</th>
                                        <th className="px-6 py-4 border-b border-slate-200 dark:border-border-dark text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-border-dark text-sm">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-10 text-center text-slate-400">Loading subscriptions...</td>
                                        </tr>
                                    ) : subscriptions.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-10 text-center text-slate-400">No subscriptions found. Click "New Subscription" to add one.</td>
                                        </tr>
                                    ) : (
                                        Array.isArray(subscriptions) && subscriptions.map((sub) => (
                                            <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                            <Layers className="size-4 text-indigo-600 dark:text-indigo-400" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold group-hover:text-primary transition-colors">{sub.name}</p>
                                                            <p className="text-xs text-slate-400 capitalize">{sub.billing_cycle}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{sub.category}</td>
                                                <td className="px-6 py-4 font-medium">{formatCurrency(sub.cost)}/{sub.billing_cycle === 'yearly' ? 'yr' : 'mo'}</td>
                                                <td className="px-6 py-4">{format(new Date(sub.renewal_date), 'MMM dd, yyyy')}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sub.status === 'active'
                                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                            : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400'
                                                        }`}>
                                                        {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all">
                                                        <MoreHorizontal className="size-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <SubscriptionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={addSubscription}
                />
            </main>
        </div>
    );
};
