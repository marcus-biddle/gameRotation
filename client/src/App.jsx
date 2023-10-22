import { useState, useEffect } from 'react';
import './App.css'
import { PlayerPositionTable } from './components/PlayerPositionTable';
import { formatDataObject  } from './helpers';
import { AddPlayerModal } from './components/AddPlayerModal';
import QuarterTable from './components/QuarterTable';
import { generatePlayerData } from './utils/createPlayerSchedule';

function App() {
  const [data, setData] = useState([
    { position: 1, name: 'Test', flag: '1' },
    { position: 2, name: 'Test', flag: '1' },
    { position: 3, name: 'Test', flag: '1' },
    { position: 4, name: 'Test', flag: '1' },
    { position: 5, name: 'Test 2', flag: '2' },
    { position: 6, name: 'Test 2', flag: '2' },
    { position: 7, name: 'Test 2', flag: '2' },
    { position: 8, name: 'Test 2', flag: '2' },
    { position: 9, name: 'Test 3', flag: '3' },
    { position: 10, name: 'Test 3', flag: '3' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addPlayerModal, setAddPlayerModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(undefined);
  const [quarterData, setQuarterData] = useState([]);
  const [playerCount, setPlayerCount] = useState(0);
  const [confirmData, setConfirmData] = useState(false);
  const [err, setErr] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const openModal = (row) => {
    if (row) {
      setSelectedRow(row);
    }
    setAddPlayerModal(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAddPlayerModal(false);
  };

  const handleSave = (newData) => {
    const foundRow = data.find(obj => obj.position === newData.position);
    if (foundRow) {
      const updatedData = data.map((obj) => {
        if (obj.position === newData.position) {
          return newData
        }
        return obj;
      });
      setData(updatedData);
      
    } else {
      setData([...data, newData]);
    }
    setSelectedRow(undefined);
    setAddPlayerModal(false);
    
  };

  const handleConfirmation = () => {
    setConfirmData(true);
    const formatData = data.map((obj) => {
      return formatDataObject(obj);
    });
    
    generatePlayerData(formatData);
    setData(formatData);
  }

  const TABLES = [
    <QuarterTable name={'First'} data={data} quarter={0}/>,
    <QuarterTable name={'Second'} data={data} quarter={1}/>,
    <QuarterTable name={'Third'} data={data} quarter={2}/>,
    <QuarterTable name={'Fourth'} data={data} quarter={3}/>
  ];

  const totalPages = 4;
  const startIndex = (currentPage - 1) * 1;
  const endIndex = startIndex + 1;
  const currentTableData = TABLES.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className=' bg-white min-h-screen text-black'>
      <div className=' p-10 bg-gray-700 text-white mb-8'>
        <h2 className=' text-2xl'>Player Rotation</h2>
      </div>
      {!confirmData && <>
        <div className=' flex items-center justify-between'>
          <h3 className=' text-md uppercase underline underline-offset-2 ml-5'>Team Roster</h3>
          {data.length <= 10 && <button 
          onClick={openModal}
          className=' bg-transparent border-none text-green-600 text-md'><span className=' text-xl'>+</span> Player</button>}
        </div>
        <div className="container mx-auto p-4">
          <PlayerPositionTable rows={data} onModal={openModal} isModalOpen={isModalOpen} />
          {addPlayerModal && 
          <AddPlayerModal 
            isOpen={isModalOpen}
            onClose={closeModal}
            onSave={handleSave}
            row={selectedRow}
            data={data}
          />}
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mx-2 my-4" onClick={() => setData([])}>Clear</button>
        {data.length >= 6 && data.length <= 10 &&
          <>
            
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mx-2 my-4" onClick={handleConfirmation}>Confirm Roster</button>
          </>
        }
      </>}
      {confirmData && 
      <>
        <div className=' w-full text-left'>
          <button className=' uppercase text-sm text-gray-500 bg-transparent'onClick={() => setConfirmData(false)}>{'<'} Go back to Roster</button>
        </div>
        {currentTableData.map((table, index) => (
          <div key={index}>
            {table}
          </div>
        ))}
        <div className=' mb-6'>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 mr-2 ${currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
          >
            Previous
          </button>
          <span>{currentPage} of {totalPages}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 ml-2 ${currentPage === totalPages ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
          >
            Next
          </button>
        </div>
      </>}
    </div>
  )
}

export default App
