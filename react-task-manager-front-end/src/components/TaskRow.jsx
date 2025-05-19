import { memo } from "react"

const TaskRow = memo(({ tasks }) => {

    return (
        <>
            <tbody>
                {
                    tasks.map((t) => {
                        const { id, title, status, createdAt } = t

                        return (
                            <tr key={id} >
                                <td >{title}</td>
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