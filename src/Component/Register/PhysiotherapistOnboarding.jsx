import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import physioLogo from "../../assets/physio_logo.jfif"; // Adjust path as needed

const PhysiotherapistOnboarding = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 0 (removed signup fields)
    // Step 1 (was step 1)
    specialization: "",
    services: [],
    sessionCost: "",
    sessionDuration: "",

    // Step 2 (was step 2)
    city: "",
    subLocation: "",
    consultationMode: ["All"],
    clinicName: "",
    workingDays: [],
    timeSlots: { start: "", end: "" },

    // Step 3 (was step 3)
    profilePicture: null,
    introVideo: null,
    keySkills: [],
    languages: ["English"],

    // Step 4 (was step 4)
    discoverySource: "",
    referralName: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savingStatus, setSavingStatus] = useState("");
  const { registerInfo } = useSelector((state) => state.user);

  // Pre-fill form with Redux data when component mounts
  useEffect(() => {
    if (registerInfo) {
      setFormData((prevData) => ({
        ...prevData,
        // You might want to map fields from registerInfo to your form structure
      }));
    }

    // Load saved data if exists
    const savedData = localStorage.getItem("physioOnboardingData");
    const savedStep = localStorage.getItem("physioOnboardingStep");

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    if (savedStep) {
      setStep(parseInt(savedStep));
    }
  }, [registerInfo]);

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Welcome step - no validation needed
        break;

      case 1:
        if (!formData.specialization)
          newErrors.specialization = "Specialization is required";
        if (formData.services.length === 0)
          newErrors.services = "At least one service is required";
        if (!formData.sessionCost)
          newErrors.sessionCost = "Session cost is required";
        if (!formData.sessionDuration)
          newErrors.sessionDuration = "Session duration is required";
        break;

      case 2:
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.subLocation)
          newErrors.subLocation = "Sub-location is required";
        if (formData.consultationMode.length === 0)
          newErrors.consultationMode = "Consultation mode is required";
        break;

      case 3:
        if (!formData.profilePicture)
          newErrors.profilePicture = "Profile picture is required";
        if (formData.languages.length === 0)
          newErrors.languages = "At least one language is required";
        break;

      case 4:
        if (!formData.discoverySource)
          newErrors.discoverySource = "This field is required";
        if (formData.discoverySource === "Referral" && !formData.referralName) {
          newErrors.referralName =
            "Referral name is required when referral is selected";
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    // if (validateStep(step)) {
    //   setStep(step + 1);
    //   window.scrollTo(0, 0);
    // }
    if (true) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      if (name === "workingDays") {
        const updatedDays = checked
          ? [...formData.workingDays, value]
          : formData.workingDays.filter((day) => day !== value);
        setFormData({ ...formData, workingDays: updatedDays });
      } else if (name === "consultationMode") {
        let updatedModes;
        if (value === "All") {
          updatedModes = checked ? ["Clinic", "Home", "Online", "All"] : [];
        } else {
          if (checked) {
            updatedModes = [...formData.consultationMode, value];
            if (
              updatedModes.includes("Clinic") &&
              updatedModes.includes("Home") &&
              updatedModes.includes("Online")
            ) {
              updatedModes.push("All");
            }
          } else {
            updatedModes = formData.consultationMode.filter(
              (mode) => mode !== value && mode !== "All"
            );
          }
        }
        setFormData({ ...formData, [name]: updatedModes });
      } else {
        const updatedValues = checked
          ? [...formData[name], value]
          : formData[name].filter((item) => item !== value);
        setFormData({ ...formData, [name]: updatedValues });
      }
    } else if (type === "file") {
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
      keySkills: formData.keySkills.filter((skill) => skill !== skillToRemove),
    });
  };

  const saveAndContinueLater = () => {
    localStorage.setItem("physioOnboardingData", JSON.stringify(formData));
    localStorage.setItem("physioOnboardingStep", step.toString());
    setSavingStatus("Progress saved successfully!");
    setTimeout(() => setSavingStatus(""), 3000);
  };

  const submitForm = () => {
    if (validateStep(4)) {
      setIsSubmitting(true);
      // In a real app, this would submit to your backend
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Onboarding completed successfully!");
        localStorage.removeItem("physioOnboardingData");
        localStorage.removeItem("physioOnboardingStep");
      }, 2000);
    }
  };

  const steps = [
    { title: "Welcome", progress: 20 },
    { title: "Profile Basics", progress: 40 },
    { title: "Location & Consultation", progress: 60 },
    { title: "Media & Languages", progress: 80 },
    { title: "Discovery & Preview", progress: 100 },
  ];

  const specializationOptions = [
    "Orthopedic Physiotherapist",
    "Sports Physiotherapist",
    "Neuro Physiotherapist",
    "Child Physiotherapist",
    "Women’s Health Physiotherapist",
    "Heart & Lung Physiotherapist",
    "Senior Citizen Physiotherapist",
    "Cancer Rehab Physiotherapist",
  ];

  const serviceOptions = [
    "Manual Therapy",
    "Exercise Prescription",
    "Electrotherapy",
    "Postoperative Rehabilitation",
    "Pain Management",
    "Sports Injury Rehabilitation",
    "Ergonomic Advice",
    "Home Exercise Program",
  ];

  const languageOptions = [
    "English",
    "Hindi",
    "Marathi",
    "Gujarati",
    "Tamil",
    "Telugu",
    "Bengali",
    "Kannada",
    "Malayalam",
    "Punjabi",
  ];

  // Custom multi-select component for Services
  const ServiceMultiSelect = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleService = (service) => {
      const updatedServices = formData.services.includes(service)
        ? formData.services.filter((s) => s !== service)
        : [...formData.services, service];
      setFormData({ ...formData, services: updatedServices });
    };

    return (
      <div className="relative">
        <div
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#009688] focus:border-[#009688] cursor-pointer ${
            errors.services ? "border-red-500" : "border-gray-300"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap gap-1">
            {formData.services.length === 0 ? (
              <span className="text-gray-400">Select services</span>
            ) : (
              formData.services.map((service) => (
                <span
                  key={service}
                  className="bg-[#004B87] text-white text-xs px-2 py-1 rounded"
                >
                  {service}
                </span>
              ))
            )}
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {serviceOptions.map((service) => (
              <div
                key={service}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  formData.services.includes(service) ? "bg-blue-50" : ""
                }`}
                onClick={() => toggleService(service)}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service)}
                    onChange={() => {}}
                    className="w-4 h-4 text-[#004B87] bg-gray-100 border-gray-300 rounded focus:ring-[#004B87]"
                  />
                  <span className="ml-2 text-sm text-gray-700">{service}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {errors.services && (
          <p className="mt-1 text-sm text-red-600">{errors.services}</p>
        )}
      </div>
    );
  };

  // Custom multi-select component for Languages
  const LanguageMultiSelect = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleLanguage = (language) => {
      const updatedLanguages = formData.languages.includes(language)
        ? formData.languages.filter((l) => l !== language)
        : [...formData.languages, language];
      setFormData({ ...formData, languages: updatedLanguages });
    };

    return (
      <div className="relative">
        <div
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#009688] focus:border-[#009688] cursor-pointer ${
            errors.languages ? "border-red-500" : "border-gray-300"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap gap-1">
            {formData.languages.length === 0 ? (
              <span className="text-gray-400">Select languages</span>
            ) : (
              formData.languages.map((language) => (
                <span
                  key={language}
                  className="bg-[#004B87] text-white text-xs px-2 py-1 rounded"
                >
                  {language}
                </span>
              ))
            )}
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {languageOptions.map((language) => (
              <div
                key={language}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  formData.languages.includes(language) ? "bg-blue-50" : ""
                }`}
                onClick={() => toggleLanguage(language)}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.languages.includes(language)}
                    onChange={() => {}}
                    className="w-4 h-4 text-[#004B87] bg-gray-100 border-gray-300 rounded focus:ring-[#004B87]"
                  />
                  <span className="ml-2 text-sm text-gray-700">{language}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {errors.languages && (
          <p className="mt-1 text-sm text-red-600">{errors.languages}</p>
        )}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/assets/login2.png')" }}
    >
      <div className="max-w-3xl mx-auto bg-white bg-opacity-95 rounded-xl shadow-lg p-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={physioLogo}
            alt="PhysioCompass Logo"
            className="h-16 object-contain"
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium text-[#002B45]">
              Step {step + 1} of {steps.length}: {steps[step].title}
            </h2>
            <span className="text-sm font-medium text-[#004B87]">
              {steps[step].progress}% Complete
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-[#009688] h-2.5 rounded-full transition-all duration-500"
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
            className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-100"
          >
            {/* Step 0: Welcome Message */}
            {step === 0 && (
              <div className="text-center py-8">
                <div className="mb-6">
                  <svg
                    className="w-16 h-16 text-green-500 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-[#002B45] mb-4">
                  Signup Successful!
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Welcome to PhysNxt,{" "}
                  <span className="font-semibold">
                    {registerInfo?.fullName || "Valued Professional"}
                  </span>
                  !<br />
                  Please complete your registration to start your journey with
                  us.
                </p>

                {registerInfo && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left inline-block">
                    <h3 className="font-medium text-[#002B45] mb-2">
                      Your Account Details:
                    </h3>
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {registerInfo.fullName}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {registerInfo.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {registerInfo.phone}
                    </p>
                    {registerInfo.referralCode && (
                      <p>
                        <span className="font-medium">Referral Code:</span>{" "}
                        {registerInfo.referralCode}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 1: Profile Basics & Services */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-[#002B45] mb-6">
                  Profile Basics & Services
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#002B45] mb-1">
                      Specialization <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#009688] focus:border-[#009688] ${
                        errors.specialization
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select your specialization</option>
                      {specializationOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.specialization && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.specialization}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002B45] mb-1">
                      Services Offered <span className="text-red-500">*</span>
                    </label>
                    <ServiceMultiSelect />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#002B45] mb-1">
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
                          className={`block w-full pl-7 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-[#009688] focus:border-[#009688] ${
                            errors.sessionCost
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">INR</span>
                        </div>
                      </div>
                      {errors.sessionCost && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.sessionCost}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#002B45] mb-1">
                        Average Session Duration{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="sessionDuration"
                        value={formData.sessionDuration}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#009688] focus:border-[#009688] ${
                          errors.sessionDuration
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select duration</option>
                        <option value="40">40 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                        <option value="90">90 minutes</option>
                      </select>
                      {errors.sessionDuration && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.sessionDuration}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location & Consultation Preferences */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-[#002B45] mb-6">
                  Location & Consultation Preferences
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#002B45] mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#009688] focus:border-[#009688] ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your city"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#002B45] mb-1">
                        Sub-location/Area{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="subLocation"
                        value={formData.subLocation}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#009688] focus:border-[#009688] ${
                          errors.subLocation
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter area or pincode"
                      />
                      {errors.subLocation && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.subLocation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002B45] mb-2">
                      Consultation Mode <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["Clinic", "Home", "Online", "All"].map((mode) => (
                        <div key={mode} className="flex items-center">
                          <input
                            id={`mode-${mode}`}
                            name="consultationMode"
                            type="checkbox"
                            value={mode}
                            checked={formData.consultationMode.includes(mode)}
                            onChange={handleChange}
                            className="w-4 h-4 text-[#004B87] bg-gray-100 border-gray-300 rounded focus:ring-[#004B87]"
                          />
                          <label
                            htmlFor={`mode-${mode}`}
                            className="ml-2 text-sm text-[#002B45]"
                          >
                            {mode}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.consultationMode && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.consultationMode}
                      </p>
                    )}
                  </div>

                  {(formData.consultationMode.includes("Clinic") ||
                    formData.consultationMode.includes("All")) && (
                    <div>
                      <label className="block text-sm font-medium text-[#002B45] mb-1">
                        Clinic Name (Optional)
                      </label>
                      <input
                        type="text"
                        name="clinicName"
                        value={formData.clinicName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009688] focus:border-[#009688]"
                        placeholder="Enter clinic name"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-[#002B45] mb-2">
                      Working Days (Optional)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day) => (
                          <div key={day} className="flex items-center">
                            <input
                              id={`day-${day}`}
                              name="workingDays"
                              type="checkbox"
                              value={day}
                              checked={formData.workingDays.includes(day)}
                              onChange={handleChange}
                              className="w-4 h-4 text-[#004B87] bg-gray-100 border-gray-300 rounded focus:ring-[#004B87]"
                            />
                            <label
                              htmlFor={`day-${day}`}
                              className="ml-1 text-sm text-[#002B45]"
                            >
                              {day}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002B45] mb-2">
                      Time Slots (Optional)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Start Time
                        </label>
                        <input
                          type="time"
                          name="timeSlots.start"
                          value={formData.timeSlots.start}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              timeSlots: {
                                ...formData.timeSlots,
                                start: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009688] focus:border-[#009688]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          End Time
                        </label>
                        <input
                          type="time"
                          name="timeSlots.end"
                          value={formData.timeSlots.end}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              timeSlots: {
                                ...formData.timeSlots,
                                end: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009688] focus:border-[#009688]"
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
                <h2 className="text-2xl font-bold text-[#002B45] mb-6">
                  Profile Media & Languages
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#002B45] mb-1">
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
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 极 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 极 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="text-xs text-gray-500 text-center">
                              Upload Profile Photo
                            </p>
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
                    {errors.profilePicture && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.profilePicture}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#极B45] mb-1">
                      Intro/Skill Video (Optional, max 1 min)
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              stroke极join="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray极500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            video
                          </p>
                          <p className="text-xs text-gray-500">
                            MP4, MOV (MAX. 10MB)
                          </p>
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
                    <label className="block text-sm font-medium text-[#002B45] mb-1">
                      Key Skills (Optional)
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.keySkills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#004B87] text-white"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleSkillRemove(skill)}
                            className="ml-1.5 rounded-full flex-shrink-0 text-white hover:text-gray-200"
                          >
                            <span className="sr-only">Remove</span>
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8极8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
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
                          if (e.key === "Enter") {
                            handleSkillAdd(e.target.value);
                            e.target.value = "";
                          }
                        }}
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-[#009688] focus:border-[#009688]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.querySelector(
                            'input[placeholder="Add a skill and press Enter"]'
                          );
                          handleSkillAdd(input.value);
                          input.value = "";
                        }}
                        className="bg-[#009688] text-white px-4 rounded-r-lg hover:bg-[#00897B] transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002B45] mb-1">
                      Languages Spoken <span className="text-red-500">*</span>
                    </label>
                    <LanguageMultiSelect />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Discovery & Final Preview */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-[#002B45] mb-6">
                  Discovery & Final Preview
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#002B45] mb-1">
                      How Did You Hear About Us?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="discoverySource"
                      value={formData.discoverySource}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#009688] focus:border-[#009688] ${
                        errors.discoverySource
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select an option</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Google">Google</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Referral">Referral</option>
                      <option value="Others">Others</option>
                    </select>
                    {errors.discoverySource && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.discoverySource}
                      </p>
                    )}
                  </div>

                  {formData.discoverySource === "Referral" && (
                    <div>
                      <label className="block text-sm font-medium text-[#002B45] mb-1">
                        Referral Name (Optional)
                      </label>
                      <input
                        type="text"
                        name="referralName"
                        value={formData.referralName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#009688] focus:border-[#009688] ${
                          errors.referralName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter referral name"
                      />
                      {errors.referralName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.referralName}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-[#002B45] mb-4">
                      Profile Preview
                    </h3>

                    <div className="bg-gray-50  rounded-lg p-4 mb-4">
                      {/* Show Redux data */}
                      <h4 className="font-medium text-[#002B45] mb-2">
                        Account Information:
                      </h4>
                      <div className="flex flex-col md:flex-row md:items-center  border-b border-gray-200 mb-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                          {formData?.profilePicture ? (
                            <img
                              src={URL.createObjectURL(formData?.profilePicture)}
                              alt="Profile"
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          ) : (
                            <svg
                              className="w-8 h-8 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <div>
                          {registerInfo && (
                            <div className="p-2">
                              <p>
                                <span className="font-medium">Name:</span>{" "}
                                {registerInfo.fullName}
                              </p>
                              <p>
                                <span className="font-medium">Email:</span>{" "}
                                {registerInfo.email}
                              </p>
                              <p>
                                <span className="font-medium">Phone:</span>{" "}
                                {registerInfo.phone}
                              </p>
                              {registerInfo.referralCode && (
                                <p>
                                  <span className="font-medium">
                                    Referral Code:
                                  </span>{" "}
                                  {registerInfo.referralCode}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p>
                            <span className="font-medium">Specialization:</span>{" "}
                            {formData.specialization
                              ? formData.specialization
                              : "Not specified"}
                          </p>
                          <p>
                            <span className="font-medium">Services:</span>{" "}
                            {formData.services.join(", ") || "Not specified"}
                          </p>
                          <p>
                            <span className="font-medium">Session Cost:</span>{" "}
                            {formData.sessionCost
                              ? `₹${formData.sessionCost}`
                              : "Not specified"}
                          </p>
                          <p>
                            <span className="font-medium">
                              Session Duration:
                            </span>{" "}
                            {formData.sessionDuration
                              ? `${formData.sessionDuration} mins`
                              : "Not specified"}
                          </p>
                        </div>
                        <div>
                          <p>
                            <span className="font-medium">Location:</span>{" "}
                            {formData.city || "Not specified"},{" "}
                            {formData.subLocation || ""}
                          </p>
                          <p>
                            <span className="font-medium">Consultation:</span>{" "}
                            {formData.consultationMode.join(", ") ||
                              "Not specified"}
                          </p>
                          <p>
                            <span className="font-medium">Languages:</span>{" "}
                            {formData.languages.join(", ") || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">
                      Review your information above. You can go back to edit any
                      details before submitting.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-2 md:gap-0">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 0}
            className={`px-6 py-2 rounded-lg font-medium ${
              step === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#FFC107] text-[#002B45] hover:bg-[#FFA000]"
            }`}
          >
            Previous
          </button>

          <div className="flex space-x-2">
            {step > 0 && (
              <button
                type="button"
                onClick={saveAndContinueLater}
                className="px-6 py-2 border border-gray-300 rounded-lg text-[#002B45] font-medium hover:bg-gray-100"
              >
                Save & Continue Later
              </button>
            )}

            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-[#004B87] text-white rounded-lg font-medium hover:bg-[#003B6F]"
              >
                {step === 0 ? "Continue" : "Next"}
              </button>
            ) : (
              <button
                type="button"
                onClick={submitForm}
                disabled={isSubmitting}
                className="px-2 md:px-4 py-2 bg-[#009688] text-white rounded-lg font-medium hover:bg-[#00897B] disabled:bg-gray-400"
              >
                {isSubmitting ? "Submitting..." : "Complete Registration"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysiotherapistOnboarding;
