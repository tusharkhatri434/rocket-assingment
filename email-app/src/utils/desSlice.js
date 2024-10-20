import { createSlice } from "@reduxjs/toolkit";

const desSlice = createSlice({
    name:"desToggle",
    initialState:{
        value:false
    },
    reducers:{
        openDes:(state)=>{
            state.value = true;
        },
        closeDes:(state)=>{
            state.value = false;
        }
        }
    })

export const {openDes,closeDes} = desSlice.actions;
export default desSlice.reducer;