import React from 'react';
import './MenuHeader.css';

const MenuHeader = () => {
    return (
        <header className="menu-header">
            <img 
                src="/images/p1hero.jpg" 
                alt="Japanese Restaurant Logo"  
                className="restaurant-logo"
            />
            <h1>Sakura Japanese Restaurant</h1>
            <p className="restaurant-description">
                Experience authentic Japanese cuisine with our carefully crafted dishes
            </p>
        </header>
    );
};

export default MenuHeader;
