import { configureStore } from "@reduxjs/toolkit";
import mailSlice from "./mailSlice";
import desSlice from "./desSlice";

export const store = configureStore({
    reducer:{
        mails:mailSlice,
        desOpen:desSlice
    }
})