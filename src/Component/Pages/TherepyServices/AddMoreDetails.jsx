import { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

function AddMoreDetails() {
  const { imageId } = useParams();
  const [title, setTitle] = useState([]);
  const [article, setArticle] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleVideoChange = (e) => {
    setVideos([...e.target.files]);
  };
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
    const formData = new FormData();
    formData.append("title", JSON.stringify(title));
    formData.append("article", JSON.stringify(article));
    formData.append("therapyServiceId", imageId);

    images.forEach((img) => formData.append("image", img));
    videos.forEach((vid) => formData.append("video", vid));
    if (title === "" || article === "") {
      toast.error("you cannot submit empty form", {
        position: "top-right",
      });
      return;
    }
    console.log("moreDetails", images);
    setLoading(true);
    try {
      const response = await fetch(
        "https://physiotherapy-1.onrender.com/apis/imageVideoInTherapyServices/addImageVideoArticleInTherapyService",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      console.log("submittedData", result);

      if (result.success) {
        toast.success("Service added successfully!", {
          position: "top-right",
        });

        setTitle("");
        setArticle("");
        setImages([]);
        setVideos([]);
        navigate("/therapy/addtherapy");
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
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer autoClose={3000} />
      <div className="bg-white rounded-xl shadow-md p-6 max-w-8xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
          Add More Details
        </h1>
        <form onSubmit={handleSubmit} className="  bg-white  rounded space-y-4">
          {/* <div>
            <label className="block font-semibold">Title</label>
            <input
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle([e.target.value])}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div> */}

          <div>
            <label className="block font-semibold">Article</label>
            <textarea
              name="article"
              rows="5"
              value={article}
              onChange={(e) => setArticle([e.target.value])}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Images (multiple)</label>
              <input
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold">Videos (multiple)</label>
              <input
                name="videos"
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideoChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-start gap-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700"
            >
              {loading ? (
                <div>
                  <ThreeDots
                    visible={true}
                    height="40"
                    width="40"
                    color="white"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : (
                "Submit"
              )}
            </button>

            <button
              className="bg-red-600 text-white px-8 py-2 rounded hover:bg-blue-700"
              onClick={() => navigate("/therapy/addtherapy")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMoreDetails;
