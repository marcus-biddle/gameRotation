import { useState } from 'react';
import './App.css'
import PlayerCountInput from './components/PlayerCountInput';
import { PlayerPositionTable } from './components/PlayerPositionTable';
import { generateDataArrayWithLength, resetQuartersData } from './helpers';
import { EditTableModal } from './components/EditTableModal';
import QuarterTable from './components/QuarterTable';
import { createPlayerSchedule } from './utils/createPlayerSchedule';

function App() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPositioningTableOpen, setIsPositioningTableOpen] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [quarterData, setQuarterData] = useState([]);
  const [playerCount, setPlayerCount] = useState(0);
  const [err, setErr] = useState('');
  console.log(playerCount)

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
    if (count >= 6 && count <= 10) {
      setData(initialDataArray);
      setPlayerCount(count);
      setErr('');
    } else {
      setErr("Please pick between 6-10 players.")
    }
    
  };

  const handleLineup = async () => {
    const freshData = await resetQuartersData(data);
    const playerData = await createPlayerSchedule(freshData);
    setQuarterData(playerData);
    setIsPositioningTableOpen(false);
    console.log('handleLineup', playerData)
  }

  const clearLineup = () => {
    setData([]);
    setQuarterData([])
  }

  return (
    <>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Game Rotation App</h1>
      <p className=' bg-cyan-300 border-cyan-500 border-2 rounded-lg mb-8'>Saving data is currently not applicable.</p>
      {!data.length > 0
        ? <>
            <PlayerCountInput onPlayerCountChange={handlePlayerCountChange} />
            {err !== '' && <p className=' bg-red-300 rounded-lg p-4'>{err}</p>}
          </>
        : <>
          <h3 onClick={() => setIsPositioningTableOpen(!isPositioningTableOpen)}
          className={`px-6 py-3 bg-slate-300 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider border border-slate-300 ${isPositioningTableOpen ? 'rounded-t-lg' : 'rounded-lg'}`}>Set Players</h3>
          { isPositioningTableOpen && <>
          <PlayerPositionTable rows={data} onModal={openModal} isModalOpen={isModalOpen} />
          <EditTableModal
            isOpen={isModalOpen}
            onClose={closeModal}
            rowData={selectedRow != null ? selectedRow : { name: '', flag: ''}}
            onSave={handleSave}
            />
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mx-2 my-4" onClick={() => clearLineup()}>Clear</button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mx-2 my-4" onClick={() => handleLineup()}>Confirm Lineup</button>
          </>}
          
          </>
      }
    </div>
    {quarterData.length > 0 && <>
      <QuarterTable name={'First'} data={quarterData} quarter={0}/>
      <QuarterTable name={'Second'} data={quarterData} quarter={1}/>
      <QuarterTable name={'Third'} data={quarterData} quarter={2}/>
      <QuarterTable name={'Fourth'} data={quarterData} quarter={3}/>
      </>
    }
    </>
  )
}

export default App
