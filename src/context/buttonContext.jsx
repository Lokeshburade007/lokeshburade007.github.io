import { createContext, useState } from "react";

export const ButtonContext = createContext(null);

export const ButtonProvider =(props)=>{

    const [filterVisible,setFilterVisible] = useState(false);

    return (
        <ButtonContext.Provider value={{filterVisible,setFilterVisible}}>{props.children}</ButtonContext.Provider>
    )
}