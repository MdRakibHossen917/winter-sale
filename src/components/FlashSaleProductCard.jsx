import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/products';

const FlashSaleProductCard = ({ product, originalPrice, discountPercent = 20 }) => {
  const { addToCart } = useCart();
  
  // Calculate savings
  const savings = originalPrice - product.price;
  const discount = discountPercent || Math.round((savings / originalPrice) * 100);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <Link to={`/product/${product.id}`} className="card block group bg-white">
      <div className="relative overflow-hidden bg-gray-100">
        {/* Stock Status at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-3">
          {product.inStock ? (
            <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg inline-block">
              ✓ In Stock
            </span>
          ) : (
            <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg inline-block">
              ✗ Out of Stock
            </span>
          )}
        </div>
        
        {/* Savings Badge on Image */}
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-xl">
          Save {formatPrice(savings)}
        </div>
        
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-primary-600 font-medium text-sm">{product.nameBn}</p>
        </div>
        <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            {/* Original Price (Crossed) */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                -{discount}%
              </span>
            </div>
            {/* Current Price */}
            <span className="text-3xl font-bold text-red-600">
              {formatPrice(product.price)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="btn-primary text-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default FlashSaleProductCard;

