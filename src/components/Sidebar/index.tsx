import React from 'react';

import { NavLink } from 'react-router-dom';

import './styles.css';

function Sidebar() {
    return (
        <div className="nav-container">
            <header className="heading">
                Sustainability Tools
            </header>
            <NavLink
                to="/scan_website"
                className="nav-link"
            >
                Scan Website
            </NavLink>
            <NavLink
                to="/saved_scans"
                className="nav-link"
            >
                Save Scan
            </NavLink>
        </div>
    );
}

export default Sidebar;
