"use client";

import { useState } from 'react';
import { mockData } from '@/lib/mockData';
import { calculateDaysOverdue, getRiskLevel, formatCurrency } from '@/lib/calculations';
import { Search, Filter, Mail, MoreVertical, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export default function InvoicesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRisk, setFilterRisk] = useState('All');

    const filteredInvoices = mockData.invoices.filter(invoice => {
        const matchesSearch = invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.id.toLowerCase().includes(searchTerm.toLowerCase());

        const daysOverdue = calculateDaysOverdue(invoice.dueDate);
        const risk = getRiskLevel(daysOverdue).label;
        const matchesFilter = filterRisk === 'All' || risk === filterRisk;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">Invoices</h1>
                    <p className="text-[#667085] mt-1 text-sm sm:text-base">Manage and track your accounts receivable</p>
                </div>
                <button className="bg-[#101828] text-white px-6 py-2.5 rounded-xl font-bold transition-soft hover:bg-black text-sm w-fit">
                    Create New Invoice
                </button>
            </div>


            <div className="bg-white rounded-2xl border border-[#f2f4f7] card-shadow overflow-hidden">
                {/* Table Controls */}
                <div className="p-6 border-b border-[#f2f4f7] flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
                        <input
                            type="text"
                            placeholder="Search by client or invoice ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-[#d0d5dd] rounded-lg text-sm focus:ring-2 focus:ring-[#f2f4f7] outline-none transition-soft"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select
                                className="pl-3 pr-10 py-2 bg-white border border-[#d0d5dd] rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#f2f4f7] outline-none appearance-none transition-soft cursor-pointer text-[#344054]"
                                value={filterRisk}
                                onChange={(e) => setFilterRisk(e.target.value)}
                            >
                                <option value="All">All Risk Levels</option>
                                <option value="Low">Low Risk</option>
                                <option value="Medium">Medium Risk</option>
                                <option value="High">High Risk</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Invoices Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#f2f4f7] bg-[#f9fafb]">
                                <th className="px-6 py-4 text-[11px] font-bold text-[#667085] uppercase tracking-wider">Client Name</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-[#667085] uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-[#667085] uppercase tracking-wider">Due Date</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-[#667085] uppercase tracking-wider">Days Overdue</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-[#667085] uppercase tracking-wider">Risk Level</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-[#667085] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f2f4f7]">
                            {filteredInvoices.map((invoice) => {
                                const daysOverdue = calculateDaysOverdue(invoice.dueDate);
                                const risk = getRiskLevel(daysOverdue);

                                return (
                                    <tr key={invoice.id} className="hover:bg-[#f9fafb] transition-soft group">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-bold text-sm text-[#101828]">{invoice.client}</p>
                                                <p className="text-[10px] text-[#667085] font-medium">{invoice.id}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-sm text-[#101828]">
                                            {formatCurrency(invoice.amount)}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-[#667085] font-medium">
                                            {new Date(invoice.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-bold ${daysOverdue > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                {daysOverdue > 0 ? `${daysOverdue} days` : 'Not overdue'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${risk.color.includes('red-600') ? 'bg-[#fef2f2] text-[#991b1b] border-[#fecaca]' : risk.color.includes('amber') ? 'bg-[#fffbeb] text-[#92400e] border-[#fde68a]' : 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]'} uppercase tracking-tight`}>
                                                {risk.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    className="p-2 text-[#667085] hover:text-[#2563eb] hover:bg-[#eff6ff] rounded-lg transition-soft"
                                                    title="Send Email Reminder"
                                                >
                                                    <Mail className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-[#667085] hover:text-[#101828] hover:bg-[#f2f4f7] rounded-lg transition-soft">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filteredInvoices.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-[#667085] text-sm font-medium">
                                        No invoices found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-[#f2f4f7] flex items-center justify-between">
                    <p className="text-xs text-[#667085] font-medium">
                        Showing <span className="text-[#101828] font-bold">{filteredInvoices.length}</span> of <span className="text-[#101828] font-bold">{mockData.invoices.length}</span> invoices
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 border border-[#d0d5dd] rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-soft hover:bg-[#f9fafb]" disabled>
                            <ChevronLeft className="w-4 h-4 text-[#667085]" />
                        </button>
                        <button className="p-2 border border-[#d0d5dd] rounded-lg transition-soft hover:bg-[#f9fafb]">
                            <ChevronRight className="w-4 h-4 text-[#667085]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
