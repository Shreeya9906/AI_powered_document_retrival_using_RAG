import React from 'react'

export default function LiveNews() {
  const mockNews = [
    {
      title: 'New UGC Guidelines for Academic Programs Released',
      source: 'UGC Official',
      date: 'March 27, 2026',
      summary: 'The UGC has released new guidelines for pursuing two academic programs simultaneously, effective from the current academic session.',
      type: 'Guidelines',
    },
    {
      title: 'Scholarship Program Extended for SC/ST Students',
      source: 'Ministry of Education',
      date: 'March 25, 2026',
      summary: 'Expanded scholarship eligibility criteria announced. Educational assistance increased by 15% for marginalized students.',
      type: 'Schemes',
    },
    {
      title: 'AICTE Updates Apprenticeship Embedded Degree Program',
      source: 'AICTE',
      date: 'March 24, 2026',
      summary: 'New guidelines for AEDP implementation in institutions, focusing on skill development and industry collaboration.',
      type: 'Regulations',
    },
    {
      title: 'Important Circular on Autonomous Colleges Operations',
      source: 'UGC',
      date: 'March 22, 2026',
      summary: 'Clarifications issued on autonomy regulations and maintenance of standards in autonomous colleges across India.',
      type: 'Circulars',
    },
    {
      title: 'PhD Excellence Citation Guidelines Updated',
      source: 'Higher Education Council',
      date: 'March 20, 2026',
      summary: 'New citation standards and research excellence criteria introduced for PhD programs in Indian universities.',
      type: 'Guidelines',
    },
    {
      title: 'Support Services for Students with Disabilities',
      source: 'Disability Support Division',
      date: 'March 18, 2026',
      summary: 'Enhanced support services and allowances for disabled students pursuing higher education. Reader and escort allowances increased.',
      type: 'Schemes',
    },
  ]

  const typeColors = {
    Guidelines: 'blue',
    Schemes: 'green',
    Regulations: 'purple',
    Circulars: 'orange',
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Live Updates</h2>
        <p className="text-red-100 text-sm mt-1">Latest government announcements and policy updates</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-2xl mx-auto space-y-4">
          {mockNews.map((news, idx) => {
            const typeColor = typeColors[news.type] || 'gray'
            const badgeColor = {
              blue: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100',
              green: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100',
              purple: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100',
              orange: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100',
              gray: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100',
            }[typeColor]

            return (
              <div key={idx} className="bg-white dark:bg-gray-700 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border-l-4 border-red-600 dark:border-red-400">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{news.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      📰 {news.source} • 📅 {news.date}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor} whitespace-nowrap ml-2`}>
                    {news.type}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{news.summary}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
