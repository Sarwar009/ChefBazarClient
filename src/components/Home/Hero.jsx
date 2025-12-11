
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          Fresh Home-Cooked Meals <br className="hidden md:block" /> Delivered Daily
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          Discover healthy, delicious meals prepared by local chefs. Order anytime and enjoy homemade flavors delivered straight to your door.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          className="px-8 py-4 bg-linear-to-r from-emerald-500 to-lime-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          Explore Meals
        </motion.button>
      </motion.div>
    </section>
  );
}
