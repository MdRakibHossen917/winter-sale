import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FlashSaleProductCard from '../components/FlashSaleProductCard';
import { products } from '../utils/products';

const Home = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  
  const featuredProducts = products.slice(0, 4);
  
  // Flash Winter Sale products with original prices
  const flashSaleProducts = [
    { product: products.find(p => p.name === 'Blueberry'), originalPrice: 1000 },
    { product: products.find(p => p.name === 'Desiccated Coconut'), originalPrice: 500 },
    { product: products.find(p => p.name === 'Walnuts'), originalPrice: 1200 },
    { product: products.find(p => p.name === 'Rambutan'), originalPrice: 700 }
  ].filter(item => item.product);

  const faqs = [
    {
      id: 1,
      question: 'Are your products 100% pure?',
      answer: 'Yes, all our products are 100% pure and natural. We source directly from farmers and do not use any chemicals or preservatives.'
    },
    {
      id: 2,
      question: 'What is the delivery charge?',
      answer: 'Delivery charge within Dhaka city is ৳50-100 (depending on distance). Outside Dhaka, delivery charge is ৳100-200. Free delivery within Dhaka for orders above ৳500.'
    },
    {
      id: 3,
      question: 'What are the payment methods?',
      answer: 'We accept payments through SSL Commerce and bKash. You can pay using card, mobile banking, or bKash.'
    },
    {
      id: 4,
      question: 'How long does delivery take?',
      answer: 'Within Dhaka city, delivery usually takes 1-2 days. Outside Dhaka, it may take 3-5 days. We will contact you after you place an order.'
    },
    {
      id: 5,
      question: 'Can I return products?',
      answer: 'Yes, if there is any issue with the product or if the product arrives damaged, you can return it within 7 days. Please contact our customer service.'
    },
    {
      id: 6,
      question: 'Can I see the expiry date?',
      answer: 'Yes, the expiry date is mentioned on each product\'s packaging. We always supply fresh products.'
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-12 md:py-12 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <span className="text-sm font-semibold">🌾 100% Pure & Natural</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Pure Products &<br />Imported Drinks
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-primary-100 font-medium">
                Direct From Farmers & Premium Brands
              </p>
              <p className="text-lg md:text-xl mb-10 text-primary-200 max-w-2xl lg:max-w-none mx-auto lg:mx-0 leading-relaxed">
                Experience the authentic taste of Bangladesh with our premium quality products - mustard oil, pure desi ghee, fresh butter, milk, pure honey, and imported beverages.
              </p>
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold py-4 px-10 rounded-xl hover:bg-primary-50 transition-all duration-200 text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
              >
                <span>Shop Now</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block relative">
              <div className="relative">
                <img
                  src="https://i.ibb.co.com/fG4ct9RH/Gemini-Generated-Image-mko1f7mko1f7mko1.png"
                  alt="Pure Products"
                  className="w-full h-[500px] rounded-xl shadow-2xl object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-800/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Featured Products
            </h2>
            <p className="section-subtitle">
              Discover our premium collection of authentic Bangladeshi products
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Flash Winter Sale */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
        {/* Decorative snowflakes/winter elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-6xl">❄️</div>
          <div className="absolute top-32 right-20 text-5xl">❄️</div>
          <div className="absolute bottom-20 left-1/4 text-4xl">❄️</div>
          <div className="absolute bottom-32 right-1/3 text-5xl">❄️</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Winter Flash Sale
            </h2>
            <p className="text-xl text-gray-700 font-medium">
              Limited Time Offer - Don't Miss Out!
            </p>
            <p className="text-lg text-gray-600 mt-2">
              Special discounts on premium winter favorites
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {flashSaleProducts.map(({ product, originalPrice }) => (
              <div key={product.id} className="relative group">
                {/* Sale Badge */}
                <div className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg transform rotate-12 animate-bounce">
                  SALE
                </div>
                <FlashSaleProductCard 
                  product={product} 
                  originalPrice={originalPrice}
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-4 px-10 rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-200 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <span>View All Products</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Why Choose Us
            </h2>
            <p className="section-subtitle">
              We're committed to bringing you the finest quality products
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
                <span className="text-4xl">🌾</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Pure & Natural</h3>
              <p className="text-gray-600 leading-relaxed">
                Our products are 100% pure with no chemicals or preservatives. Direct from farmers to your table.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
                <span className="text-4xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Chemical-Free</h3>
              <p className="text-gray-600 leading-relaxed">
                No harmful chemicals, no artificial additives. Just pure, natural goodness in every drop.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
                <span className="text-4xl">✅</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Trusted Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Trusted by thousands of customers across Bangladesh. Quality you can rely on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                  <svg
                    className={`w-6 h-6 text-primary-600 transition-transform duration-300 flex-shrink-0 ml-4 ${
                      openFAQ === faq.id ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openFAQ === faq.id
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-5 pt-2 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Have more questions?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              <span>Contact Us</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

