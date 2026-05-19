import React, { useState } from 'react'

export default function SourceCard({ source }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`${source.filename} (${source.category})`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 flex items-start gap-3 hover:shadow-md transition-shadow">
      <div className="text-xl">📄</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{source.filename}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">Category: {source.category}</p>
      </div>
      <button
        onClick={handleCopy}
        className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors whitespace-nowrap"
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
    </div>
  )
}
