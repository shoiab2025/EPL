import React, { useEffect, useState } from "react";
import UploadFiles from "./UploadFiles";
import axios from "axios";
import { useUser } from "../../context/UserContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import {useSnackbar} from "notistack"

const AddStudyMaterials = ({ editMaterial = false }) => {
  const [testId, setTestId] = useState("");
  const [materialType, setMaterialType] = useState("image");
  const [materialData, setMaterialData] = useState(null);
  const {tests, setStudyMaterials} = useUser()
  const navigate = useNavigate()
  const {id} = useParams()
  const {enqueueSnackbar} = useSnackbar()

  useEffect(() => {
    if(editMaterial && id){
       loadMaterialData()
    }
  },[editMaterial, id])

  const loadMaterialData = async() => {
    try{
      const resposne = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/meterials/${id}`,
        {
          withCredentials: true,
        }
      );
      if(resposne.data.success){
         const {content, content_type, file_url, test} = resposne.data.data;
         setTestId(test._id)
         setMaterialType(content_type)
         if(content_type === "text"){
          setMaterialData(content);
         }else{
          setMaterialData(file_url);
         }
      }
    }catch(err){
      console.log(err)
    }
  }

  const handleNewSubmit = async() => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("content_type", materialType)
    formData.append("content", materialType === "text" ? materialData : "")
    if(materialType !== "text"){
      formData.append("file", materialData);
    }
    formData.append("publish", false)
    formData.append("test", testId);

    try{
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/meterials`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if(response.data.success){
         enqueueSnackbar("Successfully Material Uploaded!", {variant: "success"})
         setTestId("")
         setMaterialData(null)
         setStudyMaterials((prev) => [...prev, response.data.data])
      };
    }catch(err){
      console.log(err.response.data)
      enqueueSnackbar("Error uploading materials", {variant: "error"})
    }
  }

  const handleEditSubmit = async() => {
     const formData = new FormData();
     formData.append("content_type", materialType);
     formData.append("content", materialType === "text" ? materialData : "");
     if (materialType !== "text") {
       formData.append("file", materialData);
     }
     formData.append("publish", false);
     formData.append("test", testId);

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
           setMaterialData(null);
          setStudyMaterials((prev) => {
              return prev.map((material) => (
                material._id === id ? response.data.data : material
              ))
          })
          navigate("/studyMaterials")
       }
     } catch (err) {
       console.log(err.response.data);
       enqueueSnackbar("Error editing materials", { variant: "error" });
     }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    editMaterial ? handleEditSubmit() : handleNewSubmit()
  }

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
        <UploadFiles
          type={materialType}
          materialData={materialData}
          setMaterialData={setMaterialData}
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddStudyMaterials;

