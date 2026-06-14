import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function AppLayout() {
  return (
    <div className="flex h-full bg-surface-base">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-[#F8FAFC] ">
        <Outlet />
      </main>
    </div>
  )
}