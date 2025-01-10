import { createSlice } from '@reduxjs/toolkit';


let initialState = {
    
        cartItems: []
      
  };
  
  let slice = createSlice({
    name: "cart",
    initialState,
    reducers : {
        addToCart : (state,action) => {
          state.cartItems.push(action.payload)
        },

        removeFromCart : (state,action) => {
          state.cartItems.splice(action.payload, 1)
        },
        clearMyCart : (state,action) => {
          state.cartItems = []
        }
    }
  });
  
  export const{addToCart, removeFromCart,clearMyCart} = slice.actions
  export default slice.reducer;
   
