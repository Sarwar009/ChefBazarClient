import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bestSellers = [
  {
    id: 1,
    name: "Ariana Sultana",
    age: 28,
    rating: 4.9,
    image: "https://i.ibb.co/sample-user1.jpg",
    experience: "5 years in Mediterranean cuisine",
    description: "Specializes in healthy, flavorful Mediterranean dishes with fresh ingredients.",
  },
  {
    id: 2,
    name: "Rahim Hasan",
    age: 32,
    rating: 4.8,
    image: "https://i.ibb.co/sample-user2.jpg",
    experience: "7 years in South Asian cuisine",
    description: "Expert in traditional South Asian meals, especially biriyani and kebabs.",
  },
  {
    id: 3,
    name: "Nabila Akter",
    age: 26,
    rating: 4.7,
    image: "https://i.ibb.co/sample-user3.jpg",
    experience: "4 years in Italian cuisine",
    description: "Passionate about homemade Italian pastas, pizzas, and desserts.",
  },
  {
    id: 4,
    name: "Karim Ullah",
    age: 30,
    rating: 4.85,
    image: "https://i.ibb.co/sample-user4.jpg",
    experience: "6 years in French cuisine",
    description: "Creates elegant French dishes with a modern twist for daily home meals.",
  },
];


const BestSellers = () => {

  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    gsap.fromTo(
      el.querySelectorAll(".best-seller-card"),
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
      <h2 className="text-4xl font-extrabold text-center mb-12">
        Best Sellers
      </h2>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {bestSellers.map(meal => (
                  <motion.div
                    key={meal.id}
                    whileHover={{ scale: 1.08 }}
                    className=" best-seller-card rounded-xl shadow-lg overflow-hidden cursor-pointer"
                  >
                    <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover"/>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{meal.name}</h3>
                      <p className="text-sm">{meal.description}</p>
                      <div className="flex my-2 justify-between">
                        <p className="font-bold">Age: {meal.age}</p>
                        <p className="text-green-500">⭐ {meal.rating}</p>
                      </div>
                      <p className="font-bold text-green-600">Experience: {meal.experience}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
    </section>
  );
};

export default BestSellers;
