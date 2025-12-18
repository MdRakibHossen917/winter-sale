import { useEffect, useState } from 'react';

const FirebaseConfigWarning = () => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Hide warning in production
    if (import.meta.env.PROD) {
      setShowWarning(false);
      return;
    }

    // Check if Firebase is properly configured (only in development)
    const checkConfig = () => {
      // Check new environment variable names (VITE_apiKey, etc.)
      const apiKey = import.meta.env.VITE_apiKey || import.meta.env.VITE_FIREBASE_API_KEY;
      const projectId = import.meta.env.VITE_projectId || import.meta.env.VITE_FIREBASE_PROJECT_ID;
      
      // Check if using environment variables
      const hasValidEnvVars = apiKey && 
        apiKey !== 'YOUR_API_KEY' && 
        apiKey.length > 20 && 
        apiKey.startsWith('AIza') && 
        projectId && 
        projectId !== 'YOUR_PROJECT_ID';
      
      if (hasValidEnvVars) {
        setShowWarning(false);
        return;
      }
      
      // Also check the firebase.js config (in case using direct config)
      setTimeout(() => {
        // Check if config is still using placeholders
        if (!apiKey || apiKey === 'YOUR_API_KEY' || !projectId || projectId === 'YOUR_PROJECT_ID') {
          setShowWarning(true);
        }
      }, 2000);
    };

    checkConfig();
    
    // Re-check every 5 seconds in case user updates config
    const interval = setInterval(checkConfig, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 shadow-xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex gap-2 flex-shrink-0">
            <a
              href="https://console.firebase.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap text-sm"
            >
              Firebase Console
            </a>
            <button
              onClick={() => setShowWarning(false)}
              className="bg-red-800 hover:bg-red-900 px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
            >
              ✕ Close
            </button>
          </div>
          <div className="flex-1 text-right">
            <p className="font-bold text-lg mb-2 flex items-center gap-2 justify-end">
              <span>⚠️</span>
              <span>Firebase Configuration Required</span>
            </p>
            <p className="text-sm mb-2 text-right">
              Login করতে Firebase configure করতে হবে। <strong>START_HERE.md</strong> file দেখুন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseConfigWarning;

