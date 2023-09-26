import { useState } from 'react';
import './styled.css';

export const EditTableModal = (modal) => {
  const [editedData, setEditedData] = useState({ ...modal.rowData });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = () => {
    const data = { ...editedData, position: modal.rowData.position}
    modal.onSave(data);
    modal.onClose();
    setEditedData({ name: '', flag: '' })
  };

  return (
    <div className={`modal ${modal.isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-container">
        <div className="modal-content">
          <h2>Edit Data</h2> 
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editedData.name ? editedData.name : ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Flag:</label>
            <select
                name="flag"
                value={editedData.flag}
                onChange={handleInputChange}
            >
                <option value="" disabled>Select Flag</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>

          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};
