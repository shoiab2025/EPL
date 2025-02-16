import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const QuestionTestArea = ({ quiz, handleQuizChange, lang, index }) => {
  const editor = useRef(null);
  const config = {
    placeholder: `Enter your question in ${
      lang || "selected language"
    }`,
  };
  return (
    <div className="w-full">
      <JoditEditor
        ref={editor}
        config={config}
        className=" max-h-[400px] overflow-scroll"
        placeholder={`Enter your question in ${lang || "selected language"}`}
        onChange={(newContent) => {
          const updatedQuestion = {
            ...quiz.question,
            [lang]: newContent,
          };
          handleQuizChange(index, "question", updatedQuestion);
        }}
      />
    </div>
  );
};

export default QuestionTestArea;
