import React, { useState } from "react";
import { uploadArea } from "../../../public";
import RichTextEditor from "../../Components/TextArea/TextArea";

// const UploadFiles = ({type}) => {
//     const [image, setImage] = useState('')
//     const [pdf, setPdf] = useState("No file chosen");
//     const [content, setContent] = useState("");
//     const [audio, setAudio] = useState("No file chosen")

//     const handleUploadImage = (e) => {
//         setImage(URL.createObjectURL(e.target.files[0]));
//     }

//     const handleUploadPdf = (e) => {
//         const file = e.target.files[0];
//         setPdf(file ? file : "No file chosen");
//     }

//     const handleUploadAudio = (e) => {
//       const file = e.target.files[0];
//       if (file) {
//         const audioURL = URL.createObjectURL(file);
//         setAudio(audioURL);
//       }
//     }
//     // text', 'image', 'video', 'audio', 'pdf'
//    if(type === "image"){
//      return (
//        <label>
//          <img src={image ? image : uploadArea} className={`cursor-pointer ${image ? "w-[250px]": ""}`} />
//          <input type="file" onChange={handleUploadImage} hidden />
//        </label>
//      );
//    }
//    else if(type === "pdf"){
//      return (
//        <div className="flex items-center gap-4">
//          <label className="relative bg-[var(--primary-color)] px-4 py-2 rounded-lg cursor-pointer text-white ">
//            <input type="file" onChange={handleUploadPdf} hidden />
//            Upload Pdf
//          </label>
//          <span className="text-gray-800 text-md">{pdf.name}</span>
//        </div>
//      );
//    }

//    else if(type === "audio"){
//     return (
//       <div className="flex items-center gap-2">
//         <label className="relative px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg cursor-pointer">
//           <input
//             type="file"
//             accept="audio/*"
//             hidden
//             className="absolute"
//             onChange={handleUploadAudio}
//           />
//           Upload Audio
//         </label>
//         {(audio !== "No file chosen") && (
//           <audio controls>
//             <source src={audio} type="audio/mpeg" />
//           </audio>
//         )}
//       </div>
//     );
//    }

//    if(type=== "video"){
//     return(
//       <input type="text" placeholder=''/>
//     )
//    }

//    return (
//      <RichTextEditor content = {content} setContent = {setContent}  />
//    )
// }

// export default UploadFiles

const UploadFiles = ({ type, materialData, setMaterialData }) => {
  const [materialDataUrl, setMaterialDataUrl] = useState();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMaterialData(file);
      if(type === "image" || type === "audio"){
        setMaterialDataUrl(URL.createObjectURL(file));
      }
    }
  };

  if (type === "pdf") {
    return (
      <div className="flex items-center gap-4">
        <label className="relative bg-[var(--primary-color)] px-4 py-2 rounded-lg cursor-pointer text-white ">
          <input
            type="file"
            accept={type + "/*"}
            onChange={handleFileChange}
            hidden
          />
          Upload Pdf
        </label>
        <span className="text-gray-800 text-md">{materialData?.name}</span>
      </div>
    );
  }else if(type === "image"){
     return (
       <label>
         <img src={materialDataUrl ? materialDataUrl : uploadArea} className={`cursor-pointer ${materialDataUrl ? "": ""}`} />
         <input type="file" onChange={handleFileChange} hidden />
       </label>
     );
  }
  
  else if (type === "audio") {
    return (
      <div className="flex items-center gap-2">
        <label className="relative px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg cursor-pointer">
          <input
            hidden
            type="file"
            accept={type + "/*"}
            onChange={handleFileChange}
          />
          Upload Audio
        </label>
        {materialData && (
          <audio controls>
            <source src={materialDataUrl} type="audio/mpeg" />
          </audio>
        )}
      </div>
    );
  } else if (type === "video") {
    return (
      <input
        type="text"
        placeholder="Enter video URL"
        onChange={(e) => setMaterialData(e.target.value)}
        className="input-box"
      />
    );
  }

  return <RichTextEditor setMaterialData={setMaterialData} />;
};

export default UploadFiles;
