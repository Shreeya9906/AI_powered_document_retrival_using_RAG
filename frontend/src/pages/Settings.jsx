import React from 'react'

export default function Settings({ isDarkMode, setIsDarkMode, user, onLogout }) {
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U'

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-8 shadow-md">
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-purple-100 text-sm mt-1 opacity-90">Manage your profile and preferences</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-xl mx-auto space-y-6">
          
          {/* User Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-purple-500/20">
                {userInitial}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name || 'User'}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium">{user?.phone_number}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold rounded-full uppercase tracking-wider">
                  Administrator
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Status</p>
                <p className="text-sm font-semibold text-green-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Active Now
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Joined</p>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">May 2026</p>
              </div>
            </div>
          </div>

          {/* Preferences Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Preferences</h3>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  {isDarkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.071 16.071l.707.707M7.929 7.929l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Dark Mode</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
                </div>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none ${
                  isDarkMode ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Danger Zone / Logout */}
          <div className="pt-4">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-3 py-4 bg-white dark:bg-gray-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold rounded-2xl border border-gray-100 dark:border-gray-700 transition-all shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout from Account
            </button>
          </div>

        </div>
      </div>
      
      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">DocBot System v1.0.0</p>
      </div>
    </div>
  )
}
