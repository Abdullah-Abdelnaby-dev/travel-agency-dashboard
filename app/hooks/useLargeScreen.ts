import { useEffect, useState } from "react"

 export const useLargeScreen = ()=>{
    const [isLarge,setIsLarge]=useState<boolean| null >(null)

    useEffect(()=>{

        const checkScreenSize = ()=>{
            setIsLarge(window.innerWidth >= 1024)
        };
        checkScreenSize(); // Initial check

        window.addEventListener("resize", checkScreenSize);

        return ()=>{
            window.removeEventListener("resize", checkScreenSize);
        }

    },[])
    return isLarge
}