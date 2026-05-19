import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import MessageBubble from '../components/MessageBubble'
import SourceCard from '../components/SourceCard'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi! I\'m your RAG Assistant. Ask me anything about the documents in my knowledge base.', sender: 'system', timestamp: new Date() }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [topK, setTopK] = useState(5)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post('/api/chat', {
        query: input,
        filters: {},
        top_k: topK
      })

      const systemMessage = {
        id: messages.length + 2,
        text: response.data.answer,
        sender: 'system',
        sources: response.data.sources || [],
        timestamp: new Date()
      }
      setMessages(prev => [...prev, systemMessage])
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: '❌ Error: Could not fetch response. Please check your connection.',
        sender: 'system',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Chat</h2>
        <p className="text-purple-100 text-sm mt-1">Ask questions about your documents</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-800">
        {messages.map((msg) => (
          <div key={msg.id}>
            <MessageBubble message={msg} />
            {msg.sources && msg.sources.length > 0 && (
              <div className="mt-2 ml-12 space-y-2">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Sources:</p>
                {msg.sources.map((source, idx) => (
                  <SourceCard key={idx} source={source} />
                ))}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-center">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Settings Row */}
          <div className="mb-3 flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Top-K Results:</label>
            <select 
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              className="text-sm px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
              placeholder="Ask a question about the documents..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors font-medium"
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
