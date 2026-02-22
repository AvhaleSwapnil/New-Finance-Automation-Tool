"use client";

import { mockData } from '@/lib/mockData';
import { calculateNetProfit, formatCurrency } from '@/lib/calculations';
import { FileDown, Calendar, Filter, ChevronDown, CheckCircle2, AlertCircle, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export default function ReportsPage() {
    const { kpis } = mockData;
    const netProfit = calculateNetProfit(kpis.totalRevenue, kpis.totalExpenses);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#101828]">Financial Reports</h1>
                    <p className="text-[#667085] mt-1">Deep dive into your business performance</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#f2f4f7] rounded-xl font-bold text-sm text-[#344054] transition-soft hover:bg-[#f9fafb]">
                        <Calendar className="w-4 h-4 text-[#667085]" />
                        Feb 2026
                        <ChevronDown className="w-4 h-4 text-[#667085]" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#101828] text-white rounded-xl font-bold text-sm transition-soft hover:bg-black">
                        <FileDown className="w-4 h-4" />
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ReportSummaryCard title="Monthly Revenue" value={formatCurrency(kpis.totalRevenue)} icon={TrendingUp} color="blue" />
                <ReportSummaryCard title="Monthly Expenses" value={formatCurrency(kpis.totalExpenses)} icon={TrendingDown} color="gray" />
                <ReportSummaryCard title="Net Monthly Profit" value={formatCurrency(netProfit)} icon={DollarSign} color="green" />
            </div>

            <div className="bg-white rounded-2xl border border-[#f2f4f7] card-shadow overflow-hidden">
                <div className="p-6 border-b border-[#f2f4f7] flex items-center justify-between">
                    <h3 className="font-bold text-lg text-[#101828]">Detailed Breakdown</h3>
                    <div className="flex items-center gap-1 px-3 py-1 bg-[#f9fafb] rounded-full text-[10px] font-bold text-[#667085] uppercase cursor-pointer hover:bg-[#f2f4f7] transition-soft">
                        <Filter className="w-3 h-3" />
                        Filter Categories
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {mockData.expenseCategories.map((cat) => (
                        <div key={cat.name} className="space-y-2">
                            <div className="flex items-center justify-between text-sm font-medium">
                                <span className="text-[#344054]">{cat.name}</span>
                                <span className="font-bold text-[#101828]">{formatCurrency(cat.value)}</span>
                            </div>
                            <div className="w-full h-1.5 bg-[#f9fafb] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#101828] rounded-full transition-all duration-1000 delay-300"
                                    style={{ width: `${(cat.value / kpis.totalExpenses) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-6 bg-[#f9fafb] border-t border-[#f2f4f7]">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-white rounded-xl border border-[#eaecf0]">
                            <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-[#101828]">Summary Analysis</h4>
                            <p className="text-sm text-[#667085] mt-1 leading-relaxed">
                                Your revenue is up by 12% compared to last period. Payroll expenses have increased slightly, but overall margins remain healthy at {((netProfit / kpis.totalRevenue) * 100).toFixed(1)}%.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="bg-white rounded-2xl p-6 border border-[#f2f4f7] card-shadow">
                    <h3 className="font-bold text-lg text-[#101828] mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-[#d97706]" />
                        Budget Variance
                    </h3>
                    <p className="text-sm text-[#667085] mb-6">Comparison of actual spending vs. planned budget for this month.</p>
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-bold text-[#98a2b3] uppercase tracking-widest">Actual</p>
                                <p className="text-xl font-bold text-[#101828]">{formatCurrency(kpis.totalExpenses)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-[#98a2b3] uppercase tracking-widest">Budget</p>
                                <p className="text-xl font-bold text-[#667085]">$80,000</p>
                            </div>
                        </div>
                        <div className="w-full h-1.5 bg-[#f2f4f7] rounded-full overflow-hidden">
                            <div className="h-full bg-[#101828] rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <p className="text-[10px] text-[#059669] font-bold uppercase tracking-tight">On track with budget targets</p>
                    </div>
                </section>

                <section className="bg-[#101828] rounded-2xl p-8 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform group-hover:scale-110">
                        <FileDown className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">Audit Report Pack</h3>
                        <p className="text-[#98a2b3] mb-8 max-w-sm">Full quarterly compliance and tax readiness report ready for download.</p>
                        <button className="px-6 py-3 bg-white text-[#101828] rounded-xl font-bold shadow-xl transition-soft hover:bg-[#f2f4f7]">
                            Download Audit Pack
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

function ReportSummaryCard({ title, value, icon: Icon, color }) {
    const colorMap = {
        blue: "text-blue-600 bg-blue-50",
        green: "text-green-600 bg-green-50",
        gray: "text-gray-600 bg-gray-50",
    };

    return (
        <div className="p-6 rounded-2xl border border-[#f2f4f7] bg-white card-shadow flex items-start justify-between">
            <div>
                <p className="text-xs font-bold text-[#667085] uppercase tracking-widest mb-1">{title}</p>
                <h4 className="text-2xl font-bold text-[#101828]">{value}</h4>
            </div>
            <div className={`p-2 rounded-lg ${colorMap[color]}`}>
                <Icon className="w-5 h-5" />
            </div>
        </div>
    );
}
