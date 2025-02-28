import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Card/Card";


const AddTheme = ({color, setColor}) => {
  const [colorShow, setColorShow] = useState(false)
  // const colorRef = useRef(null)

  const handleColorFouces = () =>{
     setColorShow(true);
  }

  return (
    <Card className="w-[400px] border-gray-300 space-x-0 space-y-0 p-3 pb-10 mt-5">
      <CardHeader className="p-0 space-y-1">
        <CardTitle className="text-sm font-medium">Theme Color</CardTitle>
        <p className="text-xs text-gray-600">
          Select a color to be used as the Theme
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="mt-2">
          <input
            id="color"
            type="text"
            className="input-box w-full"
            value={color || ""}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#000000"
          />
        </div>
        <div className="mt-5 flex items-center gap-4 ">
          <label className="cursor-pointer button" onClick={handleColorFouces}>
            Change Color?
          </label>
          {colorShow && (
            <input
              type="color"
              value={color || ""}
              onChange={(e) => setColor(e.target.value)}
              className={`w-[50px] h-[50px] cursor-pointer `}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AddTheme;
