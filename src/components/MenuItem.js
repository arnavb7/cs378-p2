import React from 'react';
import './MenuItem.css'

// This is a functional component that represents a single menu item. It currently takes in the title and displays it in an h2 element.
// Modify the component to take in all the other properties of a menu item you need and display them in the component.
// Use bootstrap to style the elements so that it looks like the mockup in the assignment.
// Hint: You can use the image name to get the image from the images folder.
const MenuItem = ({ title, description, imageName, price }) => {
    return (
        <div className="menu-item">
            <div className="item-image">
                <img 
                    src={`${process.env.PUBLIC_URL}/images/${imageName}`}
                    /* got credit from https://stackoverflow.com/questions/71075028/how-to-display-images-using-props-in-react
                    and https://stackoverflow.com/questions/47196800/reactjs-and-images-in-public-folder */
                    alt={title} 
                />
            </div>
            <div className="item-content">
                <div className="item-header">
                    <h2>{title}</h2>
                    <p className="price">${price}</p>
                </div>
                <p className="description">{description}</p>
                <button className="add-btn">Add</button>
            </div>
        </div>
    );
};

export default MenuItem;
