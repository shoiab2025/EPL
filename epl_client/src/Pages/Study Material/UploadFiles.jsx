import React, { useEffect, useState } from "react";
import { uploadArea } from "../../../public";
import RichTextEditor from "../../Components/TextArea/TextArea";

const UploadFiles = ({ type, materialData, setMaterialData }) => {
  const [materialDataUrl, setMaterialDataUrl] = useState("");
  
  // useEffect(() => {
  //    setMaterialData("")
  //    setMaterialDataUrl("")
  //   //  console.log(type)
  // },[type])

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {(
  //     setMaterialData(file);
  //     if(type === "image" || type === "audio"){
  //       setMaterialDataUrl(URL.createObjectURL(file));
  //     }
  //   }
  // };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setMaterialData(file)
        if (type === "image" || type === "audio") {
          setMaterialDataUrl(URL.createObjectURL(file));
        } else {
          setMaterialDataUrl(file);
        }
      }
    };

  if (type === "pdf") {
    return (
      // <div className="flex items-center gap-4">
      //   <label className="relative bg-[var(--primary-color)] px-4 py-2 rounded-lg cursor-pointer text-white ">
      //     <input
      //       type="file"
      //       accept={type + "/*"}
      //       onChange={handleFileChange}
      //       required
      //       hidden
      //     />
      //     Upload Pdf
      //   </label>
      //   <span className="text-gray-800 text-md">{materialData?.name}</span>
      // </div>

      <input
        type="text"
        required
        value={materialData}
        placeholder="Enter pdf URL"
        onChange={(e) => setMaterialData(e.target.value)}
        className="input-box"
      />
    );
  }else if(type === "image"){
     return (
       //  <label>
       //    <img src={materialDataUrl ? materialDataUrl : uploadArea} className={`cursor-pointer ${materialDataUrl ? "": ""}`} />
       //    <input type="file" onChange={handleFileChange} hidden required/>
       //  </label>

       <input
         type="text"
         value={materialData}
         required
         placeholder="Enter image URL"
         onChange={(e) => setMaterialData(e.target.value)}
         className="input-box"
       />
     );
  }
  
  else if (type === "audio") {
    return (
      // <div className="flex items-center gap-2">
      //   <label className="relative px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg cursor-pointer">
      //     <input
      //       hidden
      //       type="file"
      //       accept={type + "/*"}
      //       onChange={handleFileChange}
      //       required
      //     />
      //     Upload Audio
      //   </label>
      //   {materialData && (
      //     <audio controls>
      //       <source src={materialDataUrl} type="audio/mpeg" />
      //     </audio>
      //   )}
      // </div>
      <input
        type="text"
        required
        value={materialData}
        placeholder="Enter Audio URL"
        onChange={(e) => setMaterialData(e.target.value)}
        className="input-box"
      />
    );
  } else if (type === "text") {
    // return <RichTextEditor materialData={materialData} setMaterialData={setMaterialData} />;
    return "";
  }
  return (
    <input
      type="text"
      value={materialData}
      required
      placeholder="Enter video URL"
      onChange={(e) => setMaterialData(e.target.value)}
      className="input-box"
    />
  );
};

export default UploadFiles;
