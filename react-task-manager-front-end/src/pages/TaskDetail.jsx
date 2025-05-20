import { useParams } from "react-router-dom"
import { useGlobalContext } from "../context/GlobalContext";

export default function TaskDetail() {

    const { id } = useParams()

    const { tasks } = useGlobalContext();

    console.log(tasks)

    const task = tasks.find((t) => t.id === parseInt(id))

    if (!task) {
        return <h2>Task non trovata</h2>
    }

    const deleteTask = () => {
        console.log(`Elimina Task: ${id}`)
    }

    console.log(task)
    return (
        <div className="mt-4">
            <h1 className="text-center">Dettaglio della task</h1>
            <div className="card mt-2">
                <h5 className="card-header">Task: {task.id}</h5>
                <div className="card-body">
                    <p className="card-text"><strong>Nome:</strong> {task.title}</p>
                    <p className="card-text"><strong>Descrizione:</strong> {task.description}</p>
                    <p className="card-text"><strong>Stato:</strong> {task.status}</p>
                    <p className="card-text"><strong>Data:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
                    <button
                        onClick={deleteTask}
                        className="btn btn-danger"
                    >
                        Elimina
                    </button>
                </div>
            </div>

        </div>
    )
}