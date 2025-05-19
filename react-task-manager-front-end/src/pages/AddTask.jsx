import { useMemo, useRef, useState } from "react"
import { useGlobalContext } from "../context/GlobalContext";


const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~`

export default function AddTask() {

    const { addTask } = useGlobalContext();

    const [isOpenAlert, setisOpenAlert] = useState(false)

    const [title, setTitle] = useState("")
    const description = useRef()
    const select = useRef()

    const isTitleValid = useMemo(() => {
        const charValid = title.split("").some((char) => symbols.includes(char.toLowerCase()))
        return !charValid
    }, [title])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isTitleValid || !title) {
            setisOpenAlert(true)
            return
        }
        setisOpenAlert(false)

        const newTask = {
            title: title.trim(),
            description: description.current.value,
            status: select.current.value
        }

        console.log(newTask)
        try {
            await addTask(newTask)
            alert("Task creata con successo!")
            setTitle("")
            description.current.value = ""
            select.current.value = ""
        } catch (error) {
            alert(error.message)
        }

    }



    return (
        <>
            <div className="mt-4">
                <h1 className="text-center mb-4">Aggiungi Task</h1>
                <div className="border p-4">
                    <form
                        onSubmit={handleSubmit}
                    >
                        {isOpenAlert && (
                            <div className="alert alert-danger d-flex align-items-center mt-3" role="alert">
                                <span className="me-2">⚠️</span>
                                <div>
                                    Tutti i campi sono obbligatori.
                                </div>
                            </div>
                        )}
                        <div className="mb-3">
                            <label className="form-label">Nome Task</label>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="form-control"
                                placeholder="Inserisci il tuo nome"
                            />
                            {title.trim() && (
                                <div>
                                    <p className={isTitleValid ? "text-success" : "text-danger"}>
                                        {isTitleValid ? "Username valido" : "Inserisci una task valida (Non usare caratteri speciali)."}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descrizione</label>
                            <input
                                type="text"
                                ref={description}
                                className="form-control"
                                placeholder="Inserisci una Descrizione"
                            />

                        </div>

                        <div className="mb-3">
                            <label className="form-label">Stato</label>
                            <select
                                ref={select}
                                className="form-select"
                            >
                                <option value="To do">To do</option>
                                <option value="Doing">Doing</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>

                        <div className='d-grid mb-4'>
                            <button
                                className='btn btn-success'
                                type="submit"
                                disabled={!title}
                            >
                                AGGIUNGI TASK
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>


    )
}