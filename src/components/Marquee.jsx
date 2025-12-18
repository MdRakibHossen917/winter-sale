import { FaGift, FaTruck, FaFire, FaSnowflake, FaStar } from 'react-icons/fa';

const Marquee = () => {
  const offers = [
    { icon: <FaGift />, text: "30% Discount on All Products - Limited Time Offer!" },
    { icon: <FaTruck />, text: "Free Delivery on Orders Above ৳500" },
    { icon: <FaFire />, text: "Flash Sale: Buy 2 Get 1 Free on Selected Items" },
    { icon: <FaSnowflake />, text: "Special Winter Sale - Up to 50% Off" },
    { icon: <FaStar />, text: "New Customer? Get 20% Extra Discount on First Order" }
  ];

  return (
    <div className="bg-gradient-to-r from-primary-700 via-primary-800 to-primary-900 text-white py-2 overflow-hidden relative">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* First set of offers */}
        {offers.map((offer, index) => (
          <span key={`offer-1-${index}`} className="mx-8 text-sm md:text-base font-semibold flex items-center gap-2">
            <span className="text-lg">{offer.icon}</span>
            {offer.text}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {offers.map((offer, index) => (
          <span key={`offer-2-${index}`} className="mx-8 text-sm md:text-base font-semibold flex items-center gap-2">
            <span className="text-lg">{offer.icon}</span>
            {offer.text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;

