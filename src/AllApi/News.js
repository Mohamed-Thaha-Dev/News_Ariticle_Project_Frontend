
import axios from 'axios'
import React, { useEffect, useState } from 'react'


const News = () => {
    let [article,setArticle] = useState([])
    let [isloading,setIsLoading] = useState(true)
    let [error,setError] = useState("")

    useEffect(()=>{
        axios.get("http://localhost:8080/news/home")
        .then((res)=>{
                setArticle(res.data)
        })
        .catch((err)=>{
            console.log(err)
            setError(err.message || "Something Went Wrong")
            setTimeout(()=>setError(""),4000)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    },[])

    return{article,isloading,error}
}

export default News