import * as React from 'react';
import type { NextPageWithLayout } from 'app/types';
import { InstructorsLayout } from 'app/components';
import { useListAllStudentsByInstructorQuery } from 'app/api/settlementsApi';
import {
  DataGrid,
  GridToolbarContainer,
  GridColDef,
  GridToolbarExport,
  GridRowIdGetter,
} from '@mui/x-data-grid';
import { useCookies } from 'react-cookie';
import { USER_ID_KEY } from 'app/constants';
import { Loader } from 'app/components';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ListSettlementsParams {
  instructorId: string;
  page: number;
  perPage: number;
}

interface StudentsTable {
  courseId: string;
  courseName: string;
  amount: number;
  originalPrice: number;
  chargedAmount: number;
  studentName: string;
  transactionDate: string;
  studentId: string;
  scoreCountToCompletCourse: number;
  percentageCompletion: number;
  subscriptionStatus: string;
}
const InstructorStudents: NextPageWithLayout<{}> = () => {
  const [cookies] = useCookies([USER_ID_KEY]);
  const params: ListSettlementsParams = {
    instructorId: cookies[USER_ID_KEY],
    page: 1,
    perPage: 100,
  };

  const { data, error, isLoading } =
    useListAllStudentsByInstructorQuery(params);

  const StudentsTable: StudentsTable[] = data?.data?.pagedList || [];

  console.log(StudentsTable);

  // Define a function to format the transactionDate
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd'); // Format date to 'yyyy-MM-dd'
  };

  // State variables for start and end date
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  // Define a function to filter rows based on the date range
  const filteredStudentsTable = StudentsTable.filter((StudentsTable) => {
    if (!startDate || !endDate) {
      return true; // No date range selected, show all rows
    }
    const StudentsTableDate = new Date(StudentsTable.transactionDate);
    return StudentsTableDate >= startDate && StudentsTableDate <= endDate;
  });

  console.log(StudentsTable);
  const columns: GridColDef[] = [
    {
      field: 'studentName',
      headerName: 'Name',
      flex: 1,
      headerAlign: 'left',
    },
    {
      field: 'courseName',
      headerName: 'Course',
      flex: 1,
      headerAlign: 'left',
    },
    {
      field: 'percentageCompletion',
      headerName: 'Progress',
      flex: 1,
      headerAlign: 'left',
      valueFormatter: (params) => `${params.value}%`, // Add a percent sign
    },
    {
      field: 'transactionDate',
      headerName: 'Date Started',
      flex: 1,
      headerAlign: 'left',
      valueFormatter: (params) => formatDate(params.value), // Format the date
    },
  ];

  // Define a function to generate unique row IDs
  // Define a function to generate unique row IDs
  const getRowId: GridRowIdGetter<StudentsTable> = (row) =>
    `${row.courseId}-${row.studentId}`;

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <div className="flex item-end justify-end w-full">
          <GridToolbarExport />
        </div>
      </GridToolbarContainer>
    );
  }

  return (
    <div className="px-6 md:px-14">
      <div className="flex items-center justify-between py-4">
        <p className="text-xl font-semibold my-5">Students</p>

        <div className="">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Add logic to fetch transactions based on startDate and endDate
            }}
            className="flex flex-wrap items-center justify-end md:px-2 pt-6 ml-4 md:-mx-6 md:space-x-2"
          >
            <div className="my-2 border border-red-800 rounded-lg p-2 w-max">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Start Date"
                className="w-full outline-none"
              />
            </div>

            <div className="my-2 w-max ml-2 border border-red-800 rounded-lg p-2 ">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="End Date"
                className="w-full outline-none"
              />
            </div>

            <button
              className="px-4 py-2 ml-4 my-2 rounded-lg text-white bg-[#b61046]"
              type="submit"
            >
              Fetch Transactions
              {/* <Loader mainColor="red" className="w-24 h-24" /> */}
            </button>
          </form>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader mainColor="red" className="w-24 h-24" />
        </div>
      ) : (
        <DataGrid
          rows={filteredStudentsTable}
          columns={columns}
          getRowId={getRowId}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      )}
    </div>
  );
};

export default InstructorStudents;

InstructorStudents.getLayout = (page) => {
  return <InstructorsLayout>{page}</InstructorsLayout>;
};
