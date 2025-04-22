import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MenuHeader from './components/MenuHeader.jsx'
import MenuItem from './components/MenuItem.jsx'

// import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.

// Menu data. An array of objects where each object represents a menu item. Each menu item has an id, title, description, image name, and price.
// You can use the image name to get the image from the images folder.
const menuItems = [
  {
    id: 1,
    title: 'Gyoza',
    description: 'Japanese dumplings',
    imageName: 'gyoza.png',
    price: 5.99,
  },
  {
    id: 2,
    title: 'Sushi',
    description: 'Japanese rice rolls',
    imageName: 'sushi.png',
    price: 6.99,
  },
  {
    id: 3,
    title: 'Ramen',
    description: 'Japanese noodle soup',
    imageName: 'ramen.png',
    price: 7.99,
  },
  {
    id: 4,
    title: 'Matcha Cake',
    description: 'Japanese green tea cake',
    imageName: 'matcha-cake.png',
    price: 4.99,
  },
  {
    id: 5,
    title: 'Mochi',
    description: 'Japanese rice cake',
    imageName: 'mochi.png',
    price: 3.99,
  },
  {
    id: 6,
    title: 'Yakitori',
    description: 'Japanese skewered chicken',
    imageName: 'yakitori.png',
    price: 2.99,
  },
  {
    id: 7,
    title: 'Takoyaki',
    description: 'Japanese octopus balls',
    imageName: 'takoyaki.png',
    price: 5.99,
  },
  {
    id: 8,
    title: 'Sashimi',
    description: 'Japanese raw fish',
    imageName: 'sashimi.png',
    price: 8.99,
  },
  {
    id: 9,
    title: 'Okonomiyaki',
    description: 'Japanese savory pancake',
    imageName: 'okonomiyaki.png',
    price: 6.99,
  },
  {
    id: 10,
    title: 'Katsu Curry',
    description: 'Japanese curry with fried pork',
    imageName: 'katsu-curry.png',
    price: 9.99,
  }
];

function App() {
  const [itemQuantities, setItemQuantities] = useState(() => {
    const initialQuantities = {};
    menuItems.forEach(item => {
      initialQuantities[item.id] = 0;
    });
    return initialQuantities;
  });

  const [showFormPopup, setShowFormPopup] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [orderSummary, setOrderSummary] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    phone: ''
  });

  const calculateTotal = () => {
    let total = 0;
    menuItems.forEach(item => {
      total += item.price * itemQuantities[item.id];
    });
    return total.toFixed(2);
  };

  const updateQuantity = (itemId, newQuantity) => {
    setItemQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: newQuantity
    }));
  };

  const clearCart = () => {
    const resetQuantities = {};
    menuItems.forEach(item => {
      resetQuantities[item.id] = 0;
    });
    if (calculateTotal() === "0.00") {
      alert("There is nothing in your cart.");
    } else {
      setItemQuantities(resetQuantities);
    }
  };

  const handleOrderClick = () => {
    if (calculateTotal() === "0.00") {
      alert("There is nothing in your cart.");
    } else {
      setShowFormPopup(true);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleOrderConfirm = () => {
    const orderSummary = menuItems
      .filter(item => itemQuantities[item.id] > 0)
      // Trick for joining information together as a string
      .map(item => `${itemQuantities[item.id]} ${item.title}`)
      .join(' ');
    
    setOrderSummary(orderSummary);
    setShowFormPopup(false);
    setShowConfirmationPopup(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmationPopup(false);
    const resetQuantities = {};
    menuItems.forEach(item => {
      resetQuantities[item.id] = 0;
    });
    setItemQuantities(resetQuantities);
  };

  return (
    <>
      <div>
        <div className="menu">
          <MenuHeader />
          <div className="menu-grid">
            {menuItems.map(item => (
              <MenuItem
                  key={item.id}
                  id={item.id} // for tracking cart instance variables
                  title={item.title}
                  description={item.description}
                  imageName={item.imageName}
                  price={item.price}
                  quantity={itemQuantities[item.id]}
                  onQuantityChange={updateQuantity}
              />
            ))}
          </div>

          <div className="cart-summary">
            <h2>Cart Total: ${calculateTotal()}</h2>
              <button className="order-button" onClick={handleOrderClick}>Order</button>
              <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>
          </div>

        </div>
      </div>

      {showFormPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Complete your order</h3>
            
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <button className="ok-button" onClick={handleOrderConfirm}>OK</button>
          </div>
        </div>
      )}

      {showConfirmationPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Order placed!</h3>
            <p>{orderSummary}</p>
            <button className="ok-button" onClick={handleConfirmationClose}>OK</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
