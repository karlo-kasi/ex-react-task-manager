import NavBar from "../components/NavBar"
import { Outlet } from "react-router-dom"

export default function DefaultLayout() {
    return (
        <>
            <NavBar />
            <main className="container">
                <Outlet />
            </main>
        </>


    )
}