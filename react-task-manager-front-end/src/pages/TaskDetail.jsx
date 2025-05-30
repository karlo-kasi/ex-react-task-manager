import { useParams, useNavigate } from "react-router-dom"
import { useGlobalContext } from "../context/GlobalContext";
import { useState } from "react";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";


export default function TaskDetail() {

    const navigate = useNavigate()

    const { id } = useParams()

    const { tasks, removeTask, updateTask } = useGlobalContext();

    const task = tasks.find((t) => t.id === parseInt(id))

    const [show, setShow] = useState(false)
    const [editModal, setEditModal] = useState(false)

    if (!task) {
        return <h2>Task non trovata</h2>
    }

    const handleDelete = async () => {

        try {
            await removeTask(id)
            alert("Task eliminata con successo!")
            navigate("/")
        } catch (error) {
            alert(error.message)
        }

    }

    const handleUpdate = async (updatedTask) => {
        try {
            await updateTask(updatedTask)
            setEditModal(false)
        } catch (error) {
            alert(error.message)
        }
    }

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
                    <div className="d-flex gap-3">
                        <button
                            onClick={() => setShow(true)}
                            className="btn btn-danger"
                        >
                            Elimina Task
                        </button>
                        <button
                            onClick={() => setEditModal(true)}
                            className="btn btn-primary"
                        >
                            Modifica Task
                        </button>
                    </div>



                    <Modal
                        title="Sei sicuro?"
                        content="Vuoi davvero eliminare questa task?"
                        show={show}
                        onClose={() => setShow(false)}
                        onConfirm={handleDelete}
                        confirmText="Elimina"
                    />


                    <EditTaskModal
                        task={task}
                        show={editModal}
                        onClose={() => setEditModal(false)}
                        onSave={handleUpdate}
                        confirmText="Modifica"
                    />
                </div>
            </div>

        </div>
    )
}