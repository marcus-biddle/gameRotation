import { useState } from 'react';
import './App.css'
import PlayerCountInput from './components/PlayerCountInput';
import { PlayerPositionTable } from './components/PlayerPositionTable';
import { generateDataArrayWithLength, validateQuarter1FirstHalfFlag1PlayerPositions, validateQuarter1FirstHalfFlag2PlayerPositions, validateQuarter1Flag3PlayerPositions } from './helpers';
import { EditTableModal } from './components/EditTableModal';
import QuarterTable from './components/QuarterTable';

function App() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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
  };

  const handleLineup = async () => {
    console.log('button clicked');
    const iterationOne = await validateQuarter1Flag3PlayerPositions(data);
    console.log('1', iterationOne);
    const iterationTwo = await validateQuarter1FirstHalfFlag1PlayerPositions(iterationOne);
    console.log('2', iterationTwo)
    const iterationThree = await validateQuarter1FirstHalfFlag2PlayerPositions(iterationTwo);
    console.log('3', iterationThree);
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
    {data.length > 0 && <QuarterTable name={'First'} data={data} />}
    </>
  )
}

export default App
