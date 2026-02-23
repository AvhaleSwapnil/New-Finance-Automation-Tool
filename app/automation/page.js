"use client";

import { useState } from 'react';
import { Zap, Plus, Play, Pause, Trash2, ArrowRight, ShieldAlert, Clock, Mail, ChevronDown } from 'lucide-react';
import { mockData } from '@/lib/mockData';

export default function AutomationPage() {
    const [rules, setRules] = useState(mockData.automationRules);
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">Smart Automation</h1>
                    <p className="text-[#667085] mt-1 text-sm sm:text-base">Configure IF-THEN rules for your QuickBooks data</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-[#101828] text-white px-6 py-2.5 rounded-xl font-bold transition-soft hover:bg-black text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                    <Plus className="w-4 h-4" />
                    Create New Rule
                </button>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Rule Builder Form */}
                <div className={`lg:col-span-4 space-y-6 transition-soft ${showForm ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`}>
                    <div className="bg-white rounded-2xl border border-[#f2f4f7] p-6 card-shadow">
                        <h3 className="text-lg font-bold text-[#101828] mb-6">Rule Builder</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[#344054] mb-2">If This Happens</label>
                                <div className="space-y-3">
                                    <div className="relative">
                                        <select className="w-full bg-white border border-[#d0d5dd] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#f2f4f7] outline-none appearance-none">
                                            <option>Invoice is Overdue</option>
                                            <option>Revenue drops below threshold</option>
                                            <option>High value invoice created</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085] pointer-events-none" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-[#667085]">by more than</span>
                                        <input type="number" defaultValue="10" className="w-20 bg-white border border-[#d0d5dd] rounded-lg px-3 py-1.5 text-sm font-bold outline-none" />
                                        <span className="text-xs text-[#667085]">days</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center -my-2">
                                <div className="w-8 h-8 bg-[#f2f4f7] rounded-full flex items-center justify-center text-[#101828]">
                                    <ArrowRight className="w-4 h-4 rotate-90" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#344054] mb-2">Then Do This</label>
                                <div className="relative mb-3">
                                    <select className="w-full bg-white border border-[#d0d5dd] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#f2f4f7] outline-none appearance-none">
                                        <option>Send Email Reminder</option>
                                        <option>Show Dashboard Alert</option>
                                        <option>Notify Admin</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085] pointer-events-none" />
                                </div>
                                <textarea
                                    placeholder="Custom message (optional)..."
                                    className="w-full bg-white border border-[#d0d5dd] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#f2f4f7] outline-none h-24 resize-none"
                                ></textarea>
                            </div>

                            <button className="w-full py-2.5 bg-[#101828] text-white rounded-lg font-bold hover:bg-black transition-soft">
                                Save & Activate Rule
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#eff6ff] border border-[#dbeafe] rounded-xl p-4 flex gap-3">
                        <ShieldAlert className="w-5 h-5 text-[#2563eb] flex-shrink-0" />
                        <p className="text-xs font-medium text-[#1e40af] leading-relaxed">
                            Pro Tip: Reminders 3-5 days before due dates improve cash flow by 22%.
                        </p>
                    </div>
                </div>

                {/* Rules List */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="font-bold text-lg text-[#101828]">Active Rules</h3>
                        <span className="text-xs font-medium text-[#667085]">{rules.length} automations running</span>
                    </div>

                    <div className="space-y-3">
                        {rules.map((rule) => (
                            <div
                                key={rule.id}
                                className="bg-white rounded-xl p-4 border border-[#f2f4f7] card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-[#2563eb]/20 transition-soft"
                            >
                                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                                    <div className="w-10 h-10 bg-[#f9fafb] border border-[#f2f4f7] rounded-lg flex items-center justify-center flex-shrink-0">
                                        {rule.name.includes('Reminder') ? <Mail className="w-5 h-5 text-[#2563eb]" /> :
                                            rule.name.includes('Late') ? <Clock className="w-5 h-5 text-[#d97706]" /> :
                                                <Zap className="w-5 h-5 text-[#4f46e5]" />}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                            <h4 className="font-bold text-sm text-[#101828] truncate">{rule.name}</h4>
                                            <span className="text-[10px] px-2 py-0.5 bg-[#ecfdf5] text-[#059669] rounded-full font-bold uppercase whitespace-nowrap">Active</span>
                                        </div>
                                        <p className="text-xs text-[#667085] leading-relaxed">
                                            <span className="font-semibold uppercase text-[10px]">If:</span> {rule.condition}
                                            <span className="mx-2 text-[#d0d5dd] hidden sm:inline">|</span>
                                            <br className="sm:hidden" />
                                            <span className="font-semibold uppercase text-[10px]">Then:</span> {rule.action}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-soft ml-auto sm:ml-0">

                                    <button className="p-2 text-[#667085] hover:text-[#101828] hover:bg-[#f9fafb] rounded-lg">
                                        <Pause className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-[#667085] hover:text-red-600 hover:bg-red-50 rounded-lg">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button className="w-full py-8 border-2 border-dashed border-[#f2f4f7] rounded-xl flex flex-col items-center justify-center text-[#667085] hover:border-[#d0d5dd] hover:bg-[#f9fafb] transition-soft group">
                            <Plus className="w-6 h-6 mb-2 text-[#d0d5dd] group-hover:text-[#667085]" />
                            <span className="text-sm font-medium">Add another automation rule</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
