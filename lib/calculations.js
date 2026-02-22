export const calculateNetProfit = (revenue, expenses) => {
    return revenue - expenses;
};

export const calculateHealthScore = (overdueInvoices, totalRevenue, totalExpenses) => {
    let score = 100;

    // Deduct based on overdue invoices
    score -= overdueInvoices * 5;

    // Deduct based on high expense ratio
    const expenseRatio = totalExpenses / totalRevenue;
    if (expenseRatio > 0.8) score -= 20;
    else if (expenseRatio > 0.6) score -= 10;

    return Math.max(0, Math.min(100, score));
};

export const getHealthColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 50) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
};

export const calculateDaysOverdue = (dueDate) => {
    const today = new Date('2026-02-22'); // Using today's date from sys info
    const due = new Date(dueDate);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
};

export const getRiskLevel = (daysOverdue) => {
    if (daysOverdue > 15) return { label: 'High', color: 'bg-red-100 text-red-700 border-red-200' };
    if (daysOverdue > 5) return { label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
    return { label: 'Low', color: 'bg-blue-100 text-blue-700 border-blue-200' };
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(amount);
};
