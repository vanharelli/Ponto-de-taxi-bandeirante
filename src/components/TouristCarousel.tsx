import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay } from 'swiper/modules'
import { useState } from 'react'
import { ImageViewer } from './ImageViewer'

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
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openViewer = (url: string) => {
    setSelectedImage(url);
    setViewerOpen(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-0 px-0">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={false}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-[140px] sm:h-[200px] md:h-[280px] rounded-2xl shadow-2xl border border-white/10"
      >
        {imageUrls.map((url, index) => (
          <SwiperSlide key={index} className="w-full h-full bg-black/20 rounded-2xl overflow-hidden cursor-pointer" onClick={() => openViewer(url)}>
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
      
      <ImageViewer 
        isOpen={viewerOpen} 
        onClose={() => setViewerOpen(false)} 
        imageUrl={selectedImage} 
      />
    </div>
  )
}
