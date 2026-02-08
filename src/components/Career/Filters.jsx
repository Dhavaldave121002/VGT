import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Filters({ filter, setFilter }) {
  const filters = ['All', 'Full-time', 'Part-time', 'Remote']

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
      <div className="flex flex-wrap gap-2 p-1.5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 w-full md:w-auto">
        {filters.map(f => (
          <button
            key={f}
            className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all relative ${filter === f ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            onClick={() => setFilter(f)}
          >
            {filter === f && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/30"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{f}</span>
          </button>
        ))}
      </div>

      <Link
        to="/contact"
        className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 group"
      >
        Contact HR <span className="group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </div>
  )
}
