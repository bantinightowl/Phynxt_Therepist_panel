import React, { useState, useEffect, useRef, useCallback, u } from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import Header from "../../../Header/Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import debounce from "lodash.debounce";

function AddServices() {
  const [allData, setAllData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [city, setCity] = useState("");

  const [price, setPrice] = useState("");
  const [formKey, setFormKey] = useState(0);
  const [askModel, setAskModal] = useState(false);
  const [addedServiceId, SetaddServiceId] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isCitySelected, setIsCitySelected] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    city: "",
    state: "",
    locality: "",
  });
  const [stateName, setStateName] = useState("");
  const [stateSuggestions, setStateSuggestions] = useState([]);
  const [showStateSuggestions, setShowStateSuggestions] = useState(false);
  const [fullAddress, setFullAddress] = useState("");
  const [locality, setLocality] = useState("");
  const [showLocalitySuggestions, setShowLocalitySuggestions] = useState(false);
  const [localitySuggestions, setLocalitySuggestions] = useState([]);

  const navigate = useNavigate();

  // const imageInputRef = useRef(null); // Ref for the image input
  // const videoInputRef = useRef(null); // Ref for the video input

  useEffect(() => {
    const fetchDataApi = async () => {
      const token = Cookies.get("accessToken");
      console.log("token__", token);
      if (!token) {
        toast.error("You are not logged in. Please log in.", {
          position: "top-right",
        });
        navigate("/login");
        return;
      }
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
          setAllData(data.data);
        } else {
          setAllData([]);
        }
      } catch (err) {
        toast.error(err.message || "Something went wrong. Please try again.", {
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDataApi();
  }, []);

  const fetchLocationSuggestions = async (query) => {
    if (!query) return;

    setSuggestionLoading(true);
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          query
        )}&limit=50&type=city&apiKey=952464191bde4c50ae19e0f18da461b4`
      );

      const data = await res.json();
      const cityResults = data.features.map((item) => {
        const props = item.properties;
        return {
          display_name: props.formatted,
          city: props.city || props.name || "",
          state: props.state || props.county || props.region || "", // fallback
        };
      });

      setLocationSuggestions(cityResults);
    } catch (error) {
      console.error("Geoapify error:", error);
      setLocationSuggestions([]);
    } finally {
      setSuggestionLoading(false);
    }
  };

  const fetchStateSuggestions = async (query) => {
    if (!query) return;

    setSuggestionLoading(true);
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          query
        )}&limit=50&type=state&apiKey=952464191bde4c50ae19e0f18da461b4`
      );
      const data = await res.json();
      const stateResults = data.features.map((item) => {
        const props = item.properties;
        return {
          name: props.state || props.county || props.region || props.name || "",
        };
      });
      setStateSuggestions(stateResults);
    } catch (error) {
      console.error("Geoapify state fetch error:", error);
      setStateSuggestions([]);
    } finally {
      setSuggestionLoading(false);
    }
  };

  const debouncedFetchLocationSuggestions = useCallback(
    debounce((value) => {
      fetchLocationSuggestions(value);
    }, 500),
    []
  );

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setShowSuggestions(true);
    setIsCitySelected(false); // user is typing, not selecting
    debouncedFetchLocationSuggestions(value);
  };
  const handleLocalaityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setShowSuggestions(true);
    setIsCitySelected(false); // user is typing, not selecting
    debouncedFetchLocationSuggestions(value);
  };

  const handleStateChange = (e) => {
    const value = e.target.value;
    setStateName(value);
    setShowStateSuggestions(true);
    fetchStateSuggestions(value);
  };

  useEffect(() => {
    return () => {
      debouncedFetchLocationSuggestions.cancel();
    };
  }, [debouncedFetchLocationSuggestions]);

  const handleServiceChange = (e) => {
    const serviceId = e.target.value;
    const service = allData.find((s) => s._id === serviceId);
    setSelectedService(service || null);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value ? Number(value) : ""); // Convert the value to a number or empty string if not provided
  };

  const handleCitySelect = (location) => {
    setCity(location.display_name);
    setSelectedLocation({
      city: location.city || location.name || "",
      state: location.state || location.county || location.region || "",
    });
    setIsCitySelected(true);
    setShowSuggestions(false);
  };

  const handleStateSelect = (state) => {
    setStateName(state.name || "");
    setShowStateSuggestions(false);
  };

  const fetchLocalitySuggestions = async (query) => {
    if (!query) return;

    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          query
        )}&limit=50&type=locality&apiKey=952464191bde4c50ae19e0f18da461b4`
      );

      const data = await res.json();
      const results = data.features.map((item) => {
        const props = item.properties;
        return {
          display_name: props.formatted,
          locality: props.locality || props.name || "",
        };
      });

      setLocalitySuggestions(results);
    } catch (error) {
      console.error("Locality fetch error:", error);
      setLocalitySuggestions([]);
    }
  };

  const debouncedFetchLocalitySuggestions = useCallback(
    debounce(fetchLocalitySuggestions, 500),
    []
  );

  const handleLocalitySelect = (suggestion) => {
    setLocality(suggestion.display_name);
    setShowLocalitySuggestions(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("You are not logged in. Please log in.", {
        position: "top-right",
      });
      navigate("/login");
      return;
    }

    if (!selectedService) {
      toast.error("Please select a service before submitting.", {
        position: "top-right",
      });
      return;
    }

    if (!isCitySelected) {
      toast.error("Please select a city from the dropdown.", {
        position: "top-right",
      });
      return;
    }

    setBtnLoading(true);
    const body = {
      price: price,
      city: city,
      state: stateName,
      // country: country,
      locality: locality,
      fullAddress: fullAddress,
      serviceId: selectedService._id,
    };

    try {
      const response = await fetch(
        "https://physiotherapy-1.onrender.com/apis/therapy-services/addServiceTherapy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const result = await response.json();
      console.log(result);
      console.log("submittedData", result);
      console.log("submitedData", result);
      if (result.success) {
        toast.success("Service added successfully!", {
          position: "top-right",
        });
        setPrice("");
        setCity("");
        setSelectedService(null);
        setAskModal(true);
        // SetaddServiceId(result?.data?.serviceId);
        SetaddServiceId(result?.data?._id);
        console.log("rishai", result?.data?._id);

        // Increment the formKey to reset the form visually
        setFormKey((prevKey) => prevKey + 1);
      } else {
        toast.error(result.message || "Something went wrong", {
          position: "top-right",
        });
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong", {
        position: "top-right",
      });
    } finally {
      setBtnLoading(false);
    }
  };
  const handleMoreDetail = () => {
    console.log("hey");
    setAskModal(false);
    if (addedServiceId) {
      navigate(`/therapy/add-more-details/${addedServiceId}`);
    }
  };

  const handleLocalityChange = (e) => {
    const value = e.target.value;
    setLocality(value);
    setShowLocalitySuggestions(true);
    debouncedFetchLocalitySuggestions(value);
  };

  return (
    <div className="flex flex-col h-screen ">
      <div className="overflow-y-auto flex-grow bg-white rounded-xl shadow-md sm:p-6 p-1 max-w-8xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
          Add Services
        </h1>
        <form
          key={formKey}
          onSubmit={handleFormSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 p-4"
        >
          <div className="w-full md:col-span-2">
            <label className="block font-semibold mb-1">Select Service</label>
            <select
              className="w-full border rounded-lg p-2"
              onChange={handleServiceChange}
              value={selectedService?._id || ""}
              required
            >
              <option value="">Select</option>
              {allData.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.serviceName}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              className="w-full border rounded-lg p-2"
              rows="3"
              value={selectedService?.description || ""}
              readOnly
            />
          </div>
          <div className="w-full">
            <label className="block font-semibold mb-1">Features</label>
            <textarea
              className="w-full border rounded-lg p-2"
              rows="3"
              value={selectedService?.features?.join(", ") || ""}
              readOnly
            />
          </div>
          {selectedService?.openingTime && (
            <div className="w-full md:col-span-2">
              <label className="block font-semibold mb-1">Opening Time</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-100 p-4 rounded-lg border">
                {["afternoon", "evening", "night"].map((timeKey) => (
                  <div key={timeKey}>
                    <h3 className="font-medium mb-2 capitalize">{timeKey}</h3>
                    <ul className="list-disc pl-4 text-sm">
                      {selectedService.openingTime[timeKey]?.map(
                        (time, idx) => (
                          <li key={`${timeKey}-${idx}`}>{time}</li>
                        )
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="w-full">
            <label className="block font-semibold mb-1">Price</label>
            <input
              type="number"
              name="price"
              min="0"
              value={price}
              className="w-full border rounded-lg p-2"
              onChange={handlePriceChange}
              required
            />
          </div>
          {/* <div className="w-full">
    <label className="block font-semibold mb-1">Country</label>
    <input type="text" name="country"value={country}
      onChange={(e) => setCountry(e.target.value)} placeholder="e.g., India"
      className="w-full border rounded-lg p-2"
      required
    />
  </div> */}
          <div className="w-full relative">
            <label className="block font-semibold mb-1">State</label>
            <input
              type="text"
              name="state"
              value={stateName}
              onChange={handleStateChange}
              placeholder="e.g., Delhi, Maharashtra"
              className="w-full border rounded-lg p-2"
              required
            />
            {showStateSuggestions && stateSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-48 overflow-y-auto shadow-lg">
                {stateSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm"
                    onClick={() => handleStateSelect(suggestion)}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-full relative">
            <label className="block font-semibold mb-1">City</label>
            <input
              type="text"
              name="city"
              value={city}
              onChange={handleCityChange}
              placeholder="e.g., Delhi, Noida, Mumbai"
              className="w-full border rounded-lg p-2"
              required
            />
            {showSuggestions && locationSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-48 overflow-y-auto shadow-lg">
                {locationSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm"
                    onClick={() => handleCitySelect(suggestion)}
                  >
                    {suggestion.name || suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Updated Locality Field */}
          <div className="w-full relative">
            <label className="block font-semibold mb-1">
              Add Your Location - Patients Will Search You Here
            </label>
            <input
              type="text"
              name="locality"
              value={locality}
              onChange={handleLocalityChange}
              placeholder="e.g., Sector 18, Connaught Place"
              className="w-full border rounded-lg p-2"
            />
            {showLocalitySuggestions && localitySuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-48 overflow-y-auto shadow-lg">
                {localitySuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm"
                    onClick={() => handleLocalitySelect(suggestion)}
                  >
                    {suggestion.name || suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-full">
            <label className="block font-semibold mb-1">Full Address</label>
            <input
              type="text"
              name="fullAddress"
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              placeholder="e.g., B-12, Janakpuri, New Delhi"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div className="w-full md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-8 py-2 min-w-[120px] text-center"
              disabled={btnLoading}
            >
              {btnLoading ? (
                <ThreeDots height="20" width="40" color="#fff" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={3000} />
      {askModel && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-50">
          <div className="bg-white p-10 rounded-xl shadow-lg max-w-xl w-full">
            {" "}
            {/* Changed max-w-md to max-w-xl */}
            <h3 className="text-lg font-semibold mb-4">
              Would you like to add more details about this service? If yes,
              click on 'Add'; otherwise, please update your profile.
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setAskModal(false)}
              >
                Skip
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleMoreDetail}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddServices;
