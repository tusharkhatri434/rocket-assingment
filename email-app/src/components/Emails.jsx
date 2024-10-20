import React, { useCallback, useState } from 'react'
import EmailCard from './EmailCard'
import EmailDesc from './EmailDesc'
import { useDispatch, useSelector } from 'react-redux'
import { openDes } from '../utils/desSlice'

const Emails = ({data}) => {
  const[d,setShowDes] = useState(false);
  const[desData,setDesData] = useState({});
  const showDes = useSelector((state)=>state.desOpen.value);
  const dispatch = useDispatch();

   const toogle = useCallback( function(data){
    setDesData(data)
    // setShowDes(true);
    dispatch(openDes());
    },[data])

 const style = (!showDes) ? "w-full":"";
    // console.log(data.list);
    if(data.length<1){
      return;
    }
  return (
    <div className='flex gap-1 m-3'>
        <div className={`h-[88vh] overflow-y-auto hide-scrollbar ${style}`}>
        {data.map((email)=>{
           return <EmailCard key={email.id} data={email} openMail={toogle}/>
        })}
        </div>
        {(showDes)?<EmailDesc data={desData}/>:null}
    </div>
  )
}

export default Emails