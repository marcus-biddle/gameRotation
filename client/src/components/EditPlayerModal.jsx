import React, { useState } from 'react';

export const AddPlayerModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    flag: '',
  });
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (formData.name && formData.flag) {
      onSave(formData);
    } else {
      setError(true);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-container">
        <div className="modal-content">
          <h2>Edit Player Slot</h2>
          <div>
            <label>Player Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Flag Priority:</label>
            <select name="flag" value={formData.flag} onChange={handleInputChange}>
              <option value="" disabled>
                Select Flag
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          {error && <p>Please fill everything out</p>}
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
