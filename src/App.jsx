import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './Components/layout/AppLayout'
import HomePage from './Pages/HomePage'
import DashboardPage from './Pages/DashboardPage'
import HistoryPage from './Pages/HistoryPage'
import SettingsPage from './Pages/SettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard/:id" element={<DashboardPage  />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}