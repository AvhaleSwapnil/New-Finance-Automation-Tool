import { AlertTriangle, Info, XCircle, BellRing } from 'lucide-react';

export default function AlertsPanel({ alerts }) {
    const getIcon = (type) => {
        switch (type) {
            case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
            case 'danger': return <XCircle className="w-4 h-4 text-red-500" />;
            default: return <Info className="w-4 h-4 text-blue-500" />;
        }
    };

    const getBg = (type) => {
        switch (type) {
            case 'warning': return 'bg-amber-50 border-amber-100';
            case 'danger': return 'bg-red-50 border-red-100';
            default: return 'bg-blue-50 border-blue-100';
        }
    };

    return (
        <section className="bg-card rounded-3xl border border-border card-shadow flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BellRing className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg">Active Alerts</h3>
                </div>
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {alerts.length} New
                </span>
            </div>

            <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[600px]">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`p-4 rounded-2xl border ${getBg(alert.type)} transition-all hover:scale-[1.02] cursor-default group`}
                    >
                        <div className="flex gap-3">
                            <div className="mt-0.5">{getIcon(alert.type)}</div>
                            <div>
                                <p className="text-sm font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                                    {alert.message}
                                </p>
                                <p className="text-[10px] text-muted-foreground mt-2 font-medium">
                                    {new Date(alert.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-border bg-accent/30 text-center">
                <button className="text-xs font-bold text-primary hover:underline">
                    View All Notifications
                </button>
            </div>
        </section>
    );
}
