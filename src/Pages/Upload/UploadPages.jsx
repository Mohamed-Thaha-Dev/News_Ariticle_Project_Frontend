import React, { useState } from "react";
import UploadBox from "./UploadBox";
import {
  Paper,
  TextField,
  TextareaAutosize,
  Switch,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";




const UploadPage = () => {
  const [mediaFile, setMediaFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resetPreview, setResetPreview] = useState(false);

  const [uploadData, setFormData] = useState({
    newsTitle: "",
    newsDescription: "",
    category: "",
    tags: [],
    status: false, // false = Published, true = Draft (UI toggle)
    termsAccepted: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "status") {
      setFormData((prev) => ({ ...prev, status: checked }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox" ? checked : type === "file" ? files[0] : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    mediaFile.forEach((file) => {
      formData.append("file", file); // Note: use same key name as your backend expects
    });

    const fixedUploadData = {
      newsTitle: uploadData.newsTitle,
      newsDescription: uploadData.newsDescription,
      category: uploadData.category,
      tags: uploadData.tags.split(",").map((tag) => tag.trim()),
      status: uploadData.status ? "DRAFT" : "PUBLISHED", // ENUM string
    };
    // formData.append("file", mediaFile);
    formData.append("newsData", JSON.stringify(fixedUploadData));

    console.log("Submitted:", {
      mediaFile,
    });
    console.log(fixedUploadData);
    // Send to backend using axios or fetch

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8080/news/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("authToken"), // or sessionStorage
          },
        }
      );
      toast.success(response.data, {
        position: "top-right",
      });
      setFormData({
        newsTitle: "",
        newsDescription: "",
        category: "",
        tags: [],
        status: false, // false = Published, true = Draft (UI toggle)
        termsAccepted: false,
      });
      setMediaFile([]); // clear selected files in parent
      setResetPreview(true); // tell child to clear previews
      setTimeout(() => setResetPreview(false), 0); // reset back
    } catch (err) {
      console.error("Upload Error:", err);
      toast.error(err.response.data.message, {
        position: "top-right",
      });

      if (err.response.status === 403 || err.response.status === 401) {
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      }

      console.log(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-[90%] mx-auto md:shadow-lg p-6 grid  grid-cols-1 sm:grid-cols-2 gap-6 mt-20 mb-20"
      >
        {/* Upload Box */}
        <div className="md:ml-20 ml-0 ">
          <UploadBox
            onFilesSelect={(file) => setMediaFile(file)}
            reset={resetPreview}
          />
        </div>

        {/* Text Fields */}
        <div className="grid gap-4">
          <TextField
            label="News Title"
            variant="outlined"
            fullWidth
            name="newsTitle"
            value={uploadData.newsTitle}
            onChange={handleChange}
            inputProps={{ maxLength: 200 }}
            FormHelperTextProps={{
              sx: { marginTop: "0.25rem", textAlign: "right" },
            }}
            helperText={`${uploadData.newsTitle.length}/200 characters`}
            required
          />

          <TextareaAutosize
            placeholder="News Description"
            value={uploadData.newsDescription}
            onChange={handleChange}
            name="newsDescription"
            className="w-full p-3 border rounded"
            minRows={5}
            maxRows={6}
            required
          />

          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            name="category"
            value={uploadData.category}
            onChange={handleChange}
            required
          />

          <TextField
            label="Tags (comma separated)"
            variant="outlined"
            fullWidth
            name="tags"
            value={uploadData.tags}
            onChange={handleChange}
          />

          <Box display="flex" alignItems="center" gap={2}>
            <Switch
              checked={uploadData.status}
              name="status"
              onChange={handleChange}
            />
            <span>Draft</span>

            <input
              type="checkbox"
              name="termsAccepted"
              checked={uploadData.termsAccepted}
              onChange={handleChange}
            />
            <Link>Terms & Condition</Link>
          </Box>
        </div>

        {/* Submit Button */}
        <Box className="col-span-full flex justify-center mt-4">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ minWidth: "200px", py: 1.5 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Upload News"
            )}
          </Button>
        </Box>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
      />
    </>
  );
};

export default UploadPage;
