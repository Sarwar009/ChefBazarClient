import { motion } from "framer-motion";

const steps = [
  { title: "Choose Meals", desc: "Browse & select your favorite food" },
  { title: "Place Order", desc: "Order easily with few clicks" },
  { title: "Fast Delivery", desc: "Get hot meals at your door" },
];

const HowitWorks = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16"
    >
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">How ChefBazar Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="p-8 rounded-xl shadow-2xl">
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HowitWorks;
