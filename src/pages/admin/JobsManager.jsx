import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaBriefcase, FaMapMarkerAlt, FaClock, FaCheck, FaTimes, FaListUl } from 'react-icons/fa';

const DEFAULT_JOBS = [
  {
    id: 'fe-dev',
    title: 'Frontend Developer (React)',
    type: 'Full-time',
    location: 'Ahmedabad (Hybrid)',
    seniority: 'Mid-level',
    skills: ['React', 'Bootstrap', 'HTML', 'CSS', 'JS', 'REST'],
    about: 'Build pixel-perfect, accessible UI and reusable components for our SaaS platform.',
    responsibilities: [
      'Develop highly responsive user interfaces using React and Bootstrap.',
      'Collaborate closely with product designers and the backend team on API integration.',
      'Maintain high code quality through rigorous testing and code reviews.'
    ],
    qualifications: [
      '2+ years professional experience with React.',
      'Strong proficiency in modern JavaScript (ES6+), HTML5, and CSS3.',
      'A compelling portfolio demonstrating complex component work.'
    ]
  },
  {
    id: 'mobile-dev',
    title: 'Mobile Developer (Flutter)',
    type: 'Full-time',
    location: 'Remote',
    seniority: 'Mid-level',
    skills: ['Flutter', 'Dart', 'REST APIs', 'State Management'],
    about: 'Build fast and smooth cross-platform applications for iOS and Android.',
    responsibilities: [
      'Develop new features and maintain the existing mobile application using Flutter/Dart.',
      'Integrate with third-party APIs and services efficiently.',
      'Optimize application performance and memory usage for a fluid user experience.'
    ],
    qualifications: [
      '1.5+ years experience building and deploying Flutter applications.',
      'Deep understanding of mobile lifecycle and performance tuning.',
      'Links to published apps on the App Store or Google Play preferred.'
    ]
  },
  {
    id: 'uiux',
    title: 'UI/UX Designer',
    type: 'Part-time',
    location: 'Remote / Ahmedabad',
    seniority: 'Junior-Mid',
    skills: ['Figma', 'Prototyping', 'User Research', 'Accessibility'],
    about: 'Design modern, conversion-focused user interfaces and user experiences.',
    responsibilities: [
      'Create detailed wireframes, user flows, and high-fidelity prototypes.',
      'Plan and conduct usability tests and analyze user feedback.',
      'Maintain and expand our core design system components.'
    ],
    qualifications: [
      'Minimum 1 year of experience in a design role.',
      'Exceptional Figma portfolio demonstrating process and visual design skill.',
      'Solid understanding of UX principles and web accessibility standards.'
    ]
  }
];

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

const JobsManager = () => {
  const [jobs, setJobs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJob, setCurrentJob] = useState({
    id: '',
    title: '',
    type: 'Full-time',
    location: '',
    seniority: '',
    skills: [],
    about: '',
    responsibilities: [''],
    qualifications: ['']
  });

  useEffect(() => {
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

  const loadJobs = async () => {
    const data = await api.fetchAll('jobs');
    const processed = (Array.isArray(data) ? data : []).map(j => ({
      ...j,
      skills: safeParse(j.skills),
      responsibilities: safeParse(j.responsibilities),
      qualifications: safeParse(j.qualifications || j.requirements),
      about: j.about || j.description || ''
    }));
    setJobs(processed);
  };

  const saveToStorage = (data) => {
    // No longer using LocalStorage
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Prepare data
    const skillsArray = typeof currentJob.skills === 'string' ? currentJob.skills.split(',').map(s => s.trim()) : currentJob.skills;
    const respArray = currentJob.responsibilities.filter(r => r.trim() !== '');
    const qualArray = currentJob.qualifications.filter(q => q.trim() !== '');

    const jobData = {
      ...currentJob,
      skills: skillsArray,
      responsibilities: respArray,
      qualifications: qualArray
    };

    const response = await api.save('jobs', jobData);

    if (response.success) {
      loadJobs();
      resetForm();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      await api.delete('jobs', id);
      loadJobs();
    }
  };

  const handleEdit = (job) => {
    setCurrentJob({
      ...job,
      skills: Array.isArray(job.skills) ? job.skills.join(', ') : job.skills
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setCurrentJob({
      id: '',
      title: '',
      type: 'Full-time',
      location: '',
      seniority: '',
      skills: [],
      about: '',
      responsibilities: [''],
      qualifications: ['']
    });
    setIsEditing(false);
  };

  const addListItem = (field) => {
    setCurrentJob({
      ...currentJob,
      [field]: [...currentJob[field], '']
    });
  };

  const updateListItem = (field, index, value) => {
    const newList = [...currentJob[field]];
    newList[index] = value;
    setCurrentJob({ ...currentJob, [field]: newList });
  };

  const removeListItem = (field, index) => {
    const newList = currentJob[field].filter((_, i) => i !== index);
    setCurrentJob({ ...currentJob, [field]: newList });
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020617] font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Talent <span className="text-blue-500">Node</span></h1>
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px]">Human Capital Deployment Center</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-blue-900/20 active:scale-95"
          >
            <FaPlus /> Authorize New Opening
          </button>
        </header>

        {/* Modal / Form */}
        <AnimatePresence>
          {isEditing && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={resetForm}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="relative w-full max-w-5xl bg-[#0f172a] border border-white/10 rounded-[2.5rem] shadow-3xl p-8 overflow-y-auto max-h-[90vh]"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
                  {currentJob.id && jobs.find(j => j.id === currentJob.id) ? 'Edit Job Posting' : 'New Job Posting'}
                </h2>

                <form onSubmit={handleSave} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Job Title</label>
                      <div className="relative group">
                        <FaBriefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="text"
                          required
                          value={currentJob.title}
                          onChange={(e) => setCurrentJob({ ...currentJob, title: e.target.value })}
                          placeholder="e.g. Senior React Developer"
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Employment Type</label>
                      <div className="relative group">
                        <FaClock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                        <select
                          required
                          value={currentJob.type}
                          onChange={(e) => setCurrentJob({ ...currentJob, type: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all"
                        >
                          {JOB_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Location</label>
                      <div className="relative group">
                        <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="text"
                          required
                          value={currentJob.location}
                          onChange={(e) => setCurrentJob({ ...currentJob, location: e.target.value })}
                          placeholder="e.g. Remote / Ahmedabad"
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Seniority Level</label>
                      <input
                        type="text"
                        required
                        value={currentJob.seniority}
                        onChange={(e) => setCurrentJob({ ...currentJob, seniority: e.target.value })}
                        placeholder="e.g. Mid-level, Senior"
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Required Skills (comma-separated)</label>
                    <input
                      type="text"
                      required
                      value={Array.isArray(currentJob.skills) ? currentJob.skills.join(', ') : currentJob.skills}
                      onChange={(e) => setCurrentJob({ ...currentJob, skills: e.target.value })}
                      placeholder="e.g. React, TypeScript, Node.js"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Job Description</label>
                    <textarea
                      required
                      rows="3"
                      value={currentJob.about}
                      onChange={(e) => setCurrentJob({ ...currentJob, about: e.target.value })}
                      placeholder="Brief description of the role..."
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                    />
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Responsibilities</label>
                      <button
                        type="button"
                        onClick={() => addListItem('responsibilities')}
                        className="text-xs text-blue-500 hover:text-blue-400 font-bold"
                      >
                        + Add Item
                      </button>
                    </div>
                    {currentJob.responsibilities.map((resp, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={resp}
                          onChange={(e) => updateListItem('responsibilities', index, e.target.value)}
                          placeholder="Responsibility..."
                          className="flex-1 bg-black/40 border border-white/10 rounded-2xl py-3 px-6 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                        {currentJob.responsibilities.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeListItem('responsibilities', index)}
                            className="px-4 bg-red-600/20 hover:bg-red-600 text-white rounded-xl transition-all"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Qualifications */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Qualifications</label>
                      <button
                        type="button"
                        onClick={() => addListItem('qualifications')}
                        className="text-xs text-blue-500 hover:text-blue-400 font-bold"
                      >
                        + Add Item
                      </button>
                    </div>
                    {currentJob.qualifications.map((qual, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={qual}
                          onChange={(e) => updateListItem('qualifications', index, e.target.value)}
                          placeholder="Qualification..."
                          className="flex-1 bg-black/40 border border-white/10 rounded-2xl py-3 px-6 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                        {currentJob.qualifications.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeListItem('qualifications', index)}
                            className="px-4 bg-red-600/20 hover:bg-red-600 text-white rounded-xl transition-all"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <FaCheck /> {currentJob.id && jobs.find(j => j.id === currentJob.id) ? 'Update Position' : 'Publish Position'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-8 bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all duration-500 shadow-xl"
            >
              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => handleEdit(job)}
                  className="p-3 bg-black/60 backdrop-blur-md hover:bg-blue-600 rounded-xl text-white transition-all shadow-xl"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="p-3 bg-black/60 backdrop-blur-md hover:bg-red-600 rounded-xl text-white transition-all shadow-xl"
                >
                  <FaTrash size={14} />
                </button>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors uppercase tracking-tight line-clamp-2 pr-20">
                {job.title}
              </h3>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-2">
                  <FaBriefcase /> {job.type}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-2">
                  <FaMapMarkerAlt /> {job.location}
                </span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {job.about}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {(Array.isArray(job.skills) ? job.skills : []).slice(0, 3).map((skill, i) => (
                  <span key={i} className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-white/5 text-gray-500">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                {job.seniority}
              </div>
            </motion.div>
          ))}

          {/* Add New Ghost Card */}
          <button
            onClick={() => setIsEditing(true)}
            className="group h-[340px] flex flex-col items-center justify-center gap-4 bg-white/[0.02] border border-dashed border-white/10 rounded-[2.5rem] hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <FaPlus size={20} />
            </div>
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Initialize_Node</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsManager;
