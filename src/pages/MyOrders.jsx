import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/products';
import { ordersAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const { user, currentUser } = useAuth();
  const authenticatedUser = user || currentUser;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authenticatedUser) {
      setLoading(false);
      return;
    }

    fetchOrders();
  }, [authenticatedUser]);

  const fetchOrders = async () => {
    if (!authenticatedUser?.email) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const email = encodeURIComponent(authenticatedUser.email);
      
      console.log('📧 Fetching orders for email:', authenticatedUser.email);
      console.log('🔗 API URL:', `${API_BASE_URL}/orders/by-email/${email}`);
      
      // Get orders by user email (for Firebase users)
      const response = await fetch(
        `${API_BASE_URL}/orders/by-email/${email}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Response error:', errorData);
        throw new Error(errorData.message || `Failed to fetch orders: ${response.status}`);
      }

      const data = await response.json();
      console.log('📦 Orders data received:', data);
      
      if (data.success && data.orders) {
        setOrders(data.orders);
        console.log('✅ Orders fetched successfully:', data.orders.length);
        if (data.orders.length === 0) {
          console.log('ℹ️ No orders found for this user');
        }
      } else {
        console.warn('⚠️ Unexpected response format:', data);
        setOrders([]);
      }
    } catch (err) {
      console.error('❌ Error fetching orders:', err);
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        email: authenticatedUser.email
      });
      setError(err.message);
      
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        toast.error('Backend server is not running. Please start the server on port 5000.');
      } else {
        toast.error(`Failed to load orders: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!authenticatedUser) {
    return (
      <div className="min-h-screen py-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to login to view your orders.</p>
          <Link
            to="/login"
            className="btn-primary inline-block"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen py-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Orders</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchOrders}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">
            Welcome, {authenticatedUser.displayName || authenticatedUser.email}
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <svg
              className="w-24 h-24 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Link
              to="/products"
              className="btn-primary inline-block"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id || order.id}
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Order #{order._id?.toString().slice(-8) || order.id || 'N/A'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Placed on:{' '}
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                        order.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'shipped'
                          ? 'bg-purple-100 text-purple-800'
                          : order.status === 'delivered'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status?.toUpperCase() || 'PENDING'}
                    </span>
                    <p className="text-2xl font-bold text-primary-600 mt-2">
                      {formatPrice(order.totalAmount)}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Items:</h4>
                  <div className="space-y-2">
                    {order.items?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{item.name}</p>
                            {item.nameBn && (
                              <p className="text-sm text-gray-600">{item.nameBn}</p>
                            )}
                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity} × {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                        <p className="font-bold text-primary-600">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Delivery Address:</p>
                      <p className="font-semibold text-gray-900">
                        {order.customerAddress}
                      </p>
                      <p className="text-gray-600">
                        {order.city}, {order.postalCode}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Payment Method:</p>
                      <p className="font-semibold text-gray-900 capitalize">
                        {order.paymentMethod || 'N/A'}
                      </p>
                      {order.transactionId && (
                        <p className="text-xs text-gray-500 mt-1">
                          Transaction: {order.transactionId}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;

