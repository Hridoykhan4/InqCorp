import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"


export const ScrollTop = () => {
 const {pathname, hash}=useLocation()

 useLayoutEffect(()=>{
    if (!hash) {
      window.scrollTo({ left: 0, top: 0, behavior: "auto" })
      return undefined
    }

    const scrollToAnchor = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) target.scrollIntoView({ block: "start", behavior: "auto" })
    }

    scrollToAnchor()
    const shortRetry = window.setTimeout(scrollToAnchor, 200)
    const lazySectionRetry = window.setTimeout(scrollToAnchor, 1000)
    return () => {
      window.clearTimeout(shortRetry)
      window.clearTimeout(lazySectionRetry)
    }
 },[pathname, hash])
 return null
}
