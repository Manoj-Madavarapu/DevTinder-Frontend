import { createSlice } from "@reduxjs/toolkit"

const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>action.payload,
        removeUserFeed:(state,action)=>{
            const newArray=state.filter(x=>x._id!==action.payload);
            return newArray;
        }
    }
})

export const {addFeed,removeUserFeed}=feedSlice.actions;

export default feedSlice.reducer;