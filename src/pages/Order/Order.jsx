import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router";
import OrderModal from "../../components/Modal/OrderModal";
import Swal from "sweetalert2";

const Order = () => {
  const { user } = useAuth();
  const location = useLocation();

  // hooks ALWAYS go first
  const [quantity, setQuantity] = useState(1);
  const [userAddress, setUserAddress] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const selectedMeal = location.state;
  // const navigate = useNavigate()

  // NOW return condition below hooks
  if (!selectedMeal) return <p>No meal selected!</p>;

  const BackendApI = import.meta.env.VITE_API_URL;

  // auto values
  const mealName = selectedMeal.mealName;
  // const image = selectedMeal.foodImage;
  const price = selectedMeal.foodPrice;
  const chefId = selectedMeal.chefId;
  const chefName = selectedMeal.chefName;
  const foodId = selectedMeal._id;
  const foodImage = selectedMeal.foodImage;
  const foodRating = selectedMeal.foodRating;

  const totalPrice = price * quantity;

  const openModal = () => {
    if (!userAddress.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter delivery address!",
      });
      return;
    }
    setModalOpen(true);
  };

  const handleOrderConfirm = async () => {
    if (!userAddress.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter delivery address!",
      });
      return;
    }

    const orderData = {
      foodRating,
      chefName,
      foodImage,
      foodId,
      mealName,
      price,
      quantity,
      chefId,
      userEmail: user?.email,
      userAddress,
      paymentStatus: "Pending",
      orderStatus: "pending",
      orderTime: new Date().toISOString(),
    };

    try {
      await axios.post(`${BackendApI}/orders`, orderData);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Order placed successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.log(error);
    }

    setModalOpen(false);
    
    // navigate('/my-orders')
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>

      <div className="space-y-4">
        <div>
          <label className="font-semibold">Meal Name</label>
          <input
            value={mealName}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Price</label>
          <input
            value={totalPrice}
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
            value={chefId}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Your Email</label>
          <input
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
          onClick={openModal}
          className="w-full bg-green-600 text-white py-2 rounded-md font-semibold"
        >
          Confirm Order
        </button>
      </div>
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        handleOrderConfirm={handleOrderConfirm}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default Order;
