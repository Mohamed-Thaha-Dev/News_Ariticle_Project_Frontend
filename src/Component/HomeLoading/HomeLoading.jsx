import React from 'react'
import {Mosaic} from "react-loading-indicators"

const HomeLoading = () => {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
     <Mosaic color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} size='medium'text="Loading" textColor='red'/>
    </div>
  )
}

export default HomeLoading