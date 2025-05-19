import { useEffect, useState } from "react";

export default function useTasks() {

    const [tasks, setTasks] = useState([])

    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${url}/tasks`)
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => console.log(err))
    }, [])

    const addTask = () => {

    }

    const removeTask = () => {

    }

    const updateTask = () => {

    }


    const dataTask = {
        tasks,
        addTask,
        removeTask,
        updateTask
    }
    return  dataTask


}