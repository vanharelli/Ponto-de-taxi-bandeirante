import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation, Autoplay } from 'swiper/modules'

const imageUrls = [
  '/turistico/Pontao-divulgacao-2.jpg',
  '/turistico/WhatsApp-Image-2024-07-15-at-13.05.51.jpeg',
  '/turistico/unnamed (1).webp',
  '/turistico/unnamed (10).webp',
  '/turistico/unnamed (2).webp',
  '/turistico/unnamed (3).webp',
  '/turistico/unnamed (4).webp',
  '/turistico/unnamed (5).webp',
  '/turistico/unnamed (6).webp',
  '/turistico/unnamed (7).webp',
  '/turistico/unnamed (8).webp',
  '/turistico/unnamed (9).webp',
  '/turistico/unnamed.webp'
]

export function TouristCarousel() {
  return (
    <div className="w-full max-w-4xl mx-auto my-0 px-0">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={false}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-[140px] sm:h-[200px] md:h-[280px] rounded-2xl shadow-2xl border border-white/10"
        style={{
          '--swiper-navigation-color': '#F2B705',
        } as React.CSSProperties}
      >
        {imageUrls.map((url, index) => (
          <SwiperSlide key={index} className="w-full h-full bg-black/20 rounded-2xl overflow-hidden">
            <div className="w-full h-full flex items-center justify-center relative group">
              <img
                src={url}
                alt={`Ponto Turístico ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="sync"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'; // Hide if fails
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
