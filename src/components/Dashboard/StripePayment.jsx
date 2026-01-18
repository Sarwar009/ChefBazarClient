import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosSecure from "../../api/AxiosSecure";

export default function StripePayment({ order, setOrders }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      const { data } = await axiosSecure.post(
        "/create-payment-intent",
        { amount: order.totalPrice },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) throw new Error(result.error.message);

      await axiosSecure.patch(`/orders/${order._id}/pay`, {
        paymentInfo: result.paymentIntent,
      });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === order._id ? { ...o, paymentStatus: "paid" } : o
        )
      );

      navigate(`/payment-success?orderId=${order._id}`);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <CardElement className="p-2 border rounded mb-2" />
      <button
        onClick={handlePay}
        disabled={loading}
        className="px-4 py-2 rounded disabled:opacity-50 bg-emerald-500"
      >
        {loading ? "Processing..." : `Pay $${order.totalPrice}`}
      </button>
    </div>
  );
}
