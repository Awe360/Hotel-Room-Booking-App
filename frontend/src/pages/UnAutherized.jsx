import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function UnAutherized() {
    const navigate=useNavigate()
    const goToHomePage=()=>{
      navigate('/')
    }
  return (
    <div className='text-center mt-20 text-2xl'>
      <h1 className='text-3xl text-center font-serif'>Access Denied</h1>
      <h1 className='font-serif ' >You are UnAutherized to access admin page</h1>
      <button className="btn mx-auto flex gap-1 items-center mt-20" onClick={goToHomePage}> <FaArrowLeft size={20} />Go Back To HomePage</button>
    </div>
  )
}

export default UnAutherized
