import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { id: 1, title: "Local Chefs", desc: "Connect with experienced home cooks nearby." },
  { id: 2, title: "Fresh Ingredients", desc: "Ingredients sourced daily for freshness." },
  { id: 3, title: "Secure Payments", desc: "Stripe-powered payments (safe & easy)." },
  { id: 4, title: "Fast Delivery", desc: "Real-time order tracking & timely delivery." }
];

export default function WhyChoose() {
  
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    gsap.fromTo(
      el.querySelectorAll(".feature-item"),
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
    <section  className="py-8 px-4 max-w-6xl mx-auto" ref={ref}>
      <div className="text-center mb-8">
        <h3 className="text-3xl font-extrabold text-base-content">Why Choose ChefBazar?</h3>
        <p className="text-base-content/70 mt-2 max-w-2xl mx-auto">Quality meals prepared by local chefs — honest prices and real flavors.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {features.map((f) => (
    <motion.div
      key={f.id}
      whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(0,0,0,0.12)" }}
      className=" feature-item relative rounded-3xl p-6 shadow-lg cursor-pointer overflow-hidden border border-base-200 group"
    >
      {/* Top accent circle */}
      <div className="absolute -top-6 left-6 w-12 h-12 bg-linear-to-r from-emerald-400 to-lime-400 rounded-full flex items-center justify-center  text-xl font-bold shadow-lg">
        {f.icon ? f.icon : "★"}
      </div>

      <div className="mt-8">
        <h4 className="font-semibold text-lg  mb-2">{f.title}</h4>
        <p className="text-sm">{f.desc}</p>
      </div>

      {/* Hover background accent */}
      <div className="absolute inset-0 bg-linear-to-br from-green-50 to-lime-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
    </motion.div>
  ))}
</div>

    </section>
  );
}
