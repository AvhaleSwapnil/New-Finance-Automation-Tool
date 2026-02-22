"use client";

import { useState } from 'react';
import { mockData } from '@/lib/mockData';
import { Building2, Bell, Shield, User, Link as LinkIcon, RefreshCw, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('Company Profile');

    const navItems = [
        { icon: Building2, label: "Company Profile" },
        { icon: User, label: "User Management" },
        { icon: Bell, label: "Notifications" },
        { icon: Shield, label: "Security" },
        { icon: LinkIcon, label: "Integrations" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#101828]">Settings</h1>
                <p className="text-[#667085] mt-1">Configure your account and platform preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <aside className="md:col-span-3 space-y-1">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => setActiveTab(item.label)}
                            className={cn(
                                "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-soft group",
                                activeTab === item.label
                                    ? "bg-[#f2f4f7] text-[#101828]"
                                    : "text-[#667085] hover:bg-[#f9fafb] hover:text-[#101828]"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={cn("w-4 h-4", activeTab === item.label ? "text-[#101828]" : "text-[#667085] group-hover:text-[#101828]")} />
                                <span>{item.label}</span>
                            </div>
                            <ChevronRight className={cn("w-3 h-3 transition-soft", activeTab === item.label ? "opacity-100" : "opacity-0 group-hover:opacity-40")} />
                        </button>
                    ))}
                </aside>

                <div className="md:col-span-9 space-y-8">
                    {/* Integration Status */}
                    <section className="bg-white rounded-2xl p-6 border border-[#f2f4f7] card-shadow">
                        <h3 className="text-lg font-bold text-[#101828] mb-6">QuickBooks Integration</h3>
                        <div className="flex items-center justify-between p-5 bg-[#f9fafb] rounded-xl border border-[#f2f4f7]">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-[#eaecf0] shadow-sm">
                                    <span className="font-black text-xs text-[#059669]">QB</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[#101828]">{mockData.company.name}</p>
                                    <p className="text-[10px] text-[#667085] font-bold uppercase tracking-wider">Connected since Jan 2024</p>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#d0d5dd] rounded-lg text-xs font-bold text-[#344054] transition-soft hover:bg-[#f9fafb]">
                                <RefreshCw className="w-3 h-3 text-[#667085]" />
                                Sync Now
                            </button>
                        </div>
                    </section>

                    {/* Alert Thresholds */}
                    <section className="bg-white rounded-2xl p-6 border border-[#f2f4f7] card-shadow">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-[#101828]">Alert Thresholds</h3>
                            <p className="text-sm text-[#667085]">Define when the system should flag financial risks.</p>
                        </div>
                        <div className="space-y-6">
                            <ThresholdInput label="Revenue Drop Alert" defaultValue="10" unit="%" />
                            <ThresholdInput label="Expense Increase Alert" defaultValue="15" unit="%" />
                            <ThresholdInput label="Overdue Warning" defaultValue="5" unit="Days" />
                        </div>
                    </section>

                    {/* Preferences */}
                    <section className="bg-white rounded-2xl p-6 border border-[#f2f4f7] card-shadow">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-[#101828]">Email Preferences</h3>
                            <p className="text-sm text-[#667085]">Manage how often you receive updates.</p>
                        </div>
                        <div className="space-y-1">
                            <ToggleSetting label="Daily financial summary" defaultChecked description="Receive a breakdown of yesterday's transactions." />
                            <ToggleSetting label="Instant alerts for critical risks" defaultChecked description="Notifications for immediate action needed." />
                            <ToggleSetting label="Weekly automation impact report" description="See how many hours your rules have saved." />
                            <ToggleSetting label="New invoice notifications" defaultChecked description="Alert when a new customer invoice is generated." />
                        </div>
                    </section>

                    <div className="flex justify-end gap-3 pt-4">
                        <button className="px-6 py-2.5 bg-white border border-[#d0d5dd] text-[#344054] rounded-xl font-bold text-sm transition-soft hover:bg-[#f9fafb]">
                            Cancel
                        </button>
                        <button className="px-6 py-2.5 bg-[#101828] text-white rounded-xl font-bold text-sm transition-soft hover:bg-black">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ThresholdInput({ label, defaultValue, unit }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-[#f9fafb] last:border-0">
            <label className="text-sm font-medium text-[#344054]">{label}</label>
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    defaultValue={defaultValue}
                    className="w-20 bg-white border border-[#d0d5dd] rounded-lg px-3 py-1.5 text-sm font-bold text-right outline-none focus:ring-2 focus:ring-[#f2f4f7] transition-soft"
                />
                <span className="text-xs font-bold text-[#667085] w-10">{unit}</span>
            </div>
        </div>
    );
}

function ToggleSetting({ label, description, defaultChecked }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-[#f9fafb] last:border-0 group">
            <div className="space-y-0.5">
                <span className="text-sm font-bold text-[#101828] group-hover:text-[#2563eb] transition-soft">{label}</span>
                <p className="text-xs text-[#667085]">{description}</p>
            </div>
            <div className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
                <div className="w-10 h-5 bg-[#f2f4f7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#d0d5dd] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#101828]"></div>
            </div>
        </div>
    );
}
