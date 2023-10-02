import { useState } from 'react';
import './styled.css';

export const EditTableModal = (modal) => {
  const [editedData, setEditedData] = useState({ name: modal.rowData.name, flag: modal.rowData.flag });
  const [error, setError] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = () => {
    if ((editedData.name && editedData.flag || (modal.rowData.name != '' && modal.rowData.flag != ''))) {
      setError(false)
      const data = { 
        position: modal.rowData.position, 
        name: editedData.name, 
        flag: editedData.flag, 
        maxTimeAllowed: 0,
        quarters: [
          {
            firstHalf: 0,
            secondHalf: 0
          },
          {
            firstHalf: 0,
            secondHalf: 0
          },
          {
            firstHalf: 0,
            secondHalf: 0
          },
          {
            firstHalf: 0,
            secondHalf: 0
          }
        ]
      }
      modal.onSave(data);
      modal.onClose();
      setEditedData({ name: '', flag: '' })
      
    } else {
      setError(true)
    }
    
  };

  return (
    <div className={`modal ${modal.isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-container">
        <div className="modal-content">
          <h2>Edit Player Slot</h2> 
          <div>
            <label>Player Name:</label>
            <input
              type="text"
              name="name"
              value={modal.rowData.name != '' ? modal.rowData.name : editedData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Flag Priority:</label>
            <select
                name="flag"
                value={modal.rowData.flag != '' ? modal.rowData.flag : editedData.flag}
                onChange={handleInputChange}
            >
                <option value="" disabled>Select Flag</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
          {error && <p>Please fill everything out</p>}
          <button
          className="cancel-btn"
          onClick={() => modal.onClose()}>
            Cancel
          </button>
          <button 
          className='save-btn'
          onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
