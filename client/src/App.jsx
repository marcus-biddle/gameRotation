import { useState } from 'react';
import './App.css'
import PlayerCountInput from './components/PlayerCountInput';
import { PlayerPositionTable } from './components/PlayerPositionTable';
import { generateDataArrayWithLength } from './helpers';
import { EditTableModal } from './components/EditTableModal';

function App() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const openModal = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (editedData) => {
    console.log('saved button clicked', editedData)
    console.log('data', data)
    // Update the data with the edited data
    const updatedData = data.map((row) => {
      if (row.position === editedData.position) {
        return editedData;
      }
      return row;
    }
    );
    setData(updatedData);
    console.log('handlesave', data)
  };

  const handlePlayerCountChange = (count) => {
    const initialDataArray = generateDataArrayWithLength(count);
    setData(initialDataArray);
  };

  return (
    <>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Player Count App</h1>
      {!data.length > 0
        ? <PlayerCountInput onPlayerCountChange={handlePlayerCountChange} />
        : <>
          <PlayerPositionTable rows={data} onModal={openModal} isModalOpen={isModalOpen} />
          <EditTableModal
            isOpen={isModalOpen}
            onClose={closeModal}
            rowData={selectedRow}
            onSave={handleSave}
            />
          </>
      }
      {/* <p>{playerCount !== null ? `Number of players: ${playerCount}` : 'Enter a number above.'}</p> */}
    </div>
    </>
  )
}

export default App
