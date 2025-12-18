import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { formatPrice } from '../utils/products';

const Cart = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const total = getTotalPrice();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 text-lg">Start adding some products to your cart!</p>
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart - PureTasteBD</title>
        <meta name="description" content="Review your shopping cart items. Proceed to checkout to complete your order." />
        <meta name="keywords" content="shopping cart, cart, checkout, order, PureTasteBD" />
      </Helmet>
      <div className="min-h-screen py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600">Review your items before checkout</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Cart Items */}
          <div className="divide-y divide-gray-100">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 border-t-2 border-gray-200">
            <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-xl shadow-sm">
              <span className="text-2xl font-bold text-gray-900">Total:</span>
              <span className="text-4xl font-bold text-primary-600">
                {formatPrice(total)}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={clearCart}
                className="btn-secondary flex-1 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Cart
              </button>
              <Link
                to="/checkout"
                className="btn-primary flex-1 text-center flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Cart;

