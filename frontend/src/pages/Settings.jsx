import React from 'react'

export default function Settings({ isDarkMode, setIsDarkMode }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-orange-100 text-sm mt-1">Customize your experience</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-2xl mx-auto">
          {/* Theme Settings */}
          <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Enable dark theme for better visibility at night</p>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    isDarkMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* API Settings */}
          <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Backend URL</label>
                <input
                  type="text"
                  value="http://localhost:8000"
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Your backend API endpoint</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Top-K Results</label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value={3}>3 Results</option>
                  <option value={5}>5 Results (default)</option>
                  <option value={10}>10 Results</option>
                </select>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Number of source documents to retrieve per query</p>
              </div>
            </div>
          </div>

          {/* Model Settings */}
          <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Model Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Embedding Model:</span>
                <span className="font-medium text-gray-900 dark:text-white">BAAI/bge-small-en-v1.5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Vector Store:</span>
                <span className="font-medium text-gray-900 dark:text-white">Qdrant</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">LLM Provider:</span>
                <span className="font-medium text-gray-900 dark:text-white">Google Generative AI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Relevance Threshold:</span>
                <span className="font-medium text-gray-900 dark:text-white">0.62</span>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Application:</strong> RAG-based Document Question Answering System</p>
              <p><strong>Version:</strong> 1.0.0</p>
              <p><strong>Frontend:</strong> React + Vite + Tailwind CSS</p>
              <p><strong>Backend:</strong> FastAPI + Qdrant + Sentence Transformers</p>
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                © 2026 DocBot. A modern RAG-based system for document Q&A. No authentication required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
