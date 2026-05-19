import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import ChatPage from './pages/ChatPage'
import Dashboard from './pages/Dashboard'
import Datasets from './pages/Datasets'
import LiveNews from './pages/LiveNews'
import Settings from './pages/Settings'
import AuthPage from './pages/AuthPage'

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (savedUser && token) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setCurrentPage('dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />
      case 'chat':
        return <ChatPage />
      case 'datasets':
        return <Datasets />
      case 'news':
        return <LiveNews />
      case 'settings':
        return <Settings isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} user={user} onLogout={handleLogout} />
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />
    }
  }

  if (loading) {
    return (
      <div className="h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return <AuthPage onLogin={handleLogin} />
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} user={user} onLogout={handleLogout} />
        <main className="flex-1 overflow-hidden">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
