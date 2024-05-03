import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCreatePage() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Product Name:', productName);
    console.log('Description:', description);
    console.log('Price:', price);
    console.log('Category:', productCategory);
    console.log('HSN Code:', hsnCode);
    console.log('Quantity:', quantity);
    console.log('Weight:', weight);

    // Clear form fields after submission
    setShowAlert(true);
    setProductName('');
    setDescription('');
    setPrice('');
    setProductCategory('');
    setHsnCode('');
    setQuantity('');
    setWeight('');
  };

  return (
    <div className="product-create-page" style={{ padding: '20px' }}>
      <header className="page-header" style={{ marginBottom: '20px' }}>
        <h1>Create Product</h1>
      </header>
      <main className="form-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="productCategory">Product Category:</label>
            <input
              type="text"
              id="productCategory"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="hsnCode">HSN Code:</label>
            <input
              type="text"
              id="hsnCode"
              value={hsnCode}
              onChange={(e) => setHsnCode(e.target.value)}
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="weight">Weight:</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '14px 20px',
              margin: '8px 0',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              fontSize: '16px',
            }}
          >
            Submit
          </button>
        </form>
      </main>
      {showAlert && (
        <div className="alert" style={{ backgroundColor: '#4caf50', color: 'white', padding: '20px', textAlign: 'center' }}>
          <p>Product added successfully!</p>
            navigate('/dashboard');
        </div>
      )}
    </div>
  );
}

export default ProductCreatePage;
