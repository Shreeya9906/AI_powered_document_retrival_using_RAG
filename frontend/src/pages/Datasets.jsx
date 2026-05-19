import React, { useState } from 'react'

export default function Datasets() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDataset, setSelectedDataset] = useState(null)
  const [viewingPDF, setViewingPDF] = useState(null)

  const mockDatasets = [
    {
      name: 'Scholarship Scheme',
      category: 'Schemes',
      categoryFolder: 'schemes',
      docs: 1,
      size: '0.7 MB',
      documents: [
        { filename: 'aicte 1.pdf', size: '0.7 MB', date: '2024-02-01' }
      ]
    },
    {
      name: 'UGC Guidelines',
      category: 'Guidelines',
      categoryFolder: 'guidelines',
      docs: 5,
      size: '4.1 MB',
      documents: [
        { filename: '1713699_IDP-Guidelines.pdf', size: '1.2 MB', date: '2024-01-10' },
        { filename: '1797652_Guidelines-for-PhD-Excellence-Citation.pdf', size: '0.9 MB', date: '2024-01-15' },
        { filename: '2051511_Internship-Research-Internship-Guidelines.pdf', size: '1.1 MB', date: '2024-01-20' },
        { filename: '5018065_RPL-GUIDELINES.pdf', size: '0.6 MB', date: '2024-02-05' },
        { filename: '6493421_UGC-Guidelines-pursuing-two-academic-programmes-simultaneously.pdf', size: '0.3 MB', date: '2024-02-10' },
      ]
    },
    {
      name: 'AICTE Regulations',
      category: 'Regulations',
      categoryFolder: 'regulations',
      docs: 4,
      size: '3.7 MB',
      documents: [
        { filename: '0367475_UGC-(Conferment-of-Autonomous-Status-upon-Colleges-and-Measures-for-Maintenance-of-Standards-in-Autonomous-Colleges)-Regulations,-2023.pdf', size: '1.2 MB', date: '2024-01-12' },
        { filename: '1881254_UGC-Promotion-of-Equity-in-HEIs-Regulations-2026.pdf', size: '0.8 MB', date: '2024-01-18' },
        { filename: '2998278_University-Grants-Commission-(Institutions-deemed-to-be-Universities)-Regulations,-2023.pdf', size: '1.0 MB', date: '2024-02-02' },
        { filename: 'aicte regulations 2020.pdf', size: '0.7 MB', date: '2024-02-08' },
      ]
    },
    {
      name: 'Disability Support',
      category: 'Schemes',
      categoryFolder: 'schemes',
      docs: 2,
      size: '1.8 MB',
      documents: [
        { filename: 'aicte disabled person.pdf', size: '0.9 MB', date: '2024-01-25' },
        { filename: 'disability 1.pdf', size: '0.9 MB', date: '2024-02-03' },
      ]
    },
    {
      name: 'Autonomous Colleges',
      category: 'Guidelines',
      categoryFolder: 'guidelines',
      docs: 3,
      size: '2.6 MB',
      documents: [
        { filename: '5018065_RPL-GUIDELINES.pdf', size: '0.9 MB', date: '2024-01-14' },
        { filename: '6493421_UGC-Guidelines-pursuing-two-academic-programmes-simultaneously.pdf', size: '0.8 MB', date: '2024-01-28' },
        { filename: '7822003_GUIDELINES-ON-PUBLIC-SELF-DISCLOSURE-BY-HIGHER-EDUCATION-INSTITUTIONS.pdf', size: '0.9 MB', date: '2024-02-07' },
      ]
    },
    {
      name: 'Office Circulars',
      category: 'Circulars',
      categoryFolder: 'circulars',
      docs: 1,
      size: '3.8 MB',
      documents: [
        { filename: '9110892_Circular-immovable-movable-property.pdf', size: '0.9 MB', date: '2024-02-10' }

      ]
    },
    {
      name: 'PhD Excellence',
      category: 'Guidelines',
      categoryFolder: 'guidelines',
      docs: 2,
      size: '1.5 MB',
      documents: [
        { filename: '1797652_Guidelines-for-PhD-Excellence-Citation.pdf', size: '0.8 MB', date: '2024-01-22' },
        { filename: '8273574_UGC-Guidelines-for-HEIs-to-Offer-Apprenticeship-Embedded-Degree-Programme-(AEDP).pdf', size: '0.7 MB', date: '2024-02-04' },
      ]
    },
    {
      name: 'Internship Programs',
      category: 'Guidelines',
      categoryFolder: 'guidelines',
      docs: 1,
      size: '0.9 MB',
      documents: [
        { filename: '2051511_Internship-Research-Internship-Guidelines.pdf', size: '0.9 MB', date: '2024-01-30' },
      ]
    },
  ]

  const categoryColors = {
    Guidelines: 'blue',
    Schemes: 'green',
    Regulations: 'purple',
    Circulars: 'orange',
  }

  const filteredDatasets = mockDatasets.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Datasets</h2>
        <p className="text-purple-100 text-sm mt-1">Browse available documents and PDF collections</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search datasets by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Found {filteredDatasets.length} dataset(s)</p>
          </div>

          {/* Datasets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDatasets.map((dataset, idx) => {
              const colorClass = categoryColors[dataset.category] || 'gray'
              const bgColor = {
                blue: 'bg-blue-50 dark:bg-blue-900',
                green: 'bg-green-50 dark:bg-green-900',
                purple: 'bg-purple-50 dark:bg-purple-900',
                orange: 'bg-orange-50 dark:bg-orange-900',
                gray: 'bg-gray-50 dark:bg-gray-700',
              }[colorClass]

              const badgeColor = {
                blue: 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100',
                green: 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100',
                purple: 'bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100',
                orange: 'bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-100',
                gray: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100',
              }[colorClass]

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDataset(dataset)}
                  className={`${bgColor} p-5 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transform transition-transform`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">📄</span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeColor}`}>
                      {dataset.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{dataset.name}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>📦 {dataset.docs} documents</span>
                    <span>💾 {dataset.size}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredDatasets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No datasets found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedDataset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white dark:bg-gray-900 w-full md:w-2/3 lg:w-1/3 rounded-t-2xl shadow-2xl max-h-screen overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedDataset.name}</h2>
                <p className="text-purple-100 text-sm mt-1">{selectedDataset.category} • {selectedDataset.document?.length || selectedDataset.docs} documents</p>
              </div>
              <button
                onClick={() => setSelectedDataset(null)}
                className="text-2xl font-bold hover:bg-purple-600 p-2 rounded-full transition"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Dataset Info */}
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase">Total Size</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedDataset.size}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase">Documents</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedDataset.docs}</p>
                  </div>
                </div>
              </div>

              {/* Documents List */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📋 Documents ({selectedDataset.documents?.length || 0})</h3>
                <div className="space-y-3">
                  {selectedDataset.documents?.map((doc, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-xl">📄</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white break-all">{doc.filename}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{doc.date}</p>
                          </div>
                        </div>
                        <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 px-2 py-1 rounded whitespace-nowrap ml-2">{doc.size}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => setViewingPDF(doc)}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition text-sm font-medium"
                        >
                          👁️ View
                        </button>
                        <button
                          onClick={() => {
                            const downloadUrl = `/api/download/${selectedDataset.categoryFolder}/${encodeURIComponent(doc.filename)}`;
                            window.location.href = downloadUrl;
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition text-sm font-medium"
                        >
                          ⬇️ Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Section */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  💡 Use the Chat feature to ask questions about these documents. The AI will search through and provide relevant answers with source references.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {viewingPDF && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl max-h-screen overflow-auto">
            {/* PDF Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold break-all">{viewingPDF.filename}</h2>
                <p className="text-purple-100 text-xs mt-1">📄 {viewingPDF.size} • 📅 {viewingPDF.date}</p>
              </div>
              <button
                onClick={() => setViewingPDF(null)}
                className="text-2xl font-bold hover:bg-purple-600 p-2 rounded-full transition"
              >
                ✕
              </button>
            </div>

            {/* PDF Preview Content */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 break-all">{viewingPDF.filename}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">PDF Document</p>

                {/* PDF Viewer Placeholder */}
                <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-12 mb-6 min-h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-4">📋</div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">PDF Preview</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Full PDF viewer requires a PDF library.<br />
                      Click "Download" to save the file locally.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      const downloadUrl = `/api/download/${selectedDataset.categoryFolder}/${encodeURIComponent(viewingPDF.filename)}`;
                      window.location.href = downloadUrl;
                      setViewingPDF(null);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition font-medium flex items-center gap-2"
                  >
                    ⬇️ Download This PDF
                  </button>
                  <button
                    onClick={() => setViewingPDF(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition font-medium"
                  >
                    Close
                  </button>
                </div>

                {/* File Info */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    File info: {viewingPDF.size} | Date: {viewingPDF.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
