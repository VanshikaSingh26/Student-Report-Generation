import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="center-container">
            <div className="card">
                <h1>Student Report Generator</h1>
                <p>
                    Easily generate and view student grade reports.<br />
                    Click below to get started!
                </p>
                <Link to="/report-form" className="main-btn">
                    Generate Report
                </Link>
            </div>
        </div>
    );
};

export default Home;