import axios from 'axios'
import React, { useEffect, useState } from 'react'


const News = () => {
    let [article,setArticle] = useState([])
    let [isloading,setIsLoading] = useState(true)
    let [error,setError] = useState("")

    useEffect(()=>{
        axios.get("http://localhost:4000/Product")
        .then((res)=>{
                setArticle(res.data)
        })
        .catch((err)=>{
            setError(err.message  || "Something Went Wrong")
            setTimeout(()=>setError(""),4000)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    },[])

    return{article,isloading,error}
}

export default News