import * as React from 'react';
import type { NextPageWithLayout } from 'app/types';
import { InstructorsLayout } from 'app/components';
import { useListAllSettlementsByInstructorQuery } from 'app/api/settlementsApi';
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

// Define a function to format the transactionDate
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, 'yyyy-MM-dd'); // Format date to 'yyyy-MM-dd'
};

interface ListSettlementsParams {
  instructorId: string;
  page: number;
  perPage: number;
}

interface Settlement {
  courseId: string;
  courseName: string;
  amountPaid: number;
  originalPrice: number;
  discountAmount: number;
  datePaid: string;
  studentId: string;
  studentName: string;
}

const InstructorSettlements: NextPageWithLayout<{}> = () => {
  const [cookies] = useCookies([USER_ID_KEY]);
  const params: ListSettlementsParams = {
    instructorId: cookies[USER_ID_KEY],
    page: 1,
    perPage: 100,
  };

  const { data, error, isLoading } =
    useListAllSettlementsByInstructorQuery(params);

  const settlements: Settlement[] = data?.data?.pagedList || [];
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
      field: 'originalPrice',
      headerName: 'Course Price',
      flex: 1,
      headerAlign: 'left',
      valueFormatter: (params) => `₦ ${params.value}`, // Add a naira sign
    },
    {
      field: 'amountPaid',
      headerName: 'Transaction Amount',
      flex: 1,
      headerAlign: 'left',
      valueFormatter: (params) => `₦ ${params.value}`, // Add a naira sign
    },
    {
      field: 'discountAmount',
      headerName: 'Discount Amount',
      flex: 1,
      headerAlign: 'left',
      valueFormatter: (params) => `₦ ${params.value}`, // Add a naira sign
    },
    {
      field: 'datePaid',
      headerName: 'Transaction Date',
      flex: 1,
      headerAlign: 'left',
      valueFormatter: (params) => formatDate(params.value), // Format the date
    },
  ];

  // Define a function to generate unique row IDs
    const getRowId: GridRowIdGetter<Settlement> = (row) =>
      `${row.courseId}-${row.studentId}`;


  // State variables for start and end date
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  // Define a function to filter rows based on the date range
  const filteredSettlements = settlements.filter((settlement) => {
    if (!startDate || !endDate) {
      return true; // No date range selected, show all rows
    }
    const settlementDate = new Date(settlement.datePaid);
    return settlementDate >= startDate && settlementDate <= endDate;
  });

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
        <p className="text-xl font-semibold my-5">Settlements</p>
        <div>
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
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader mainColor="red" className="w-24 h-24" />
        </div>
      ) : (
        <DataGrid
          rows={filteredSettlements}
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

export default InstructorSettlements;

InstructorSettlements.getLayout = (page) => {
  return <InstructorsLayout>{page}</InstructorsLayout>;
};
