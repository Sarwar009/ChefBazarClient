import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
  const API = import.meta.env.VITE_API_URL;

gsap.registerPlugin(ScrollTrigger);

const bestSellers = [
  {
    id: 1,
    name: "Ariana Sultana",
    age: 28,
    rating: 4.9,
    image: "https://i.ibb.co/sample-user1.jpg",
    experience: "5 years in Mediterranean cuisine",
    description:
      "Specializes in healthy, flavorful Mediterranean dishes with fresh ingredients.",
  },
  {
    id: 2,
    name: "Rahim Hasan",
    age: 32,
    rating: 4.8,
    image: "https://i.ibb.co/sample-user2.jpg",
    experience: "7 years in South Asian cuisine",
    description:
      "Expert in traditional South Asian meals, especially biriyani and kebabs.",
  },
  {
    id: 3,
    name: "Nabila Akter",
    age: 26,
    rating: 4.7,
    image: "https://i.ibb.co/sample-user3.jpg",
    experience: "4 years in Italian cuisine",
    description:
      "Passionate about homemade Italian pastas, pizzas, and desserts.",
  },
  {
    id: 4,
    name: "Karim Ullah",
    age: 30,
    rating: 4.85,
    image: "https://i.ibb.co/sample-user4.jpg",
    experience: "6 years in French cuisine",
    description:
      "Creates elegant French dishes with a modern twist for daily home meals.",
  },
];

const BestSellers = () => {
  const ref = useRef(null);
  const { loading} = useAuth();

  useEffect(() => {
    if (!bestSellers.length) return;

    gsap.fromTo(
      ref.current.querySelectorAll(".best-seller-card"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  


  if (loading) {
    return (
      <div className="text-center py-20 font-semibold">
        Loading chefs...
      </div>
    );
  }

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto" ref={ref}>
      <h2 className="text-4xl font-extrabold text-center mb-12">
        Best Sellers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellers.map((chef) => (
          <motion.div
            key={chef.id}
            whileHover={{ scale: 1.05 }}
            className="best-seller-card rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
          >
            {/* Image */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={chef.image}
                alt={chef.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-semibold text-lg mb-1">
                {chef.name}
              </h3>

              <p className="text-sm line-clamp-3 mb-3">
                {chef.description}
              </p>

              {/* Push footer to bottom */}
              <div className="mt-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Age: {chef.age}</span>
                  <span className="text-green-500 font-semibold">
                    ⭐ {chef.rating}
                  </span>
                </div>

                <p className="text-sm font-semibold text-green-600">
                  {chef.experience}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
