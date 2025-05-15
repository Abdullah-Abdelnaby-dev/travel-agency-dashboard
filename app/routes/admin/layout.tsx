import { Outlet } from "react-router"
import Dashboard from "./dashboard"
import Post from "./post"

const Layout = () => {
  return (
    <div className="flex ml-1.5 gap-1.5">
    <Outlet/>
    </div>
  )
}

export default Layout
