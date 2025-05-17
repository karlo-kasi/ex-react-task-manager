import { memo } from "react"

const TaskRow = memo(({ task }) => {

    console.log("render")

    return (
        <>
            <tbody>
                {
                    task.map((t) => {
                        const { id, title, status, createdAt } = t

                        return (
                            <tr key={id} className={
                                status === "To do" ? "table-danger" :
                                    status === "Doing" ? "table-warning" :
                                        status === "Done" ? "table-success" : null
                            }>
                                <th scope="row">{title}</th>
                                <td>{status}</td>
                                <td>{createdAt}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </>


    )


});

export default TaskRow