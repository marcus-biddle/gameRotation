import { addTotalTime, calcPlayerTimeOnField } from "../helpers";

const QuarterTable = ( quarter ) => {

  return (
    <div className="m-6 border rounded-lg bg-gray-700 text-white" key={quarter.name}>
      <h2 className="text-xl font-semibold mb-4 text-blue-400">{quarter.name} Quarter</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border-b text-blue-400">Name</th>
              <th className="px-4 py-2 text-left border-b text-blue-400">Total Minutes</th>
              <th className="px-4 py-2 text-left border-b text-blue-400">First Half</th>
              <th className="px-4 py-2 text-left border-b text-blue-400">Second Half</th>
            </tr>
          </thead>
          <tbody>
            {quarter.data.map((obj) => {
              return (
                <tr key={obj.position}>
                  <td className="px-4 py-2 border-b text-blue-200 min-w-[100px]">{obj.name}</td>
                  <td className="px-4 py-2 border-b text-blue-200">{obj.timePlayed}</td>
                  <td className="px-4 py-2 border-b">
                    {obj.quarters[quarter.quarter].firstHalf === 5 ? 
                    <span className=" text-green-500">IN</span> : <span className=" text-red-400">OUT</span>}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {obj.quarters[quarter.quarter].secondHalf === 5 ? 
                    <span className=" text-green-500">IN</span> : <span className=" text-red-400">OUT</span>}
                  </td>
                </tr>
              )
            })}
            <tr>
              <td className="text-blue-200">Total Time</td>
              <td className="text-blue-200">{addTotalTime(quarter.data)}</td>
              <td className="text-blue-200">{calcPlayerTimeOnField(quarter.quarter, quarter.data, 1)}</td>
              <td className="text-blue-200">{calcPlayerTimeOnField(quarter.quarter, quarter.data, 2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuarterTable;
