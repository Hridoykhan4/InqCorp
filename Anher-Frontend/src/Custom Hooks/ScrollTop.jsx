import { useEffect } from "react"
import { useLocation } from "react-router-dom"


export const ScrollTop = () => {
 const {pathname}=useLocation()

 useEffect(()=>{
    window.scrollTo({
      behavior: "smooth",
      top: 0
    })
 },[pathname])
 return null
}
