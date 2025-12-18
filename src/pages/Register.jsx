import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import SocialLogin from '../components/SocialLogin';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { createUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error('সব ফিল্ড পূরণ করুন / Please fill in all fields');
      return;
    }

    if (name.trim().length < 2) {
      toast.error('নাম কমপক্ষে ২ অক্ষর হতে হবে / Name must be at least 2 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('পাসওয়ার্ড মিলছে না / Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে / Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUser(email, password, name);
      console.log('✅ Registration successful:', userCredential.user);
      toast.success('রেজিস্ট্রেশন সফল! / Registration successful!');
      
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      console.error('❌ Registration error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Handle Firebase errors
      let errorMessage = 'রেজিস্ট্রেশন ব্যর্থ / Registration failed';
      
      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'এই ইমেইল ইতিমধ্যে ব্যবহার করা হয়েছে। Login করুন / Email already in use. Please login';
            break;
          case 'auth/invalid-email':
            errorMessage = 'ভুল ইমেইল / Invalid email address';
            break;
          case 'auth/operation-not-allowed':
            errorMessage = 'এই অপারেশন অনুমোদিত নয় / Operation not allowed';
            break;
          case 'auth/weak-password':
            errorMessage = 'পাসওয়ার্ড খুব দুর্বল, কমপক্ষে ৬ অক্ষর দিন / Password too weak, minimum 6 characters';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'নেটওয়ার্ক সমস্যা, ইন্টারনেট চেক করুন / Network error, please check your internet';
            break;
          default:
            errorMessage = error.message || 'রেজিস্ট্রেশন ব্যর্থ / Registration failed';
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
      console.log('✅ Google registration successful:', result.user);
      toast.success('গুগল দিয়ে রেজিস্ট্রেশন সফল! / Google registration successful!');
      
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      console.error('❌ Google registration error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      let errorMessage = 'গুগল রেজিস্ট্রেশন ব্যর্থ / Google registration failed';
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
        errorMessage = error.message || 'গুগল রেজিস্ট্রেশন ব্যর্থ / Google registration failed';
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
        <title>Register - PureTasteBD</title>
        <meta name="description" content="Create a new account with PureTasteBD to start shopping for premium quality products." />
        <meta name="keywords" content="register, sign up, create account, PureTasteBD" />
      </Helmet>
      <div className="min-h-screen py-12 bg-gray-50 flex items-center">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Register</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Your full name"
                required
                minLength={2}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
                Email <span className="text-red-500">*</span>
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
                minLength={6}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2 text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <SocialLogin />

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-800 font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;

