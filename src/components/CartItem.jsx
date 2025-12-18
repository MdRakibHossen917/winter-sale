import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/products';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 hover:bg-gray-50 transition-colors">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-28 h-28 object-cover rounded-xl shadow-md"
        />
        <div className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
          {item.quantity}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-xl text-gray-900 mb-1">{item.name}</h3>
        <p className="text-primary-600 text-sm font-medium mb-2">{item.nameBn}</p>
        <p className="text-gray-600 font-semibold">
          {formatPrice(item.price)} <span className="text-gray-400 text-sm font-normal">each</span>
        </p>
      </div>
      <div className="flex items-center gap-6 w-full sm:w-auto">
        <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-4 py-2 hover:bg-primary-50 transition-colors font-bold text-gray-700 hover:text-primary-600"
          >
            −
          </button>
          <span className="px-6 py-2 border-x-2 border-gray-200 min-w-[4rem] text-center font-bold bg-white">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-4 py-2 hover:bg-primary-50 transition-colors font-bold text-gray-700 hover:text-primary-600"
          >
            +
          </button>
        </div>
        <div className="text-right sm:text-left">
          <p className="font-bold text-2xl text-primary-600 mb-2">
            {formatPrice(item.price * item.quantity)}
          </p>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-600 hover:text-red-800 text-sm font-semibold flex items-center gap-1 group transition-colors"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

