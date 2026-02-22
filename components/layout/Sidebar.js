"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutGrid,
    FileText,
    Zap,
    BarChart3,
    Settings,
    ChevronDown,
    Search,
    Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutGrid },
    { name: 'Invoices', href: '/invoices', icon: FileText },
    { name: 'Automation', href: '/automation', icon: Zap },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-[#f2f4f7] hidden md:flex flex-col z-50">
            <div className="p-6">
                <div className="flex items-center justify-between mb-8 px-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white fill-current" />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-[#101828]">SmartFinance</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <p className="px-3 text-[10px] font-bold text-[#98a2b3] uppercase tracking-widest mb-3">Menu</p>
                        <nav className="space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-soft font-medium text-sm",
                                            isActive
                                                ? "bg-[#f2f4f7] text-[#101828]"
                                                : "text-[#667085] hover:bg-[#f9fafb] hover:text-[#101828]"
                                        )}
                                    >
                                        <item.icon className={cn("w-5 h-5", isActive ? "text-[#101828]" : "text-[#667085]")} />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>

            <div className="mt-auto p-4 border-t border-[#f2f4f7]">
                <div className="px-2 mb-4 space-y-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#667085] hover:text-[#101828] hover:bg-[#f9fafb] rounded-lg transition-soft">
                        <Search className="w-4 h-4" />
                        <span>Search</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#667085] hover:text-[#101828] hover:bg-[#f9fafb] rounded-lg transition-soft relative">
                        <Bell className="w-4 h-4" />
                        <span>Notifications</span>
                        <span className="absolute right-3 top-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>

                <button className="w-full flex items-center justify-between p-2 hover:bg-[#f9fafb] rounded-xl transition-soft group">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#f2f4f7] border border-[#eaecf0] flex items-center justify-center overflow-hidden">
                            <div className="w-full h-full bg-[#2563eb]/10 flex items-center justify-center">
                                <span className="text-[#2563eb] font-semibold text-xs text-center leading-tight">JD</span>
                            </div>
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-[#101828]">John Doe</p>
                            <p className="text-xs text-[#667085]">Administrator</p>
                        </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-[#667085] group-hover:text-[#101828]" />
                </button>
            </div>
        </aside>
    );
}
