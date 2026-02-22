import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function KPICard({ title, value, change, icon: Icon, progress, trend, isBad, isWarning, color = "blue" }) {
    const colorMap = {
        blue: "text-blue-600 bg-blue-50",
        green: "text-green-600 bg-green-50",
        gray: "text-gray-600 bg-gray-50",
        red: "text-red-500 bg-red-50",
    };

    return (
        <div className="p-6 rounded-2xl border border-[#f2f4f7] bg-white card-shadow flex flex-col justify-between h-full">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-[#667085]">{title}</p>
                    <h4 className="text-2xl font-bold mt-2 text-[#101828]">{value}</h4>
                </div>
                <div className={`p-2 rounded-lg ${colorMap[color] || colorMap.blue}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>

            {progress !== undefined && (
                <div className="mt-4">
                    <div className="w-full h-1.5 bg-[#f2f4f7] rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-1000 ${color === 'green' ? 'bg-[#47a047]' : 'bg-[#2563eb]'}`}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
}
