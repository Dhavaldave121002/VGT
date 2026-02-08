import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaArrowRight, FaSearch } from 'react-icons/fa'
import { api } from '../utils/api'
import ApplyModal from '../components/Career/ApplyModal'
import RecruiterBox from '../components/Career/RecruiterBox'
import PageHero from '../components/UI/PageHero'
import SEO from '../components/SEO'

export default function Career() {
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState(null)
  const [applyData, setApplyData] = useState({
    name: '', email: '', phone: '', message: '', jobId: ''
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [errors, setErrors] = useState({})
  const [jobs, setJobs] = useState([])

  const filters = ['All', 'Full-time', 'Part-time', 'Remote', 'Internship']

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await api.fetchAll('jobs');
        if (data && Array.isArray(data)) {
          setJobs(data);
        } else {
          setJobs([]);
        }
      } catch (err) {
        console.error("Failed to fetch jobs", err);
        setJobs([]);
      }
    };
    loadJobs();
  }, []);

  // Helper to handle both JSON strings and comma-separated strings
  const safeParse = (input) => {
    if (Array.isArray(input)) return input;
    if (!input || typeof input !== 'string') return [];
    try {
      const parsed = JSON.parse(input);
      return Array.isArray(parsed) ? parsed : [input];
    } catch (e) {
      return input.split(',').map(s => s.trim()).filter(Boolean);
    }
  };

  // Safe processing of jobs
  const processedJobs = (Array.isArray(jobs) ? jobs : []).map(job => {
    const safeJob = { ...job };
    safeJob.title = job.title || 'Untitled Position';
    safeJob.type = job.type || 'Full-time';
    safeJob.location = job.location || 'Remote';
    safeJob.about = job.about || job.description || 'No description available.';

    // Safety for arrays using safeParse
    safeJob.skills = safeParse(job.skills);
    safeJob.responsibilities = safeParse(job.responsibilities);
    safeJob.qualifications = safeParse(job.qualifications || job.requirements);

    return safeJob;
  });

  const filteredJobs = processedJobs.filter(j =>
    filter === 'All' ? true :
      filter === 'Remote' ? (j.location || '').toLowerCase().includes('remote') :
        j.type === filter
  )

  try {
    return (
      <div className="min-h-screen bg-[#030712] relative overflow-hidden font-sans selection:bg-blue-500/30">
        <SEO
          title="Careers"
          description="Join the Vertex Global Tech team. We are hiring talented developers, designers, and innovators to build the future of digital."
          keywords="careers, jobs, hiring, tech jobs, developer jobs, vertex global tech careers"
        />

        {/* Background Ambience */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[100px] mix-blend-screen opacity-50"></div>
        </div>

        <div className="relative z-10">
          <PageHero
            title="Join the Vertex Team"
            highlight="Vertex"
            subtitle="Be part of a team that's defining the future of digital experiences. We build with passion, precision, and purpose."
            badge="We are hiring"
          />

          <div className="container mx-auto px-6 pb-32">
            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 p-4 bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-2xl max-w-7xl mx-auto shadow-xl">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
                {filters.map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`relative px-5 py-2.5 rounded-xl text-sm font-black transition-all duration-300 border ${filter === f
                      ? 'text-white bg-blue-600 border-blue-500'
                      : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <span className="relative z-10 uppercase tracking-widest">{f}</span>
                  </button>
                ))}
              </div>
              <div className="hidden md:block text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                <span className="text-white">{filteredJobs.length}</span> Open Positions
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
              {/* Job List */}
              <div className="lg:col-span-8 space-y-6">
                <AnimatePresence mode='wait'>
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="group bg-white/[0.02] border border-white/5 hover:border-blue-500/30 rounded-3xl p-8 transition-all duration-500 relative overflow-hidden"
                      >
                        <div className="flex flex-col md:flex-row justify-between md:items-start gap-6 mb-8">
                          <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-4 uppercase tracking-tighter">
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap gap-4">
                              <span className="flex items-center gap-2 text-xs font-black text-gray-500 uppercase tracking-widest">
                                <FaBriefcase className="text-blue-500" /> {job.type}
                              </span>
                              <span className="flex items-center gap-2 text-xs font-black text-gray-500 uppercase tracking-widest">
                                <FaMapMarkerAlt className="text-purple-500" /> {job.location}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => setExpanded(expanded === job.id ? null : job.id)}
                            className="px-6 py-2 text-xs font-black uppercase tracking-widest text-blue-400 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-white/5"
                          >
                            {expanded === job.id ? 'Hide Details' : 'See Details'}
                          </button>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                          {job.about}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
                          <div className="flex flex-wrap gap-2">
                            {(job.skills || []).slice(0, 3).map(skill => (
                              <span key={skill} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-blue-500/5 text-blue-400/60 border border-blue-500/10">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={() => {
                              setApplyData(d => ({ ...d, jobId: job.id, jobTitle: job.title }))
                              setModalOpen(true)
                            }}
                            className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-900/40 transition-all flex items-center justify-center gap-3 group/btn"
                          >
                            Send Application <FaArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                          </button>
                        </div>

                        {/* Expanded Section */}
                        <AnimatePresence>
                          {expanded === job.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="bg-white/[0.01] rounded-2xl mt-8 p-8 border border-white/5 overflow-hidden"
                            >
                              <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                  <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-[10px] text-blue-500 italic">Responsibilities</h4>
                                  <ul className="space-y-3">
                                    {(job.responsibilities || []).map((r, i) => (
                                      <li key={i} className="text-xs text-gray-500 flex gap-3"><span className="text-blue-600">●</span> {r}</li>
                                    ))}
                                    {job.responsibilities.length === 0 && <li className="text-xs text-gray-600">Refer to job description.</li>}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-[10px] text-purple-500 italic">Target Qualifications</h4>
                                  <ul className="space-y-3">
                                    {(job.qualifications || []).map((r, i) => (
                                      <li key={i} className="text-xs text-gray-500 flex gap-3"><span className="text-purple-600">●</span> {r}</li>
                                    ))}
                                    {job.qualifications.length === 0 && <li className="text-xs text-gray-600">Refer to job description.</li>}
                                  </ul>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))
                  ) : (
                    <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                      <h3 className="text-xl font-bold text-white mb-2">No roles match your filter</h3>
                      <button onClick={() => setFilter('All')} className="text-blue-500 font-bold hover:underline">Show all positions</button>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4 space-y-8">
                <RecruiterBox />
                <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/10 text-center">
                  <h4 className="text-lg font-bold text-white mb-3">Custom Role?</h4>
                  <p className="text-xs text-gray-400 mb-6 leading-relaxed uppercase tracking-widest">We are always scouting for top 1% talent. Pitch us your own role.</p>
                  <Link to="/contact" className="inline-block w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                    Open Speculative Application
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ApplyModal
          show={modalOpen}
          onClose={() => setModalOpen(false)}
          applyData={applyData}
          setApplyData={setApplyData}
          errors={errors}
          setErrors={setErrors}
          jobs={jobs}
        />
      </div>
    )
  } catch (err) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center p-10">
        <div className="bg-red-500/10 border border-red-500 p-8 rounded-2xl text-white">
          <h2 className="text-2xl font-bold mb-4">Software Deployment Error</h2>
          <p className="text-sm font-mono">{err.message}</p>
          <pre className="mt-4 text-[10px] opacity-50 overflow-auto">{err.stack}</pre>
        </div>
      </div>
    )
  }
}
