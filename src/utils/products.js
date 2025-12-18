// Product data
export const products = [
  {
    id: 1,
    name: 'Shorisher Tel',
    nameBn: 'সরিষার তেল',
    description: 'Pure, cold-pressed mustard oil directly from farmers. Rich in omega-3 fatty acids and antioxidants. Perfect for cooking traditional Bangladeshi dishes.',
    descriptionBn: 'কৃষকের কাছ থেকে সরাসরি আসা খাঁটি, কোল্ড প্রেস সরিষার তেল। ওমেগা-৩ ফ্যাটি অ্যাসিড এবং অ্যান্টিঅক্সিডেন্টে সমৃদ্ধ।',
    price: 450,
    image: 'https://i.ibb.co.com/cck7s5yQ/close-up-overhead-view-two-oil-bottles-cutting-board.jpg',
    category: 'oil',
    inStock: true
  },
  {
    id: 2,
    name: 'Ghee',
    nameBn: 'ঘি',
    description: 'Pure Desi Ghee made from fresh cow milk. Traditional method, no preservatives. Rich, aromatic, and perfect for enhancing the flavor of your meals.',
    descriptionBn: 'তাজা গরুর দুধ থেকে তৈরি খাঁটি দেশি ঘি। ঐতিহ্যবাহী পদ্ধতি, কোন প্রিজারভেটিভ নেই। সমৃদ্ধ, সুগন্ধযুক্ত এবং আপনার খাবারের স্বাদ বাড়ানোর জন্য নিখুঁত।',
    price: 900,
    image: 'https://i.ibb.co.com/HDQNsbmG/ghee-clarified-butter-jar-wooden-table-ai-generative.jpg',
    category: 'ghee',
    inStock: true
  },
  {
    id: 3,
    name: 'Butter',
    nameBn: 'মাখন',
    description: 'Fresh, creamy butter made from pure cow milk. Rich in vitamins A, D, and E. Perfect for spreading on bread, cooking, and baking. No additives or preservatives.',
    descriptionBn: 'খাঁটি গরুর দুধ থেকে তৈরি তাজা, ক্রিমি মাখন। ভিটামিন এ, ডি, এবং ই সমৃদ্ধ। রুটি, রান্না এবং বেকিংয়ের জন্য নিখুঁত। কোন অ্যাডিটিভ বা প্রিজারভেটিভ নেই।',
    price: 350,
    image: 'https://i.ibb.co.com/Myv2dbzZ/side-view-butter-with-white-bread-almond-walnut-board.jpg',
    category: 'dairy',
    inStock: true
  },
  {
    id: 4,
    name: 'Milk',
    nameBn: 'দুধ',
    description: 'Fresh, pure cow milk directly from local farms. Rich in calcium, protein, and essential nutrients. Pasteurized and safe for consumption. Perfect for daily nutrition.',
    descriptionBn: 'স্থানীয় খামার থেকে সরাসরি আসা তাজা, খাঁটি গরুর দুধ। ক্যালসিয়াম, প্রোটিন এবং প্রয়োজনীয় পুষ্টিতে সমৃদ্ধ। পাস্তুরাইজড এবং খাওয়ার জন্য নিরাপদ। দৈনন্দিন পুষ্টির জন্য নিখুঁত।',
    price: 80,
    image: 'https://i.ibb.co.com/FkPXgBNR/fresh-milk-mug-jug-wooden-table.jpg',
    category: 'dairy',
    inStock: true
  },
  {
    id: 5,
    name: 'Pure Honey',
    nameBn: 'খাঁটি মধু',
    description: '100% pure, raw honey collected from natural beehives. Rich in antioxidants, enzymes, and natural sugars. No additives or processing. Perfect for health benefits and natural sweetness.',
    descriptionBn: 'প্রাকৃতিক মৌচাক থেকে সংগ্রহ করা ১০০% খাঁটি, কাঁচা মধু। অ্যান্টিঅক্সিডেন্ট, এনজাইম এবং প্রাকৃতিক চিনিতে সমৃদ্ধ। কোন অ্যাডিটিভ বা প্রক্রিয়াজাতকরণ নেই। স্বাস্থ্য উপকারিতা এবং প্রাকৃতিক মিষ্টতার জন্য নিখুঁত।',
    price: 600,
    image: 'https://i.ibb.co.com/zT4RkKKM/front-view-honey-dipper-dripping-honey-honeycomb.jpg',
    category: 'honey',
    inStock: true
  },
  {
    id: 6,
    name: 'Imported Drinks',
    nameBn: 'আমদানি করা পানীয়',
    description: 'Premium imported beverages from international brands. Wide variety of soft drinks, juices, and energy drinks. Fresh stock, authentic products. Perfect for refreshment and special occasions.',
    descriptionBn: 'আন্তর্জাতিক ব্র্যান্ড থেকে প্রিমিয়াম আমদানি করা পানীয়। সফট ড্রিংক, জুস এবং এনার্জি ড্রিংকের বিস্তৃত সংগ্রহ। তাজা স্টক, খাঁটি পণ্য। তৃপ্তি এবং বিশেষ অনুষ্ঠানের জন্য নিখুঁত।',
    price: 150,
    image: 'https://i.ibb.co.com/bgkDsHYw/supermarket-banner-with-various-items.jpg',
    category: 'beverages',
    inStock: true
  },
  {
    id: 7,
    name: 'Almonds',
    nameBn: 'বাদাম',
    description: 'Premium quality almonds, rich in protein and healthy fats. Perfect for snacking and cooking. Natural, unsalted, and nutritious.',
    descriptionBn: 'প্রিমিয়াম কোয়ালিটি বাদাম, প্রোটিন এবং স্বাস্থ্যকর চর্বিতে সমৃদ্ধ। স্ন্যাকিং এবং রান্নার জন্য নিখুঁত। প্রাকৃতিক, লবণহীন এবং পুষ্টিকর।',
    price: 950,
    image: 'https://i.ibb.co.com/hRGk3frK/bowl-with-almond-wooden-table.jpg',
    category: 'Nuts',
    inStock: true
  },
  {
    id: 8,
    name: 'Walnuts',
    nameBn: 'আখরোট',
    description: 'Premium walnuts, packed with omega-3 fatty acids. Great for brain health and heart health. Natural and unsalted.',
    descriptionBn: 'প্রিমিয়াম আখরোট, ওমেগা-৩ ফ্যাটি অ্যাসিডে সমৃদ্ধ। মস্তিষ্কের স্বাস্থ্য এবং হৃদয়ের স্বাস্থ্যের জন্য দুর্দান্ত। প্রাকৃতিক এবং লবণহীন।',
    price: 900,
    image: 'https://i.ibb.co.com/LdJKTXFG/top-view-walnuts-baskets-wooden-horizontal.jpg',
    category: 'Nuts',
    inStock: true
  },
  {
    id: 9,
    name: 'Coconut Oil',
    nameBn: 'নারিকেল তেল',
    description: 'Pure virgin coconut oil, cold pressed. Rich in medium-chain fatty acids. Perfect for cooking, hair care, and skin care.',
    descriptionBn: 'খাঁটি ভার্জিন নারিকেল তেল, কোল্ড প্রেসড। মাঝারি-শৃঙ্খল ফ্যাটি অ্যাসিডে সমৃদ্ধ। রান্না, চুলের যত্ন এবং ত্বকের যত্নের জন্য নিখুঁত।',
    price: 450,
    image: 'https://i.ibb.co.com/XkD0h0ZN/jug-coconut-oil-whit-coconut-put-dark-background.jpg',
    category: 'Coconuts',
    inStock: true
  },
  {
    id: 10,
    name: 'Desiccated Coconut',
    nameBn: 'শুকনো নারিকেল',
    description: 'Premium desiccated coconut, perfect for cooking and baking. Rich in fiber and healthy fats. Natural and unsweetened.',
    descriptionBn: 'প্রিমিয়াম শুকনো নারিকেল, রান্না এবং বেকিংয়ের জন্য নিখুঁত। ফাইবার এবং স্বাস্থ্যকর চর্বিতে সমৃদ্ধ। প্রাকৃতিক এবং চিনি ছাড়া।',
    price: 350,
    image: 'https://i.ibb.co.com/LTmbXdM/whole-coconut-various-pieces-coconut.jpg',
    category: 'Coconuts',
    inStock: true
  },
  {
    id: 11,
    name: 'Blueberry',
    nameBn: 'ব্লুবেরি',
    description: 'Fresh, juicy blueberries packed with antioxidants and vitamins. Perfect for smoothies, desserts, and healthy snacking. Natural and delicious.',
    descriptionBn: 'তাজা, রসালো ব্লুবেরি অ্যান্টিঅক্সিডেন্ট এবং ভিটামিনে সমৃদ্ধ। স্মুদি, মিষ্টি এবং স্বাস্থ্যকর স্ন্যাকিংয়ের জন্য নিখুঁত। প্রাকৃতিক এবং সুস্বাদু।',
    price: 800,
    image: 'https://i.ibb.co.com/PGS1HD8k/closeup-vertical-shot-blueberries-with-water-droplets-leaves.jpg',
    category: 'Fruits',
    inStock: true
  },
  {
    id: 12,
    name: 'Rambutan',
    nameBn: 'রামবুটান',
    description: 'Fresh, exotic rambutan fruit with sweet and juicy flesh. Rich in vitamin C and antioxidants. Perfect tropical treat.',
    descriptionBn: 'তাজা, বিদেশি রামবুটান ফল মিষ্টি এবং রসালো শাঁস সহ। ভিটামিন সি এবং অ্যান্টিঅক্সিডেন্টে সমৃদ্ধ। নিখুঁত গ্রীষ্মমণ্ডলীয় আচরণ।',
    price: 500,
    image: 'https://i.ibb.co.com/RpWjgJNs/rambutan.jpg',
    category: 'Fruits',
    inStock: true
  }
];

// Get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

// Format price
export const formatPrice = (price) => {
  return `৳${price.toLocaleString('en-BD')}`;
};

