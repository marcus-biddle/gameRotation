import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const PlayerCountInput = ({onPlayerCountChange}) => {
  const [playerCount, setPlayerCount] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (/^\d+$/.test(value)) {
      setPlayerCount(value);
    }
  };

  const handleSubmit = () => {
    if (playerCount !== '') {
      onPlayerCountChange(parseInt(playerCount, 10));
    }
    setPlayerCount('');
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="playerCount">
        How many players are playing today?
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="playerCount"
        type="text"
        placeholder="Enter a number"
        value={playerCount}
        onChange={handleInputChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default PlayerCountInput;
