import { useGlobalContext } from "../context/GlobalContext"

import TaskRow from "../components/TaskRow"

export default function TaskList() {
    const { task } = useGlobalContext()

    return (
        <div>
            <h1>Sono la lista delle task</h1>
            <table class="table text-center">
                <thead>
                    <tr>
                        <th scope="col-4">Nome</th>
                        <th scope="col-4">Stato</th>
                        <th scope="col-4">Data Creazione</th>
                    </tr>
                </thead>
                <TaskRow task={task} />
            </table>



        </div>

    )
}