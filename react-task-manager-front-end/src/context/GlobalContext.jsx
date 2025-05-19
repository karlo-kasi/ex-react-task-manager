import { createContext, useContext, useState, useEffect } from "react";

import useTasks from "../hooks/useTask";

const GlobalContext = createContext()

export default function GlobalProvider({ children }) {

    const dataTask = useTasks()


    return (
        <GlobalContext.Provider value={{ ...dataTask }}>
            {children}
        </GlobalContext.Provider>
    )
}

// Hook personalizzato per utilizzare il contesto
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};