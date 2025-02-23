import React, { useEffect, useState } from "react";
import AddTheme from "../../Components/AddTheme/AddTheme";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const AddAndEditGroup = ({ editGroup = false }) => {
  const { id } = useParams();
  const [color, setColor] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupCountry, setGroupCountry] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const { setGroups, languageMap } = useUser();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (editGroup && id) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/group/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.success) {
            const {
              groupName,
              groupTheme,
              groupDescription,
              groupCountry,
              languages,
            } = response.data.data;
            setGroupName(groupName);
            setColor(groupTheme);
            setGroupDescription(groupDescription);
            setGroupCountry(groupCountry);
            setLanguages(languages);
          }
        });
    }
  }, [id]);

  // useEffect(() => console.log(groupDescription), [groupDescription]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      groupName,
      groupCountry,
      groupDescription,
      groupTheme: color,
      languages,
    };
    console.log(data);
    try {
      const url = editGroup ? `/group/${id}` : "/group";
      const method = editGroup ? axios.put : axios.post;
      const response = await method(
        `${import.meta.env.VITE_BACKEND_URL}${url}`,
        data,
        { withCredentials: true }
      );
      if (response.data.success) {
        // console.log(response.data.data)
        setGroups((prev) =>
          editGroup
            ? prev.map((group) =>
                group._id === id ? response.data.data : group
              )
            : [...prev, response.data.data]
        );
        enqueueSnackbar(
          editGroup
            ? "Group Successfully Edited!"
            : "Group Successfully Added!",
          { variant: "success" }
        );
        navigate("/groups");
      }
    } catch (err) {
      enqueueSnackbar("An error occurred!", { variant: "error" });
    }
  };

  return (
    <form className="max-w-[350px]" onSubmit={handleSubmit}>
      <h1 className="heading">{editGroup ? "Edit Group" : "Add Group"}</h1>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        required
        className="input-box w-full text-sm mt-5"
        placeholder="Enter the group name"
      />
      <input
        type="text"
        value={groupCountry}
        onChange={(e) => setGroupCountry(e.target.value)}
        required
        className="input-box w-full text-sm mt-5"
        placeholder="Enter the group country"
      />
      <div className="flex items-center gap-3 mt-5">
        <select
          className="input-box text-sm"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
        >
          <option value="">Choose Languages</option>
          {Object.entries(languageMap).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="button py-1 px-5"
          onClick={() =>
            !languages.includes(language) &&
            setLanguages([...languages, language.toLowerCase()])
          }
        >
          Add
        </button>
        <button
          type="button"
          className="button py-1 px-5 ml-[-5px]"
          onClick={() => setLanguages([])}
        >
          Clear
        </button>
      </div>
      <p className="text-gray-500 mt-1">
        Group Supported Language:{" "}
        {languages.map((lan) => languageMap[lan]).join(", ")}
      </p>
      <textarea
        value={groupDescription}
        onChange={(e) => setGroupDescription(e.target.value)}
        className="input-box w-full min-h-[150px] mt-4"
        placeholder="Group Description here..."
      />
      <AddTheme color={color} setColor={setColor} />
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default AddAndEditGroup;
