import React from 'react';
import { FaBarcode, FaBell, FaBoxOpen, FaCamera } from 'react-icons/fa';
import '../styles/NewFeatures.css';

const NewFeatures = () => {
    const features = [
        {
            id: 1,
            title: "Stock Alerts System",
            icon: <FaBell />,
            description: "Real-time monitoring of inventory levels with smart alerts for:",
            details: [
                "Low stock notifications",
                "Expiring product alerts",
                "Price change tracking",
                "Customizable alert priorities",
                "Location-based monitoring"
            ],
            releaseDate: "February 2024"
        },
        {
            id: 2,
            title: "Barcode Scanner Integration",
            icon: <FaBarcode />,
            description: "Advanced barcode scanning capabilities including:",
            details: [
                "Camera-based scanning",
                "Manual barcode entry",
                "Real-time product lookup",
                "Scan history tracking",
                "Quantity management",
                "Multiple barcode format support"
            ],
            releaseDate: "February 2024"
        }
    ];

    return (
        <div className="new-features-container">
            <div className="features-header">
                <h1>What's New in TrackItNow</h1>
                <p>Discover our latest features and improvements</p>
            </div>

            <div className="features-grid">
                {features.map(feature => (
                    <div key={feature.id} className="feature-card">
                        <div className="feature-icon">
                            {feature.icon}
                        </div>
                        <div className="feature-content">
                            <h2>{feature.title}</h2>
                            <p className="feature-description">{feature.description}</p>
                            <ul className="feature-details">
                                {feature.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                            <div className="feature-meta">
                                <span className="release-date">
                                    Released: {feature.releaseDate}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="coming-soon">
                <h2>Coming Soon</h2>
                <div className="upcoming-features">
                    <div className="upcoming-feature">
                        <FaBoxOpen />
                        <span>Advanced Analytics Dashboard</span>
                    </div>
                    <div className="upcoming-feature">
                        <FaCamera />
                        <span>Product Image Recognition</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewFeatures; 