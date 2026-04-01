import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatPage from './pages/ChatPage'
import Dashboard from './pages/Dashboard'
import Datasets from './pages/Datasets'
import LiveNews from './pages/LiveNews'
import Settings from './pages/Settings'

export default function App() {
  const [currentPage, setCurrentPage] = useState('chat')
  const [isDarkMode, setIsDarkMode] = useState(false)

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'chat':
        return <ChatPage />
      case 'datasets':
        return <Datasets />
      case 'news':
        return <LiveNews />
      case 'settings':
        return <Settings isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      default:
        return <ChatPage />
    }
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 overflow-hidden">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
