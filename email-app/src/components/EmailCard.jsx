import React, { memo } from 'react'
import { useDateFinder } from '../utils/useDateFinder';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUnreadMails, readMail } from '../utils/mailSlice';

function Card({openMail,data}){
  const {date,month,year,time} = useDateFinder(data.date);
  const dispatch = useDispatch();
  const mailsStore = useSelector((state)=>state.mails.read);
  
 console.log("render");
  
  function togleMailOpen(e){
    let valueIsPresent = mailsStore.find(item=>item.id==data.id);
    if(!valueIsPresent){
      dispatch(deleteUnreadMails(data));
      dispatch(readMail(data));
    }
    dispatch(deleteUnreadMails(data));
    openMail(data);
  }
  return (
    <div onClick={togleMailOpen} className='flex gap-1 border mx-2 mb-2 bg-white rounded-md text-[#636363] cursor-pointer border-[#cfd2dc]'>
      <p className='bg-[#e54065] text-white text-black p-2 rounded-full h-9 text-center ml-3 mt-2'>{data.from.email[0].toUpperCase()}</p>
        <ul className='gap-2 ml-5'>
          <li>From: <span className='font-bold'>{data.from.name} {data.from.email}</span></li>
          <li>Subject: <span className='font-bold'>{data.subject}</span></li>
          <li className='overflow-clip'>{data.short_description}</li>
          <li className='flex gap-2'>
            <p>{`${date}-${(month<10)?`0${month}`:`${month}`}-${year}`}</p>
            <span>{time}</span>
            <span className='text-[#e54065]'>{(data.favourite)?"favourite":null}</span>
            </li>
        </ul>
    </div>
  )
}

export default memo(Card)