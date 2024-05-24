import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./uploadModel.scss";

function UploadModel() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("model", file);
    formData.append("name", name);
    formData.append("description", desc);

    try {
      const response = await axios.post(
        "http://localhost:8802/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage(response.data);
      console.log("Model Created Successfully!")
      setErrorMessage("");
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data);
      setSuccessMessage("");
    }
  };
  return (
    <div className="upload-model">
      <div className="container">
        <form action="" onSubmit={handleSubmit}>
          <h4>UPLOAD 3D MODEL</h4>
          <div className="box">
            <label htmlFor="">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="enter 3D model name"
            />

            <label htmlFor="">Description</label>
            <textarea
              placeholder="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              id=""
            />

            <label htmlFor="">
              Upload <span>(glb file can only upload)</span>
            </label>
            <input type="file" accept=".glb" name="file" onChange={handleFileChange} />

            <button type="submit">Submit</button>
          </div>
        </form>
        {errorMessage && <div className="error">{errorMessage}</div>}
        {successMessage && <div className="success"> {successMessage} </div>}
      </div>
    </div>
  );
}

export default UploadModel;
