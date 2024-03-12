import { Link, Outlet } from "react-router-dom"

const Dashboard = () => {
  return (
    <div className="grid grid-cols-3 h-screen">
        <div className="grid-span-1 bg-slate-200 p-3">
            <ul>
                <li className="py-2 text-[#3b5d50]"><Link to="/dashboard/products">Products</Link></li>
                <li className="text-[#3b5d50]"><Link to="/dashboard/categories">Categories</Link></li>
            </ul>
        </div>
        <div className="grid-span-2 p-3">
            <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard