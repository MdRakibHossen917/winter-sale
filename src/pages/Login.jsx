import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import SocialLogin from '../components/SocialLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { SignInUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('সব ফিল্ড পূরণ করুন / Please fill in all fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('সঠিক ইমেইল দিন / Please enter a valid email');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await SignInUser(email, password);
      console.log('✅ Login successful:', userCredential.user);
      toast.success('লগইন সফল! / Login successful!');
      
      // Small delay to show success message
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      console.error('❌ Login error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Handle Firebase errors
      let errorMessage = 'লগইন ব্যর্থ হয়েছে / Login failed';
      
      if (error.code) {
        switch (error.code) {
          case 'auth/not-initialized':
            errorMessage = 'Firebase configure করা হয়নি। .env.local file check করুন / Firebase not configured. Please check .env.local file';
            toast.error(errorMessage, { duration: 6000 });
            setTimeout(() => {
              toast('💡 .env.local file-এ Firebase config আছে কিনা check করুন', {
                duration: 8000,
                icon: '💡',
              });
            }, 2000);
            return;
          case 'auth/invalid-email':
            errorMessage = 'ভুল ইমেইল / Invalid email address';
            break;
          case 'auth/user-disabled':
            errorMessage = 'এই অ্যাকাউন্ট নিষ্ক্রিয় / This account has been disabled';
            break;
          case 'auth/user-not-found':
            errorMessage = 'এই ইমেইলে কোনো অ্যাকাউন্ট নেই। Register করুন / No account found. Please register';
            break;
          case 'auth/wrong-password':
            errorMessage = 'ভুল পাসওয়ার্ড / Incorrect password';
            break;
          case 'auth/invalid-credential':
            errorMessage = 'ভুল ইমেইল বা পাসওয়ার্ড / Invalid email or password';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'অনেকবার চেষ্টা করা হয়েছে, পরে আবার চেষ্টা করুন / Too many attempts, please try again later';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'নেটওয়ার্ক সমস্যা, ইন্টারনেট চেক করুন / Network error, please check your internet';
            break;
          default:
            errorMessage = error.message || 'লগইন ব্যর্থ হয়েছে / Login failed';
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      console.log('✅ Google login successful:', result.user);
      toast.success('গুগল লগইন সফল! / Google login successful!');
      
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      console.error('❌ Google login error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      let errorMessage = 'গুগল লগইন ব্যর্থ / Google login failed';
      let helpMessage = '';
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'পপআপ বন্ধ করা হয়েছে / Popup was closed';
        helpMessage = 'আবার চেষ্টা করুন এবং popup বন্ধ করবেন না / Please try again and don\'t close the popup';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'পপআপ ব্লক করা হয়েছে / Popup blocked';
        helpMessage = 'Browser settings-এ popup allow করুন / Please allow popups in browser settings';
      } else if (error.code === 'auth/unauthorized-domain') {
        errorMessage = 'এই ডোমেইন অনুমোদিত নয় / Domain not authorized';
        helpMessage = 'Firebase Console-এ localhost add করুন / Add localhost in Firebase Console → Authentication → Settings → Authorized domains';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Google Sign-In enable করা হয়নি / Google Sign-In not enabled';
        helpMessage = 'Firebase Console → Authentication → Sign-in method → Google → Enable করুন / Enable Google in Firebase Console';
      } else if (error.code === 'auth/not-initialized') {
        errorMessage = 'Firebase configure করা হয়নি / Firebase not configured';
        helpMessage = '.env.local file check করুন / Please check .env.local file';
      } else {
        errorMessage = error.message || 'গুগল লগইন ব্যর্থ / Google login failed';
        helpMessage = 'Browser console check করুন (F12) / Please check browser console (F12)';
      }
      
      toast.error(errorMessage, { duration: 5000 });
      
      if (helpMessage) {
        setTimeout(() => {
          toast(helpMessage, {
            duration: 8000,
            icon: '💡',
          });
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - PureTasteBD</title>
        <meta name="description" content="Login to your PureTasteBD account to access your orders and enjoy a seamless shopping experience." />
        <meta name="keywords" content="login, sign in, PureTasteBD, account" />
      </Helmet>
      <div className="min-h-screen py-12 bg-gray-50 flex items-center">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2 text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <SocialLogin />

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-800 font-semibold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;

