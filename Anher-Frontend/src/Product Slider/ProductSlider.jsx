import React, { useRef } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ProductCard } from '../Product Card/ProductCard';

const ProductSlider = () => {
  const sliderRef = useRef(null);

  const demoProducts = [
    {
      _id: 'ac-001',
      model: 'CoolAir X100',
      imageUrl: ['https://via.placeholder.com/250x200?text=CoolAir+X100'],
    },
    {
      _id: 'filter-002',
      model: 'PureFilter Pro',
      imageUrl: ['https://via.placeholder.com/250x200?text=PureFilter+Pro'],
    },
    {
      _id: 'vent-003',
      model: 'VentMaster 3000',
      imageUrl: ['https://via.placeholder.com/250x200?text=VentMaster+3000'],
    },
    {
      _id: 'ac-004',
      model: 'BreezeMax Ultra',
      imageUrl: ['https://via.placeholder.com/250x200?text=BreezeMax+Ultra'],
    },
    {
      _id: 'filter-005',
      model: 'AirGuard Elite',
      imageUrl: ['https://via.placeholder.com/250x200?text=AirGuard+Elite'],
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false, // We'll use custom buttons
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="bg-green-900 text-white px-8 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-sm tracking-widest mb-2">OUR PRODUCTS</p>
          <h2 className="text-3xl font-bold max-w-xl leading-snug">
            Air Conditioning, Filtration & Ventilation Solutions
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="w-10 h-10 bg-white text-green-900 rounded-full text-xl font-bold flex items-center justify-center"
          >
            −
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="w-10 h-10 bg-white text-green-900 rounded-full text-xl font-bold flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {demoProducts.map((item) => (
          <div key={item._id} className="px-2">
            <ProductCard item={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;