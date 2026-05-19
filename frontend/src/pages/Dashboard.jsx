import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export default function Dashboard({ setCurrentPage }) {
  const [activityFilter, setActivityFilter] = useState('All')
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [activities, setActivities] = useState([])
  const [realStats, setRealStats] = useState({ total_queries: 0, answered_queries: 0, unanswered_queries: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activitiesRes, statsRes] = await Promise.all([
          axios.get('/api/activities'),
          axios.get('/api/stats')
        ])
        setActivities(activitiesRes.data)
        setRealStats(statsRes.data)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Refresh every 30 seconds for "real-time" feel
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const chartData = realStats.daily_counts || [
    { day: 'Mon', count: 0 },
    { day: 'Tue', count: 0 },
    { day: 'Wed', count: 0 },
    { day: 'Thu', count: 0 },
    { day: 'Fri', count: 0 },
    { day: 'Sat', count: 0 },
    { day: 'Sun', count: 0 },
  ]

  const stats = [
    {
      label: 'Documents Ingested',
      value: realStats.doc_count || '0',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'blue'
    },
    {
      label: 'Queries Asked',
      value: realStats.total_queries || '0',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      color: 'green'
    },
    {
      label: 'Avg Response Time',
      value: '1.2s',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'orange'
    },
    {
      label: 'Unanswered Queries',
      value: realStats.unanswered_queries || '0',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 17c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: 'amber'
    },
  ]


  const filteredActivity = activities.filter(item =>
    activityFilter === 'All' || item.type === activityFilter
  )

  const systemStatus = [
    { label: 'Backend API', status: 'Connected', color: 'green' },
    { label: 'Database', status: 'Active', color: 'green' },
    { label: 'Embeddings', status: 'Ready', color: 'green' },
    { label: 'Last sync', status: 'Today at 09:42 AM', color: 'green', suffix: '✓' },
  ]

  const docCategories = [
    { label: 'Schemes', count: 21, barColor: 'bg-indigo-500', bgColor: 'bg-indigo-50', textColor: 'text-indigo-600' },
    { label: 'Guidelines', count: 7, barColor: 'bg-blue-500', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { label: 'Regulations', count: 6, barColor: 'bg-purple-500', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
    { label: 'Circular', count: 1, barColor: 'bg-green-500', bgColor: 'bg-green-50', textColor: 'text-green-600' },
  ]

  const topQueries = [
    { text: "What are AICTE faculty norms?", count: 12 },
    { text: "How to implement IDP guidelines?", count: 9 },
    { text: "Research internship mandatory rules", count: 7 },
    { text: "Stipend policy for interns", count: 5 },
    { text: "Autonomy criteria AICTE 2020", count: 4 },
  ]

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 shadow-sm shrink-0">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-purple-100 text-sm mt-1">System overview and statistics</p>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-8 pb-12">

          {/* Row 1: Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-[12px] border border-gray-200 p-[20px_24px] shadow-sm relative overflow-hidden group hover:border-purple-200 transition-all duration-150 ease-in-out">
                <div className="relative z-10">
                  <p className="text-[13px] font-medium text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-[28px] font-bold text-gray-900 leading-tight">{stat.value}</p>
                </div>

                <div className="absolute top-4 right-4 text-gray-100 transition-transform group-hover:scale-110 duration-150 ease-in-out">
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Query Trend Chart */}
          <div className="bg-white p-[20px_24px] rounded-[12px] border border-gray-200 shadow-sm">
            <h3 className="text-[15px] font-semibold text-gray-900 mb-6">Query volume — last 7 days</h3>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: 'none', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="count" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 font-medium text-center">
              Average {(chartData.reduce((acc, curr) => acc + curr.count, 0) / 7).toFixed(1)} queries/day
            </p>
          </div>

          {/* Row 3: Activity & Status */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">

            {/* Left: Recent Activity (60%) */}
            <div className="lg:col-span-6 bg-white rounded-[12px] border border-gray-200 shadow-sm flex flex-col h-[520px]">
              <div className="p-[20px_24px] border-b border-gray-50 flex items-center justify-between">
                <h3 className="text-[15px] font-semibold text-gray-900">Recent activity</h3>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  {['All', 'Queries', 'System'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActivityFilter(tab)}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-150 ease-in-out ${activityFilter === tab
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {activities.length > 0 ? (
                  filteredActivity.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => item.type === 'Queries' && setSelectedActivity(item)}
                      className={`flex items-center justify-between p-[16px_24px] border-b border-gray-50 transition-colors duration-150 ease-in-out ${item.type === 'Queries' ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${item.color === 'green' ? 'bg-green-500' :
                          item.color === 'purple' ? 'bg-purple-500' :
                          item.color === 'amber' ? 'bg-amber-500' :
                          'bg-blue-500'
                          }`}></div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{item.timestamp}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${item.color === 'green' ? 'bg-green-50 text-green-600 border-green-100' :
                        item.color === 'purple' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                        item.color === 'amber' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-blue-50 text-blue-600 border-blue-100'
                        } border`}>
                        {item.status === 'Answered' && '✓ '}
                        {item.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">No activity yet</p>
                    <p className="text-xs text-gray-500 mt-1">When you start asking questions, they will appear here.</p>
                  </div>
                )}
              </div>

              <div className="p-4 text-center border-t border-gray-50">
                <button className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-150 ease-in-out">View all activity →</button>
              </div>
            </div>

            {/* Right: System Status (40%) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-[20px_24px]">
                <h3 className="text-[15px] font-semibold text-gray-900 mb-6">System status</h3>
                <div className="space-y-6">
                  {systemStatus.map((row, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 font-medium">{row.label}</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 bg-green-500 rounded-full animate-pulse`}></div>
                        <span className={`text-sm font-semibold text-green-600`}>
                          {row.status} {row.suffix}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-150 ease-in-out">
                  Refresh status
                </button>
              </div>

            </div>
          </div>

          {/* Row 4: Categories & Top Queries */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Document Categories (50%) */}
            <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-[20px_24px] flex flex-col">
              <div className="mb-6">
                <h3 className="text-[15px] font-semibold text-gray-900">Document Categories</h3>
                <p className="text-sm text-gray-500 mt-1 font-medium">35 documents across 4 categories</p>
              </div>

              <div className="flex-1 space-y-6">
                {docCategories.map((cat, i) => {
                  const percentage = (cat.count / 35) * 100;
                  return (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-700 font-bold">{cat.label}</span>
                        <span className="text-xs font-bold text-gray-500">{cat.count} docs</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className={`${cat.barColor} h-2 rounded-full transition-all duration-1000`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>

            {/* Right: Top Queries (50%) */}
            <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-[20px_24px] flex flex-col">
              <div className="mb-6">
                <h3 className="text-[15px] font-semibold text-gray-900">Most asked questions</h3>
                <p className="text-sm text-gray-500 mt-1 font-medium">Last 7 days</p>
              </div>

              <div className="flex-1 space-y-2">
                {topQueries.map((q, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 ease-in-out group">
                    <span className="text-sm font-bold text-gray-400 group-hover:text-purple-500 transition-colors w-4">{i + 1}</span>
                    <p className="flex-1 text-sm text-gray-700 truncate font-medium">"{q.text}"</p>
                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-md">
                      {q.count}×
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Row 6: Recently Ingested Documents */}
          <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-[20px_24px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[15px] font-semibold text-gray-900">Recently ingested documents</h3>
              <button 
                onClick={() => setCurrentPage('datasets')}
                className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-150 ease-in-out"
              >
                View all in Datasets →
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
              {[
                { name: 'aicte regulations 2020.pdf', cat: 'Regulations', bgColor: 'bg-purple-50', textColor: 'text-purple-600', time: '1 hour ago', status: 'Indexed' },
                { name: '1713699_IDP-Guidelines.pdf', cat: 'Guidelines', bgColor: 'bg-blue-50', textColor: 'text-blue-600', time: '3 hours ago', status: 'Indexed' },
                { name: '2051511_Internship-Research-Internship-Guidelines.pdf', cat: 'Guidelines', bgColor: 'bg-blue-50', textColor: 'text-blue-600', time: '5 hours ago', status: 'Indexed' },
              ].map((doc, i) => (
                <div key={i} className="min-w-[240px] p-4 rounded-[12px] border border-gray-200 bg-gray-50/50 hover:border-purple-200 transition-all duration-150 ease-in-out group">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${doc.bgColor} ${doc.textColor}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${doc.bgColor} ${doc.textColor} border border-gray-100`}>
                      {doc.cat}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-gray-900 truncate mb-1 group-hover:text-purple-600 transition-colors duration-150 ease-in-out">{doc.name}</p>
                  <p className="text-[11px] text-gray-500 mb-3">Ingested {doc.time}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold flex items-center gap-1 ${doc.status === 'Indexed' ? 'text-green-600' : 'text-amber-600 animate-pulse'}`}>
                      {doc.status === 'Indexed' ? '✓ Indexed' : 'Processing...'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-purple-600 p-6 text-white flex items-center justify-between">
              <h3 className="text-xl font-bold">Query Details</h3>
              <button onClick={() => setSelectedActivity(null)} className="p-2 hover:bg-purple-500 rounded-full transition-colors text-2xl leading-none">✕</button>
            </div>
            <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">User Question</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white leading-relaxed">"{selectedActivity.question}"</p>
              </div>

              <div>
                <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">DocBot Answer</p>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-xl border border-purple-100 dark:border-purple-800/50">
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{selectedActivity.answer}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Sources Cited ({selectedActivity.sources?.length || 0})</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedActivity.sources?.length > 0 ? (
                    selectedActivity.sources.map((source, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                        <span className="text-xl">📄</span>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{source}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">No specific sources cited for this response.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setSelectedActivity(null)}
                className="px-6 py-2.5 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-all shadow-md shadow-purple-100 dark:shadow-none"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}



