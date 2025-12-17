import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function StripePayment({ order, setOrders }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      // 1️⃣ Create payment intent
      const { data } = await axios.post(
  `${API_URL}/create-payment-intent`,
  { amount: order.totalPrice },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  }
);


      // 2️⃣ Confirm card payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) throw new Error(result.error.message);

      // 3️⃣ Update order payment status
      await axios.patch(`${API_URL}/orders/${order._id}/pay`, {
        paymentInfo: result.paymentIntent
      });

      // Update local state to mark order as paid
      setOrders(prev =>
        prev.map(o => (o._id === order._id ? { ...o, paymentStatus: "paid" } : o))
      );

      // Redirect to payment success page
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
      <CardElement className="p-2 border rounded mb-2"/>
      <button
        onClick={handlePay}
        disabled={loading}
        className=" px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay $${order.totalPrice}`}
      </button>
    </div>
  );
}
