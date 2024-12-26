import React from 'react';

import PropTypes from 'prop-types';

import { TableCell } from '@components';
import { Chevron } from '@icons';

const Table = ({
  tableHeader = [],
  tableData = [],
  actions = [],
  publish,
  sort = [],
}) => {
  return (
    <table className="w-full">
      <thead className="text-sm">
        <tr className="text-nowrap">
          {tableHeader.map((item, index) => (
            <th key={index} className="text-start px-4 py-6">
              <div className="flex items-center gap-1">
                {item}
                <div>
                  {sort[index]?.asc && (
                    <Chevron
                      className="-rotate-90 cursor-pointer"
                      onClick={() => sort[index].asc()}
                    />
                  )}
                  {sort[index]?.desc && (
                    <Chevron
                      className="rotate-90 cursor-pointer"
                      onClick={() => sort[index].desc()}
                    />
                  )}
                </div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={index}>
            {Object.entries(item).map(
              ([objectKey, objectValue], subIndex) =>
                objectKey !== 'id' && (
                  <td
                    key={subIndex}
                    className="border-b px-4 py-2 text-xs text-black/60"
                  >
                    <TableCell
                      objectValue={objectValue}
                      onPublish={() => publish(item)}
                    />
                  </td>
                )
            )}
            <td className="py-2 px-4 border-b">
              <div className="flex gap-3 lg:gap-5 items-center text-black/50">
                {actions.map((action, index) => (
                  <action.icon
                    key={index}
                    className="cursor-pointer"
                    onClick={() => action.action(item)}
                  />
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  tableHeader: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  actions: PropTypes.array,
  publish: PropTypes.func,
  sort: PropTypes.array,
};

export default Table;
