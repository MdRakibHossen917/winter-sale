// Server Status Checker Component
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ServerStatus = () => {
  const [serverStatus, setServerStatus] = useState('checking');
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const checkServer = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_BASE_URL}/health`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Add timeout
          signal: AbortSignal.timeout(3000)
        });

        if (response.ok) {
          setServerStatus('online');
          setShowWarning(false);
        } else {
          setServerStatus('offline');
          setShowWarning(true);
        }
      } catch (error) {
        // Network error or timeout
        setServerStatus('offline');
        setShowWarning(true);
      }
    };

    // Check immediately
    checkServer();

    // Check every 10 seconds
    const interval = setInterval(checkServer, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!showWarning || serverStatus === 'online') {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="font-bold text-lg mb-1">⚠️ Backend Server Offline</p>
          <p className="text-sm">
            সার্ভার চালু নেই। Login/Registration কাজ করবে না। / Server is not running. Login/Registration will not work.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              toast('💡 সার্ভার চালু করুন: cd server && npm run dev', {
                duration: 6000,
                icon: '💡',
              });
            }}
            className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Instructions
          </button>
          <button
            onClick={() => setShowWarning(false)}
            className="bg-red-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-800 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerStatus;

