import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const PaymentFail = () => {
  const [searchParams] = useSearchParams();
  const errorMsg = searchParams.get('error') || 'Payment was unsuccessful';

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-gray-50 to-white flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Payment Failed</h1>
          <p className="text-xl text-gray-600 mb-6">
            {errorMsg}
          </p>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              Please try again or contact support if the problem persists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cart" className="btn-primary">
                Try Again
              </Link>
              <Link to="/" className="btn-secondary">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;

