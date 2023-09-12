import * as React from 'react';
import type { NextPageWithLayout } from 'app/types';
import { InstructorsLayout } from 'app/components';
import { useListAllSettlementsByInstructorQuery } from 'app/api/settlementsApi';
import {
  DataGrid,
  GridToolbarContainer,
  GridColDef,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { useCookies } from 'react-cookie';
import { USER_ID_KEY } from 'app/constants';
import { Loader } from 'app/components';
import { format } from 'date-fns';


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
      headerName: 'Student Name',
      flex: 1,
      headerAlign: 'center',
    },
    {
      field: 'courseName',
      headerName: 'Course Name',
      flex: 1,
      headerAlign: 'center',
    },
    {
      field: 'originalPrice',
      headerName: 'Course Price',
      flex: 1,
      headerAlign: 'center',
      valueFormatter: (params) => `₦ ${params.value}`, // Add a naira sign
    },
    {
      field: 'amountPaid',
      headerName: 'Transaction Amount',
      flex: 1,
      headerAlign: 'center',
      valueFormatter: (params) => `₦ ${params.value}`, // Add a naira sign
    },
    {
      field: 'discountAmount',
      headerName: 'Discount Amount',
      flex: 1,
      headerAlign: 'center',
      valueFormatter: (params) => `₦ ${params.value}`, // Add a naira sign
    },
    {
      field: 'datePaid',
      headerName: 'Transaction Date',
      flex: 1,
      headerAlign: 'center',
      valueFormatter: (params) => formatDate(params.value), // Format the date
    },
  ];

  // Define a function to generate unique row IDs
  const getRowId = (row: Settlement) => row.courseId;

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
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader mainColor="red" className="w-24 h-24" />
        </div>
      ) : (
        <DataGrid
          rows={settlements}
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
