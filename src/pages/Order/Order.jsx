import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Order = ({ selectedMeal }) => {
  const { user } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [userAddress, setUserAddress] = useState("");

  // auto-filled fields
  const mealName = selectedMeal.mealName;
  const price = selectedMeal.price;
  const chefId = selectedMeal.chefId;
  const foodId = selectedMeal._id;

  const totalPrice = price * quantity;

  const handleOrderConfirm = async () => {
    if (!userAddress.trim()) {
      toast.error("Please enter delivery address!");
      return;
    }

    // Show total price message (simple)
    toast(`Total price: $${totalPrice}`);

    const orderData = {
      foodId,
      mealName,
      price,
      quantity,
      chefId,
      paymentStatus: "Pending",
      userEmail: user?.email,
      userAddress,
      orderStatus: "pending",
      orderTime: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:5000/orders", orderData);
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
      
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>

      <div className="space-y-4">
        <div>
          <label className="font-semibold">Meal Name</label>
          <input
            type="text"
            value={mealName}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Price</label>
          <input
            type="text"
            value={price}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="font-semibold">Chef ID</label>
          <input
            type="text"
            value={chefId}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Your Email</label>
          <input
            type="text"
            value={user?.email}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Delivery Address</label>
          <textarea
            rows="3"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            placeholder="Enter delivery address"
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

        <button
          onClick={handleOrderConfirm}
          className="w-full bg-green-600 text-white py-2 rounded-md font-semibold"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Order;
