import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
  const [editingOrder, setEditingOrder] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

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

  const handleEdit = (order) => {
    setEditingOrder(order);
    setEditFormData({
      customerName: order.customerName || '',
      customerPhone: order.customerPhone || '',
      customerAddress: order.customerAddress || '',
      city: order.city || '',
      postalCode: order.postalCode || '',
      userEmail: authenticatedUser?.email || ''
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingOrder) return;

    try {
      toast.loading('Updating order...', { id: 'update-order' });
      
      const updateData = {
        ...editFormData,
        items: editingOrder.items,
        totalAmount: editingOrder.totalAmount
      };

      const response = await ordersAPI.update(editingOrder._id || editingOrder.id, updateData);
      
      if (response.success) {
        toast.success('Order updated successfully!', { id: 'update-order' });
        setEditingOrder(null);
        setEditFormData({});
        fetchOrders(); // Refresh orders
      }
    } catch (error) {
      console.error('Update order error:', error);
      toast.error(error.message || 'Failed to update order', { id: 'update-order' });
    }
  };

  const handleDelete = async (orderId) => {
    if (!showDeleteConfirm) return;

    try {
      toast.loading('Deleting order...', { id: 'delete-order' });
      
      const email = authenticatedUser?.email;
      const response = await ordersAPI.delete(orderId, email);
      
      if (response.success) {
        toast.success('Order deleted successfully!', { id: 'delete-order' });
        setShowDeleteConfirm(null);
        fetchOrders(); // Refresh orders
      }
    } catch (error) {
      console.error('Delete order error:', error);
      toast.error(error.message || 'Failed to delete order', { id: 'delete-order' });
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
    <>
      <Helmet>
        <title>My Orders - PureTasteBD</title>
        <meta name="description" content="View all your past orders and track their status." />
        <meta name="keywords" content="my orders, order history, track orders, PureTasteBD" />
      </Helmet>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
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
                  
                  {/* Edit and Delete Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleEdit(order)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(order._id || order.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Order Modal */}
        {editingOrder && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Edit Order</h2>
                  <button
                    onClick={() => {
                      setEditingOrder(null);
                      setEditFormData({});
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Customer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editFormData.customerName}
                    onChange={(e) => setEditFormData({ ...editFormData, customerName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={editFormData.customerPhone}
                    onChange={(e) => setEditFormData({ ...editFormData, customerPhone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={editFormData.customerAddress}
                    onChange={(e) => setEditFormData({ ...editFormData, customerAddress: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={editFormData.city}
                      onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={editFormData.postalCode}
                      onChange={(e) => setEditFormData({ ...editFormData, postalCode: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingOrder(null);
                      setEditFormData({});
                    }}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    Update Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Delete Order</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this order? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default MyOrders;

