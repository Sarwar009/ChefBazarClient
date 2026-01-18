import { motion } from "framer-motion";
import Statistics from "../../components/Home/Statistics";
import Reviews from "../../components/Shared/Review/Review";

const AboutPage = () => {
  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Welcome to ChefBazar
          </h1>
          <p className="text-lg md:text-xl leading-relaxed">
            ChefBazar is a platform connecting talented home chefs with food lovers across the city. 
            We bring fresh, homemade meals straight to your doorstep, supporting local chefs and delivering quality every time.
          </p>
        </motion.div>
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src='https://www.eliorgroup.com/sites/www.eliorgroup.com/files/styles/article_image_medium/public/2018-07/Elior%20Group_Cr%C3%A9dit%20Lionel%20Barbe%20%2816%29.jpg.webp?itok=6_8Rt4YU'
            alt="Chef Team"
            className="rounded-3xl shadow-lg w-full object-cover"
          />
        </motion.div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
        {[
          { title: "Our Mission", desc: "To make homemade meals accessible while supporting local chefs." },
          { title: "Our Vision", desc: "To be the most trusted home-cooked food platform in the country." },
          { title: "Our Values", desc: "Quality, transparency, customer satisfaction, community support." },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl shadow-lg flex flex-col items-center transition-transform duration-300"
          >
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <Statistics />

      <Reviews />


    </motion.div>
  );
};

export default AboutPage;
