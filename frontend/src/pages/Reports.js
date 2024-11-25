// report.js
import React, { useState, useEffect } from 'react';
import { 
    FaChartLine, 
    FaBoxes, 
    FaUsers, 
    FaFileInvoiceDollar, 
    FaDownload,
    FaCalendarAlt
} from 'react-icons/fa';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import '../styles/Reports.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { fetchCustomers } from '../services/customerService';
import { fetchInvoices } from '../services/invoiceService';
import { fetchOrders } from '../services/orderService';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Reports = () => {
    const [dateRange, setDateRange] = useState('monthly'); 
    const [isExporting, setIsExporting] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = async () => {
        try {
            setLoading(true);
            const [customersData, invoicesData, ordersData] = await Promise.all([
                fetchCustomers(),
                fetchInvoices(),
                fetchOrders()
            ]);
            
            setCustomers(customersData);
            setInvoices(invoicesData);
            setOrders(ordersData);
            setError(null);
        } catch (error) {
            console.error('Error loading data:', error);
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    // Calculate statistics from real data
    const calculateStatistics = () => {
        const stats = {
            totalCustomers: customers.length,
            activeCustomers: customers.filter(c => c.status === 'active').length,
            totalRevenue: invoices
                .filter(inv => inv.status === 'paid')
                .reduce((sum, inv) => sum + (inv.total || 0), 0),
            totalOrders: orders.length,
            pendingOrders: orders.filter(order => order.status === 'pending').length,
            completedOrders: orders.filter(order => order.status === 'completed').length,
            averageOrderValue: orders.length > 0 
                ? orders.reduce((sum, order) => sum + (order.total || 0), 0) / orders.length 
                : 0
        };

        return stats;
    };

    const stats = calculateStatistics();

    // Get recent transactions (paid invoices only)
    const getRecentTransactions = () => {
        return invoices
            .filter(invoice => invoice.status === 'paid')
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
            .map(invoice => ({
                id: invoice.id,
                customer: invoice.customer.name,
                amount: invoice.total,
                date: invoice.date,
                status: 'received'  
            }));
    };

    // Sample data - In a real app, this would come from your backend
    const statistics = {
        totalRevenue: 157584.45,
        totalOrders: 786,
        totalCustomers: 1834,
        averageOrderValue: 200.49,
        lowStockItems: 23,
        pendingOrders: 45
    };

    const topSellingProducts = [
        { name: 'Product A', sales: 145, revenue: 14500 },
        { name: 'Product B', sales: 132, revenue: 13200 },
        { name: 'Product C', sales: 121, revenue: 12100 },
        { name: 'Product D', sales: 98, revenue: 9800 },
        { name: 'Product E', sales: 87, revenue: 8700 }
    ];

    const recentTransactions = [
        { id: 'INV-001', customer: 'John Doe', amount: 1250.00, date: '2024-02-15', status: 'completed' },
        { id: 'INV-002', customer: 'Jane Smith', amount: 890.50, date: '2024-02-14', status: 'pending' },
        { id: 'INV-003', customer: 'Bob Johnson', amount: 2340.00, date: '2024-02-13', status: 'completed' },
        { id: 'INV-004', customer: 'Alice Brown', amount: 1678.25, date: '2024-02-12', status: 'completed' },
        { id: 'INV-005', customer: 'Charlie Wilson', amount: 945.75, date: '2024-02-11', status: 'failed' }
    ];

    // Sample data for charts
    const salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Sales Revenue',
                data: [12500, 15700, 14300, 18200, 19500, 17800],
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Order Count',
                data: [125, 157, 143, 182, 195, 178],
                borderColor: '#059669',
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                fill: true,
                tension: 0.4,
            }
        ]
    };

    const revenueDistributionData = {
        labels: ['Online Sales', 'In-Store Sales', 'Wholesale', 'Other'],
        datasets: [{
            data: [45, 25, 20, 10],
            backgroundColor: [
                '#4f46e5',
                '#059669',
                '#eab308',
                '#6b7280'
            ],
            borderWidth: 0,
        }]
    };

    const productPerformanceData = {
        labels: topSellingProducts.map(product => product.name),
        datasets: [{
            label: 'Sales Volume',
            data: topSellingProducts.map(product => product.sales),
            backgroundColor: '#4f46e5',
        }]
    };

    // Chart options
    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales Performance Over Time'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    drawBorder: false
                }
            }
        }
    };

    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Revenue Distribution'
            }
        }
    };

    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Product Performance'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const exportReport = async () => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        
        // Add title
        pdf.setFontSize(20);
        pdf.text('Analytics & Reports', pageWidth/2, 15, { align: 'center' });
        pdf.setFontSize(12);
        pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth/2, 22, { align: 'center' });
        
        // Add Statistics
        pdf.setFontSize(14);
        pdf.text('Key Statistics', 14, 35);
        
        const statsData = [
            ['Total Revenue', `$${statistics.totalRevenue.toLocaleString()}`],
            ['Total Orders', statistics.totalOrders.toString()],
            ['Total Customers', statistics.totalCustomers.toString()],
            ['Low Stock Items', statistics.lowStockItems.toString()]
        ];
        
        pdf.autoTable({
            startY: 40,
            head: [['Metric', 'Value']],
            body: statsData,
            theme: 'grid',
            headStyles: { fillColor: [79, 70, 229] }
        });

        // Export charts as images
        try {
            // Sales Performance Chart
            const salesChart = document.querySelector('.sales-trend .chart-container canvas');
            const salesChartImage = await html2canvas(salesChart);
            const salesImgData = salesChartImage.toDataURL('image/png');
            pdf.addPage();
            pdf.text('Sales Performance', 14, 15);
            pdf.addImage(salesImgData, 'PNG', 10, 20, 190, 100);

            // Revenue Distribution Chart
            const revenueChart = document.querySelector('.revenue-distribution .chart-container canvas');
            const revenueChartImage = await html2canvas(revenueChart);
            const revenueImgData = revenueChartImage.toDataURL('image/png');
            pdf.addPage();
            pdf.text('Revenue Distribution', 14, 15);
            pdf.addImage(revenueImgData, 'PNG', 10, 20, 190, 100);

            // Product Performance Chart
            const productChart = document.querySelector('.product-performance .chart-container canvas');
            const productChartImage = await html2canvas(productChart);
            const productImgData = productChartImage.toDataURL('image/png');
            pdf.addPage();
            pdf.text('Product Performance', 14, 15);
            pdf.addImage(productImgData, 'PNG', 10, 20, 190, 100);
        } catch (error) {
            console.error('Error generating chart images:', error);
        }

        // Add Top Selling Products
        pdf.addPage();
        pdf.text('Top Selling Products', 14, 15);
        
        const productsData = topSellingProducts.map(product => [
            product.name,
            product.sales.toString(),
            `$${product.revenue.toLocaleString()}`
        ]);
        
        pdf.autoTable({
            startY: 20,
            head: [['Product Name', 'Sales', 'Revenue']],
            body: productsData,
            theme: 'grid',
            headStyles: { fillColor: [79, 70, 229] }
        });

        // Add Recent Transactions
        pdf.addPage();
        pdf.text('Recent Transactions', 14, 15);
        
        const transactionsData = recentTransactions.map(transaction => [
            transaction.id,
            transaction.customer,
            `$${transaction.amount.toLocaleString()}`,
            new Date(transaction.date).toLocaleDateString(),
            transaction.status
        ]);
        
        pdf.autoTable({
            startY: 20,
            head: [['Invoice ID', 'Customer', 'Amount', 'Date', 'Status']],
            body: transactionsData,
            theme: 'grid',
            headStyles: { fillColor: [79, 70, 229] }
        });

        // Save the PDF
        pdf.save(`Analytics_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    const handleExport = async () => {
        setIsExporting(true);
        try {
            await exportReport();
        } catch (error) {
            console.error('Error exporting report:', error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="reports-main-container">
            {/* Header Section */}
            <div className="reports-header">
                <div className="header-title">
                    <h2>Analytics & Reports</h2>
                </div>
                <div className="header-actions">
                    <select 
                        value={dateRange} 
                        onChange={(e) => setDateRange(e.target.value)}
                        className="date-range-select"
                    >
                        <option value="weekly">Last 7 Days</option>
                        <option value="monthly">Last 30 Days</option>
                        <option value="yearly">Last 12 Months</option>
                    </select>
                    <button 
                        className="export-btn" 
                        onClick={handleExport}
                        disabled={isExporting}
                    >
                        {isExporting ? (
                            <>
                                <span className="loading-spinner"></span> Generating...
                            </>
                        ) : (
                            <>
                                <FaDownload /> Export Report
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="statistics-grid">
                <div className="stat-card customers">
                    <div className="stat-icon">
                        <FaUsers />
                    </div>
                    <div className="stat-details">
                        <h3>Customers</h3>
                        <p className="stat-number">{stats.totalCustomers}</p>
                        <p className="stat-label">Active: {stats.activeCustomers}</p>
                    </div>
                </div>

                <div className="stat-card revenue">
                    <div className="stat-icon">
                        <FaFileInvoiceDollar />
                    </div>
                    <div className="stat-details">
                        <h3>Total Revenue</h3>
                        <p className="stat-number">${stats.totalRevenue.toLocaleString()}</p>
                        <p className="stat-label">From Paid Invoices</p>
                    </div>
                </div>

                <div className="stat-card orders">
                    <div className="stat-icon">
                        <FaBoxes />
                    </div>
                    <div className="stat-details">
                        <h3>Orders</h3>
                        <p className="stat-number">{stats.totalOrders}</p>
                        <p className="stat-label">
                            Pending: {stats.pendingOrders}  Completed: {stats.completedOrders}
                        </p>
                    </div>
                </div>

                <div className="stat-card average-order">
                    <div className="stat-icon">
                        <FaChartLine />
                    </div>
                    <div className="stat-details">
                        <h3>Average Order Value</h3>
                        <p className="stat-number">${stats.averageOrderValue.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Updated Charts Section */}
            <div className="charts-grid">
                <div className="chart-card sales-trend">
                    <h3>Sales Performance</h3>
                    <div className="chart-container">
                        <Line data={salesData} options={lineChartOptions} />
                    </div>
                </div>

                <div className="chart-card revenue-distribution">
                    <h3>Revenue Distribution</h3>
                    <div className="chart-container">
                        <Doughnut data={revenueDistributionData} options={doughnutOptions} />
                    </div>
                </div>

                <div className="chart-card product-performance">
                    <h3>Product Performance</h3>
                    <div className="chart-container">
                        <Bar data={productPerformanceData} options={barChartOptions} />
                    </div>
                </div>
            </div>

            {/* Top Selling Products */}
            <div className="data-grid">
                <div className="data-card top-products">
                    <h3>Top Selling Products</h3>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Sales</th>
                                    <th>Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topSellingProducts.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.name}</td>
                                        <td>{product.sales}</td>
                                        <td>${product.revenue.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="data-card recent-transactions">
                    <h3>Recent Payments Received</h3>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Invoice ID</th>
                                    <th>Customer</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getRecentTransactions().map((transaction, index) => (
                                    <tr key={index}>
                                        <td>{transaction.id}</td>
                                        <td>{transaction.customer}</td>
                                        <td>${transaction.amount.toLocaleString()}</td>
                                        <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                        <td>
                                            <span className="status-badge received">
                                                {transaction.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
