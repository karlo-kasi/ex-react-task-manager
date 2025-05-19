import { useGlobalContext } from "../context/GlobalContext"

import TaskRow from "../components/TaskRow"

export default function TaskList() {
    const { tasks } = useGlobalContext()

    return (
        <div className="mt-4">
            <h1 className="text-center mb-4">Sono la lista delle task</h1>
            <table className="table table-striped table-bordered text-center">
                <thead className="table-dark">
                    <tr>
                        <th className="col-6 text-white">Nome</th>
                        <th className="col-2 text-white">Stato</th>
                        <th className="col-4 text-white">Data Creazione</th>
                    </tr>
                </thead>
                <TaskRow tasks={tasks} />
            </table>
        </div>

    )
}