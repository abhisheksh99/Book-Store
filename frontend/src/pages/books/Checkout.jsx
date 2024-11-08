import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../store/features/orders/orderApi';


const Checkout = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    state: '',
    zipcode: '',
  });
  
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice * item.quantity, 0).toFixed(2);

  const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Order submitted");
    console.log("Form Data:", formData);
  
    const newOrder = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      state: formData.state,
      zipcode: formData.zipcode,
      totalPrice: totalPrice,
      items: cartItems.map((item) => ({
        id: item._id,
        title: item.title,
        quantity: item.quantity,
        price: item.newPrice,
      })),
    };
  
    console.log("New Order:", newOrder);
    
    try {
      const result = await createOrder(newOrder).unwrap();
      console.log("Order created successfully:", result);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, placed order!"
      })
      navigate("/orders")
    } catch (err) {
      console.error("Failed to create order:", err);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    console.log("Checkbox toggled:", !isChecked);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
          <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
          <p className="text-gray-500 mb-6">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>
        </div>

        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <form onSubmit={handleSubmit} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Personal Details</p>
              <p>Please fill out all the fields.</p>
            </div>

            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    required
                  />
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="email@domain.com"
                    required
                  />
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="+123 456 7890"
                    required
                  />
                </div>

                <div className="md:col-span-3">
                  <label htmlFor="address">Address / Street</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="country">Country / region</label>
                  <input
                    name="country"
                    id="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Country"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="state">State / province</label>
                  <input
                    name="state"
                    id="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    required
                  />
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="zipcode">Zipcode</label>
                  <input
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    value={formData.zipcode}
                    onChange={handleInputChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    required
                  />
                </div>

                <div className="md:col-span-5 mt-3">
                  <div className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="billing_same"
                      id="billing_same"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className="form-checkbox"
                      required
                    />
                    <label htmlFor="billing_same" className="ml-2">
                      I agree to the <Link className="underline underline-offset-2 text-blue-600">Terms & Conditions</Link> and <Link className="underline underline-offset-2 text-blue-600">Shopping Policy</Link>.
                    </label>
                  </div>
                </div>

                {isError && <div className="md:col-span-5 text-red-500">Error: {error?.data?.message || 'Failed to create order'}</div>}

                <div className="md:col-span-5 text-right">
                  <button
                    type="submit"
                    disabled={!isChecked || isLoading}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                  >
                    {isLoading ? 'Placing Order...' : 'Place an Order'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
