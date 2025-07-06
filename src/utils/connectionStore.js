import { createSlice } from "@reduxjs/toolkit";

const connectionSlice=createSlice({
    name:"connection",
    initialState:null,
    reducers:{
        addConnection:(state,action)=>action.payload,
        removeConection:(state,action)=>null
    }
    
})

export const{addConnection,removeConection}=connectionSlice.actions;
export default connectionSlice.reducer;
