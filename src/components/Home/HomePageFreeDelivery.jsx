import { motion } from "framer-motion";
import { Link } from "react-router";

export default function HomePageFreeDelivery() {
  return (
    <motion.div 
    initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1, ease: "easeOut" }}
    className="bg-linear-to-r from-blue-500 rounded-3xl text-white text-center shadow-xl  via-blue-600 to-indigo-600 mt-8">
      <section
      className="max-w-6xl mx-auto px-6 py-20"
      
    >
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
        Free Delivery!
      </h2>
      <p className="text-lg md:text-xl mb-8">
        Enjoy free delivery on all orders above ৳1199. Fast & safe to your door.
      </p>

      <Link to='/meals'>
        <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        Order now
      </motion.button>
      </Link>
    </section>
    </motion.div>
  );
}
