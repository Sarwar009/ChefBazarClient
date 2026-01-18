import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosSecure from "../../../api/AxiosSecure";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/reviews")
      .then((res) => {
        const latestFour = res.data
          .sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
          .slice(0, 4);

        setReviews(latestFour);
      })
      .catch((err) =>
        console.error("Failed to load reviews", err)
      );
  }, []);

  if (!reviews.length) {
    return (
      <section className="py-16 text-center">
        <p>No reviews yet</p>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((r) => (
          <motion.div
            key={r._id}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="border border-gray-200 rounded-2xl p-6 flex gap-5 h-full"
          >
            {/* Avatar */}
            <div className="shrink-0">
              <img
                src={r.reviewerImage || r.foodImage}
                alt={r.reviewerName}
                className="w-14 h-14 rounded-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold leading-tight">
                    {r.reviewerName}
                  </h4>
                  <p className="text-xs mt-0.5">
                    {r.foodCategory}
                  </p>
                </div>

                <div className="text-yellow-400 text-sm whitespace-nowrap">
                  {"★".repeat(Number(r.rating))}
                  {"☆".repeat(5 - Number(r.rating))}
                </div>
              </div>

              {/* Comment */}
              <p className="mt-3 text-sm leading-relaxed line-clamp-3">
                {r.comment}
              </p>

              {/* Footer */}
              <p className="text-xs mt-auto pt-3">
                {new Date(
                  r.createdAt || r.date
                ).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
