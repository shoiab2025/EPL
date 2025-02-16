import React, { useEffect, useState } from "react";
import { uploadArea } from "../../../public";


// const TestFileUploader = ({type}) => {
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

// export default TestFileUploader

const TestFileUploader = ({
  type,
  quiz,
}) => {
  const [testFile, settestFile] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "image" || type === "audio") {
        settestFile(URL.createObjectURL(file));
      } else {
        settestFile(file);
      }
    }
  };
  
  let UploadUi;

  useEffect(() => {
    settestFile("")
  },[type])

  if (type === "pdf") {
    UploadUi = (
      <div className="flex items-center gap-4 my-4">
        <label className="relative bg-[var(--primary-color)] px-4 py-2 rounded-lg cursor-pointer text-white ">
          <input
            type="file"
            accept={type + "/*"}
            onChange={handleFileChange}
            hidden
          />
          Upload Pdf
        </label>
        <span className="text-gray-800 text-md">{testFile?.name}</span>
      </div>
    );
  } else if (type === "image") {
    UploadUi = (
      <label>
        <img
          src={testFile ? testFile : uploadArea}
          className={`cursor-pointer my-4 ${testFile ? "w-[300px]" : ""}`}
        />
        <input type="file" onChange={handleFileChange} hidden />
      </label>
    );
  } else if (type === "audio") {
    UploadUi = (
      <div className="flex items-center gap-2 my-4">
        <label className="relative px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg cursor-pointer">
          <input
            hidden
            type="file"
            accept={type + "/*"}
            onChange={handleFileChange}
          />
          Upload Audio
        </label>
        {testFile && (
          <audio controls>
            <source src={testFile} type="audio/mpeg" />
          </audio>
        )}
      </div>
    );
  } else if (type === "video") {
    UploadUi = (
      <input
        type="text"
        placeholder="Enter video URL"
        onChange={(e) => e.target.value}
        className="input-box my-4"
      />
    );
  }

  return <React.Fragment>{UploadUi}</React.Fragment>;
};

export default TestFileUploader;
