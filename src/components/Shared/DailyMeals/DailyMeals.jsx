
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const demoMeals = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: `Chef Special ${i + 1}`,
  chefName: `Chef ${["Rahim","Sadia","Karim","Mita","Rafi","Nabila"][i]}`,
  price: 120 + i * 25,
  rating: 4 + (i % 2),
  img: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80&ixid=${i}`
}));

export default function DailyMeals({ meals = demoMeals }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    gsap.fromTo(
      el.querySelectorAll(".meal-card"),
      { opacity: 0, y: 40, stagger: 0.08 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%"
        }
      }
    );
  }, []);

  return (
    <section ref={ref} className="py-8 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
        Today's Special Meals
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((m) => (
          <motion.div
            key={m.id}
            className="meal-card bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            whileHover={{ scale: 1.03 }}
          >
            <div className="h-44 md:h-52 w-full bg-gray-100">
              <img
                src={m.img}
                alt={m.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{m.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{m.chefName}</p>
                </div>
                <div className="text-right">
                  <div className="text-lime-600 font-bold">{m.price} BDT</div>
                  <div className="text-sm text-yellow-500 mt-1">{'★'.repeat(m.rating)}{'☆'.repeat(5-m.rating)}</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <button className="px-3 py-1 rounded-md bg-emerald-500 text-white text-sm hover:bg-emerald-600 transition">
                  See Details
                </button>
                <button className="px-3 py-1 rounded-md border text-sm hover:bg-gray-50 transition">
                  Add to Fav
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
