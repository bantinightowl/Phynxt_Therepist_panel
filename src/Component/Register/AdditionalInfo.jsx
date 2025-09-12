import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import debounce from "lodash.debounce";
import dummyImage from "../../assets/dummyProfileImge.jpg";

const AdditionalInfo = () => {
  const navigate = useNavigate();

  // Profile state
  const [profileData, setProfileData] = useState({
    profileImage: null,
    experience: "",
    position: "",
    about: "",
    locality: "",
    city: "",
    state: "",
    fullAddress: "",
  });

  // Service state
  const [serviceData, setServiceData] = useState({
    serviceId: "",
    serviceDuration: "",
    price: "",
  });

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // Location suggestions state
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showStateSuggestions, setShowStateSuggestions] = useState(false);
  const [stateSuggestions, setStateSuggestions] = useState([]);
  const [showLocalitySuggestions, setShowLocalitySuggestions] = useState(false);
  const [localitySuggestions, setLocalitySuggestions] = useState([]);
  const [suggestionLoading, setSuggestionLoading] = useState(false);

  const [previewImage, setPreviewImage] = useState(dummyImage);

  // Fetch available services
  useEffect(() => {
    const fetchServices = async () => {
      const token = Cookies.get("accessToken");
      console.log("Fetched token from cookies:", token);
      
      setLoading(true);
      try {
        const response = await fetch(
          "https://physiotherapy-1.onrender.com/apis/services/getAllServices",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setServices(data.data);
        } else {
          setServices([]);
          toast.error("Failed to load services", {
            position: "top-right",
          });
        }
      } catch (err) {
        toast.error(err.message || "Something went wrong. Please try again.", {
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [navigate]);

  // Handle profile input changes
  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage" && files.length > 0) {
      const file = files[0];
      setProfileData((prev) => ({ ...prev, profileImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle service input changes
  const handleServiceChange = (e) => {
    const { name, value } = e.target;

    if (name === "serviceId") {
      const service = services.find((s) => s._id === value);
      setSelectedService(service || null);
      setServiceData((prev) => ({ ...prev, serviceId: value }));
    } else {
      setServiceData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Fetch location suggestions
  const fetchLocationSuggestions = async (query, type) => {
    if (!query) return;

    setSuggestionLoading(true);
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          query
        )}&limit=50&type=${type}&apiKey=952464191bde4c50ae19e0f18da461b4`
      );

      const data = await res.json();
      const results = data.features.map((item) => {
        const props = item.properties;
        return {
          display_name: props.formatted,
          city: props.city || props.name || "",
          state: props.state || props.county || props.region || "",
          locality: props.locality || props.name || "",
        };
      });

      if (type === "city") setCitySuggestions(results);
      else if (type === "state") setStateSuggestions(results);
      else if (type === "locality") setLocalitySuggestions(results);
    } catch (error) {
      console.error("Geoapify error:", error);
      if (type === "city") setCitySuggestions([]);
      else if (type === "state") setStateSuggestions([]);
      else if (type === "locality") setLocalitySuggestions([]);
    } finally {
      setSuggestionLoading(false);
    }
  };

  // Debounced location suggestion fetchers
  const debouncedFetchCitySuggestions = useCallback(
    debounce((query) => fetchLocationSuggestions(query, "city"), 1000),
    []
  );

  const debouncedFetchStateSuggestions = useCallback(
    debounce((query) => fetchLocationSuggestions(query, "state"), 1000),
    []
  );

  const debouncedFetchLocalitySuggestions = useCallback(
    debounce((query) => fetchLocationSuggestions(query, "locality"), 1000),
    []
  );

  // Handle location input changes
  const handleCityChange = (e) => {
    const value = e.target.value;
    setProfileData((prev) => ({ ...prev, city: value }));
    setShowCitySuggestions(true);
    debouncedFetchCitySuggestions(value);
  };

  const handleStateChange = (e) => {
    const value = e.target.value;
    setProfileData((prev) => ({ ...prev, state: value }));
    setShowStateSuggestions(true);
    debouncedFetchStateSuggestions(value);
  };

  const handleLocalityChange = (e) => {
    const value = e.target.value;
    setProfileData((prev) => ({ ...prev, locality: value }));
    setShowLocalitySuggestions(true);
    debouncedFetchLocalitySuggestions(value);
  };

  // Handle location selection
  const handleCitySelect = (suggestion) => {
    setProfileData((prev) => ({
      ...prev,
      city: suggestion.display_name,
      state: suggestion.state || prev.state,
    }));
    setShowCitySuggestions(false);
  };

  const handleStateSelect = (suggestion) => {
    setProfileData((prev) => ({
      ...prev,
      state: suggestion.name || suggestion.display_name,
    }));
    setShowStateSuggestions(false);
  };

  const handleLocalitySelect = (suggestion) => {
    setProfileData((prev) => ({ ...prev, locality: suggestion.display_name }));
    setShowLocalitySuggestions(false);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("accessToken");

    if (!token) {
      toast.error("You are not logged in. Please log in.", {
        position: "top-right",
      });
      navigate("/login");
      return;
    }

    // Validate required fields
    if (!profileData.profileImage) {
      toast.error("Profile picture is required", { position: "top-right" });
      return;
    }

    if (!profileData.experience) {
      toast.error("Experience is required", { position: "top-right" });
      return;
    }

    if (!profileData.city || !profileData.state || !profileData.fullAddress) {
      toast.error("Location information is required", {
        position: "top-right",
      });
      return;
    }

    if (!serviceData.serviceId) {
      toast.error("Please select a service", { position: "top-right" });
      return;
    }
    if (!serviceData.serviceDuration) {
      toast.error("Service duration is required", { position: "top-right" });
      return;
    }

    if (!serviceData.price) {
      toast.error("Price is required", { position: "top-right" });
      return;
    }

    setBtnLoading(true);

    try {
      // First update profile
      const profileFormData = new FormData();
      profileFormData.append("about", profileData.about);
      profileFormData.append("experience", profileData.experience);
      profileFormData.append("position", profileData.position);
      if (profileData.profileImage) {
        profileFormData.append("profileImage", profileData.profileImage);
      }

      const profileResponse = await fetch(
        "https://physiotherapy-1.onrender.com/apis/physiotherapistProfile/uploadProfileImage",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: profileFormData,
        }
      );

      const profileResult = await profileResponse.json();

      if (!profileResult.success) {
        throw new Error(profileResult.message || "Profile update failed");
      }

      // Then add service
      const serviceBody = {
        price: serviceData.price,
        city: profileData.city,
        state: profileData.state,
        locality: profileData.locality,
        fullAddress: profileData.fullAddress,
        serviceId: serviceData.serviceId,
      };

      const serviceResponse = await fetch(
        "https://physiotherapy-1.onrender.com/apis/therapy-services/addServiceTherapy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(serviceBody),
        }
      );

      const serviceResult = await serviceResponse.json();

      if (serviceResult.success) {
        toast.success("Profile and service updated successfully!", {
          position: "top-right",
        });
        navigate("/dashboard");
      } else {
        throw new Error(serviceResult.message || "Service addition failed");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(err.message || "Something went wrong. Please try again.", {
        position: "top-right",
      });
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat w-full relative" style={{ backgroundImage: "url('/assets/login2.png')" }}>
      {/* Overlay to improve readability */}
      <div className="absolute inset-0 bg-[#0B1B33] bg-opacity-80"></div>
      
      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Left decorative panel */}
            <div className="hidden md:block md:w-2/5 bg-[#002B45] p-6 text-white">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="bg-white bg-opacity-20 p-4 rounded-full mb-6">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Complete Your Profile</h3>
                <p className="text-sm text-center text-blue-100">Help patients find and connect with you by providing your professional information</p>
              </div>
            </div>
            
            {/* Main form content */}
            <div className="md:w-3/4 p-6 md:p-8 overflow-auto custom-scroll" style={{ maxHeight: "90vh" }}>
              <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-[#002B45] mb-2">
                  Complete Your Professional Profile
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Add your information and services to help patients find and connect with you
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                {/* Profile Section */}
                <div className="border-b border-gray-200 pb-6 md:pb-8">
                  <h2 className="text-lg md:text-xl font-semibold text-[#004B87] mb-4 md:mb-6 flex items-center">
                    <span className="bg-blue-100 text-blue-800 p-2 rounded-full mr-2">
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    Profile Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Profile Image */}
                    <div className="md:col-span-2 flex flex-col items-center mb-4">
                      <div className="relative">
                        <img
                          src={previewImage}
                          alt="Profile Preview"
                          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-100 shadow"
                        />
                        <label
                          htmlFor="profileImage"
                          className="absolute bottom-0 right-0 bg-[#009688] text-white p-1 md:p-2 rounded-full cursor-pointer shadow-md hover:bg-[#00897b] transition-colors"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <input
                            id="profileImage"
                            name="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={handleProfileChange}
                            className="hidden"
                            required
                          />
                        </label>
                      </div>
                      <p className="text-xs md:text-sm text-gray-500 mt-2">
                        Click camera icon to upload profile picture<span className="text-red-500">*</span>
                      </p>
                    </div>

                    {/* Experience and Position */}
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-[#002B45] mb-1">
                        Experience (Years)<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="experience"
                        name="experience"
                        type="number"
                        min="0"
                        value={profileData.experience}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border border-[#009688] rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#004B87] focus:shadow-md focus:shadow-blue-200"
                        placeholder="Enter years of experience"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-[#002B45] mb-1">
                        Position
                      </label>
                      <input
                        id="position"
                        name="position"
                        type="text"
                        value={profileData.position}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border border-[#009688] rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#004B87] focus:shadow-md focus:shadow-blue-200"
                        placeholder="E.g., Senior Physiotherapist"
                      />
                    </div>

                    {/* About */}
                    <div className="md:col-span-2">
                      <label htmlFor="about" className="block text-sm font-medium text-[#002B45] mb-1">
                        About Yourself
                      </label>
                      <textarea
                        id="about"
                        name="about"
                        rows="3"
                        value={profileData.about}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border border-[#009688] rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#004B87] focus:shadow-md focus:shadow-blue-200"
                        placeholder="Describe your expertise, approach to treatment, etc."
                      ></textarea>
                    </div>

                    {/* Location Header */}
                    <div className="md:col-span-2 mt-4">
                      <h2 className="text-lg md:text-xl font-semibold text-[#004B87] mb-4 md:mb-6 flex items-center">
                        <span className="bg-blue-100 text-blue-800 p-2 rounded-full mr-2">
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-[#004B87]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </span>
                        Location
                      </h2>
                    </div>

                    {/* Locality */}
                    <div className="md:col-span-2">
                      <label htmlFor="locality" className="block text-sm font-medium text-[#002B45] mb-1">
                        Add Your Location - Patients Will Search You Here
                      </label>
                      <div className="relative">
                        <input
                          id="locality"
                          name="locality"
                          type="text"
                          value={profileData.locality}
                          onChange={handleLocalityChange}
                          className="w-full px-3 py-2 border border-[#009688] rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#004B87] focus:shadow-md focus:shadow-blue-200"
                          placeholder="E.g., Sector 18, Connaught Place"
                        />
                        {showLocalitySuggestions && localitySuggestions.length > 0 && (
                          <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-48 overflow-y-auto shadow-lg">
                            {localitySuggestions.map((suggestion, index) => (
                              <li
                                key={index}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => handleLocalitySelect(suggestion)}
                              >
                                {suggestion.display_name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* City and State */}
                    <div className="relative">
                      <label htmlFor="city" className="block text-sm font-medium text-[#002B45] mb-1">
                        City<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={profileData.city}
                          onChange={handleCityChange}
                          className="w-full px-3 py-2 border border-[#009688] rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#004B87] focus:shadow-md focus:shadow-blue-200"
                          placeholder="E.g., Delhi, Mumbai"
                          required
                        />
                        {showCitySuggestions && citySuggestions.length > 0 && (
                          <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-48 overflow-y-auto shadow-lg">
                            {citySuggestions.map((suggestion, index) => (
                              <li
                                key={index}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => handleCitySelect(suggestion)}
                              >
                                {suggestion.display_name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="state" className="block text-sm font-medium text-[#002B45] mb-1">
                        State<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="state"
                          name="state"
                          type="text"
                          value={profileData.state}
                          onChange={handleStateChange}
                          className="w-full px-3 py-2 border border-[#009688] rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#004B87] focus:shadow-md focus:shadow-blue-200"
                          placeholder="E.g., Delhi, Maharashtra"
                          required
                        />
                        {showStateSuggestions && stateSuggestions.length > 0 && (
                          <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-48 overflow-y-auto shadow-lg">
                            {stateSuggestions.map((suggestion, index) => (
                              <li
                                key={index}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => handleStateSelect(suggestion)}
                              >
                                {suggestion.display_name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Full Address */}
                    <div className="md:col-span-2">
                      <label htmlFor="fullAddress" className="block text-sm font-medium text-[#002B45] mb-1">
                        Full Address<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="fullAddress"
                        name="fullAddress"
                        type="text"
                        value={profileData.fullAddress}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border border-[#009688] rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#004B87] focus:shadow-md focus:shadow-blue-200"
                        placeholder="E.g., B-12, Janakpuri, New Delhi"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Service Section */}
                <div className="pb-6 md:pb-8">
                  <h2 className="text-lg md:text-xl font-semibold text-[#004B87] mb-4 md:mb-6 flex items-center">
                    <span className="bg-green-100 text-green-800 p-2 rounded-full mr-2">
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </span>
                    Service Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Service Selection */}
                    <div className="md:col-span-2">
                      <label htmlFor="serviceId" className="block text-sm font-medium text-[#002B45] mb-1">
                        Select Service<span className="text-red-500">*</span>
                      </label>
                      <select
                        id="serviceId"
                        name="serviceId"
                        value={serviceData.serviceId}
                        onChange={handleServiceChange}
                        className="w-full px-3 py-2 border border-[#009688] rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#004B87] focus:shadow-md focus:shadow-blue-200"
                        required
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service._id} value={service._id}>
                            {service.serviceName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Service Duration */}
                    <div className="md:col-span-2">
                      <label htmlFor="duration" className="block text-sm font-medium text-[#002B45] mb-1">
                        Service Duration (Hours)<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="serviceDuration"
                        name="serviceDuration"
                        type="number"
                        min="0"
                        max="24"
                        value={serviceData.serviceDuration}
                        onChange={handleServiceChange}
                        className="w-full px-3 py-2 border border-[#009688] rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#004B87] focus:shadow-md focus:shadow-blue-200"
                        placeholder="Enter service Duration in hours"
                        required
                      />
                    </div>

                    {/* Service Price */}
                    <div className="md:col-span-2">
                      <label htmlFor="price" className="block text-sm font-medium text-[#002B45] mb-1">
                        Service Price (₹)<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">₹</span>
                        <input
                          id="price"
                          name="price"
                          type="number"
                          min="0"
                          value={serviceData.price}
                          onChange={handleServiceChange}
                          className="w-full pl-8 pr-3 py-2 border border-[#009688] rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#004B87] focus:shadow-md focus:shadow-blue-200"
                          placeholder="Enter service price"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-2 md:pt-4">
                  <button
                    type="submit"
                    disabled={btnLoading}
                    className="bg-[#009688] hover:bg-[#00897b] text-white font-medium py-2 px-6 md:py-3 md:px-8 rounded-lg transition duration-200 focus:outline-none focus:ring-1 focus:ring-[#004B87] focus:shadow-md focus:shadow-blue-200 disabled:opacity-75 flex items-center"
                  >
                    {btnLoading ? (
                      <>
                        <ThreeDots height="20" width="30" color="#fff" />
                        <span className="ml-2">Saving...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Save Profile & Service
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default AdditionalInfo;