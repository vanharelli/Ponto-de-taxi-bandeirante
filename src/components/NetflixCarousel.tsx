import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

const imageUrls = [
  '/taxi/taxi.webp',
  '/taxi/taxi2.webp',
  '/taxi/taxi3.webp',
  '/taxi/taxi4.webp',
  '/taxi/taxi5.webp',
]

export function NetflixCarousel() {
  return (
    <div className="w-full max-w-4xl mx-auto my-0 px-0">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-2xl shadow-2xl border border-white/10"
        style={{
          '--swiper-navigation-color': '#F2B705',
          '--swiper-pagination-color': '#F2B705',
        } as React.CSSProperties}
      >
        {imageUrls.map((url, index) => (
          <SwiperSlide key={index} className="w-full h-full bg-black/20 rounded-2xl overflow-hidden">
            <div className="w-full h-full flex items-center justify-center relative group">
              <img
                src={url}
                alt={`Táxi Bandeirante ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="sync"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-taxi.jpg'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
