import React from 'react';
import { useState } from 'react';
import './MenuItem.css'

// This is a functional component that represents a single menu item. It currently takes in the title and displays it in an h2 element.
// Modify the component to take in all the other properties of a menu item you need and display them in the component.
// Use bootstrap to style the elements so that it looks like the mockup in the assignment.
// Hint: You can use the image name to get the image from the images folder.
const MenuItem = ({ id, title, description, imageName, price, quantity, onQuantityChange}) => {
    function handleAdd() {
        onQuantityChange(id, quantity + 1);
    }

    function handleSubtract() {
        if (quantity > 0) {
            onQuantityChange(id, quantity - 1);
        }
    }

    const imageSrc = `${import.meta.env.BASE_URL}images/${imageName}`;

    return (
        <div className="menu-item">
            <div className="item-image">
                <img 
                    src={imageSrc} alt={title} />
            </div>
            <div className="item-content">
                <div className="item-header">
                    <h2>{title}</h2>
                    <p className="price">${price}</p>
                </div>
                <p className="description">{description}</p>
                <div className="item-count-container">
                    <button className="buttons" onClick={handleAdd}>+</button>
                    <p className="description">{quantity}</p>
                    <button className="buttons" onClick={handleSubtract} disabled={quantity === 0}>-</button>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;
