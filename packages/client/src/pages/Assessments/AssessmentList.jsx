import React, { useEffect, useMemo, useState } from 'react';
import BTable from 'react-bootstrap/Table';
import { useSortBy, useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';
export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);
  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  const columns = useMemo(
    () => [
      {
        Header: `#`,
        accessor: `id`,
      },
      {
        Header: `Cat Name`,
        accessor: `catName`,
      },
      {
        Header: `Date of Birth`,
        accessor: `catDateOfBirth`,
      },
      {
        Header: `Instrument Type`,
        accessor: `instrumentType`,
      },
      {
        Header: `Created On`,
        accessor: `createdAt`,
      },
      {
        Header: `Last Updated`,
        accessor: `updatedAt`,
      },
      {
        Header: `Score`,
        accessor: `score`,
      },
      {
        Header: `Risk Level`,
        accessor: `riskLevel`,
      },

    ], []
  );
  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
  }, [ ]);
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns, data: assessments }, useSortBy);

  async function handleDelete(id) {
    const res = await AssessmentService.deleteAssessment(id);
    const returned = await AssessmentService.getList();
    setAssessments(returned);
  }

  return (
    <div>
      <h1>Assessment List</h1><br />
      <BTable striped bordered hover size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup =>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column =>
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}

                >
                  {column.render(`Header`)}
                </th>)}
              <th>
                Delete Record
              </th>
            </tr>)}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell =>
                  <td
                    {...cell.getCellProps()}
                  >
                    {cell.render(`Cell`)}
                  </td>)}
                <td>
                  <button onClick={() => handleDelete(row.original.id)}>
                    Delete
                  </button>
                </td>

              </tr>
            );
          })}
        </tbody>
      </BTable>
    </div>
  );
};
