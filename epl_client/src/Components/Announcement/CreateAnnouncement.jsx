import { useState } from "react";
import axios from "axios";

function CreateAnnouncement() {
  const [formData, setFormData] = useState({
    message: "",
    time: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.message || !formData.time || !formData.date) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await axios.post("/api/announcements", formData);
      alert("Announcement created successfully!");
      setFormData({ message: "", time: "", date: "" });
    } catch (error) {
      console.error("Error creating announcement:", error);
      alert("Failed to create announcement");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Announcement</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
          Create Announcement
        </button>
      </form>
    </div>
  );
}

export default CreateAnnouncement;
