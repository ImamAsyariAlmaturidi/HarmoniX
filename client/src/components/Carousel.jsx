import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Carousel() {
  return (
    <div className='px-4 py-9'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className='text-center'>
            <img className='h-[55vh] w-full' src="https://i.pinimg.com/564x/8a/bc/69/8abc69dec88f821bb2427dd7cb7b71f3.jpg" alt="" />
            <h1 className='text-white mt-11'>SNOOPP DOGG & WHIZZ KHALIFA</h1>
        </SwiperSlide>
        <SwiperSlide className='text-center'>
            <img  className='h-[55vh] w-full' src="https://i.pinimg.com/564x/c2/96/20/c296202bd4768bf1220b399d09e4976e.jpg" alt="" />
            <h1 className='text-white mt-11'>CHIEF KEEF</h1>
        </SwiperSlide>
        <SwiperSlide className='text-center'>
            <img  className='h-[55vh] w-full' src="https://i.pinimg.com/564x/11/e6/1b/11e61b5b34f5a90035c6a62c16ecf1cb.jpg" alt="" />
            <h1 className='text-white mt-11'>THE WEEKND</h1>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
