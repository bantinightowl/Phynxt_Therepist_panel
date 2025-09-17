import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PhysiotherapistOnboarding = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 0
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    bptCertificate: null,
    acceptedTerms: false,
    
    // Step 1
    specialization: [],
    services: [],
    sessionCost: '',
    sessionDuration: '',
    
    // Step 2
    city: '',
    subLocation: '',
    consultationMode: 'All',
    clinicName: '',
    workingDays: [],
    timeSlots: { start: '', end: '' },
    
    // Step 3
    profilePicture: null,
    introVideo: null,
    keySkills: [],
    languages: ['English'],
    
    // Step 4
    discoverySource: '',
    referralName: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileOtp, setMobileOtp] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [savingStatus, setSavingStatus] = useState('');

  // Auto-save functionality
  useEffect(() => {
    const saveData = setTimeout(() => {
      if (step > 0) {
        localStorage.setItem('physioOnboardingData', JSON.stringify(formData));
        localStorage.setItem('physioOnboardingStep', step.toString());
        setSavingStatus('Autosaved successfully');
        setTimeout(() => setSavingStatus(''), 2000);
      }
    }, 1000);
    
    return () => clearTimeout(saveData);
  }, [formData, step]);

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('physioOnboardingData');
    const savedStep = localStorage.getItem('physioOnboardingStep');
    
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    
    if (savedStep) {
      setStep(parseInt(savedStep));
    }
  }, []);

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 0:
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
        if (!mobileVerified) newErrors.mobileVerified = 'Mobile number must be verified';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!emailVerified) newErrors.emailVerified = 'Email must be verified';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.bptCertificate) newErrors.bptCertificate = 'BPT certificate is required';
        if (!formData.acceptedTerms) newErrors.acceptedTerms = 'You must accept the terms and privacy policy';
        break;
        
      case 1:
        if (formData.specialization.length === 0) newErrors.specialization = 'Specialization is required';
        if (formData.services.length === 0) newErrors.services = 'At least one service is required';
        if (!formData.sessionCost) newErrors.sessionCost = 'Session cost is required';
        if (!formData.sessionDuration) newErrors.sessionDuration = 'Session duration is required';
        break;
        
      case 2:
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.subLocation) newErrors.subLocation = 'Sub-location is required';
        if (!formData.consultationMode) newErrors.consultationMode = 'Consultation mode is required';
        break;
        
      case 3:
        if (!formData.profilePicture) newErrors.profilePicture = 'Profile picture is required';
        if (formData.languages.length === 0) newErrors.languages = 'At least one language is required';
        break;
        
      case 4:
        if (!formData.discoverySource) newErrors.discoverySource = 'This field is required';
        if (formData.discoverySource === 'Referral' && !formData.referralName) {
          newErrors.referralName = 'Referral name is required when referral is selected';
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (true) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
    // if (validateStep(step)) {
    //   setStep(step + 1);
    //   window.scrollTo(0, 0);
    // }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'workingDays') {
        const updatedDays = checked
          ? [...formData.workingDays, value]
          : formData.workingDays.filter(day => day !== value);
        setFormData({ ...formData, workingDays: updatedDays });
      } else if (name === 'acceptedTerms') {
        setFormData({ ...formData, [name]: checked });
      } else {
        const updatedValues = checked
          ? [...formData[name], value]
          : formData[name].filter(item => item !== value);
        setFormData({ ...formData, [name]: updatedValues });
      }
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSkillAdd = (skill) => {
    if (skill && !formData.keySkills.includes(skill)) {
      setFormData({ ...formData, keySkills: [...formData.keySkills, skill] });
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData({ 
      ...formData, 
      keySkills: formData.keySkills.filter(skill => skill !== skillToRemove) 
    });
  };

  const sendOtp = (type) => {
    // In a real app, this would call an API
    console.log(`Sending OTP to ${type}`);
    if (type === 'mobile') {
      setTimeout(() => {
        alert(`OTP sent to ${formData.mobileNumber}. In a real app, this would be verified with your backend.`);
      }, 1000);
    } else {
      setTimeout(() => {
        alert(`OTP sent to ${formData.email}. In a real app, this would be verified with your backend.`);
      }, 1000);
    }
  };

  const verifyOtp = (type, code) => {
    // In a real app, this would call an API to verify the OTP
    setTimeout(() => {
      if (code === '123456') { // Mock verification code
        if (type === 'mobile') {
          setMobileVerified(true);
        } else {
          setEmailVerified(true);
        }
        alert(`${type === 'mobile' ? 'Mobile' : 'Email'} verified successfully!`);
      } else {
        alert('Invalid OTP. Please try again.');
      }
    }, 1000);
  };

  const saveAndContinueLater = () => {
    localStorage.setItem('physioOnboardingData', JSON.stringify(formData));
    localStorage.setItem('physioOnboardingStep', step.toString());
    setSavingStatus('Progress saved successfully!');
    setTimeout(() => setSavingStatus(''), 3000);
  };

  const submitForm = () => {
    if (validateStep(4)) {
      setIsSubmitting(true);
      // In a real app, this would submit to your backend
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Onboarding completed successfully!');
        localStorage.removeItem('physioOnboardingData');
        localStorage.removeItem('physioOnboardingStep');
      }, 2000);
    }
  };

  const steps = [
    { title: 'Sign Up', progress: 20 },
    { title: 'Profile Basics', progress: 40 },
    { title: 'Location & Consultation', progress: 60 },
    { title: 'Media & Languages', progress: 80 },
    { title: 'Discovery & Preview', progress: 100 },
  ];

  const specializationOptions = [
    'Orthopedic', 'Neurological', 'Cardiopulmonary', 'Pediatric', 
    'Geriatric', 'Sports', 'General BPT'
  ];

  const serviceOptions = [
    'Manual Therapy', 'Exercise Prescription', 'Electrotherapy',
    'Postoperative Rehabilitation', 'Pain Management', 'Sports Injury Rehabilitation',
    'Ergonomic Advice', 'Home Exercise Program'
  ];

  const languageOptions = [
    'English', 'Hindi', 'Marathi', 'Gujarati', 'Tamil',
    'Telugu', 'Bengali', 'Kannada', 'Malayalam', 'Punjabi'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium text-gray-600">
              Step {step + 1} of {steps.length}: {steps[step].title}
            </h2>
            <span className="text-sm font-medium text-blue-600">
              {steps[step].progress}% Complete
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${steps[step].progress}%` }}
            ></div>
          </div>
        </div>

        {/* Saving Status */}
        {savingStatus && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
            {savingStatus}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow rounded-lg p-6 mb-6"
          >
            {/* Step 0: Sign Up */}
            {step === 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Account</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex">
                        <input
                          type="tel"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          className={`flex-grow px-4 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter mobile number"
                        />
                        <button
                          type="button"
                          onClick={() => sendOtp('mobile')}
                          className="bg-blue-100 text-blue-700 px-4 rounded-r-lg hover:bg-blue-200 transition-colors"
                        >
                          Send OTP
                        </button>
                      </div>
                      {errors.mobileNumber && <p className="mt-1 text-sm text-red-600">{errors.mobileNumber}</p>}
                      
                      {formData.mobileNumber && !mobileVerified && (
                        <div className="mt-2 flex">
                          <input
                            type="text"
                            value={mobileOtp}
                            onChange={(e) => setMobileOtp(e.target.value)}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg"
                            placeholder="Enter OTP"
                          />
                          <button
                            type="button"
                            onClick={() => verifyOtp('mobile', mobileOtp)}
                            className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition-colors"
                          >
                            Verify
                          </button>
                        </div>
                      )}
                      {mobileVerified && (
                        <p className="mt-2 text-sm text-green-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Mobile number verified
                        </p>
                      )}
                      {errors.mobileVerified && <p className="mt-1 text-sm text-red-600">{errors.mobileVerified}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="flex">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`flex-grow px-4 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter email address"
                        />
                        <button
                          type="button"
                          onClick={() => sendOtp('email')}
                          className="bg-blue-100 text-blue-700 px-4 rounded-r-lg hover:bg-blue-200 transition-colors"
                        >
                          Send OTP
                        </button>
                      </div>
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      
                      {formData.email && !emailVerified && (
                        <div className="mt-2 flex">
                          <input
                            type="text"
                            value={emailOtp}
                            onChange={(e) => setEmailOtp(e.target.value)}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg"
                            placeholder="Enter OTP"
                          />
                          <button
                            type="button"
                            onClick={() => verifyOtp('email', emailOtp)}
                            className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition-colors"
                          >
                            Verify
                          </button>
                        </div>
                      )}
                      {emailVerified && (
                        <p className="mt-2 text-sm text-green-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Email verified
                        </p>
                      )}
                      {errors.emailVerified && <p className="mt-1 text-sm text-red-600">{errors.emailVerified}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Create a password"
                      />
                      {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Confirm your password"
                      />
                      {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      BPT Certificate <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PDF, JPG, PNG (MAX. 5MB)</p>
                        </div>
                        <input 
                          type="file" 
                          name="bptCertificate" 
                          onChange={handleChange} 
                          className="hidden" 
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                    </div>
                    {formData.bptCertificate && (
                      <p className="mt-2 text-sm text-gray-600">
                        Selected: {formData.bptCertificate.name}
                      </p>
                    )}
                    {errors.bptCertificate && <p className="mt-1 text-sm text-red-600">{errors.bptCertificate}</p>}
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="acceptedTerms"
                        type="checkbox"
                        checked={formData.acceptedTerms}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-medium text-gray-700">
                        I accept the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> <span className="text-red-500">*</span>
                      </label>
                      {errors.acceptedTerms && <p className="mt-1 text-red-600">{errors.acceptedTerms}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Profile Basics & Services */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Basics & Services</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialization <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {specializationOptions.map((option) => (
                        <div key={option} className="flex items-center">
                          <input
                            id={`specialization-${option}`}
                            name="specialization"
                            type="checkbox"
                            value={option}
                            checked={formData.specialization.includes(option)}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor={`specialization-${option}`} className="ml-2 text-sm text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.specialization && <p className="mt-1 text-sm text-red-600">{errors.specialization}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Services Offered <span className="text-red-500">*</span> (Select at least one)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {serviceOptions.map((service) => (
                        <div key={service} className="flex items-center">
                          <input
                            id={`service-${service}`}
                            name="services"
                            type="checkbox"
                            value={service}
                            checked={formData.services.includes(service)}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor={`service-${service}`} className="ml-2 text-sm text-gray-700">
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.services && <p className="mt-1 text-sm text-red-600">{errors.services}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Session Cost <span className="text-red-500">*</span>
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input
                          type="number"
                          name="sessionCost"
                          value={formData.sessionCost}
                          onChange={handleChange}
                          className={`block w-full pl-7 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.sessionCost ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">INR</span>
                        </div>
                      </div>
                      {errors.sessionCost && <p className="mt-1 text-sm text-red-600">{errors.sessionCost}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Average Session Duration <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="sessionDuration"
                        value={formData.sessionDuration}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.sessionDuration ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select duration</option>
                        <option value="30">30 minutes</option>
                        <option value="40">40 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                      </select>
                      {errors.sessionDuration && <p className="mt-1 text-sm text-red-600">{errors.sessionDuration}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location & Consultation Preferences */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Location & Consultation Preferences</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter your city"
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sub-location/Area <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="subLocation"
                        value={formData.subLocation}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.subLocation ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter area or pincode"
                      />
                      {errors.subLocation && <p className="mt-1 text-sm text-red-600">{errors.subLocation}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Consultation Mode <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Clinic', 'Home', 'Online', 'All'].map((mode) => (
                        <div key={mode} className="flex items-center">
                          <input
                            id={`mode-${mode}`}
                            name="consultationMode"
                            type="radio"
                            value={mode}
                            checked={formData.consultationMode === mode}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                          <label htmlFor={`mode-${mode}`} className="ml-2 text-sm text-gray-700">
                            {mode}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.consultationMode && <p className="mt-1 text-sm text-red-600">{errors.consultationMode}</p>}
                  </div>

                  {formData.consultationMode === 'Clinic' || formData.consultationMode === 'All' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Clinic Name (Optional)
                      </label>
                      <input
                        type="text"
                        name="clinicName"
                        value={formData.clinicName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter clinic name"
                      />
                    </div>
                  ) : null}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Working Days (Optional)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className="flex items-center">
                          <input
                            id={`day-${day}`}
                            name="workingDays"
                            type="checkbox"
                            value={day}
                            checked={formData.workingDays.includes(day)}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor={`day-${day}`} className="ml-1 text-sm text-gray-700">
                            {day}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Slots (Optional)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                        <input
                          type="time"
                          name="timeSlots.start"
                          value={formData.timeSlots.start}
                          onChange={(e) => setFormData({
                            ...formData, 
                            timeSlots: {...formData.timeSlots, start: e.target.value}
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">End Time</label>
                        <input
                          type="time"
                          name="timeSlots.end"
                          value={formData.timeSlots.end}
                          onChange={(e) => setFormData({
                            ...formData, 
                            timeSlots: {...formData.timeSlots, end: e.target.value}
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Profile Media & Languages */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Media & Languages</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Picture <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-full cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300">
                        {formData.profilePicture ? (
                          <img 
                            src={URL.createObjectURL(formData.profilePicture)} 
                            alt="Profile preview" 
                            className="w-40 h-40 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="text-xs text-gray-500 text-center">Upload Profile Photo</p>
                          </div>
                        )}
                        <input 
                          type="file" 
                          name="profilePicture" 
                          onChange={handleChange} 
                          className="hidden" 
                          accept=".jpg,.jpeg,.png"
                        />
                      </label>
                    </div>
                    {errors.profilePicture && <p className="mt-1 text-sm text-red-600">{errors.profilePicture}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Intro/Skill Video (Optional, max 1 min)
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> video
                          </p>
                          <p className="text-xs text-gray-500">MP4, MOV (MAX. 10MB)</p>
                        </div>
                        <input 
                          type="file" 
                          name="introVideo" 
                          onChange={handleChange} 
                          className="hidden" 
                          accept=".mp4,.mov"
                        />
                      </label>
                    </div>
                    {formData.introVideo && (
                      <p className="mt-2 text-sm text-gray-600">
                        Selected: {formData.introVideo.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key Skills (Optional)
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.keySkills.map((skill, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleSkillRemove(skill)}
                            className="ml-1.5 rounded-full flex-shrink-0 text-blue-500 hover:text-blue-700"
                          >
                            <span className="sr-only">Remove</span>
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Add a skill and press Enter"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSkillAdd(e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.querySelector('input[placeholder="Add a skill and press Enter"]');
                          handleSkillAdd(input.value);
                          input.value = '';
                        }}
                        className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Languages Spoken <span className="text-red-500">*</span> (Select at least one)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {languageOptions.map((language) => (
                        <div key={language} className="flex items-center">
                          <input
                            id={`language-${language}`}
                            name="languages"
                            type="checkbox"
                            value={language}
                            checked={formData.languages.includes(language)}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor={`language-${language}`} className="ml-2 text-sm text-gray-700">
                            {language}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.languages && <p className="mt-1 text-sm text-red-600">{errors.languages}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Discovery & Final Preview */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Discovery & Final Preview</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      How Did You Hear About Us? <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="discoverySource"
                      value={formData.discoverySource}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.discoverySource ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select an option</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Google">Google</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Referral">Referral</option>
                      <option value="Others">Others</option>
                    </select>
                    {errors.discoverySource && <p className="mt-1 text-sm text-red-600">{errors.discoverySource}</p>}
                  </div>

                  {formData.discoverySource === 'Referral' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Referral Name (Optional)
                      </label>
                      <input
                        type="text"
                        name="referralName"
                        value={formData.referralName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.referralName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter referral name"
                      />
                      {errors.referralName && <p className="mt-1 text-sm text-red-600">{errors.referralName}</p>}
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Profile Preview</h3>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                          {formData.profilePicture ? (
                            <img 
                              src={URL.createObjectURL(formData.profilePicture)} 
                              alt="Profile" 
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          ) : (
                            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{formData.fullName || 'Your Name'}</h4>
                          <p className="text-sm text-gray-600">
                            {formData.specialization.length > 0 
                              ? formData.specialization.join(', ') 
                              : 'Specialization'
                            }
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><span className="font-medium">Services:</span> {formData.services.join(', ') || 'Not specified'}</p>
                          <p><span className="font-medium">Session Cost:</span> {formData.sessionCost ? `₹${formData.sessionCost}` : 'Not specified'}</p>
                          <p><span className="font-medium">Session Duration:</span> {formData.sessionDuration ? `${formData.sessionDuration} mins` : 'Not specified'}</p>
                        </div>
                        <div>
                          <p><span className="font-medium">Location:</span> {formData.city || 'Not specified'}, {formData.subLocation || ''}</p>
                          <p><span className="font-medium">Consultation:</span> {formData.consultationMode || 'Not specified'}</p>
                          <p><span className="font-medium">Languages:</span> {formData.languages.join(', ') || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      Review your information above. You can go back to edit any details before submitting.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 0}
            className={`px-6 py-2 rounded-lg font-medium ${step === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Previous
          </button>
          
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={saveAndContinueLater}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
            >
              Save & Continue Later
            </button>
            
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={submitForm}
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-green-400"
              >
                {isSubmitting ? 'Submitting...' : 'Complete Registration'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysiotherapistOnboarding;


// import React, { useState } from 'react';

// const PhysNXTOnboarding = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [activeSection, setActiveSection] = useState('signup');
//   const [formData, setFormData] = useState({
//     fullName: '',
//     phone: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     // Additional form fields would go here
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleContinue = () => {
//     if (activeSection === 'signup') {
//       setActiveSection('profile');
//       setCurrentStep(2);
//     } else if (activeSection === 'profile' && currentStep < 12) {
//       setCurrentStep(currentStep + 1);
//     } else if (activeSection === 'profile' && currentStep === 12) {
//       setActiveSection('approval');
//     } else if (activeSection === 'approval') {
//       setActiveSection('dashboard');
//     }
//   };

//   const handleSaveAndContinue = () => {
//     // In a real app, this would save progress to backend/localStorage
//     alert('Progress saved successfully! You can continue later.');
//   };

//   const renderSignUpStep = () => (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-[#002B45]">Create Your Account</h2>
      
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-[#002B45] mb-1">Full Name</label>
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
//             placeholder="Enter your full name"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-[#002B45] mb-1">Phone Number</label>
//           <div className="flex space-x-2">
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
//               placeholder="Your phone number"
//             />
//             <button className="px-4 bg-[#009688] text-white rounded-2xl font-medium text-sm whitespace-nowrap">
//               Send OTP
//             </button>
//           </div>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-[#002B45] mb-1">Email Address</label>
//           <div className="flex space-x-2">
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
//               placeholder="Your email address"
//             />
//             <button className="px-4 bg-[#009688] text-white rounded-2xl font-medium text-sm whitespace-nowrap">
//               Send OTP
//             </button>
//           </div>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-[#002B45] mb-1">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
//             placeholder="Create a secure password"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-[#002B45] mb-1">Confirm Password</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
//             placeholder="Confirm your password"
//           />
//         </div>
//       </div>
//     </div>
//   );

//   const renderProfileStep = () => (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-[#002B45]">Profile Information</h2>
//       <p className="text-[#002B45]">Step {currentStep} of 12</p>
      
//       {/* Example of a profile step - in a real app, each step would have different fields */}
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-[#002B45] mb-1">Specialization</label>
//           <select className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#009688] focus:border-transparent">
//             <option value="">Select your specialization</option>
//             <option value="orthopedic">Orthopedic Physiotherapy</option>
//             <option value="sports">Sports Physiotherapy</option>
//             <option value="neurological">Neurological Physiotherapy</option>
//             <option value="pediatric">Pediatric Physiotherapy</option>
//           </select>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-[#002B45] mb-1">Years of Experience</label>
//           <input
//             type="number"
//             className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
//             placeholder="Enter years of experience"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-[#002B45] mb-1">Qualifications</label>
//           <textarea
//             className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
//             rows="3"
//             placeholder="List your qualifications and certifications"
//           ></textarea>
//         </div>
//       </div>
//     </div>
//   );

//   const renderApprovalStep = () => (
//     <div className="space-y-6 text-center">
//       <h2 className="text-2xl font-bold text-[#002B45]">Admin Approval</h2>
      
//       <div className="bg-white p-6 rounded-2xl shadow-sm">
//         <div className="flex justify-between items-center mb-6">
//           <div className={`flex-1 h-2 rounded-full ${activeSection === 'approval' ? 'bg-[#009688]' : 'bg-gray-300'}`}></div>
//           <div className="mx-2 w-2 h-2 rounded-full bg-gray-300"></div>
//           <div className={`flex-1 h-2 rounded-full ${activeSection === 'dashboard' ? 'bg-[#009688]' : 'bg-gray-300'}`}></div>
//         </div>
        
//         <div className="flex justify-between mb-8">
//           <div className="text-center">
//             <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${activeSection === 'approval' ? 'bg-[#009688]' : 'bg-gray-300'}`}>
//               <span className={`text-lg font-bold ${activeSection === 'approval' ? 'text-white' : 'text-gray-500'}`}>1</span>
//             </div>
//             <p className={`text-sm font-medium ${activeSection === 'approval' ? 'text-[#009688]' : 'text-gray-500'}`}>Pending Approval</p>
//           </div>
          
//           <div className="text-center">
//             <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${activeSection === 'dashboard' ? 'bg-[#009688]' : 'bg-gray-300'}`}>
//               <span className={`text-lg font-bold ${activeSection === 'dashboard' ? 'text-white' : 'text-gray-500'}`}>2</span>
//             </div>
//             <p className={`text-sm font-medium ${activeSection === 'dashboard' ? 'text-[#009688]' : 'text-gray-500'}`}>Approved</p>
//           </div>
          
//           <div className="text-center">
//             <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${activeSection === 'dashboard' ? 'bg-[#009688]' : 'bg-gray-300'}`}>
//               <span className={`text-lg font-bold ${activeSection === 'dashboard' ? 'text-white' : 'text-gray-500'}`}>3</span>
//             </div>
//             <p className={`text-sm font-medium ${activeSection === 'dashboard' ? 'text-[#009688]' : 'text-gray-500'}`}>Live on Platform</p>
//           </div>
//         </div>
        
//         <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
//           <p className="text-[#002B45]">Your profile is currently under review. We'll notify you once it's approved. This usually takes 24-48 hours.</p>
//         </div>
//       </div>
//     </div>
//   );

//   const renderDashboardStep = () => (
//     <div className="space-y-6 text-center">
//       <div className="w-20 h-20 bg-[#009688] rounded-full flex items-center justify-center mx-auto mb-4">
//         <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//         </svg>
//       </div>
      
//       <h2 className="text-2xl font-bold text-[#002B45]">Approved Successfully!</h2>
//       <p className="text-[#002B45]">Your profile is now live on the platform. You can access your dashboard to start connecting with patients.</p>
      
//       <button className="w-full py-3 bg-[#009688] text-white rounded-2xl font-bold uppercase shadow-md hover:bg-teal-700 transition-colors">
//         Go to Dashboard
//       </button>
//     </div>
//   );

//   return (
//     <div 
//       className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
//       style={{ backgroundImage: "url('/assets/login2.png')" }}
//     >
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-bold text-[#004B87]">PhysNXT</h1>
//             <div className="text-sm font-medium text-[#002B45]">
//               {activeSection === 'signup' && 'Step 1 of 4'}
//               {activeSection === 'profile' && `Step ${currentStep} of 12`}
//               {activeSection === 'approval' && 'Step 3 of 4'}
//               {activeSection === 'dashboard' && 'Step 4 of 4'}
//             </div>
//           </div>
          
//           <div className="flex mb-6">
//             <div className={`flex-1 h-2 rounded-full ${activeSection !== 'signup' ? 'bg-[#009688]' : 'bg-gray-300'}`}></div>
//             <div className="mx-2 w-2 h-2 rounded-full bg-gray-300"></div>
//             <div className={`flex-1 h-2 rounded-full ${activeSection === 'profile' || activeSection === 'approval' || activeSection === 'dashboard' ? 'bg-[#009688]' : 'bg-gray-300'}`}></div>
//             <div className="mx-2 w-2 h-2 rounded-full bg-gray-300"></div>
//             <div className={`flex-1 h-2 rounded-full ${activeSection === 'approval' || activeSection === 'dashboard' ? 'bg-[#009688]' : 'bg-gray-300'}`}></div>
//             <div className="mx-2 w-2 h-2 rounded-full bg-gray-300"></div>
//             <div className={`flex-1 h-2 rounded-full ${activeSection === 'dashboard' ? 'bg-[#009688]' : 'bg-gray-300'}`}></div>
//           </div>
//         </div>
        
//         <div className="p-6">
//           {activeSection === 'signup' && renderSignUpStep()}
//           {activeSection === 'profile' && renderProfileStep()}
//           {activeSection === 'approval' && renderApprovalStep()}
//           {activeSection === 'dashboard' && renderDashboardStep()}
//         </div>
        
//         <div className="p-6 bg-gray-50 space-y-4">
//           {(activeSection === 'signup' || activeSection === 'profile') && (
//             <>
//               <button 
//                 onClick={handleContinue}
//                 className="w-full py-3 bg-[#009688] text-white rounded-2xl font-bold uppercase shadow-md hover:bg-teal-700 transition-colors"
//               >
//                 Continue
//               </button>
              
//               <button 
//                 onClick={handleSaveAndContinue}
//                 className="w-full py-3 border border-[#009688] text-[#009688] rounded-2xl font-bold uppercase hover:bg-teal-50 transition-colors"
//               >
//                 Save & Continue Later
//               </button>
//             </>
//           )}
          
//           <p className="text-center text-xs text-gray-500">
//             🔒 Your details are safe & secured with PhysNXT.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PhysNXTOnboarding;






