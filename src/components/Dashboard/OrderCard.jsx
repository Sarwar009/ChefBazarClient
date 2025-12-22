import StripePayment from "./StripePayment";

export default function OrderCard({ order, setOrders }) {
  const {
    foodName,
    foodImage,
    price,
    orderStatus,
    quantity,
    paymentStatus,
    chefId,
    estimatedDeliveryTime,
    totalPrice,
  } = order;
  


  return (
    <div className="bg-white text-black shadow rounded-lg p-4 flex flex-col justify-between">
      <div>
        <img src={foodImage} alt={foodName} className="w-full h-32 object-cover rounded mb-2" />
        <h3 className="font-bold text-lg mb-2">{foodName}</h3>
        <p><strong>Status:</strong> {orderStatus}</p>
        <p><strong>Price per item:</strong> ${price}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Total:</strong> ${totalPrice}</p>
        <p><strong>Chef:</strong> ({chefId})</p>
        <p><strong>Payment:</strong> {paymentStatus}</p>
        {estimatedDeliveryTime && (
          <p>
            <strong>Delivery Time:</strong> {estimatedDeliveryTime} mins
          </p>
        )}
      </div>

      {/* Show Pay button only if order accepted & payment pending */}
      {orderStatus === "accepted" && paymentStatus !== "paid" && (
        <StripePayment order={order} setOrders={setOrders} />
      )}
    </div>
  );
}
