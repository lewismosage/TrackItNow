// Dashboard.
import React from 'react';
import { Link } from 'react-router-dom';
import { 
    FaWarehouse, 
    FaTruck, 
    FaHistory, 
    FaBarcode,
    FaExclamationTriangle,
    FaBoxOpen,
    FaArrowRight,
    FaBox,
    FaShoppingCart,
    FaFileInvoice,
    FaUsers,
    FaChartBar
} from 'react-icons/fa';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const featureSections = [
        {
            title: "Inventory Management",
            features: [
                {
                    title: "Warehouses",
                    icon: <FaWarehouse />,
                    description: "Manage multiple warehouses and storage locations",
                    link: "/warehouses",
                    color: "blue"
                },
                {
                    title: "Stock Alerts",
                    icon: <FaExclamationTriangle />,
                    description: "View low stock and inventory alerts",
                    link: "/stock-alerts",
                    color: "red"
                },
                {
                    title: "Inventory History",
                    icon: <FaHistory />,
                    description: "Track all inventory changes and movements",
                    link: "/inventory-history",
                    color: "purple"
                },
                {
                    title: "Barcode Scanner",
                    icon: <FaBarcode />,
                    description: "Scan and process items quickly",
                    link: "/barcode-scanner",
                    color: "green"
                }
            ]
        },
        {
            title: "Order Processing",
            features: [
                {
                    title: "Orders",
                    icon: <FaShoppingCart />,
                    description: "Manage customer orders and fulfillment",
                    link: "/orders",
                    color: "orange"
                },
                {
                    title: "Invoices",
                    icon: <FaFileInvoice />,
                    description: "Handle billing and invoices",
                    link: "/invoices",
                    color: "indigo"
                },
                {
                    title: "Returns",
                    icon: <FaBoxOpen />,
                    description: "Process returns and refunds",
                    link: "/returns",
                    color: "yellow"
                }
            ]
        },
        {
            title: "Business Partners",
            features: [
                {
                    title: "Suppliers",
                    icon: <FaTruck />,
                    description: "Manage suppliers and purchases",
                    link: "/suppliers",
                    color: "teal"
                },
                {
                    title: "Customers",
                    icon: <FaUsers />,
                    description: "View customer information and history",
                    link: "/customers",
                    color: "pink"
                }
            ]
        },
        {
            title: "Analytics & Reports",
            features: [
                {
                    title: "Reports",
                    icon: <FaChartBar />,
                    description: "View detailed business analytics",
                    link: "/reports",
                    color: "cyan"
                },
                {
                    title: "Inventory Status",
                    icon: <FaBox />,
                    description: "Check current inventory levels",
                    link: "/inventory",
                    color: "amber"
                }
            ]
        }
    ];

    return (
        <div className="dashboard-container">
            {/* Summary Cards */}
            <div className="summary-cards">
                {/* existing summary cards */}
            </div>

            {/* Feature Sections */}
            {featureSections.map((section, index) => (
                <div key={index} className="feature-section">
                    <h2>{section.title}</h2>
                    <div className="features-grid">
                        {section.features.map((feature, featureIndex) => (
                            <Link 
                                to={feature.link} 
                                className={`feature-card ${feature.color}`}
                                key={featureIndex}
                            >
                                <div className="feature-icon">
                                    {feature.icon}
                                </div>
                                <div className="feature-content">
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                    <span className="feature-link">
                                        Access {feature.title} <FaArrowRight />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
