const products = [
  {
    title: "Playstation 5 Disc Console Version - White IMPORT",
    image:
      "https://technuggets.biz/wp-content/uploads/2021/03/sony-consoles-playstation-5-kenya.jpg",
    summary: `Experience lightning-fast loading with an ultra-high-speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio, and an all-new generation of incredible PlayStation® gamess.Lightning speed 
Harness the power of a custom CPU, GPU, and SSD with Integrated I/O that rewrite the rules of what a PlayStation console can do.
    `,
    oldPrice: 15500.0,
    price: 14499.99,
    description: `Experience lightning-fast loading with an ultra-high-speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio, and an all-new generation of incredible PlayStation® gamess.Lightning speed 
Harness the power of a custom CPU, GPU, and SSD with Integrated I/O that rewrite the rules of what a PlayStation console can do.

Ultra-high-speed SSD
Maximise your play sessions with near-instant load times for installed PS5 games.

Integrated I/O
The custom integration of the PS5 consoles systems lets creators pull data from the SSD so quickly that they can design games in ways never before possible.

Stunning games
Marvel at incredible graphics and experience new PS5 features.

Ray tracing

Immerse yourself in worlds with a new level of realism as rays of light are individually simulated, creating true-to-life shadows and reflections in supported PS5 games.

4K-TV gaming
Play your favourite PS5 games on your stunning 4K TV.

Up to 120fps with 120Hz output
Enjoy smooth and fluid high-frame-rate gameplay at up to 120fps for compatible  games, with support for 120Hz output on 4K displays.

HDR technology
With an HDR TV, supported PS5 games display an unbelievably vibrant and lifelike range of colours.
8K output
PS5 consoles support 8K Output, so you can play games on your 4320p resolution display`,
    color: ["red"],
    quantity: 7,

    special: true,
    brand: "Sony",
    reviews: [
      {
        username: "Josh",
        rating: 5,
        comment: "High quality product",
        createdAt: "2024-02-02T12:20:15.839+00:00",
        uid: "65b225a5e06c48e793d87726",
      },
      {
        username: "John",
        rating: 4,
        comment: "Love the product",
        createdAt: "2022-01-22T08:20:45.839+00:00",
        uid: "65b2251de06c48e793d87722",
      },
    ],
  },
  {
    title: "Sinotec 5.1 Channel Home Theatre System HTS-518",
    image:
      "https://www.bradlows.co.za/media/catalog/product/cache/2bc2f148dc23cafaa22d929dc6e18cfe/h/t/hts_518_ecommerce_60b3.png",
    summary: "Magic TrackPad",
    oldPrice: 500,
    price: 2995875878,
    description: "Powerful tool for developers of all sprts",
    color: ["yellow", "orange"],
    quantity: 0,
    special: true,
    brand: "Apple",
    reviews: [
      {
        username: "John",
        rating: 2,
        comment:
          "Loved the look but not a good enough quality, they need to work on it really.",
        createdAt: "2019-11-16T11:20:45.839+00:00",
        uid: "65b2251de06c48e793d87722",
      },
      {
        username: "Josh",
        rating: 3,
        comment: "Not as it seems",
        createdAt: "2024-02-02T12:20:15.839+00:00",
        uid: "65b225a5e06c48e793d87726",
      },
    ],
  },
  ,
  {
    title: "'24' LED DELL Monitor",
    image:
      "https://www.popsci.com/uploads/2021/03/02/4DQC5EGW3FFK7NYARMKG4GBZIM.jpg?auto=webp&width=800&crop=16:10,offset-x50",
    summary: "Magic TrackPad",
    oldPrice: 2799.99,
    price: 2000,
    description: "Powerful tool for developers of all sprts",
    color: ["blue"],
    quantity: 5,
    special: true,
    brand: "ASUS",
    reviews: [
      {
        username: "John",
        rating: 5,
        comment: "I love it",
        createdAt: "2021-09-16T11:20:45.839+00:00",
        uid: "65b2251de06c48e793d87722",
      },
    ],
  },
  {
    title: "Magic TrackPad",
    image: "https://m.media-amazon.com/images/I/31KRkJEl7zL._SL500_.jpg",
    summary: "Magic TrackPad",
    oldPrice: 700,
    price: 599,
    description: "Powerful tool for developers of all sprts",
    color: ["black", "blue", "darkorange"],
    special: true,
    quantity: 20,
    brand: "HP",
    reviews: [
      {
        username: "John",
        rating: 1,
        comment: "A very poor product.",
        createdAt: "2020-09-16T11:20:45.839+00:00",
        uid: "65b2251de06c48e793d87722",
      },
      {
        username: "Josh",
        rating: 2,
        comment: "I wouldn't recommend.",
        createdAt: "2020-10-07T15:20:15.839+00:00",
        uid: "65b225a5e06c48e793d87726",
      },
    ],
  },
  {
    title: "Magic TrackPad ",
    image:
      "https://www.istore.co.za/media/catalog/product/m/k/mk2d3_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    summary: "Magic TrackPad ",
    oldPrice: 500,
    price: 299,
    special: true,
    description: "Powerful tool for developers of all sprts",
    color: ["red", "grey", "white"],
    quantity: 20,
    brand: "HP",
    reviews: [
      {
        username: "Josh",
        rating: 1,
        comment:
          "A very poor product. I am completely disappointed in how they presented this product. A waste of money.",
        createdAt: "2021-08-02T19:10:05.839+00:00",
        uid: "65b225a5e06c48e793d87726",
      },
    ],
  },
  {
    title: "Xiaomi-Redmi-Note-11E-5G",
    image:
      "https://whatmobilez.com/wp-content/uploads/2022/03/Xiaomi-Redmi-Note-11E-5G-600x600.jpg",
    summary: "Magic TrackPad",
    oldPrice: 500,
    price: 299,
    description: "Powerful tool for developers of all sports",
    color: ["black"],
    quantity: 20,
    brand: "HP",
    special: true,
    reviews: [
      {
        username: "Josh",
        rating: 4,
        comment: "You have got to appreciate HP products",
        createdAt: "2024-02-02T12:20:15.839+00:00",
        uid: "65b225a5e06c48e793d87726",
      },
      {
        username: "John",
        rating: 3,
        comment: "Awesome product, but I still want them to improve.",
        createdAt: "2019-01-25T10:16:45.839+00:00",
        uid: "65b2251de06c48e793d87722",
      },
    ],
  },
  {
    title: "Magic TrackPad",
    image:
      "https://www.gasextreme.co.za/wp-content/uploads/2018/10/Condere_3_Litre_Whistling_Kettle_-_Red.jpg",
    summary: "Magic TrackPad",
    oldPrice: 500,
    price: 299,
    description: "Powerful tool for developers of all sprts",
    color: ["pink", "orange"],
    quantity: 20,
    special: true,
    brand: "HP",
    reviews: [
      {
        username: "Josh",
        rating: 1,
        comment: "A very poor product",
        createdAt: "2020-07-21T08:11:15.839+00:00",
        uid: "65b225a5e06c48e793d87726",
      },
    ],
  },
  {
    title: "Magic TrackPad",
    image: "https://m.media-amazon.com/images/I/61FHL0C8qXL._AC_SL1200_.jpg",
    summary: "Magic TrackPad",
    oldPrice: 500,
    price: 299,
    special: true,
    description: "Powerful tool for developers of all sprts",
    color: ["pink"],
    quantity: 20,
    brand: "HP",
    reviews: {
      username: "Josh",
      rating: 5,
      comment: "What a wow!",
      createdAt: "2024-01-25T08:10:45.839+00:00",
      uid: "65b225a5e06c48e793d87726",
    },
  },
  {
    title: "Magic TrackPad",
    image:
      "https://www.hirschs.co.za/media/catalog/product/cache/5650c527889287cec4d241f33ee3fa4b/7/4/74687.png",
    summary: "Magic TrackPad",
    oldPrice: 300,
    price: 299,
    special: true,
    description: "Powerful tool for developers of all sprts",
    color: ["pink"],
    quantity: 20,
    brand: "HP",
    reviews: [],
  },
  {
    title: "Magic TrackPad",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/za/ny90t5010ss-fa/gallery/za-ny5000tm-ny90t5010ss-fa-350920462?$650_519_PNG$",
    summary: "Magic TrackPad",
    oldPrice: 16999.0,
    price: 15999.0,
    special: true,
    description: "Powerful tool for developers of all sprts",
    color: ["purple", "pink"],
    quantity: 20,
    brand: "HP",
    reviews: [
      {
        username: "John",
        rating: 3,
        comment: "Love it but just not the color.",
        createdAt: "2023-01-25T10:08:45.839+00:00",
        uid: "65b2251de06c48e793d87722",
      },
    ],
  },
  {
    title: "Product 3",
    image:
      "https://media.wired.com/photos/5df98d3660d5ad000818260b/1:1/w_1347,h_1347,c_limit/Gear-Decade-10-Best-Products.jpg",
    summary: "Summary of Product 3",
    oldPrice: 29.99,
    price: 24.99,
    description: "Description of Product 3",
    color: ["red", "blue", "green"],
    quantity: 50,
    special: true,
    brand: "Brand 3",
    reviews: [
      {
        username: "Josh",
        rating: 4,
        comment: "Review of Product 3",
        createdAt: new Date(),
        uid: "65b225a5e06c48e793d87726",
      },
    ],
  },
  {
    title: "Product 4",
    image:
      "https://www.tomorrowsworldtoday.com/wp-content/uploads/2023/01/Image3-26.jpg",
    summary: "Summary of Product 4",
    oldPrice: 39.99,
    price: 34.99,
    description: "Description of Product 4",
    color: ["black"],
    quantity: 100,
    special: false,
    brand: "Brand 4",
    reviews: [
      {
        username: "John",
        rating: 5,
        comment: "Review of Product 4",
        createdAt: new Date(),
        uid: "65b2251de06c48e793d87722",
      },
      {
        username: "Josh",
        rating: 3,
        comment: "Another review of Product 4",
        createdAt: new Date(),
        uid: "65b225a5e06c48e793d87726",
      },
    ],
  },
  {
    title: "Product 5",
    image:
      "https://thepromogroup.co.za/wp-content/uploads/2018/06/TPG2642ABL-300x300.jpg",
    summary: "Summary of Product 5",
    oldPrice: 49.99,
    price: 44.99,
    description: "Description of Product 5",
    color: ["pink", "purple"],
    quantity: 20,
    special: true,
    brand: "Brand 5",
    reviews: [],
  },
  {
    title: "Product 6",
    image:
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1692036179-71bdrNQW-aL.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
    summary: "Summary of Product 6",
    oldPrice: 59.99,
    price: 54.99,
    description: "Description of Product 6",
    color: ["silver"],
    quantity: 10,
    special: false,
    brand: "Brand 6",
    reviews: [
      {
        username: "John",
        rating: 4,
        comment: "Review of Product 6",
        createdAt: new Date(),
        uid: "65b2251de06c48e793d87722",
      },
      {
        username: "Josh",
        rating: 2,
        comment: "Another review of Product 6",
        createdAt: new Date(),
        uid: "65b225a5e06c48e793d87726",
      },
    ],
  },
  {
    title: "Product 7",
    image:
      "https://c02.purpledshub.com/uploads/sites/41/2022/06/9421412f8e83278b37b538744a0913b0ultra-01e0e5e-e1655112987410.jpeg?webp=1&w=1200",
    summary: "Summary of Product 7",
    oldPrice: 69.99,
    price: 64.99,
    description: "Description of Product 7",
    color: ["white"],
    quantity: 30,
    special: true,
    brand: "Brand 7",
    reviews: [],
  },
  {
    title: "Product 8",
    image:
      "https://www.zdnet.com/a/img/resize/24601b6ccfaac6702aa19249d4514b9845936195/2022/10/28/041b77d8-6457-4882-9a8e-e71024552a75/kasasmart-plug.jpg?auto=webp&fit=crop&height=900&width=1200",
    summary: "Summary of Product 8",
    oldPrice: 79.99,
    price: 74.99,
    description: "Description of Product 8",
    color: ["red", "blue"],
    quantity: 5,
    special: false,
    brand: "Brand 8",
    reviews: [
      {
        username: "John",
        rating: 5,
        comment: "Review of Product 8",
        createdAt: new Date(),
        uid: "65b2251de06c48e793d87722",
      },
    ],
  },
  {
    title: "Product 9",
    image:
      "https://thepromogroup.co.za/wp-content/uploads/2020/11/PGTECH5202A-300x300.jpg",
    summary: "Summary of Product 9",
    oldPrice: 89.99,
    price: 84.99,
    description: "Description of Product 9",
    color: ["green"],
    quantity: 15,
    special: true,
    brand: "Brand 9",
    reviews: [
      {
        username: "Josh",
        rating: 3,
        comment: "Review of Product 9",
        createdAt: new Date(),
        uid: "65b225a5e06c48e793d87726",
      },
    ],
  },
  {
    title: "iPhone 13",
    image:
      "https://i0.wp.com/www.futuretelecoms.co.za/wp-content/uploads/2021/10/iphone-13-pro-max-128GB.png?fit=500%2C500&ssl=1",
    summary: "The latest iPhone with advanced features.",
    oldPrice: 1099.99,
    price: 999.99,
    description:
      "Experience the power of the A15 Bionic chip and Super Retina XDR display.",
    color: ["Graphite", "Silver", "Gold", "Pacific Blue"],
    quantity: 100,
    special: true,
    brand: "Apple",
    reviews: [
      {
        username: "John",
        rating: 5,
        comment: "Amazing phone!",
        createdAt: new Date(),
        uid: "65b2251de06c48e793d87722",
      },
      {
        username: "Josh",
        rating: 4,
        comment: "Great camera quality.",
        createdAt: new Date(),
        uid: "65b225a5e06c48e793d87726",
      },
    ],
  },
  {
    title: "Samsung Galaxy S21",
    image:
      "https://i0.wp.com/global-gadgets.co.za/wp-content/uploads/2021/08/Samsung-Galaxy-S21-5G-128GB-Phantom-Grey-8806090892776-18012021-01-p.jpg",
    summary: "A powerful Android smartphone.",
    oldPrice: 999.99,
    price: 899.99,
    description:
      "Get the ultimate 5G experience with the Exynos 2100 processor and Dynamic AMOLED display.",
    color: ["Phantom Gray", "Phantom White", "Phantom Violet"],
    quantity: 50,
    special: false,
    brand: "Samsung",
    reviews: [
      {
        username: "Josh",
        rating: 4,
        comment: "Fast and reliable.",
        createdAt: new Date(),
        uid: "65b225a5e06c48e793d87726",
      },
    ],
  },
  {
    title: "Sony PlayStation 5",
    image:
      "https://newworld.co.za/cdn/shop/products/sony-playstation-5-disc-combo-1-191906.jpg",
    summary: "Next-gen gaming console.",
    oldPrice: 499.99,
    price: 449.99,
    description:
      "Experience stunning visuals and immersive gameplay with the PS5's powerful hardware.",
    color: ["White"],
    quantity: 20,
    special: true,
    brand: "Sony",
    reviews: [],
  },
  {
    title: "Nikon D850 DSLR Camera",
    image:
      "https://s.yimg.com/ny/api/res/1.2/l2Cgxc_r.kdgSU7Ff.Bxmw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQxMg--/https://o.aolcdn.com/hss/storage/midas/f19d4ac48863e9c2ca9fd2c4622b1c17/205594410/nikon-d850-full-frame-dslr-2017-08-23-01.jpg",
    summary: "Professional-grade DSLR camera.",
    oldPrice: 3299.99,
    price: 2999.99,
    description:
      "Capture high-resolution photos and 4K videos with exceptional detail.",
    color: ["Black"],
    quantity: 10,
    special: true,
    brand: "Nikon",
    reviews: [
      {
        username: "Josh",
        rating: 5,
        comment: "Outstanding image quality!",
        createdAt: new Date(),
        uid: "65b225a5e06c48e793d87726",
      },
      {
        username: "John",
        rating: 4,
        comment: "Great camera for professionals.",
        createdAt: new Date(),
        uid: "65b2251de06c48e793d87722",
      },
    ],
  },
  {
    title: "Bose QuietComfort 35 II Headphones",
    image:
      "https://trenic.co.za/wp-content/uploads/bose-qc-35-series-ii-black-1-1-1.jpg",
    summary: "Premium noise-canceling headphones.",
    oldPrice: 349.99,
    price: 299.99,
    description:
      "Immerse yourself in music with world-class noise cancellation and balanced audio performance.",
    color: ["Black", "Silver"],
    quantity: 30,
    special: false,
    brand: "Bose",
    reviews: [
      {
        username: "Josh",
        rating: 4,
        comment: "Great sound quality.",
        createdAt: new Date(),
        uid: "65b225a5e06c48e793d87726",
      },
    ],
  },
  {
    title: "MacBook Pro 16",
    image: "https://snapcraze.co.za/wp-content/uploads/2020/01/mbp16-sg.jpg",
    summary: "Powerful laptop for professionals.",
    oldPrice: 2399.99,
    price: 2199.99,
    description:
      "Experience unprecedented performance with the M1 Pro chip and stunning Retina display.",
    color: ["Space Gray", "Silver"],
    quantity: 50,
    special: true,
    brand: "Apple",
    reviews: [
      {
        username: "John",
        rating: 5,
        comment: "Incredible speed and graphics!",
        createdAt: new Date(),
        uid: "65b2251de06c48e793d87722",
      },
      {
        username: "Josh",
        rating: 4,
        comment: "Great for video editing.",
        createdAt: new Date(),
        uid: "65b225a5e06c48e793d87726",
      },
    ],
  },
  {
    title: "Samsung QLED 4K Smart TV",
    image:
      "https://media.flixcar.com/webp/synd-asset/Samsung-107716045-za-qled-tv-qa65qn85bakxxa-front--silver-533065722--Download-Source--zoom.png",
    summary: "Immersive entertainment at home.",
    oldPrice: 1999.99,
    price: 1799.99,
    description: "Enjoy lifelike visuals and smart features with this QLED TV.",
    color: ["Black"],
    quantity: 30,
    special: false,
    brand: "Samsung",
    reviews: [
      {
        username: "Josh",
        rating: 4,
        comment: "Impressive picture quality.",
        createdAt: new Date(),
        uid: "65b225a5e06c48e793d87726",
      },
    ],
  },
  {
    title: "Fitbit Versa 3 Smartwatch",
    image:
      "https://www.fitbit.com/global/content/dam/fitbit/global/pdp/devices/versa-3/images/desktop/fall21-features-cover.jpg",
    summary: "Stay active and connected.",
    oldPrice: 229.99,
    price: 199.99,
    description:
      "Track your fitness, receive notifications, and access apps from your wrist.",
    color: ["Midnight", "Soft Gold", "Pink Clay"],
    quantity: 100,
    special: true,
    brand: "Fitbit",
    reviews: [
      {
        username: "Josh",
        rating: 4,
        comment: "Helps me stay motivated.",
        createdAt: new Date(),
        uid: "65b225a5e06c48e793d87726",
      },
      {
        username: "John",
        rating: 5,
        comment: "Accurate heart rate monitoring.",
        createdAt: new Date(),
        uid: "65b2251de06c48e793d87722",
      },
    ],
  },
  {
    title: "Canon EOS R6 Mirrorless Camera",
    image:
      "https://2.img-dpreview.com/files/p/E~TC4x3S590x0~articles/1548544834/body/Canon-EOS-R6-lead-01.jpeg",
    summary: "Versatile camera for photography enthusiasts.",
    oldPrice: 2499.99,
    price: 2299.99,
    description:
      "Capture stunning images and 4K videos with this full-frame mirrorless camera.",
    color: ["Black"],
    quantity: 20,
    special: false,
    brand: "Canon",
    reviews: [
      {
        username: "John",
        rating: 5,
        comment: "Excellent autofocus system.",
        createdAt: new Date(),
        uid: "65b2251de06c48e793d87722",
      },
    ],
  },
  {
    title: "Bose SoundLink Revolve+ Bluetooth Speaker",
    image:
      "https://images3.pricecheck.co.za/images/objects/hash/product/b96/324/940/image_big_95080594.jpg",
    summary: "360-degree portable speaker with impressive sound.",
    oldPrice: 299.99,
    price: 249.99,
    description:
      "Enjoy deep, immersive sound in every direction with this Bluetooth speaker.",
    color: ["Triple Black", "Lux Gray"],
    quantity: 40,
    special: true,
    brand: "Bose",
    reviews: [
      {
        username: "John",
        rating: 4,
        comment: "Great battery life.",
        createdAt: new Date(),
        uid: "65b2251de06c48e793d87722",
      },
      {
        username: "Josh",
        rating: 5,
        comment: "Perfect for outdoor gatherings.",
        createdAt: new Date(),
        uid: "65b225a5e06c48e793d87726",
      },
    ],
  },
];

export default products;
