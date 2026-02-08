import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function JobCard({ job, expanded, setExpanded, setApplyData, setModalOpen }) {
  return (
    <article className="group bg-[#0f172a]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 lg:p-8 hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 relative overflow-hidden">
      {/* Hover Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* Sidebar Meta */}
        <div className="w-full lg:w-40 flex-shrink-0 flex flex-col items-start lg:items-end lg:text-right border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0 lg:pr-6">
          <span className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-lg mb-2">
            {job.type}
          </span>
          <div className="text-gray-400 text-sm font-medium">{job.location}</div>
        </div>

        {/* Main Content */}
        <div className="flex-grow w-full">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
            <h5 className="text-xl lg:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {job.title}
            </h5>
            <span className="text-gray-500 text-sm font-medium whitespace-nowrap bg-white/5 px-3 py-1 rounded-full">
              {job.seniority}
            </span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-3xl">
            {job.about}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {job.skills.map(s => (
              <span key={s} className="px-3 py-1 bg-white/5 text-gray-300 text-xs font-semibold rounded-full border border-white/5 group-hover:border-blue-500/20 group-hover:text-blue-200 transition-colors">
                {s}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg hover:shadow-blue-600/20 active:scale-95"
              onClick={() => {
                setApplyData(d => ({ ...d, jobId: job.id, jobTitle: job.title }))
                setModalOpen(true)
              }}
            >
              Apply now
            </button>

            <button
              className="px-6 py-2 bg-transparent border border-white/10 hover:bg-white/5 text-white text-sm font-medium rounded-lg transition-all"
              onClick={() => setExpanded(prev => prev === job.id ? null : job.id)}
            >
              {expanded === job.id ? 'Hide details' : 'View details'}
            </button>
          </div>

          <AnimatePresence>
            {expanded === job.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-8 mt-6 border-t border-white/10 grid md:grid-cols-2 gap-8">
                  <div>
                    <h6 className="text-white font-bold mb-4 flex items-center gap-2">
                      <span className="text-blue-500">▶</span> Responsibilities
                    </h6>
                    <ul className="space-y-2">
                      {job.responsibilities.map((r, i) => (
                        <li key={i} className="text-gray-400 text-sm leading-relaxed flex items-start gap-2">
                          <span className="text-blue-500 mt-1">✓</span> {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h6 className="text-white font-bold mb-4 flex items-center gap-2">
                      <span className="text-blue-500">▶</span> Qualifications
                    </h6>
                    <ul className="space-y-2">
                      {job.qualifications.map((q, i) => (
                        <li key={i} className="text-gray-400 text-sm leading-relaxed flex items-start gap-2">
                          <span className="text-blue-500 mt-1">✓</span> {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </article>
  )
}
