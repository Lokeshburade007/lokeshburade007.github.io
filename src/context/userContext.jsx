/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { auth, database } from "../database/firebaseConfig";
import {onAuthStateChanged} from "firebase/auth"
import { doc, getDoc } from "firebase/firestore";

export const UserContext = createContext(null);

export const UserProvider  = (props) => {

    const [user,setUser]= useState(null);

    useEffect(()=>{
        getUser(); 
    },[]);

    const getUser =()=>{
        onAuthStateChanged(auth, async (currentUser) => {
            if(currentUser){
                const docRef = doc(database,"users",currentUser.uid);
                const docSnap = await getDoc(docRef);
                if(docSnap.data()){
                    setUser({uid:currentUser.uid,profile:docSnap.data()});
                }
            }
        });
      
    }

    return (
        <UserContext.Provider value={{user,setUser}}>{props.children}</UserContext.Provider>
    )
}