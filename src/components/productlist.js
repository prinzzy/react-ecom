import React, { useState, useEffect } from "react";
import "./productlist.css";

function ProductList() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 100,
      image: "https://via.placeholder.com/200x200",
    },
    {
      id: 2,
      name: "Product 2",
      price: 150,
      image: "https://via.placeholder.com/200x200",
    },
    {
      id: 3,
      name: "Product 3",
      price: 200,
      image: "https://via.placeholder.com/200x200",
    },
    {
      id: 4,
      name: "Product 4",
      price: 250,
      image: "https://via.placeholder.com/200x200",
    },
  ]);

  return (
    <section className="product-section">
      <h2>Featured Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button>View More</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductList;
