import { createContext, useState } from "react";

export const LoaderContext = createContext(null);

export const LoaderProvider =(props)=>{

    const [navLoad,setNavLoad] = useState(true);
    const [isLoading,setIsLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{navLoad,setNavLoad,isLoading,setIsLoading}}>{props.children}</LoaderContext.Provider>
    )
}