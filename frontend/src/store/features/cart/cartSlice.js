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
      if (!existingItem) {
        state.cartItems.push(action.payload);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product added to the cart",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "Item already in cart",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok"
        });
      }
    },
    removeFromCart: (state,action) =>{
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
    },
    clearCart: (state) => {
        state.cartItems = []
    }
  },
});

export const { addToCart,removeFromCart,clearCart } = cartSlice.actions;

export default cartSlice.reducer;
