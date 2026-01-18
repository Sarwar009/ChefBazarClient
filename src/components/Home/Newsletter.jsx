import { motion } from "framer-motion";

const ModernNewsletterCTA = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="py-20"
    >
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl rounded-3xl p-10 text-center shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold  mb-4">
            Stay Hungry for Updates 🍽️
          </h2>
          <p className=" max-w-xl mx-auto mb-8">
            Get exclusive discounts, chef specials, and daily meal updates
            straight to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-5 py-3 rounded-full outline-none border border-gray-300 focus:border-orange-400 transition"
            />
            <button className="px-8 py-3 rounded-full bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 font-semibold hover:scale-105 transition cursor-pointer">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ModernNewsletterCTA;
