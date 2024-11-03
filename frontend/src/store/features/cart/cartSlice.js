import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        // If item exists, increase the quantity
        existingItem.quantity += 1;
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Increased quantity in cart",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // If item doesn't exist, add it with quantity 1
        state.cartItems.push({ ...action.payload, quantity: 1 });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product added to the cart",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    removeFromCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item._id === action.payload._id);
      if (existingItem && existingItem.quantity > 1) {
        // Decrease quantity if more than one
        existingItem.quantity -= 1;
      } else {
        // Remove the item if quantity is 1
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
