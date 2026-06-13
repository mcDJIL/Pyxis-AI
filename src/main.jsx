import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#111318',
          color: '#F0F2F8',
          border: '1px solid #222738',
          borderRadius: '10px',
          fontSize: '14px',
        },
        success: { iconTheme: { primary: '#22D87A', secondary: '#111318' } },
        error:   { iconTheme: { primary: '#F45B69', secondary: '#111318' } },
      }}
    />
  </React.StrictMode>,
)