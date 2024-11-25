import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../styles/AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h1>About TrackItNow</h1>
                <p className="tagline">Modern Inventory Management Solution</p>
            </div>

            <div className="about-content">
                <section className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        TrackItNow is designed to simplify inventory management for businesses 
                        of all sizes. We provide powerful tools to track, manage, and optimize 
                        your inventory operations efficiently.
                    </p>
                </section>

                <section className="about-section">
                    <h2>Developer Team</h2>
                    <div className="team-member">
                        <div className="member-info">
                            <h3>Lewis Mosage</h3>
                            <p>Lead Developer</p>
                            <div className="social-links">
                                <a href="https://github.com/lewismosage" target="_blank" rel="noopener noreferrer">
                                    <FaGithub /> GitHub
                                </a>
                                <a href="https://linkedin.com/in/lewismosage" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin /> LinkedIn
                                </a>
                                <a href="mailto:mendalewis20@gmail.com">
                                  <FaEnvelope /> Email
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="about-section">
                    <h2>Technology Stack</h2>
                    <div className="tech-stack">
                        <div className="tech-item">React.js</div>
                        <div className="tech-item">Node.js</div>
                        <div className="tech-item">MongoDB</div>
                        <div className="tech-item">Express</div>
                    </div>
                </section>

                <section className="about-section">
                    <h2>Contact Us</h2>
                    <p>
                        Have questions or feedback? Reach out to us at{' '}
                        <a href="mailto:support@trackitnow.com">support@trackitnow.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutUs; 