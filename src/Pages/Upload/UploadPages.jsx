import React, { useState } from "react";
import UploadBox from "./UploadBox";
import { Paper, TextField, TextareaAutosize, Switch, Button, Box } from "@mui/material";

const UploadPage = () => {
  const [mediaFile, setMediaFile] = useState(null);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("mediaFile", mediaFile);
    formData.append("newsTitle", newsTitle);
    formData.append("newsDescription", newsDescription);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("isDraft", isDraft);
    formData.append("termsAccepted", termsAccepted);

    console.log("Submitted:", { mediaFile, newsTitle, newsDescription, category, tags, isDraft, termsAccepted });
    // Send to backend using axios or fetch
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[90%] mx-auto md:shadow-lg p-6 grid  grid-cols-1 sm:grid-cols-2 gap-6 mt-20 mb-20"
    >
      {/* Upload Box */}
      <div className="md:ml-20 ml-0 ">
        <UploadBox onFileSelect={(file) => setMediaFile(file)} />
      </div>

      {/* Text Fields */}
      <div className="grid gap-4">
        <TextField
          label="News Title"
          variant="outlined"
          fullWidth
          value={newsTitle}
          onChange={(e) => setNewsTitle(e.target.value)}
          required
        />

        <TextareaAutosize
          placeholder="News Description"
          value={newsDescription}
          onChange={(e) => setNewsDescription(e.target.value)}
          className="w-full p-3 border rounded"
          minRows={5}
          required
        />

        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <TextField
          label="Tags (comma separated)"
          variant="outlined"
          fullWidth
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <Box display="flex" alignItems="center" gap={2}>
          <Switch checked={isDraft} onChange={() => setIsDraft(!isDraft)} />
          <span>Draft</span>

          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
          />
          <span>Terms & Condition</span>
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
          Upload News
        </Button>
      </Box>
    </form>
  );
};

export default UploadPage;
