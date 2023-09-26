import { useState } from 'react';
import './App.css'
import PlayerCountInput from './components/PlayerCountInput';
import { PlayerPositionTable } from './components/PlayerPositionTable';
import { generateDataArrayWithLength, updateDataFlag1FirstHalfPriority, updateDataFlag2FirstHalf, updateDataFlag3 } from './helpers';
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
    const flag3data = updateDataFlag3(updatedData);
    const flag1data = updateDataFlag1FirstHalfPriority(flag3data);
    const flag2data = updateDataFlag2FirstHalf(flag1data);
    console.log('flag2data', flag2data)
    setData(flag2data);
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
            rowData={selectedRow != null ? selectedRow : { name: '', flag: ''}}
            onSave={handleSave}
            />
          </>
      }
    </div>
    {data.length > 0 && <QuarterTable name={'First'} data={data} />}
    </>
  )
}

export default App
