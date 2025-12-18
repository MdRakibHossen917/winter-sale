const Marquee = () => {
  const offers = [
    "🎉 30% Discount on All Products - Limited Time Offer!",
    "🚚 Free Delivery on Orders Above ৳500",
    "🔥 Flash Sale: Buy 2 Get 1 Free on Selected Items",
    "💝 Special Winter Sale - Up to 50% Off",
    "⭐ New Customer? Get 20% Extra Discount on First Order"
  ];

  return (
    <div className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white py-2 overflow-hidden relative">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* First set of offers */}
        {offers.map((offer, index) => (
          <span key={`offer-1-${index}`} className="mx-8 text-sm md:text-base font-semibold">
            {offer}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {offers.map((offer, index) => (
          <span key={`offer-2-${index}`} className="mx-8 text-sm md:text-base font-semibold">
            {offer}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;

