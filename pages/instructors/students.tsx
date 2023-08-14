// @ts-nocheck
import * as React from 'react'
import type { NextPageWithLayout } from 'app/types'
import { formatDate } from 'app/utils'
import { InstructorsLayout } from 'app/components'
import { useTable } from 'react-table'
import studentJSON from 'app/utils/mockdata/students.json'

const InstructorStudents: NextPageWithLayout<{}> = () => {
  const data = React.useMemo(() => {
    return studentJSON
  }, [])

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Full Name',
        accessor: 'FullName',
      },
      {
        Header: 'Enrolled',
        accessor: 'DateEnrolled',
        Cell: (cell: any) => formatDate(cell.value),
      },
      {
        Header: 'Package',
        accessor: 'Id',
        Cell: () => <p>Not Earning</p>,
      },
      {
        Header: 'Average Score',
        accessor: 'AverageScore',
        Cell: (val: any) => `${val.value}%`,
      },
    ]
  }, [])

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    getTableBodyProps,
    rows,
  } = useTable({ columns, data: data.slice(0, 7) })

  return (
    <div className="px-6 md:px-14">
      <div className="flex items-center justify-between py-4">
        <p className="text-xl font-semibold my-5">Students</p>
        <button className="border-2 border-app-dark-500 rounded px-8 py-2">
          Export as PDF
        </button>
      </div>

      <div className="tableContainer md:p-12 md:pb-8 rounded md:border w-full">
        <table {...getTableProps()} className="w-full">
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th
                        {...column.getHeaderProps()}
                        key={column.id}
                        className="pb-4 text-left text-muted font-medium"
                      >
                        {
                          // Render the header
                          column.render('Header')
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row)
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()} key={row.id}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={cell.value}
                            className="py-4 border-t"
                          >
                            {
                              // Render the cell contents
                              cell.render('Cell')
                            }
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <div className="flex py-4 mt-6 items-center justify-between w-full">
          <div />
          <div className="flex gap-1">
            <button className="leftButton h-8 w-8 flex items-center justify-center outline-none active:ring-2 ring-opacity-30 rounded ring-app-pink">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.332 12.6668L5.66536 8.00016L10.332 3.3335"
                  stroke="#898989"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="w-8 h-8 rounded bg-app-pink flex text-lg items-center justify-center text-white">
              1
            </div>
            <div className="w-8 h-8 rounded flex text-lg items-center justify-center">
              2
            </div>
            <div className="w-8 h-8 rounded flex text-lg items-center justify-center">
              3
            </div>
            <div className="w-8 h-8 rounded flex text-lg items-center justify-center">
              ..
            </div>
            <div className="w-8 h-8 rounded flex text-lg items-center justify-center">
              6
            </div>
            <button className="leftButton h-8 w-8 flex items-center justify-center outline-none active:ring-2 ring-opacity-30 rounded ring-app-pink">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.66797 3.33317L10.3346 7.99984L5.66797 12.6665"
                  stroke="#2F2D37"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <p>Showing 7 of 200 entries</p>
        </div>
      </div>
    </div>
  )
}

export default InstructorStudents

InstructorStudents.getLayout = (page) => {
  return <InstructorsLayout>{page}</InstructorsLayout>
}
