import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const trendingMeals = [
  { id: 1, name: "Vegan Salad Bowl", chef: "Chef Lina", price: 180, image: "https://i.ibb.co/0tXgkB9/vegan-salad.jpg", rating: 4.9 },
  { id: 2, name: "Pasta Carbonara", chef: "Chef Arif", price: 220, image: "https://i.ibb.co/7yybGqN/pasta.jpg", rating: 4.7 },
  { id: 3, name: "Sushi Platter", chef: "Chef Mina", price: 300, image: "https://i.ibb.co/k2rZbMH/sushi.jpg", rating: 4.8 },
  { id: 4, name: "Grilled Chicken", chef: "Chef Rina", price: 250, image: "https://i.ibb.co/k2rZbMH/sushi.jpg", rating: 4.6 },
  { id: 5, name: "Beef Steak", chef: "Chef Karim", price: 350, image: "https://i.ibb.co/k2rZbMH/sushi.jpg", rating: 4.9 },
  { id: 6, name: "Fish Curry", chef: "Chef Nabila", price: 280, image: "https://i.ibb.co/k2rZbMH/sushi.jpg", rating: 4.7 },
];

export default function TrendingMeals() {

  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    gsap.fromTo(
      el.querySelectorAll(".tranding-meal-card"),
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
    <section className="py-8 px-4 max-w-6xl mx-auto" ref={ref}>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Trending Meals</h2>
        <p className="text-center mb-12 text-gray-500">Check out what’s trending among food lovers</p>
        <div className="grid md:grid-cols-4 gap-6">
          {trendingMeals.map(meal => (
            <motion.div
              key={meal.id}
              whileHover={{ scale: 1.08 }}
              className="tranding-meal-card min-w-[220px] bg-orange-50 rounded-xl shadow-lg overflow-hidden cursor-pointer"
            >
              <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{meal.name}</h3>
                <p className="text-gray-500 text-sm">{meal.chef}</p>
                <p className="mt-2 font-bold text-orange-600">৳ {meal.price}</p>
                <p className="text-yellow-500">⭐ {meal.rating}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
