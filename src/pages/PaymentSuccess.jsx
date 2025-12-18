import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tranId = searchParams.get('tran_id') || searchParams.get('payment_id');
  const status = searchParams.get('status');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Verify payment with backend
    // In production, verify the payment status with your backend
    console.log('Payment Transaction ID:', tranId);
    console.log('Payment Status:', status);
  }, [tranId, status]);

  // Auto-redirect to My Orders after countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Redirect to My Orders
      navigate('/my-orders');
    }
  }, [countdown, navigate]);

  return (
    <>
      <Helmet>
        <title>Payment Successful - PureTasteBD</title>
        <meta name="description" content="Your payment has been processed successfully. Thank you for your order!" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen py-12 bg-gradient-to-b from-gray-50 to-white flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Payment Successful!</h1>
          <p className="text-xl text-gray-600 mb-6">
            Thank you for your order. Your payment has been processed successfully.
          </p>
          
          {tranId && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Transaction ID:</p>
              <p className="font-mono font-semibold text-gray-900">{tranId}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <p className="text-gray-600">
              You will receive an order confirmation email shortly.
            </p>
            {countdown > 0 && (
              <p className="text-sm text-gray-500">
                Redirecting to My Orders in {countdown} second{countdown !== 1 ? 's' : ''}...
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/my-orders" className="btn-primary">
                View My Orders
              </Link>
              <Link to="/" className="btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PaymentSuccess;

