import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  // Store similar products by product ID
  const [productData, setProductData] = useState({});

  // Set similar products for a particular product ID
  const setSimilarProducts = (productId, newProducts) => {
    setProductData((prevData) => ({
      ...prevData,
      [productId]: [...(prevData[productId] || []), ...newProducts], // Append new products
    }));
  };
  

  return (
    <ProductContext.Provider value={{ productData, setSimilarProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
