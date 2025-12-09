
import { motion } from "framer-motion";

export default function Hero() {
  

  return (
    <section
      
      className="relative w-full py-28 px-6 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Decorative floating elements */}
      <div className="absolute top-0 left-10 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply opacity-30 animate-pulse"></div>
      <div className="absolute top-20 right-1/3 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply opacity-20 animate-pulse"></div>

      {/* Main content */}
      <motion.div
        className="max-w-4xl mx-auto text-center z-10"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Fresh Home-Cooked Meals <br className="hidden md:block" /> Delivered Daily
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Discover healthy, delicious meals prepared by local chefs. Order anytime and enjoy homemade flavors delivered straight to your door.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-8 py-4 bg-linear-to-r from-emerald-500 to-lime-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          Explore Meals
        </motion.button>
      </motion.div>
    </section>
  );
}
