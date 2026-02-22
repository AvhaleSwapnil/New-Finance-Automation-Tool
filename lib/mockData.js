export const mockData = {
    company: {
        name: "ABC Holdings",
        type: "QuickBooks Online",
        lastSynced: "2026-02-22T10:00:00Z"
    },
    kpis: {
        totalRevenue: 125000,
        totalExpenses: 84000,
        overdueInvoicesCount: 5,
        lastMonthRevenue: 110000,
        lastMonthExpenses: 80000
    },
    revenueExpensesHistory: [
        { month: 'Sep', revenue: 95000, expenses: 72000 },
        { month: 'Oct', revenue: 102000, expenses: 75000 },
        { month: 'Nov', revenue: 115000, expenses: 78000 },
        { month: 'Dec', revenue: 128000, expenses: 82000 },
        { month: 'Jan', revenue: 110000, expenses: 80000 },
        { month: 'Feb', revenue: 125000, expenses: 84000 },
    ],
    expenseCategories: [
        { name: 'Payroll', value: 45000 },
        { name: 'Marketing', value: 12000 },
        { name: 'Office Rent', value: 15000 },
        { name: 'Software', value: 8000 },
        { name: 'Travel', value: 4000 },
    ],
    invoices: [
        { id: 'INV-001', client: 'Acme Corp', amount: 15000, dueDate: '2026-02-15', status: 'overdue' },
        { id: 'INV-002', client: 'GlobalTech', amount: 8500, dueDate: '2026-02-18', status: 'overdue' },
        { id: 'INV-003', client: 'Starlight Inc', amount: 12000, dueDate: '2026-02-28', status: 'pending' },
        { id: 'INV-004', client: 'Nexus Solutions', amount: 5000, dueDate: '2026-02-10', status: 'overdue' },
        { id: 'INV-005', client: 'Oceanic Ltd', amount: 22000, dueDate: '2026-03-05', status: 'pending' },
        { id: 'INV-006', client: 'Terra Firma', amount: 3200, dueDate: '2026-02-05', status: 'overdue' },
        { id: 'INV-007', client: 'Quantum Leap', amount: 18000, dueDate: '2026-02-12', status: 'overdue' },
    ],
    alerts: [
        { id: 1, type: 'warning', message: 'Revenue dropped by 5% compared to last month', date: '2026-02-21' },
        { id: 2, type: 'danger', message: '5 invoices are now more than 10 days overdue', date: '2026-02-22' },
        { id: 3, type: 'info', message: 'New automation rule "Auto-Reminder" triggered for 3 clients', date: '2026-02-22' }
    ],
    automationRules: [
        { id: 1, name: 'Late Fee Application', condition: 'Overdue > 30 days', action: 'Apply 5% fee' },
        { id: 2, name: 'High Value Alert', condition: 'Invoice > $50,000', action: 'Notify CFO' }
    ]
};
