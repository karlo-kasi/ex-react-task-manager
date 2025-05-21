import { useGlobalContext } from "../context/GlobalContext"
import { useCallback, useMemo, useState } from "react"
import TaskRow from "../components/TaskRow"


function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
}


export default function TaskList() {
    const { tasks } = useGlobalContext()

    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)

    const [searchQuery, setSearchQuery] = useState("")

    const handleSort = (value) => {
        if (sortBy === value) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(value)
            setSortOrder(1)
        }
    }

    const statusOrder = {
        "To do": 0,
        "Doing": 1,
        "Done": 2
    }

    const debounceSearch = useCallback(
        debounce(setSearchQuery, 500), [])


    const sortedTasks = useMemo(() => {

        const newArray = [...tasks]

        const filtered = newArray.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
        console.log(filtered)

        filtered.sort((a, b) => {
            if (sortBy === "title") {
                return a.title.localeCompare(b.title) * sortOrder
            } else if (sortBy === "status") {
                return (statusOrder[a.status] - statusOrder[b.status]) * sortOrder
            } else {
                return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder
            }
        })

        return filtered

    }, [tasks, sortBy, sortOrder, searchQuery])

    return (
        <div className="mt-4">
            <h1 className="text-center mb-4">Sono la lista delle task</h1>

            <div className="mb-3">
                <label htmlFor="searchInput" className="form-label">Cerca</label>

                <div className="position-relative">
                    <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>

                    <input
                        type="search"
                        className="form-control ps-5"
                        onChange={(e) => debounceSearch(e.target.value)}
                        placeholder="Cerca una task..."
                    />
                </div>
            </div>

            <table className="table table-striped table-bordered text-center">
                <thead className="table-dark">
                    <tr>
                        <th
                            className="col-6 text-white"
                            onClick={() => handleSort("title")}
                        >
                            Nome {sortBy === "title" ? (sortOrder === 1 ? "↑" : "↓") : ""}
                        </th>
                        <th
                            className="col-2 text-white"
                            onClick={() => handleSort("status")}
                        >
                            Stato {sortBy === "status" ? (sortOrder === 1 ? "↑" : "↓") : ""}
                        </th>
                        <th
                            className="col-4 text-white"
                            onClick={() => handleSort("createdAt")}
                        >
                            Data Creazione {sortBy === "createdAt" ? (sortOrder === 1 ? "↑" : "↓") : ""}
                        </th>
                    </tr>
                </thead>
                <TaskRow tasks={sortedTasks} />
            </table>
        </div>

    )
}