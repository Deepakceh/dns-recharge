'use client';
import { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  CheckSquare,
  Filter,
  Search,
  XSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Link } from "react-router-dom";

// Register AG Grid community modules
ModuleRegistry.registerModules([AllCommunityModule]);

type WalletRowData = {
  id: number;
  actionId: string;
  txnId: string;
  statusName: string;
  bankName: string;
  orgName: string;
  paymentRefNo: string;
  amount: number;
  paymentDate: string;
  addedDate: string;
  updatedDate: string;
  addedBy: string;
  updatedBy: string;
  remark: string;
  txnType: string;
  amtType: string;
  transferType: string;
  gstType: string;
};

interface WalletState {
  page: number;
  size: number;
  search: string;
  data: WalletRowData[];
}

const WalletList: React.FC = () => {
  const gridRef = useRef<any>(null);
  const [open, setOpen] = useState(false);

  // Dummy data
  const [wallet, setWallet] = useState<WalletState>({
    page: 1,
    size: 10, // default rows per page
    search: '',
    data: [
      {
        id: 1,
        actionId: '01',
        txnId: '4647',
        statusName: 'Pending',
        bankName: 'HDFC Bank',
        orgName: 'ABC Corporation',
        paymentRefNo: 'REF202502191',
        amount: 3849,
        paymentDate: '19/02/2025',
        addedDate: '18/02/2025',
        updatedDate: '19/02/2025',
        addedBy: 'Admin User',
        updatedBy: 'Finance Manager',
        remark: 'Monthly subscription payment',
        txnType: 'Credit',
        amtType: 'USD',
        transferType: 'NEFT',
        gstType: 'GST18',
      },
      {
        id: 2,
        actionId: '02',
        txnId: '4648',
        statusName: 'Pending',
        bankName: 'ICICI Bank',
        orgName: 'XYZ Enterprises',
        paymentRefNo: 'REF202502192',
        amount: 5623,
        paymentDate: '19/02/2025',
        addedDate: '18/02/2025',
        updatedDate: '19/02/2025',
        addedBy: 'Manager',
        updatedBy: 'System',
        remark: 'Vendor payment',
        txnType: 'Debit',
        amtType: 'INR',
        transferType: 'RTGS',
        gstType: 'GST12',
      },
      {
        id: 3,
        actionId: '03',
        txnId: '4649',
        statusName: 'Pending',
        bankName: 'SBI',
        orgName: 'Tech Solutions Ltd',
        paymentRefNo: 'REF202502193',
        amount: 7200,
        paymentDate: '19/02/2025',
        addedDate: '17/02/2025',
        updatedDate: '19/02/2025',
        addedBy: 'Finance User',
        updatedBy: 'Admin',
        remark: 'Invoice #INV-2025-001',
        txnType: 'Credit',
        amtType: 'EUR',
        transferType: 'IMPS',
        gstType: 'GST5',
      },
      {
        id: 4,
        actionId: '04',
        txnId: '4650',
        statusName: 'Pending',
        bankName: 'Axis Bank',
        orgName: 'Global Services',
        paymentRefNo: 'REF202502194',
        amount: 9200,
        paymentDate: '19/02/2025',
        addedDate: '16/02/2025',
        updatedDate: '19/02/2025',
        addedBy: 'System',
        updatedBy: 'Finance Manager',
        remark: 'Client refund',
        txnType: 'Debit',
        amtType: 'USD',
        transferType: 'NEFT',
        gstType: 'GST18',
      },
      {
        id: 5,
        actionId: '05',
        txnId: '4651',
        statusName: 'Pending',
        bankName: 'Kotak Mahindra',
        orgName: 'Innovate Inc',
        paymentRefNo: 'REF202502195',
        amount: 3500,
        paymentDate: '19/02/2025',
        addedDate: '15/02/2025',
        updatedDate: '19/02/2025',
        addedBy: 'Admin User',
        updatedBy: 'System',
        remark: 'Salary payment',
        txnType: 'Credit',
        amtType: 'INR',
        transferType: 'RTGS',
        gstType: 'GST12',
      },
      {
        id: 6,
        actionId: '06',
        txnId: '4652',
        statusName: 'Pending',
        bankName: 'Yes Bank',
        orgName: 'Data Systems',
        paymentRefNo: 'REF202502196',
        amount: 6400,
        paymentDate: '19/02/2025',
        addedDate: '18/02/2025',
        updatedDate: '19/02/2025',
        addedBy: 'Manager',
        updatedBy: 'Finance User',
        remark: 'Quarterly tax payment',
        txnType: 'Debit',
        amtType: 'INR',
        transferType: 'NEFT',
        gstType: 'GST18',
      },
      {
        id: 7,
        actionId: '07',
        txnId: '4653',
        statusName: 'Pending',
        bankName: 'IndusInd Bank',
        orgName: 'Cloud Networks',
        paymentRefNo: 'REF202502197',
        amount: 8100,
        paymentDate: '19/02/2025',
        addedDate: '17/02/2025',
        updatedDate: '19/02/2025',
        addedBy: 'Finance User',
        updatedBy: 'Admin',
        remark: 'Infrastructure upgrade',
        txnType: 'Credit',
        amtType: 'USD',
        transferType: 'IMPS',
        gstType: 'GST5',
      },
      {
        id: 8,
        actionId: '08',
        txnId: '4654',
        statusName: 'Pending',
        bankName: 'RBL Bank',
        orgName: 'Web Services Co',
        paymentRefNo: 'REF202502198',
        amount: 4300,
        paymentDate: '19/02/2025',
        addedDate: '16/02/2025',
        updatedDate: '19/02/2025',
        addedBy: 'System',
        updatedBy: 'Finance Manager',
        remark: 'Domain renewal',
        txnType: 'Debit',
        amtType: 'INR',
        transferType: 'RTGS',
        gstType: 'GST12',
      },
      {
        id: 9,
        actionId: '09',
        txnId: '4655',
        statusName: 'Pending',
        bankName: 'Federal Bank',
        orgName: 'App Developers',
        paymentRefNo: 'REF202502199',
        amount: 2900,
        paymentDate: '19/02/2025',
        addedDate: '15/02/2025',
        updatedDate: '19/02/2025',
        addedBy: 'Admin User',
        updatedBy: 'System',
        remark: 'Software license',
        txnType: 'Credit',
        amtType: 'EUR',
        transferType: 'NEFT',
        gstType: 'GST18',
      },
      {
        id: 10,
        actionId: '10',
        txnId: '4656',
        statusName: 'Pending',
        bankName: 'IDFC First Bank',
        orgName: 'Digital Solutions',
        paymentRefNo: 'REF202502200',
        amount: 6700,
        paymentDate: '19/02/2025',
        addedDate: '18/02/2025',
        updatedDate: '19/02/2025',
        addedBy: 'Manager',
        updatedBy: 'Finance User',
        remark: 'Marketing campaign',
        txnType: 'Debit',
        amtType: 'INR',
        transferType: 'IMPS',
        gstType: 'GST5',
      },
      {
        id: 11,
        actionId: '11',
        txnId: '4656',
        statusName: 'Pending',
        bankName: 'IDFC First Bank',
        orgName: 'Digital Solutions',
        paymentRefNo: 'REF202502200',
        amount: 6700,
        paymentDate: '19/02/2025',
        addedDate: '18/02/2025',
        updatedDate: '19/02/2025',
        addedBy: 'Manager',
        updatedBy: 'Finance User',
        remark: 'Marketing campaign',
        txnType: 'Debit',
        amtType: 'INR',
        transferType: 'IMPS',
        gstType: 'GST5',
      },
    ],
  });

  // Accept / Reject handlers
  const handleAccept = (id: number) => {
    setWallet((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.id === id ? { ...item, statusName: 'Approved' } : item
      ),
    }));
  };

  const handleReject = (id: number) => {
    setWallet((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.id === id ? { ...item, statusName: 'Rejected' } : item
      ),
    }));
  };

  // Columns
  const columnDefs: ColDef[] = [
    {
      headerName: 'ACTION',
      field: 'actionId',
      width: 120,
      suppressSizeToFit: true,
      cellRenderer: (params: ICellRendererParams<WalletRowData>) => {
        const { data } = params;
        if (!data) return null;
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAccept(data.id)}
              className="p-1 border border-green-500 rounded hover:bg-green-50"
              title="Accept"
            >
              <CheckSquare className="w-5 h-5 text-green-600" />
            </button>
            <button
              onClick={() => handleReject(data.id)}
              className="p-1 border border-red-500 rounded hover:bg-red-50"
              title="Reject"
            >
              <XSquare className="w-5 h-5 text-red-600" />
            </button>
          </div>
        );
      },
    },
    { headerName: 'ID', field: 'actionId', width: 70 },
    { headerName: 'TXN ID', field: 'txnId', width: 100 },
    {
      headerName: 'STATUS NAME',
      field: 'statusName',
      width: 130,
      cellStyle: (params) => {
        if (params.value === 'Approved') return { color: '#10B981' };
        if (params.value === 'Pending') return { color: '#F59E0B' };
        if (params.value === 'Rejected') return { color: '#EF4444' };
        return null;
      },
    },
    { headerName: 'BANK NAME', field: 'bankName', width: 150 },
    { headerName: 'ORG. NAME', field: 'orgName', width: 180 },
    { headerName: 'PAYMENT REF NO.', field: 'paymentRefNo', width: 160 },
    {
      headerName: 'AMOUNT',
      field: 'amount',
      width: 120,
      cellRenderer: (params: any) => `$${params.value.toLocaleString()}`,
    },
    { headerName: 'PAYMENT DATE', field: 'paymentDate', width: 130 },
    { headerName: 'ADDED DATE', field: 'addedDate', width: 130 },
    { headerName: 'UPDATED DATE', field: 'updatedDate', width: 130 },
    { headerName: 'ADDED BY', field: 'addedBy', width: 130 },
    { headerName: 'UPDATED BY', field: 'updatedBy', width: 130 },
    { headerName: 'REMARK', field: 'remark', width: 200 },
    {
      headerName: 'TXN TYPE',
      field: 'txnType',
      width: 100,
      cellStyle: (params) =>
        params.value === 'Credit' ? { color: '#10B981' } : { color: '#EF4444' },
    },
    { headerName: 'AMT TYPE', field: 'amtType', width: 100 },
    { headerName: 'TRANSFER TYPE', field: 'transferType', width: 150 },
    { headerName: 'GST TYPE', field: 'gstType', width: 100 },
  ];

  // Pagination calculations (derived values)
  const totalRows = wallet.data.length;
  const effectiveSize = wallet.size > 0 ? wallet.size : 1;
  const totalPages = Math.max(1, Math.ceil(totalRows / effectiveSize));
  const effectivePage = Math.min(Math.max(wallet.page, 1), totalPages);
  const startIndex = (effectivePage - 1) * effectiveSize;
  const endIndex = Math.min(startIndex + effectiveSize, totalRows);
  const currentRows = wallet.data.slice(startIndex, endIndex);

  // Pagination helpers
  const goToPrev = () =>
    setWallet((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }));
  const goToNext = () =>
    setWallet((prev) => ({
      ...prev,
      page: Math.min(totalPages, prev.page + 1),
    }));

  // rows per page handler (supports "all")
  const handleSizeChange = (val: string) => {
    const newSize =
      val === 'all' ? Math.max(totalRows, 1) : Math.max(parseInt(val, 10), 1);
    setWallet((prev) => ({ ...prev, size: newSize, page: 1 }));
  };

  // display label for rows-per-page (shows "All" when size equals totalRows)
  const displaySizeLabel = wallet.size >= totalRows ? 'All' : wallet.size;

  return (
    <div className="p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="h-8 px-2 text-sm text-gray-600 border border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition duration-200 flex items-center gap-2"
            >
              <Filter className="text-orange-500" size={16} />
              Filter
            </Button>

            <div className="w-72 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search by Bank, Org, Ref No or Date"
                className="h-8 text-sm pl-9 pr-3 bg-purple-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 w-full"
              />
            </div>
          </div>
          {/* Add Button */}
          <Link to="/users/wallet-txn/AddWallet">
            <Button className="h-8 px-5 text-sm bg-orange-500 hover:bg-orange-600 text-white">
              ADD
            </Button>
          </Link>
        </div>

        {/* Table */}
        <div className="ag-theme-quartz w-full" style={{ height: '70vh' }}>
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            rowData={currentRows}
            rowHeight={40}
            headerHeight={35}
            defaultColDef={{
              sortable: true,
              resizable: true,
            }}
            enableCellTextSelection
            ensureDomOrder
          />
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between p-3 border-t border-gray-200 text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">Rows per page</span>

            {/* Styled native select with chevron */}
            <div className="relative inline-flex items-center">
              <select
                aria-label="Rows per page"
                value={
                  wallet.size >= totalRows ? 'all' : wallet.size.toString()
                }
                onChange={(e) => handleSizeChange(e.target.value)}
                className="appearance-none h-8 pl-3 pr-8 border border-gray-200 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-200"
              >
                <option value="10">10</option>
                <option value="100">100</option>
                <option value="1000">1000</option>
                <option value="all">All</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* ✅ Use displaySizeLabel here */}
            <div className="text-sm text-gray-600">
              <span>
                {totalRows === 0
                  ? '0 of 0'
                  : `${startIndex + 1}-${endIndex} of ${totalRows} (Rows: ${displaySizeLabel})`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToPrev}
              disabled={effectivePage === 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <span className="text-sm text-gray-700">
              Page {effectivePage} of {totalPages}
            </span>

            <button
              onClick={goToNext}
              disabled={effectivePage === totalPages}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletList;
