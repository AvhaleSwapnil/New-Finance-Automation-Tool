import { mockData } from '@/lib/mockData';
import { calculateNetProfit, calculateHealthScore, formatCurrency } from '@/lib/calculations';
import KPICard from '@/components/dashboard/KPICard';
import FinancialCharts from '@/components/dashboard/FinancialCharts';
import AlertsPanel from '@/components/dashboard/AlertsPanel';
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  DollarSign,
  ArrowUpRight,
  Zap
} from 'lucide-react';

export default function Dashboard() {
  const { kpis, revenueExpensesHistory, alerts } = mockData;
  const netProfit = calculateNetProfit(kpis.totalRevenue, kpis.totalExpenses);

  const revenueChange = ((kpis.totalRevenue - kpis.lastMonthRevenue) / kpis.lastMonthRevenue) * 100;
  const expensesChange = ((kpis.totalExpenses - kpis.lastMonthExpenses) / kpis.lastMonthExpenses) * 100;
  const profitChange = ((netProfit - (kpis.lastMonthRevenue - kpis.lastMonthExpenses)) / (kpis.lastMonthRevenue - kpis.lastMonthExpenses)) * 100;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">Financial Overview</h1>
          <p className="text-[#667085] mt-1 text-sm sm:text-base">Real-time performance metrics from QuickBooks</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 sm:p-2 rounded-xl border border-[#f2f4f7] card-shadow w-fit">
          <span className="text-[10px] sm:text-xs font-semibold text-[#667085] px-2">Last Synced: Today, 10:00 AM</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>


      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Revenue"
          value={formatCurrency(kpis.totalRevenue)}
          change={revenueChange}
          trend={revenueChange >= 0 ? 'up' : 'down'}
          icon={TrendingUp}
          color="blue"
        />
        <KPICard
          title="Total Expenses"
          value={formatCurrency(kpis.totalExpenses)}
          change={expensesChange}
          trend={expensesChange <= 0 ? 'up' : 'down'}
          isBad={expensesChange > 0}
          icon={TrendingDown}
          color="gray"
        />
        <KPICard
          title="Net Profit"
          value={formatCurrency(netProfit)}
          change={profitChange}
          trend={profitChange >= 0 ? 'up' : 'down'}
          icon={DollarSign}
          color="green"
        />
        <KPICard
          title="Overdue Invoices"
          value={kpis.overdueInvoicesCount}
          icon={AlertCircle}
          color="red"
          isWarning={kpis.overdueInvoicesCount > 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl p-6 border border-[#f2f4f7] card-shadow">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-lg text-[#101828]">Revenue vs Expenses</h3>
              <select className="bg-[#f9fafb] border border-[#eaecf0] rounded-lg text-xs font-bold px-3 py-1.5 focus:ring-0 outline-none">
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="h-[350px]">
              <FinancialCharts data={revenueExpensesHistory} />
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white rounded-2xl p-6 border border-[#f2f4f7] card-shadow flex flex-col justify-center items-center text-center py-10">
              <div className="w-16 h-16 bg-[#2563eb]/10 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-[#2563eb]" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-[#101828]">Automation Ready</h3>
              <p className="text-sm text-[#667085] mb-6 px-4">You have {kpis.overdueInvoicesCount} invoices overdue. Auto-reminders could save you 4 hours this week.</p>
              <button className="px-6 py-2.5 bg-[#101828] text-white rounded-xl font-bold transition-soft hover:bg-black">
                Enable Smart Reminders
              </button>
            </section>

            <section className="bg-white rounded-2xl p-6 border border-[#f2f4f7] card-shadow">
              <h3 className="font-bold text-lg text-[#101828] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {['Create Invoice', 'Add Expense', 'Run Report'].map((action) => (
                  <button key={action} className="w-full flex items-center justify-between p-3 rounded-xl border border-[#f2f4f7] hover:bg-[#f9fafb] transition-soft group">
                    <span className="text-sm font-medium text-[#344054]">{action}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#98a2b3] group-hover:text-[#101828]" />
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="lg:col-span-1">
          <AlertsPanel alerts={alerts} />
        </div>
      </div>
    </div>
  );
}
