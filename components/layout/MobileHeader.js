"use client";

import { Menu, Zap } from 'lucide-react';

export default function MobileHeader({ onMenuClick }) {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#f2f4f7] flex items-center justify-between px-4 z-40 md:hidden">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white fill-current" />
                </div>
                <span className="font-bold text-lg tracking-tight text-[#101828]">SmartFinance</span>
            </div>
            <button
                onClick={onMenuClick}
                className="p-2 text-[#667085] hover:bg-[#f9fafb] rounded-lg transition-soft"
                aria-label="Open menu"
            >
                <Menu className="w-6 h-6" />
            </button>
        </header>
    );
}
