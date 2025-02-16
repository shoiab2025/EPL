import React,{useEffect, useState} from "react";
import AddTheme from "../../Components/AddTheme/AddTheme";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";


const AddAndEditGroup = ({editGroup = false}) => {
  const {id} = useParams()
  const [color, setColor] = useState("#000000");
  const [groupName, setGroupName] = useState("");
  const [groupCountry, setGroupCountry] = useState("")
  const [groupDescription, setGroupDescription] = useState("")
  const [languages, setLanguages] = useState([])
  const [language, setLanguage] = useState("")
  const { setGroups, languageMap} = useUser();
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  

  useEffect(() => {
     const loadGroupData = async() => {
         if (editGroup && id) {
           const response = await axios.get(
             `${import.meta.env.VITE_BACKEND_URL}/group/${id}`,
             { withCredentials: true }
           );
           if(response.data.success){
             setGroupName(response.data.data.groupName)
             setColor(response.data.data.groupTheme)
             setGroupDescription(response.data.data.groupDescription)
             setGroupCountry(response.data.data.groupCountry)
             setLanguages(response.data.data.languages)
           }
         }
     }

     loadGroupData()
  },[id])

  const handleGroupSubmit = async (e) => {
    e.preventDefault();
    editGroup ? handleEditGroup() : handleNewGroup();
  };

  const handleNewGroup = async () => {
    try {
      const data = {
        groupName: groupName,
        groupCountry: groupCountry,
        groupDescription: groupDescription,
        groupTheme: color,
        languages: languages,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/group`,
        data,
        { withCredentials: true }
      );
      if (response.data.success) {
        enqueueSnackbar(response.data.message, {variant: "success"})
        setGroups((prev) => {
          return [...prev, response.data.data];
        });
        setColor("#000000");
        setGroupName("");
        setGroupDescription("")
        setGroupCountry("")
        setLanguages([])
      }
    } catch (err) {
      enqueueSnackbar(err.response.data.message, { variant: "error" });
    }
  };

  const handleEditGroup = async () => {
    try {
      const data = {
        groupName: groupName,
        groupCountry: groupCountry,
        groupDescription: groupDescription,
        groupTheme: color,
        languages: languages,
      };
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/group/${id}`,
        data,
        { withCredentials: true }
      );
      if (response.data.success) {
        // console.log(response.data);
        setGroups((prev) => {
            return prev.map((group) => group._id === id ? {...group, groupName: response.data.data.groupName, groupCountry:response.data.data.groupCountry, groupDescription: response.data.data.groupDescription , groupTheme: response.data.data.groupTheme, languages: response.data.data.language} : group)
        });
        setColor("#000000");
        setGroupName("");
        setGroupDescription("")
        setGroupCountry("")
        setLanguages([])
        navigate("/groups")
        enqueueSnackbar("Group Successfully Edited!", { variant: "success" });
      }
    } catch (err) {
      enqueueSnackbar("Problem In Editing Group", { variant: "error" });
    }
  };

  return (
    <form className="max-w-[350px]" onSubmit={handleGroupSubmit}>
      <h1 className="heading">{editGroup ? "Edit Group" : "Add Groups"}</h1>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        required
        className="input-box w-full text-sm mt-5"
        placeholder="Enter the group Name"
      />
      <input
        type="text"
        value={groupCountry}
        onChange={(e) => setGroupCountry(e.target.value)}
        required
        className="input-box w-full text-sm mt-5"
        placeholder="Enter the group Country"
      />
      <div className="flex items-center gap-3 mt-5">
        {/* <input
          type="text"
          className="input-box  text-sm "
          placeholder="Add Language One by one.."
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        /> */}
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
          onClick={(e) => {
            setLanguages((prev) => {
              if(!languages.includes(language)){
                return [...prev, language.toLowerCase()];
              }
             return prev;
            });
            setLanguage("");
          }}
        >
          Add
        </button>
        <button
          type="button"
          onClick={(e) => {
            setLanguages([]);
            setLanguage("");
          }}
          className="button py-1 px-5 ml-[-5px]"
        >
          clear
        </button>
      </div>
      <p className="text-gray-500 mt-1">
        Group Supported Language: {languages.map(lan => languageMap[lan]).join(", ")}
      </p>
      <textarea
        value={groupDescription}
        onChange={(e) => setGroupDescription(e.target.value)}
        className="input-box w-full min-h-[150px]  mt-4"
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
