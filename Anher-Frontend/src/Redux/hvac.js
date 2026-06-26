import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  users: null,
  logo:null
 
};

const HvacStoreSlice = createSlice({
  name: "HvacStore",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = action.payload


    },
    removeUser: (state, action) => {
      state.users = null
    },
    addLogo:(state,action)=>{
      state.logo=action.payload
    }
   
  }
});

export const { addUser, removeUser ,addLogo} = HvacStoreSlice.actions;
export default HvacStoreSlice.reducer;
