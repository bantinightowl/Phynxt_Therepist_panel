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
  // const [formData, setFormData] = useState({
  //   price: "",
  //   city: "", // comma-separated string
  // });
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

  const navigate = useNavigate();

  // const imageInputRef = useRef(null); // Ref for the image input
  // const videoInputRef = useRef(null); // Ref for the video input

  useEffect(() => {
    const fetchDataApi = async () => {
      const token = Cookies.get("accessToken");
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
  if (!query) {
    setLocationSuggestions([]);
    return;
  }
  try {
    const res = await fetch(
      `https://us1.locationiq.com/v1/search?key=pk.b55596308acd486e66f6b9aa3bcfc0a9&q=${query}&format=json`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    setLocationSuggestions(data);
  } catch (error) {
    console.error("LocationIQ Error:", error);
  }
};




 
  const debouncedFetchLocationSuggestions = useCallback(
    debounce((value) => {
      fetchLocationSuggestions(value);
    }, 1000),
    []
  );



  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setShowSuggestions(true);
    setIsCitySelected(false); // user is typing, not selecting
    debouncedFetchLocationSuggestions(value);
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

 
const handleCitySelect = (displayName) => {
  // Find the selected suggestion from locationSuggestions
  const selectedSuggestion = locationSuggestions.find(
    (suggestion) => suggestion.display_name === displayName
  );
  
  if (selectedSuggestion) {
    console.log("Full location data:", selectedSuggestion);
    
    // Extract address components
    const address = selectedSuggestion.address;
    if (address) {
      console.log("City:", address.city || address.town || address.village || "N/A");
      console.log("State:", address.state || "N/A");
      console.log("Country:", address.country || "N/A");
    } else {
      console.log("No address details available");
    }
  }
  
  setCity(displayName);
  setIsCitySelected(true);
  setShowSuggestions(false);
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
      price: price, // Send the state value of price
      city: city, // Send the state value of city
      serviceId: selectedService._id, // Include serviceId from the selected service
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

        // Reset form data and inputs
        setPrice("");
        setCity("");
        setSelectedService(null);
        setAskModal(true);
        // SetaddServiceId(result?.data?.serviceId);
        SetaddServiceId(result?.data?._id);

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
          {/* Service Selection */}
          <div className="w-full col-span-2 ">
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

          {/* Title */}
          {/* <div className="w-full">
            <label className="block font-semibold mb-1">Title</label>
            <textarea
              className="w-full border rounded-lg p-2"
              rows="1"
              value={selectedService?.title || ""}
              readOnly
            />
          </div> */}

          {/* Description */}
          <div className="w-full">
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              className="w-full border rounded-lg p-2"
              rows="3"
              value={selectedService?.description || ""}
              readOnly
            />
          </div>

          {/* Features */}
          <div className="w-full">
            <label className="block font-semibold mb-1">Features</label>
            <textarea
              className="w-full border rounded-lg p-2"
              rows="3"
              value={selectedService?.features?.join(", ") || ""}
              readOnly
            />
          </div>

          {/* Opening Times */}
          {selectedService?.openingTime && (
            <div className="md:col-span-2">
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

          {/* Price */}
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

          {/* City with Suggestions */}
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
                    onClick={() => handleCitySelect(suggestion.display_name)}
                  >
                    {suggestion.name || suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-4">
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
          <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full  ">
            <h2 className="text-lg font-semibold mb-4 ">
              Would you like to add more details to this service?
            </h2>

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
