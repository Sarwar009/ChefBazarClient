import { motion } from "framer-motion";

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "50K+", label: "Orders Delivered" },
  { value: "100+", label: "Chefs" },
  { value: "20+", label: "Cities Covered" },
];

const Statistics = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 px-4"
    >
      {/* Section Title */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
          Our Impact in Numbers
        </h2>
        <p className="text-sm max-w-xl mx-auto">
          Trusted by thousands of food lovers across the country
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-8 shadow-2xl rounded-2xl flex flex-col justify-center"
          >
            <h3 className="text-3xl font-bold mb-1">
              {stat.value}
            </h3>
            <p className="text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Statistics;
