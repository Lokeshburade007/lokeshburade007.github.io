/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const QueryContext = createContext(null);

export const QueryProvider =(props)=>{

    const [query,setQuery] = useState(null);

    return (
        <QueryContext.Provider value={{query,setQuery}}>{props.children}</QueryContext.Provider>
    )
}