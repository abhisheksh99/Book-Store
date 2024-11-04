import React from "react";
import { useAuth } from "../../context/authContext";
import { useGetOrderByEmailQuery } from "../../store/features/orders/orderApi";

const Order = () => {
  const { user } = useAuth();
  const { data, isLoading, isError, error } = useGetOrderByEmailQuery(user?.email);

  console.log("Fetched orders data:", data);
  const orders = Array.isArray(data) ? data : (data?.orders || []);
  console.log("Processed orders:", orders);

  if (isLoading) {
    return <div className="container mx-auto p-6 text-center text-xl font-semibold">Loading orders...</div>;
  }

  if (isError) {
    return <div className="container mx-auto p-6 text-center text-xl text-red-600">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Orders</h1>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out hover:shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">Order ID: {order._id}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-700"><span className="font-semibold">Name:</span> {order.name}</p>
                  <p className="text-gray-700"><span className="font-semibold">Email:</span> {order.email}</p>
                  <p className="text-gray-700"><span className="font-semibold">Phone:</span> {order.phone}</p>
                </div>
                <div>
                  <p className="text-gray-700"><span className="font-semibold">Total Price:</span> ${order.totalPrice}</p>
                  <p className="text-gray-700"><span className="font-semibold">Address:</span> {order.address}, {order.city}, {order.state}, {order.country}, {order.zipcode}</p>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Products:</h3>
              <ul className="bg-gray-50 rounded-lg p-4 space-y-2">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between items-center border-b border-gray-200 py-2 last:border-b-0">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-gray-600">Quantity: {item.quantity} - Price: ${item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default Order;