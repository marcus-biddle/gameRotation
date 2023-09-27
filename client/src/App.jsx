import { useState } from 'react';
import './App.css'
import PlayerCountInput from './components/PlayerCountInput';
import { PlayerPositionTable } from './components/PlayerPositionTable';
import { generateDataArrayWithLength } from './helpers';
import { EditTableModal } from './components/EditTableModal';
import QuarterTable from './components/QuarterTable';
import usePlayerPositioning from './hooks/usePlayerPositioning';

function App() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [quarterData, setQuarterData] = useState({
    quarterOne: [],
    quarterTwo: []
  });
  const [playerCount, setPlayerCount] = useState(0);

  console.log(data);

  const openModal = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (editedData) => {
    const updatedData = data.map((row) => {
      if (row.position === editedData.position) {
        return editedData;
      }
      return row;
    }
    );

    setData(updatedData);
  };

  const handlePlayerCountChange = (count) => {
    const initialDataArray = generateDataArrayWithLength(count);
    setData(initialDataArray);
    setPlayerCount(count);
  };

  const handleLineup = async () => {
    const playerData = await usePlayerPositioning(data);
    setQuarterData(playerData);
    console.log(playerData)
  }

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
            rowData={selectedRow != null ? selectedRow : { name: '', flag: ''}}
            onSave={handleSave}
            />
            <button onClick={() => handleLineup()}>Confirm Lineup</button>
          </>
      }
    </div>
    {quarterData.quarterOne.length > 0 && <QuarterTable name={'First'} data={quarterData.quarterOne} quarter={0}/>}
    {quarterData.quarterTwo.length > 0 && <QuarterTable name={'Second'} data={quarterData.quarterTwo} quarter={1}/>}
    </>
  )
}

export default App
