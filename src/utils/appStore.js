import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import requestReducer from "./requestStore";
import connectionReducer from "./connectionStore"
import searchReducer from "./searchStore"

const appStore=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        request:requestReducer,
        connection:connectionReducer,
        searchStore:searchReducer
    }
})
export default appStore;


// for managing the data we used redux toolkit
// configureStore is used to create a store
// user is the name of the slice
// userReducer is the reducer function that will handle the state changes for the user slice(we can pass whatever name we want in the place of userReducer in that the reducer function will be stored)