import { useMemo, useRef, useState } from "react"

const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~`

export default function AddTask() {

    const [isOpenAlert, setisOpenAlert] = useState(false)

    const [title, setTitle] = useState("")
    const description = useRef()
    const select = useRef()

    const isTitleValid = useMemo(() => {
        const charValid = title.split("").some((char) => symbols.includes(char.toLowerCase()))
        return !charValid
    }, [title])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isTitleValid || !title || !description.current.value || !select.current.value) {
            return setisOpenAlert(true)
        } else {
            console.log({
                Nome: title,
                Descrizione: description.current.value,
                Stato: select.current.value
            })
            setisOpenAlert(false)
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
                            <label className="form-label">Nome del task</label>
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
                                        {isTitleValid ? "Username valido" : "Inserisci un Username valido (Non usare Caratteri Speciali)."}
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
                                aria-label="Default select example"
                                defaultValue="to-do"
                            >
                                <option value="to-do">To do</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                            </select>
                        </div>

                        <div className='d-grid mb-4'>
                            <button
                                className='btn btn-primary'
                                type="submit"
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