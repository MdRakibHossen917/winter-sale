import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getProductById, formatPrice } from '../utils/products';
import { useCart } from '../context/CartContext';
import NotFound from './NotFound';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <NotFound />;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-primary-600 hover:text-primary-800 font-semibold flex items-center gap-2 group transition-colors"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-12">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto rounded-xl object-cover shadow-lg"
                />
                {product.inStock && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                    In Stock
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-12">
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
                  {product.name}
                </h1>
                <p className="text-2xl text-primary-600 font-medium mb-6">
                  {product.nameBn}
                </p>
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-4xl font-bold text-primary-600">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-gray-500 line-through text-xl">
                    {formatPrice(product.price * 1.2)}
                  </span>
                </div>
              </div>

              <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Description</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {product.description}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {product.descriptionBn}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-3 text-gray-900">
                  Quantity
                </label>
                <div className="flex items-center border-2 border-gray-200 rounded-xl w-fit overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-5 py-3 hover:bg-primary-50 transition-colors font-bold text-gray-700 hover:text-primary-600"
                  >
                    −
                  </button>
                  <span className="px-8 py-3 border-x-2 border-gray-200 min-w-[5rem] text-center font-bold text-lg bg-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-5 py-3 hover:bg-primary-50 transition-colors font-bold text-gray-700 hover:text-primary-600"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="mb-6 p-6 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl border-2 border-primary-200">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total:</span>
                  <span className="text-3xl font-bold text-primary-600">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

