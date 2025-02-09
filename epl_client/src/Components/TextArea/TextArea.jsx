import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const RichTextEditor = ({ setMaterialData }) => {
  const editor = useRef(null);

  return (
    <div className="w-full">
      <JoditEditor
        ref={editor}
        onChange={(newContent) => setMaterialData(newContent)}
      />
    </div>
  );
};

export default RichTextEditor;
