import StripePayment from "./StripePayment";

export default function OrderCard({ order, setOrders }) {
  const {
    mealInfo,
    orderStatus,
    quantity,
    paymentStatus,
    chefName,
    chefId,
  } = order;

  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg mb-2">{mealInfo.foodName}</h3>
        <p><strong>Status:</strong> {orderStatus}</p>
        <p><strong>Price:</strong> ${mealInfo.foodPrice}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Chef:</strong> {chefName} ({chefId})</p>
        <p><strong>Payment:</strong> {paymentStatus}</p>
      </div>

      {/* Show Pay button only if order accepted & payment pending */}
      {orderStatus === "accepted" && paymentStatus !== "paid" && (
        <StripePayment order={order} setOrders={setOrders} />
      )}
    </div>
  );
}
