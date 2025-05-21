import { useRef, useState } from "react"
import Modal from './Modal';
import { Form } from "react-router-dom";

export default function EditTaskModal({ show, onClose, task, onSave }) {

    const [editTask, setEditTask] = useState(task)

    const editFormRef = useRef()

    const changheEditTask = (key, event) => {
        setEditTask(prev => ({ ...prev, [key]: event.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(editTask)
    }

    const { title, description, status } = editTask

    return (
        <Modal
            title="Modifica Task"
            content={
                <form ref={editFormRef} onSubmit={handleSubmit} className="p-4">
                    <div className="row g-3">

                        <div className="col-12">
                            <label htmlFor="taskTitle" className="form-label">Nome Task</label>
                            <input
                                type="text"
                                id="taskTitle"
                                className="form-control"
                                value={title}
                                onChange={(event) => changheEditTask("title", event)}
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="taskDescription" className="form-label">Descrizione</label>
                            <textarea
                                id="taskDescription"
                                className="form-control"
                                rows="3"
                                value={description}
                                onChange={(event) => changheEditTask("description", event)}
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="taskStatus" className="form-label">Stato</label>
                            <select
                                id="taskStatus"
                                className="form-select"
                                value={status}
                                onChange={(event) => changheEditTask("status", event)}
                            >
                                {["To do", "Doing", "Done"].map((value, index) => (
                                    <option key={index}  value={value}>{value}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </form>
            }
            confirmText="Salva"
            show={show}
            onClose={onClose}
            onConfirm={() => editFormRef.current.requestSubmit()}
        />
    )
}