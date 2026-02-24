import { useState } from 'react'
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
      <div className="w-full max-w-3xl mx-auto my-0 px-0 overflow-hidden netflix-carousel">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          initialSlide={0}
          slidesPerView={'auto'}
          spaceBetween={20}
          loop={true}
          allowTouchMove={true}
          style={{ overflow: 'visible' }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          pagination={false}
          modules={[EffectCoverflow, Pagination]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="h-full"
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 14,
            },
            640: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 22,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 26,
            }
          }}
        >
          {imageUrls.map((url, index) => (
            <SwiperSlide
              key={index}
              className="transition-transform duration-300 ease-in-out"
              style={{
                transform: index === activeIndex ? 'scale(1.03)' : 'scale(0.97)',
                opacity: index === activeIndex ? 1 : 0.7,
                borderRadius: '0.9rem',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                overflow: 'hidden',
              }}
            >
              <div className="w-full h-full relative">
                <img
                  src={url}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-contain rounded-[1rem]"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-taxi.jpg'
                  }}
                />
                {index === activeIndex && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-[1rem] pointer-events-none" />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}
