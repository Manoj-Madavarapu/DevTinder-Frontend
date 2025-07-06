import { createSlice } from "@reduxjs/toolkit";

const searchSlice=createSlice({
    name:"searchStore",
    initialState:null,
    reducers:{
        addUsers:(state,action)=>action.payload,
        removeUsers:(state,action)=>null
    }
})

export const {addUsers,removeUsers}=searchSlice.actions
export default searchSlice.reducer;