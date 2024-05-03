import React, { useState, useEffect } from 'react';
import './ProductSearchPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

function ProductSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { user }= useAuth0();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/list_products?jeweller_id=${user.nickname}`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterProducts(e.target.value);
  };

  const filterProducts = (query) => {
    const filtered = products.filter(product =>
      product.product_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="product-list-container">
      <h1>Products</h1>
      <div className="search-container"> 
        <input 
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by product name"
        />
      </div>
      <div className="add-product-create-button-container">
        <img src='' />
        <Link to="/product" className="add-product-create-button">Create Product</Link>
      </div>  

      <table>
        <thead>
          <tr>
            <th>Product Code</th>
            <th>Barcode</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Weight</th>
            <th>HSN Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.product_id}>
              <td>{product.product_code}</td>
              <td>{product.barcode}</td>
              <td>{product.product_name}</td>
              <td>{product.product_description}</td>
              <td>{product.product_category}</td>
              <td>{product.product_quantity}</td>
              <td>{product.product_weight}</td>
              <td>{product.hsn_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductSearchPage;
