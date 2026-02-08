// src/components/Career/jobs-data.js

/**
 * @typedef {Object} Job
 * @property {string} id - Unique ID for the job
 * @property {string} title - Full job title
 * @property {'Full-time' | 'Part-time' | 'Contract' | 'Internship'} type - Employment type
 * @property {string} location - Physical location
 * @property {string} seniority - Experience level
 * @property {string[]} skills - Key technologies/tools
 * @property {string} about - Short description
 * @property {string[]} responsibilities - Key job duties
 * @property {string[]} qualifications - Required skills/experience
 */

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
  },
  {
    id: 'lead-be',
    title: 'Lead Backend Engineer (Node/Go)',
    type: 'Full-time',
    location: 'Ahmedabad',
    seniority: 'Senior / Lead',
    skills: ['Node.js', 'Go', 'PostgreSQL', 'AWS', 'Microservices'],
    about: 'Architect and scale our backend services and database infrastructure.',
    responsibilities: [
      'Lead the design and implementation of new microservices.',
      'Mentor mid-level engineers and drive technical best practices.',
      'Oversee database performance and reliability (PostgreSQL).'
    ],
    qualifications: [
      '5+ years of experience in backend development.',
      'Proven experience with distributed systems and cloud (AWS/GCP).',
      'Prior leadership or mentoring experience is essential.'
    ]
  },
  {
    id: 'qa-intern',
    title: 'QA Internship',
    type: 'Internship',
    location: 'Ahmedabad (On-site)',
    seniority: 'Entry-level',
    skills: ['Manual Testing', 'Jira', 'Test Cases'],
    about: 'Help us ensure the quality and stability of our software releases.',
    responsibilities: [
      'Execute detailed manual test cases across web and mobile platforms.',
      'Log and track defects accurately using Jira.',
      'Collaborate with developers to verify fixes.'
    ],
    qualifications: [
      'Basic understanding of software development lifecycle.',
      'Strong attention to detail and communication skills.',
      'Available for 6-month on-site commitment.'
    ]
  }
];

// Load jobs from localStorage or use defaults
export const getJobs = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('vgtw_jobs');
    if (saved) {
      return JSON.parse(saved);
    }
  }
  return DEFAULT_JOBS;
};

/** @type {Job[]} */
export const JOBS = getJobs();
