
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Fresh Meals Delivered Daily",
    subtitle: "Taste the difference with ChefBazar",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1500&q=80",
  },
  {
    id: 2,
    title: "Healthy • Organic • Delicious",
    subtitle: "We cook with love and fresh ingredients",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1500&q=80",
  },
  {
    id: 3,
    title: "Your Daily Meal Partner",
    subtitle: "Order anytime, anywhere",
    img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1500&q=80",
  },
];

export default function Slider() {
  return (
    <div className="w-full h-[70vh] relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Animated Text (always visible) */}
              <motion.div
                key={slide.id} // key ensures new animation triggers on slide change
                initial={{ y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 flex flex-col justify-center items-center  text-center px-6"
              >
                <h1 className="text-4xl text-white md:text-6xl font-extrabold drop-shadow-xl mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl text-white opacity-90">{slide.subtitle}</p>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
