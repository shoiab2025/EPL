import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const RichTextEditor = ({ materialData, setMaterialData }) => {
  const editor = useRef(null);

  

  return (
    <div className="w-full">
      <JoditEditor
        value={materialData}
        ref={editor}
        onChange={(newContent) => setMaterialData(newContent)}
      />
    </div>
  );
};

export default RichTextEditor;
