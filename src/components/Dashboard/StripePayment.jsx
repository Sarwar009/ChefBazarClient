import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

export default function StripePayment({ order }) {
  const stripe = useStripe();
  const elements = useElements();
  const API_URL = import.meta.env.VITE_API_URL;

  const handlePay = async () => {
    // 1. Create payment intent
    const { data } = await axios.post(`${API_URL}/create-payment-intent`, {
      amount: order.mealInfo.foodPrice * order.quantity
    });

    // 2. Confirm Card Payment
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (result.error) return alert(result.error.message);

    // 3. Update Order
    await axios.patch(`${API_URL}/orders/${order._id}/pay`, {
      paymentInfo: result.paymentIntent
    });

    alert('Payment Successful!');
    window.location.reload();
  };

  return (
    <div className="mt-3">
      <CardElement className="p-2 border rounded mb-2"/>
      <button onClick={handlePay} className="bg-green-500 text-white px-4 py-2 rounded">
        Pay ${order.mealInfo.foodPrice * order.quantity}
      </button>
    </div>
  );
}
