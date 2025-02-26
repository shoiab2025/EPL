import React, { useEffect, useState } from "react";
import UploadFiles from "./UploadFiles";
import axios from "axios";
import { useUser } from "../../context/UserContext.jsx";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const AddStudyMaterials = ({ editMaterial = false }) => {
  const [testId, setTestId] = useState("");
  const [materialType, setMaterialType] = useState("image");
  const [materialQuestionType, setMaterialQuestionType] = useState("");
  const [materialData, setMaterialData] = useState("");
  const { tests, setStudyMaterials, questionCategory, setQuestionCategory } =
    useUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [fetch, setFetch] = useState()
  

  useEffect(() => {
    if (editMaterial && id) {
      loadMaterialData();
    }
  }, [editMaterial, id]);

  const loadMaterialData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/meterials/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        // console.log(response.data.data);
        // console.log(response.data.data.file_url)
        const { content_type, test, file_url } = response.data.data;
        setTestId(test._id);
        setMaterialType(content_type);
        setMaterialData(file_url);
        setMaterialQuestionType(response.data.data.questionCategory);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewSubmit = async () => {
    // e.preventDefault();
    const category = await questionCategory.find(
      (item) => item._id === materialQuestionType
    );
    const formData = new FormData();
    formData.append("content_type", materialType);
    formData.append("content", category.title);
    formData.append("publish", false);
    formData.append("test", testId);
    formData.append("questionCategory", materialQuestionType);
    formData.append("fileUrl", materialData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/meterials`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        enqueueSnackbar("Successfully Material Uploaded!", {
          variant: "success",
        });
        setTestId("");
        setMaterialData("");
        setMaterialQuestionType("");
        setStudyMaterials((prev) => [...prev, response.data.data]);
        setFetch(false)
        navigate("/studyMaterials")
      }
    } catch (err) {
      // console.log(err.response.data);
      enqueueSnackbar("Error uploading materials", { variant: "error" });
      setFetch(false)
    }
  };

  const handleEditSubmit = async () => {
    const category = await questionCategory.find(
      (item) => item._id === materialQuestionType
    );
    const formData = new FormData();
    formData.append("content_type", materialType);
    formData.append("content", category.title);
    formData.append("publish", false);
    formData.append("test", testId);
    formData.append("questionCategory", materialQuestionType);
    formData.append("file_url", materialData);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/meterials/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        enqueueSnackbar("Successfully Material Edited!", {
          variant: "success",
        });
        setTestId("");
        setMaterialData("");
        setStudyMaterials((prev) => {
          return prev.map((material) =>
            material._id === id ? response.data.data : material
          );
        });
        setMaterialQuestionType("");
        navigate("/studyMaterials");
        setFetch(false)
      }
    } catch (err) {
      // console.log(err.response.data);
      enqueueSnackbar("Error editing materials", { variant: "error" });
      setFetch(false)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFetch(true)
    editMaterial ? handleEditSubmit() : handleNewSubmit();
  };

  return (
    <div className="max-w-[500px]">
      <h1 className="heading">
        {" "}
        {editMaterial ? "Edit Study Material" : "Add Study Material"}{" "}
      </h1>
      <form className="flex flex-col gap-3 mt-8" onSubmit={handleSubmit}>
        <select
          value={testId}
          className="input-box"
          onChange={(e) => {
            setTestId(e.target.value);
          }}
          required
        >
          <option value="">Choose Test</option>
          {tests.map((test, index) => (
            <option value={test._id} key={index}>
              {" "}
              {test.name}
            </option>
          ))}
        </select>
        {questionCategory.length !== 0 && (
          <select
            value={materialQuestionType || ""}
            onChange={(e) => setMaterialQuestionType(e.target.value)}
            className="input-box"
            required
          >
            <option value="">Choose Question Type</option>
            {questionCategory.map((item, index) => (
              <option value={item._id} key={index}>
                {item.title}
              </option>
            ))}
          </select>
        )}
        <select
          className="input-box"
          value={materialType}
          onChange={(e) => setMaterialType(e.target.value)}
        >
          <option value="image">image</option>
          <option value="video">video</option>
          <option value="audio">audio</option>
          <option value="pdf">pdf</option>
        </select>
        {/* <input type="text" /> */}
        <UploadFiles
          type={materialType}
          materialData={materialData}
          setMaterialData={setMaterialData}
        />
        <button
          type="submit"
          disabled={fetch ? true : false}
          className="submit-button"
        >
          {fetch ? (
            <div className="w-5 h-5 border-t-2 border-t-white  animate-spin rounded-full mx-auto"></div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddStudyMaterials;
