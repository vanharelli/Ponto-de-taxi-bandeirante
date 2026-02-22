import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { EffectCoverflow, Pagination } from 'swiper/modules'

const imageUrls = [
  '/taxi/taxi.jpg',
  '/taxi/taxi2.jpg', 
  '/taxi/taxi3.jpg',
  '/taxi/taxi4.jpg',
  '/taxi/taxi5.jpg',
]

export function NetflixCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <>
      <style jsx>{`
        .swiper-slide {
          height: 300px !important;
          width: 280px !important;
        }
        .swiper {
          overflow: visible !important;
        }
      `}</style>
      <div className="w-full max-w-[370px] mx-auto my-0 px-0 overflow-hidden">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={false}
          initialSlide={0}
          slidesPerView={'auto'}
          spaceBetween={30}
          loop={true}
          allowTouchMove={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 50,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={false}
          modules={[EffectCoverflow, Pagination]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="h-full"
          breakpoints={{
            320: {
              slidesPerView: 1.1,
              spaceBetween: 20,
            },
            375: {
              slidesPerView: 1.3,
              spaceBetween: 25,
            },
            420: {
              slidesPerView: 1.5,
              spaceBetween: 30,
            }
          }}
        >
          {imageUrls.map((url, index) => (
            <SwiperSlide
              key={index}
              className="transition-transform duration-300 ease-in-out"
              style={{
                transform: index === activeIndex ? 'scale(1.02)' : 'scale(1)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-[0.75rem]"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-taxi.jpg'
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}