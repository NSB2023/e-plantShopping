import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  
const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: "$18"
        },
        {
          name: "Aloe Vera",
          image: "https://cdn.pixabay.com/photo/2017/01/20/15/06/aloe-vera-1994433_1280.jpg",
          description: "Improves indoor air quality.",
          cost: "$10"
        },
        {
          name: "Bamboo Palm",
          image: "https://cdn.pixabay.com/photo/2018/02/13/10/15/palm-3152670_1280.jpg",
          description: "Removes toxins from the air.",
          cost: "$20"
        },
        {
          name: "Areca Palm",
          image: "https://cdn.pixabay.com/photo/2016/11/29/05/08/palm-1867671_1280.jpg",
          description: "Natural humidifier.",
          cost: "$22"
        }
      ]
    },
    {
      category: "Indoor Decorative Plants",
      plants: [
        {
          name: "Fiddle Leaf Fig",
          image: "https://cdn.pixabay.com/photo/2018/01/19/17/07/fiddle-leaf-fig-3097163_1280.jpg",
          description: "Large glossy leaves for decor.",
          cost: "$25"
        },
        {
          name: "Monstera",
          image: "https://cdn.pixabay.com/photo/2020/06/09/06/18/monstera-5272598_1280.jpg",
          description: "Stylish tropical plant.",
          cost: "$30"
        },
        {
          name: "ZZ Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/24/19/49/zamioculcas-5945506_1280.jpg",
          description: "Low maintenance indoor plant.",
          cost: "$20"
        },
        {
          name: "Rubber Plant",
          image: "https://cdn.pixabay.com/photo/2020/04/19/08/15/rubber-plant-5060070_1280.jpg",
          description: "Bold decorative foliage.",
          cost: "$28"
        },
        {
          name: "Calathea",
          image: "https://cdn.pixabay.com/photo/2019/09/21/07/14/calathea-4492760_1280.jpg",
          description: "Beautiful patterned leaves.",
          cost: "$24"
        },
        {
          name: "Pothos",
          image: "https://cdn.pixabay.com/photo/2017/08/07/19/42/pothos-2609152_1280.jpg",
          description: "Easy to grow vine plant.",
          cost: "$14"
        }
      ]
    }
  ];
  

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart(prev => ({
      ...prev,
      [product.name]: true
    }));
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div>
      <div className="navbar">
        <h2>Paradise Nursery</h2>
        <button onClick={() => setShowCart(true)}>
          🛒 {calculateTotalQuantity()}
        </button>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1>{category.category}</h1>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-cost">{plant.cost}</div>
                    <button
                      className="product-button"
                      disabled={addedToCart[plant.name]}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
