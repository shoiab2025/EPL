// src/components/UpdateAnnouncement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateAnnouncement = ({ announcementId }) => {
  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the current announcement details if announcementId is provided
    const fetchAnnouncement = async () => {
      try {
        const response = await axios.get(`/api/announcements/${announcementId}`);
        const { message, time, date } = response.data;
        setMessage(message);
        setTime(time);
        setDate(date);
      } catch (err) {
        setError('Error fetching announcement details');
      }
    };

    if (announcementId) {
      fetchAnnouncement();
    }
  }, [announcementId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedAnnouncement = await axios.put(`/api/v1/announcements/${announcementId}`, {
        message,
        time,
        date
      });

      if (updatedAnnouncement.data.success) {
        alert('Announcement updated successfully');
        // Optionally, redirect or clear the form
      }
    } catch (err) {
      setError('Error updating announcement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-announcement">
      <h2>Update Announcement</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message || ""}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            value={time || ""}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date || ""}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Announcement'}
        </button>
      </form>
    </div>
  );
};

export default UpdateAnnouncement;
