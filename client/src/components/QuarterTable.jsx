

const QuarterTable = (quarter) => {
  console.log('table props', quarter);
    return (
      <div key={quarter.name}>
        <h2>{quarter.name} Quarter</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>First Half</th>
              <th>Second Half</th>
            </tr>
          </thead>
          <tbody>
            {quarter.data.map((item) => {
            return (
              <tr key={item.position}>
                <td>{item.name}</td>
                <td>{item.quarters[quarter.quarter].firstHalf}</td>
                <td>{item.quarters[quarter.quarter].secondHalf}</td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    );
  };

export default QuarterTable