// Footer.jsx
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const el = footerRef.current;

    gsap.fromTo(
      el,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      }
    );
  }, []);

  const socialIcons = [
  { icon: <FaFacebookF />, link: "https://facebook.com" },
  { icon: <FaInstagram />, link: "https://instagram.com" },
  { icon: <FaTwitter />, link: "https://twitter.com" },
];

  return (
    <footer
      ref={footerRef}
      className="bg-gray-900 text-gray-200 pt-16 pb-10 mt-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-emerald-400 mb-4">
              ChefBazar
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Fresh meals, local chefs, and premium flavors delivered to your door.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📍 Dhaka, Bangladesh</li>
              <li>📞 +880 1XX-XXXXXXX</li>
              <li>✉️ hello@chefbazar.com</li>
            </ul>
          </motion.div>

          {/* Working Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-3">Working Hours</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex justify-between">
                <span>Mon - Fri</span> <span>9 AM - 9 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span> <span>10 AM - 6 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span> <span className="text-red-300">Closed</span>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              {socialIcons.map((icon) => (
                <motion.a
                  key={icon}
                  href={icon.link}
                  whileHover={{ scale: 1.15 }}
                  className="p-2 rounded-full bg-gray-800 hover:bg-emerald-500 transition"
                >
                  {icon.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ChefBazar — All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
