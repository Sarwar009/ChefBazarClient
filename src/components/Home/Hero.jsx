import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
      
      {/* Floating shapes */}
      <motion.div
        className="absolute top-10 left-5 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply opacity-30"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply opacity-25"
        animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-20 right-1/3 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply opacity-20"
        animate={{ y: [0, 25, 0], x: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      {/* Main content */}
      <motion.div
        className="z-10 text-center max-w-4xl px-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.3 }
          }
        }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
        >
          Fresh Home-Cooked Meals <br className="hidden md:block" /> Delivered Daily
        </motion.h1>

        <motion.p
          className="text-lg text-gray-700 mb-8"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
        >
          Discover healthy, delicious meals prepared by local chefs. Order anytime and enjoy homemade flavors delivered straight to your door.
        </motion.p>

        <motion.button
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
        >
          Explore Meals
        </motion.button>
      </motion.div>
    </section>
  );
}
