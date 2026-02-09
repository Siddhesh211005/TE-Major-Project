import React from 'react';
import { FaTachometerAlt, FaNetworkWired, FaEdit, FaFileAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <li><FaTachometerAlt /> Dashboard</li>
                    <li><FaNetworkWired /> Network Graph</li>
                    <li><FaEdit /> Policy Editor</li>
                    <li><FaFileAlt /> Logs</li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;