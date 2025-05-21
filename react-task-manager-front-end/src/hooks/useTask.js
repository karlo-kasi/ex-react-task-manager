import { useEffect, useState } from "react";



export default function useTasks(initialValue) {

    const [tasks, setTasks] = useState([])

    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${url}/tasks`)
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => console.log(err))
    }, [])

    const addTask = async (newTask) => {


        const response = await fetch(`${url}/tasks`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        })

        const data = await response.json()

        if (data.success === true) {
            setTasks((prevTask) => [...prevTask, data.task])
            return true
        } else {
            throw new Error(data.message || "Errore durante l'aggiunta della task")
        }

    }

    const removeTask = async (idTask) => {

        const response = await fetch(`${url}/tasks/${idTask}`, {
            method: 'DELETE'
        })

        const data = await response.json()

        console.log(data)

        if (data.success === true) {
            setTasks((prevTask) => prevTask.filter((t) => t.id !== idTask))
        } else {
            throw new Error(data.message || "Errore durante l'eliminazione della task")
        }

    }

    const updateTask = async (updatedTask) => {

        const response = await fetch(`${url}/tasks/${updatedTask.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask)
        })

        const data = await response.json()

        if (data.success === true) {
            setTasks(prev => prev.map((oldTask) => oldTask.id === data.task.id ? data.task : oldTask))
        } else {
            throw new Error(data.message || "Errore durante l'eliminazione della task")
        }

    }


    const dataTask = {
        tasks,
        addTask,
        removeTask,
        updateTask
    }
    return dataTask


}