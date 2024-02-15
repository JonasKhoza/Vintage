const products = [
  {
    id: 1,
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
    color: "red",
    quantity: 7,

    special: true,
    brand: "Sony",
    review: {
      rating: 5,
      comment: "High quality product",
    },
  },
  {
    id: 2,
    title: "Sinotec 5.1 Channel Home Theatre System HTS-518",
    image:
      "https://www.bradlows.co.za/media/catalog/product/cache/2bc2f148dc23cafaa22d929dc6e18cfe/h/t/hts_518_ecommerce_60b3.png",
    summary: "Magic TrackPad",
    oldPrice: 500,
    price: 2995875878,
    description: "Powerful tool for developers of all sprts",
    color: "yellow",
    quantity: 0,
    special: true,
    brand: "Apple",
    review: {
      rating: 3,
      comment: "A very useful product",
    },
  },
  {
    id: 3,
    title: "'24' LED DELL Monitor",
    image:
      "https://www.popsci.com/uploads/2021/03/02/4DQC5EGW3FFK7NYARMKG4GBZIM.jpg?auto=webp&width=800&crop=16:10,offset-x50",
    summary: "Magic TrackPad",
    oldPrice: 2799.99,
    price: 2000,
    description: "Powerful tool for developers of all sprts",
    color: "blue",
    quantity: 5,
    special: true,
    brand: "ASUS",
    review: {
      rating: 4,
      comment: "I love it",
    },
  },
  {
    id: 4,
    title: "Magic TrackPad",
    image: "https://m.media-amazon.com/images/I/31KRkJEl7zL._SL500_.jpg",
    summary: "Magic TrackPad",
    oldPrice: 700,
    price: 599,
    description: "Powerful tool for developers of all sprts",
    color: "black",
    special: true,
    quantity: 20,
    brand: "HP",
    review: {
      rating: 1,
      comment: "A very poor product",
    },
  },
  {
    id: 5,
    title: "Magic TrackPad ",
    image:
      "https://www.istore.co.za/media/catalog/product/m/k/mk2d3_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    summary: "Magic TrackPad ",
    oldPrice: 500,
    price: 299,
    special: true,
    description: "Powerful tool for developers of all sprts",
    color: "red",
    quantity: 20,
    brand: "HP",
    review: {
      rating: 1,
      comment: "A very poor product",
    },
  },
  {
    id: 6,
    title: "Xiaomi-Redmi-Note-11E-5G",
    image:
      "https://whatmobilez.com/wp-content/uploads/2022/03/Xiaomi-Redmi-Note-11E-5G-600x600.jpg",
    summary: "Magic TrackPad",
    oldPrice: 500,
    price: 299,
    description: "Powerful tool for developers of all sprts",
    color: "black",
    quantity: 20,
    brand: "HP",
    special: true,
    review: {
      rating: 1,
      comment: "A very poor product",
    },
  },
  {
    id: 7,
    title: "Magic TrackPad",
    image:
      "https://www.gasextreme.co.za/wp-content/uploads/2018/10/Condere_3_Litre_Whistling_Kettle_-_Red.jpg",
    summary: "Magic TrackPad",
    oldPrice: 500,
    price: 299,
    description: "Powerful tool for developers of all sprts",
    color: "pink",
    quantity: 20,
    special: true,
    brand: "HP",
    review: {
      rating: 1,
      comment: "A very poor product",
    },
  },
  {
    id: 8,
    title: "Magic TrackPad",
    image: "https://m.media-amazon.com/images/I/61FHL0C8qXL._AC_SL1200_.jpg",
    summary: "Magic TrackPad",
    oldPrice: 500,
    price: 299,
    special: true,
    description: "Powerful tool for developers of all sprts",
    color: "pink",
    quantity: 20,
    brand: "HP",
    review: {
      rating: 1,
      comment: "A very poor product",
    },
  },
  {
    id: 9,
    title: "Magic TrackPad",
    image:
      "https://www.hirschs.co.za/media/catalog/product/cache/5650c527889287cec4d241f33ee3fa4b/7/4/74687.png",
    summary: "Magic TrackPad",
    oldPrice: 300,
    price: 299,
    special: true,
    description: "Powerful tool for developers of all sprts",
    color: "pink",
    quantity: 20,
    brand: "HP",
    review: {
      rating: 1,
      comment: "A very poor product",
    },
  },
  {
    id: 10,
    title: "Magic TrackPad",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/za/ny90t5010ss-fa/gallery/za-ny5000tm-ny90t5010ss-fa-350920462?$650_519_PNG$",
    summary: "Magic TrackPad",
    oldPrice: 16999.0,
    price: 15999.0,
    special: true,
    description: "Powerful tool for developers of all sprts",
    color: "pink",
    quantity: 20,
    brand: "HP",
    review: {
      rating: 1,
      comment: "A very poor product",
    },
  },
];

export default products;
