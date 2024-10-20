import React, { useEffect, useState } from 'react'
import Emails from './Emails'
import { useDispatch, useSelector } from 'react-redux';
import { setUnreadMails,allMails } from '../utils/mailSlice';
import { closeDes } from '../utils/desSlice';

const Body = () => {

  const [emailData,setEmailData] = useState(null);
  const dispatch = useDispatch();

  const mails = useSelector((state)=>state.mails);
  console.log(mails);

  useEffect(()=>{
    fetchData();
  },[]);

  async function fetchData(){
    try {
      const data = await fetch("https://flipkart-email-mock.vercel.app/");
      const json = await data.json();
      const newArray = json.list.map((obj)=>{
        return {...obj,favourite:false};
      });
      console.log("newarray",newArray);
      setEmailData(newArray);
      dispatch(setUnreadMails(newArray));
      dispatch(allMails(newArray))
    } catch (error) {
      console.log(error);
    }
  }

  function allMail(){
    setEmailData(mails.allMails);
    dispatch(closeDes());
  }

  function unReadMail(){
    setEmailData(mails.unread);
    dispatch(closeDes());
  }

  function readMail(){
    setEmailData(mails.read);
    dispatch(closeDes());
  }

  function favouriteMails(){
    setEmailData(mails.favourite);
    dispatch(closeDes());
  }


if(emailData==null){
  return;
}

return (
    <section>
      <div className='p-4 text-xl space-x-2 btn'>
      <span>Filtered By : </span> 
      <button onClick={allMail}>All mails</button>
      <button onClick={unReadMail}>Unread</button>
      <button onClick={readMail}>Read</button>
      <button onClick={favouriteMails}>Favourite</button>
    </div>
      <Emails data={emailData}/>
    </section>
  )
}

export default Body