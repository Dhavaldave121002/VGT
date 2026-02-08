import React, { useEffect, useRef, useState } from 'react'
import { api } from '../../utils/api';

import { validateEmail, validateName, validatePhone, validateLength } from '../../utils/ValidationUtils';

import FormError from '../UI/FormError';
import Toast from '../UI/Toast';

export default function ApplyForm({ applyData, setApplyData, errors, setErrors, inModal = false, jobs = [], onSuccess }) {
  const nameRef = useRef(null)
  const [toast, setToast] = useState({ show: false, type: 'success', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!applyData) return
    if (inModal) {
      nameRef.current?.focus()
      return
    }

    if (applyData && applyData.jobId) {
      const el = document.getElementById('apply-form')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      nameRef.current?.focus()
    }
  }, [applyData?.jobId, inModal]) // Simplified dependency

  function validate() {
    const nameValidation = validateName(applyData.name, 'Full name');
    const emailValidation = validateEmail(applyData.email);
    const phoneValidation = validatePhone(applyData.phone);
    const messageValidation = validateLength(applyData.message, 10, 1000, 'Message');

    const newErrors = {};
    if (!nameValidation.valid) newErrors.name = nameValidation.error;
    if (!emailValidation.valid) newErrors.email = emailValidation.error;
    if (!phoneValidation.valid && applyData.phone) newErrors.phone = phoneValidation.error;
    if (!messageValidation.valid) newErrors.message = messageValidation.error;
    if (!applyData.jobId) newErrors.jobId = 'Please select a position';

    return newErrors;
  }

  function submit(e) {
    e.preventDefault()
    const newErrors = validate()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setToast({ show: true, type: 'error', message: 'Please fix the errors before submitting.' });
      return
    }

    setIsSubmitting(true);

    const job = jobs.find(j => j.id == applyData.jobId)

    if (!job) {
      setToast({ show: true, type: 'error', message: 'Could not find the selected position. Please try again.' });
      return;
    }

    // Handle resume file
    const resumeInput = document.querySelector('input[type="file"]');
    const resumeFile = resumeInput?.files[0];

    if (resumeFile) {
      // 2MB Limit check (2 * 1024 * 1024 bytes)
      if (resumeFile.size > 2097152) {
        setToast({ show: true, type: 'error', message: 'File is too large! Maximum size is 2MB.' });
        setIsSubmitting(false);
        return;
      }

      // Convert file to base64 for storage
      const reader = new FileReader();
      reader.onload = function (event) {
        saveApplication(event.target.result, resumeFile.name, job);
      };
      reader.readAsDataURL(resumeFile);
    } else {
      saveApplication(null, null, job);
    }
  }


  // ... 

  async function saveApplication(resumeData, resumeFileName, job) {
    try {
      // Save application to API
      const application = {
        jobId: Number(job.id),
        jobTitle: job.title,
        jobType: job.type,
        name: applyData.name,
        email: applyData.email,
        phone: applyData.phone,
        message: applyData.message,
        resumeData: resumeData || '',
        resumeFileName: resumeFileName || '',
        status: 'New'
      };

      const result = await api.save('applications', application);

      // Temporary Debug: Alert the result to see if it's successful or has an error
      // alert('API Result: ' + JSON.stringify(result)); 

      if (!result || result.success === false) {
        setToast({ show: true, type: 'error', message: result?.error || 'Failed to save. File might be too large.' });
        return;
      }

      setToast({ show: true, type: 'success', message: 'Application submitted successfully!' });

      // Reset form
      setApplyData({
        name: '',
        email: '',
        phone: '',
        message: '',
        jobId: ''
      });
      setErrors({});

      // Success callback to close modal if provided
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }

      // Removed mailto logic as we now save to DB directly
    } catch (err) {
      console.error(err);
      setToast({ show: true, type: 'error', message: 'An unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  function update(e) {
    setApplyData(d => ({ ...d, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: undefined }))
  }

  const inputClasses = `w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`
  const labelClasses = "block text-sm font-medium text-gray-400 mb-1.5"
  const errorClasses = "text-red-500 text-xs mt-1"

  return (
    <div id="apply-form" className="w-full">
      {!inModal && <h4 className="text-xl font-bold text-white mb-4">Apply now</h4>}

      <p className="text-gray-400 text-sm mb-6">
        Fill the form below to apply for this position.
      </p>

      <form onSubmit={submit} noValidate className="space-y-4">

        <div>
          <label className={labelClasses}>Position</label>
          <div className="relative">
            <select
              name="jobId"
              value={applyData.jobId}
              onChange={update}
              className={`${inputClasses} appearance-none cursor-pointer ${errors.jobId ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            >
              <option value="" className="bg-gray-900 text-gray-400">Select a position…</option>
              {jobs.map(j => (
                <option key={j.id} value={j.id} className="bg-gray-900 text-white">{j.title} — {j.type}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
          </div>
          {errors.jobId && <div className={errorClasses}>{errors.jobId}</div>}
        </div>

        <div>
          <label className={labelClasses}>Full name</label>
          <input
            id="apply-name"
            ref={nameRef}
            name="name"
            value={applyData.name}
            onChange={update}
            className={`${inputClasses} ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Your name"
          />
          <FormError error={errors.name} />
        </div>

        <div>
          <label className={labelClasses}>Email</label>
          <input
            name="email"
            type="email"
            value={applyData.email}
            onChange={update}
            className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`}
            placeholder="you@company.com"
          />
          <FormError error={errors.email} />
        </div>

        <div>
          <label className={labelClasses}>Phone (optional)</label>
          <input
            name="phone"
            value={applyData.phone}
            onChange={update}
            className={`${inputClasses} ${errors.phone ? 'border-red-500' : ''}`}
            placeholder="+91 98765 43210"
          />
          <FormError error={errors.phone} />
        </div>

        <div>
          <label className={labelClasses}>Message</label>
          <textarea
            name="message"
            rows="4"
            value={applyData.message}
            onChange={update}
            className={`${inputClasses} ${errors.message ? 'border-red-500' : ''}`}
            placeholder="Short cover note"
          ></textarea>
          <FormError error={errors.message} />
        </div>

        <div>
          <label className={labelClasses}>Resume</label>
          <input
            className={inputClasses}
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <div className="text-xs text-blue-400 mt-1.5 font-medium">
            Upload your resume (PDF, DOC, or image). It will be saved with your application.
          </div>
        </div>

        <button
          className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5 mt-2 ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Submit Application'}
        </button>

      </form>

      {/* Toast Notification */}
      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  )
}
