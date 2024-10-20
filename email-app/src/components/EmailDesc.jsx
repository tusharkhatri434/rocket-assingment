import Parser from 'html-react-parser/lib/index';
import React, { useEffect, useState } from 'react'
import { useDateFinder } from '../utils/useDateFinder';
import { useDispatch, useSelector } from 'react-redux';
import { markFavourite, unMarkmarkFavourite } from '../utils/mailSlice';

const EmailDesc = ({data}) => {
 
  const[desData,setDesData] = useState(0);
  const {date,month,year,time} = useDateFinder(data.date);
  const [mark,unMark] = useState(false);
  const dispatch = useDispatch();
  const favouriteMails = useSelector((state)=>state.mails.favourite);
  
  useEffect(()=>{
   fetchData();
  },[data]);

  async function fetchData(){
    try {
      console.log("hello",data);
      const res = await fetch(`https://flipkart-email-mock.vercel.app/?id=${data.id}`);
      const json = await res.json();
      setDesData(json);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }
if(desData==0){
  return;
}

function unMarkHandler(){
  const obj = {id:data.id,updates:{favourite:false}};
  dispatch(unMarkmarkFavourite(obj))
}
 function markFavouriteHandler(){
  const isPresent = favouriteMails.find(item=>item.id===data.id);
  if(isPresent){
    unMarkHandler();
    return;
  }
  const obj = {id:data.id,updates:{favourite:true}};
  dispatch(markFavourite(obj))
 }

  // console.log(data);

  return (
    <div className='w-[75vw] border h-[85vh] bg-white border-[#cfd2dc] rounded-md overflow-y-auto hide-scrollbar'>
      <div className='flex justify-between items-center'>
      <div className='ml-6'>
        <img src="#" alt="logo" />
        <div>
          <p>Subject : {data.subject} </p>
          <p>{`${date}-${(month<10)?`0${month}`:`${month}`}-${year}`}</p><span>{time}</span>
        </div>
      </div>
      {
        (data.favourite) ?  <button onClick={unMarkHandler} className='px-4 py-2 rounded-md border bg-pink-400 text-white'>undo</button>: <button onClick={markFavouriteHandler} className='px-4 py-2 rounded-md border bg-pink-400 text-white'>Mark as favourite</button>
      }
     
      </div>
      <div className='custum-padding w-11/12'>
      {Parser(desData.body)}
      </div>
    </div>
  )
}

export default EmailDesc