

const QuarterTable = (quarter) => {
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
            {quarter.data.map((item) => (
              <tr key={item.position}>
                <td>{item.name}</td>
                <td>{item.quarters.first}</td>
                <td>{item.quarters.second}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default QuarterTable