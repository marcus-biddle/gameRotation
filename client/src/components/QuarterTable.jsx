
const QuarterTable = ( quarter ) => {
  console.log('table props', quarter);
  return (
    <div className="p-4" key={quarter.name}>
      <h2 className="text-xl font-semibold mb-4">{quarter.name} Quarter</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border-b">Name</th>
              <th className="px-4 py-2 text-left border-b">First Half</th>
              <th className="px-4 py-2 text-left border-b">Second Half</th>
            </tr>
          </thead>
          <tbody>
            {quarter.data.map((item) => (
              <tr key={item.position}>
                <td className="px-4 py-2 border-b">{item.name}</td>
                <td className="px-4 py-2 border-b">
                  {item.quarters[quarter.quarter].firstHalf}
                </td>
                <td className="px-4 py-2 border-b">
                  {item.quarters[quarter.quarter].secondHalf}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuarterTable;
