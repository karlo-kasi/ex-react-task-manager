import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext()

export default function GlobalProvider({ children }) {

    const url = import.meta.env.VITE_API_URL
    const [task, setTask] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/tasks`)
                const data = await response.json()
                setTask(data)
                console.log(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()

    }, [])


    const value = {
        task,
        setTask
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

// Hook personalizzato per utilizzare il contesto
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};