import { memo } from "react"
import { Link } from "react-router-dom"

const TaskRow = memo(({ tasks }) => {

    return (
        <>
            <tbody>
                {
                    tasks.map((t) => {
                        const { id, title, status, createdAt } = t

                        return (
                            <tr key={id} >
                                <td>
                                    <Link to={`/task/${id}`}>{title}</Link>
                                </td>
                                <td className={
                                    status === "To do" ? "table-danger" :
                                        status === "Doing" ? "table-warning" :
                                            status === "Done" ? "table-success" : null
                                } >
                                    {status}
                                </td>
                                <td>{new Date(createdAt).toLocaleDateString()}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </>


    )


});

export default TaskRow