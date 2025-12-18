import { Toaster } from 'react-hot-toast';
import AuthProvider from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Router from './routes/Router';
import ServerStatus from './components/ServerStatus';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ServerStatus />
        <Router />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
