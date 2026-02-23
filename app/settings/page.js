"use client";

import { useState } from 'react';
import { mockData } from '@/lib/mockData';
import { Building2, Bell, Shield, User, Link as LinkIcon, RefreshCw, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('Company Profile');
    const [isSyncing, setIsSyncing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            alert("Settings synced with QuickBooks!");
        }, 1500);
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert("All changes saved successfully.");
        }, 1000);
    };

    const navItems = [
        { icon: Building2, label: "Company Profile" },
        { icon: User, label: "User Management" },
        { icon: Bell, label: "Notifications" },
        { icon: Shield, label: "Security" },
        { icon: LinkIcon, label: "Integrations" },
    ];

    return (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">Settings</h1>
                <p className="text-[#667085] mt-1 text-sm sm:text-base">Configure your account and platform preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                <aside className="md:col-span-3 flex md:flex-col overflow-x-auto md:overflow-visible pb-2 md:pb-0 gap-1 no-scrollbar">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => setActiveTab(item.label)}
                            className={cn(
                                "flex-shrink-0 flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-soft group",
                                activeTab === item.label
                                    ? "bg-[#f2f4f7] text-[#101828]"
                                    : "text-[#667085] hover:bg-[#f9fafb] hover:text-[#101828]"
                            )}
                        >
                            <div className="flex items-center gap-2 sm:gap-3">
                                <item.icon className={cn("w-4 h-4", activeTab === item.label ? "text-[#101828]" : "text-[#667085] group-hover:text-[#101828]")} />
                                <span className="whitespace-nowrap">{item.label}</span>
                            </div>
                            <ChevronRight className={cn("hidden md:block w-3 h-3 transition-soft", activeTab === item.label ? "opacity-100" : "opacity-0 group-hover:opacity-40")} />
                        </button>
                    ))}
                </aside>

                <div className="md:col-span-9 space-y-6 sm:space-y-8">
                    {/* Integration Status */}
                    <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#f2f4f7] card-shadow">
                        <h3 className="text-lg font-bold text-[#101828] mb-4 sm:mb-6">QuickBooks Integration</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 bg-[#f9fafb] rounded-xl border border-[#f2f4f7]">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center border border-[#eaecf0] shadow-sm flex-shrink-0">
                                    <span className="font-black text-[10px] sm:text-xs text-[#059669]">QB</span>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-[#101828] truncate">{mockData.company.name}</p>
                                    <p className="text-[10px] text-[#667085] font-bold uppercase tracking-wider">Connected since Jan 2024</p>
                                </div>
                            </div>
                            <button
                                onClick={handleSync}
                                disabled={isSyncing}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#d0d5dd] rounded-lg text-xs font-bold text-[#344054] transition-soft hover:bg-[#f9fafb] w-full sm:w-auto disabled:opacity-50"
                            >
                                <RefreshCw className={cn("w-3 h-3 text-[#667085]", isSyncing && "animate-spin")} />
                                {isSyncing ? 'Syncing...' : 'Sync Now'}
                            </button>
                        </div>
                    </section>

                    {/* Alert Thresholds */}
                    <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#f2f4f7] card-shadow">
                        <div className="mb-4 sm:mb-6">
                            <h3 className="text-lg font-bold text-[#101828]">Alert Thresholds</h3>
                            <p className="text-sm text-[#667085]">Define when the system should flag financial risks.</p>
                        </div>
                        <div className="space-y-4 sm:space-y-6">
                            <ThresholdInput label="Revenue Drop Alert" defaultValue="10" unit="%" />
                            <ThresholdInput label="Expense Increase Alert" defaultValue="15" unit="%" />
                            <ThresholdInput label="Overdue Warning" defaultValue="5" unit="Days" />
                        </div>
                    </section>

                    {/* Preferences */}
                    <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#f2f4f7] card-shadow">
                        <div className="mb-4 sm:mb-6">
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

                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                        <button className="px-6 py-2.5 bg-white border border-[#d0d5dd] text-[#344054] rounded-xl font-bold text-sm transition-soft hover:bg-[#f9fafb] w-full sm:w-auto order-2 sm:order-1">
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-6 py-2.5 bg-[#101828] text-white rounded-xl font-bold text-sm transition-soft hover:bg-black w-full sm:w-auto order-1 sm:order-2 disabled:opacity-50"
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
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
    const [checked, setChecked] = useState(defaultChecked || false);
    return (
        <div className="flex items-center justify-between py-4 border-b border-[#f9fafb] last:border-0 group">
            <div className="space-y-0.5">
                <span className="text-sm font-bold text-[#101828] group-hover:text-[#2563eb] transition-soft">{label}</span>
                <p className="text-xs text-[#667085]">{description}</p>
            </div>
            <div className="relative inline-flex items-center cursor-pointer" onClick={() => setChecked(!checked)}>
                <input type="checkbox" checked={checked} readOnly className="sr-only peer" />
                <div className={cn(
                    "w-10 h-5 bg-[#f2f4f7] rounded-full transition-all relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border border-[#d0d5dd] after:rounded-full after:h-4 after:w-4 after:transition-all",
                    checked ? "bg-[#101828] after:translate-x-full after:border-white" : ""
                )}></div>
            </div>
        </div>
    );
}
