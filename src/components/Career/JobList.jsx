```javascript
// src/components/Career/JobList.jsx
import React from 'react'
import { JOBS } from './jobs-data'
import JobCard from './JobCard'

export default function JobList({ filter, expanded, setExpanded, applyData, setApplyData, setModalOpen }) {

  const filtered = JOBS.filter(j =>
    filter === 'All'
      ? true
      : filter === 'Remote'
      ? j.location.toLowerCase().includes('remote')
      : j.type === filter
  )

  return (
    <section className="space-y-6">
      {filtered.map(job => (
        <JobCard
          key={job.id}
          job={job}
          expanded={expanded}
          setExpanded={setExpanded}
          applyData={applyData}
          setApplyData={setApplyData}
          setModalOpen={setModalOpen}
        />
      ))}

      {filtered.length === 0 && (
        <div className="bg-blue-900/10 border border-blue-500/20 text-blue-200 rounded-xl p-8 text-center backdrop-blur-md">
          No roles match this filter. Email us at
          {' '}
          <a href="mailto:hr@vertexglobaltech.com" className="text-blue-400 hover:text-blue-300 font-bold underline decoration-blue-500/30 underline-offset-4">hr@vertexglobaltech.com</a>.
        </div>
      )}
    </section>
  )
}
```