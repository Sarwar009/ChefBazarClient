import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now just toast
    toast.success("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8">
        Contact Us
      </h1>

      <p className="text-center text-lg mb-12">
        Have questions or feedback? Send us a message or find us on the map below.
      </p>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            required
            className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition resize-none"
          ></textarea>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition"
          >
            Send Message
          </button>
        </motion.form>

        {/* Map Section */}
        <motion.div
          className="flex-1 h-96 rounded-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <iframe
            title="ChefBazar Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0000000000!2d90.4125!3d23.8103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c00000000000%3A0x0000000000000000!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1699999999999!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
