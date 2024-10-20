import { createSlice } from "@reduxjs/toolkit";

export const mailSlice = createSlice({
    name:"emails",
    initialState:{
        allMails:[],
        unread:[],
        read:[],
        favourite:[]
    },
    reducers:{
        deleteUnreadMails:(state,action)=>{
            const arr = state.unread.filter((mail)=>(mail.id!=action.payload.id))
            state.unread = arr;
        },
        setUnreadMails:(state,action)=>{
            state.unread = action.payload;
        },
        readMail:(state,action)=>{
            state.read.push(action.payload);
        },
        markFavourite:(state,action)=>{
            const { id, updates } = action.payload;
            let item = null;
            const updateArray = (array) => {
              item = array.find(item => item.id === id);
                if (item) {
                  Object.assign(item, updates);
                }
              };
        
              // Update both arrays
              updateArray(state.allMails);
              updateArray(state.unread);
              updateArray(state.read);
              let newArr = state.favourite;
               state.favourite = [...newArr,item]
        },
        unMarkmarkFavourite:(state,action)=>{
            const { id, updates } = action.payload;
            const updateArray = (array) => {
                const item = array.find(item => item.id === id);
                if (item) {
                  Object.assign(item, updates);
                }
              };
        
              // Update both arrays
              updateArray(state.allMails);
              updateArray(state.unread);
              updateArray(state.read);
              const arr = state.favourite.filter((mail)=>(mail.id!=action.payload.id))
              state.favourite = arr;
        },
        allMails:(state,action)=>{
            state.allMails=action.payload;
        }
    }
})

export const {setUnreadMails,deleteUnreadMails,readMail,unMarkmarkFavourite,markFavourite,allMails} = mailSlice.actions;

export default mailSlice.reducer;