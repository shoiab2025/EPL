// import React, { useState } from 'react'
// import UploadFiles from './UploadFiles';

// const AddStudyMaterials = ({editMaterial = false}) => {
//   const [materialName, setMaterialName] = useState('')
//   const [materialType, setMaterialType] = useState("text")
//   const [materialData, setMaterialData] = useState('')
//   return (
//     <div className="max-w-[500px]">
//       <h1 className="heading">Add Study Material</h1>
//       <form className="flex flex-col gap-3 mt-8">
//         <input
//           type="text"
//           placeholder="Name of Material"
//           className="input-box"
//           required
//         />
//         <select
//           className="input-box"
//           onChange={(e) => setMaterialType(e.target.value)}
//         >
//           {/* 'text', 'image', 'video', 'audio', 'pdf' */}
//           <option value="text">text</option>
//           <option value="image">image</option>
//           <option value="video">video</option>
//           <option value="audio">audio</option>
//           <option value="pdf">pdf</option>
//         </select>
//         <div>
//             <UploadFiles type={materialType}/>
//         </div>
//         <button type="submit" className="submit-button">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddStudyMaterials

import React, { useState } from "react";
import UploadFiles from "./UploadFiles";
import axios from "axios";

const AddStudyMaterials = ({ editMaterial = false }) => {
  const [materialName, setMaterialName] = useState("");
  const [materialType, setMaterialType] = useState("text");
  const [materialData, setMaterialData] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content_type", materialType)
    formData.append("content", materialType === "text" ? materialData : "")
    if(materialType !== "text"){
      formData.append("file", materialData);
    }
    formData.append("publish", false)
    formData.append("testId", materialName);

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
      console.log(response.data)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="max-w-[500px]">
      <h1 className="heading">Add Study Material</h1>
      <form className="flex flex-col gap-3 mt-8" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name of Material"
          className="input-box"
          required
          value={materialName}
          onChange={(e) => setMaterialName(e.target.value)}
        />
        <select
          className="input-box"
          onChange={(e) => setMaterialType(e.target.value)}
        >
          <option value="text">text</option>
          <option value="image">image</option>
          <option value="video">video</option>
          <option value="audio">audio</option>
          <option value="pdf">pdf</option>
        </select>
        <UploadFiles type={materialType} materialData={materialData} setMaterialData={setMaterialData} />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddStudyMaterials;

