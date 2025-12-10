import React from "react";

const OrderModal = ({ isOpen, onClose, handleOrderConfirm, totalPrice }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-3 text-center">
          Confirm Your Order
        </h2>

        <p className="text-center text-gray-700 mb-4">
          Total Price: <span className="font-bold">${totalPrice}</span>
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={handleOrderConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
