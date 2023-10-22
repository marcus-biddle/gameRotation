
const HEADS = [
    { name: 'Position' },
    { name: 'Name' },
    { name: 'Flag' },
]

export const PlayerPositionTable = (table) => {
  console.log('table',table);
  return (
    <table className=" min-w-[100%] border-slate-300 border-2">
      <thead>
        <tr>
            {HEADS.map((head) => {
                return (
                    <th 
                    key={head.name}
                    className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        {head.name}
                    </th>
                )
            })}
        </tr>
      </thead>
      <tbody className="bg-white">
        {table.rows.map((row, index) => {
            return (
          <tr key={index} onClick={() => table.onModal(row)} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
            <td className="px-6 py-3 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">{row.position}</td>
            <td className="px-6 py-3 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">{row.name}</td>
            <td className="px-6 py-3 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">{row.flag}</td>
          </tr>
          )
        })}
      </tbody>
    </table>
  );
};
