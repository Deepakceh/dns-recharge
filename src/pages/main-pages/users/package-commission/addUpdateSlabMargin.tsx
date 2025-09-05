import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import { AppDialog } from "@/components/common/AppDialog";
import { Formik, Form, } from "formik";
import MultiSelect from "@/components/common/formFields/MultiSelectField";

type RowData = {
  id: number;
  operatorType: string;
  operator: string;
  circle: string;
  amountRange: string;
  commission: string;
  commType: string;
  amtType: string;
};

export default function AddUpdateSlabMargin() {
  const [rows, setRows] = useState<RowData[]>([
    {
      id: 1,
      operatorType: "All",
      operator: "Airtel",
      circle: "All",
      amountRange: "1-200",
      commission: "2.2000",
      commType: "Percent",
      amtType: "Discount",
    },
  ]);

  const [open, setOpen] = useState(false);

  const handleAddRow = () => {
    const newRow: RowData = {
      id: Date.now(),
      operatorType: "",
      operator: "",
      circle: "",
      amountRange: "",
      commission: "0.00",
      commType: "",
      amtType: "",
    };
    setRows([...rows, newRow]);
    setOpen(true);
  };

  const [selected, setSelected] = useState<string[]>([])

  const options = [
    { id: "1", name: "Option 1" },
    { id: "2", name: "Option 2" },
    { id: "3", name: "Option 3" },
    { id: "4", name: "Option 4" },
    { id: "4", name: "Option 4" },
    { id: "4", name: "Option 4" },
    { id: "4", name: "Option 4" },
    { id: "4", name: "Option 4" },
    { id: "4", name: "Option 4" },
  ];

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Package Margin Range Settings</h2>
          <Button onClick={handleAddRow} className="flex items-center gap-1">
            <Plus className="w-4 h-4" /> Add Row
          </Button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Operator-Type</TableHead>
              <TableHead>Operator</TableHead>
              <TableHead>Circle</TableHead>
              <TableHead>Amount-Range</TableHead>
              <TableHead>Comm</TableHead>
              <TableHead>CommType</TableHead>
              <TableHead>AmtType</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.operatorType || "--Select--"}</TableCell>
                <TableCell>{row.operator || "--Select--"}</TableCell>
                <TableCell>{row.circle || "--Select--"}</TableCell>
                <TableCell>{row.amountRange || "Ex. 10-50"}</TableCell>
                <TableCell>{row.commission}</TableCell>
                <TableCell>{row.commType || "Percent"}</TableCell>
                <TableCell>{row.amtType || "Discount"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Modal */}
      <AppDialog open={open} onOpenChange={setOpen} title="Add Slab Margin" width="w-[900px] max-w-[900px]">
        <Formik
          initialValues={{ skills: [] }}
          onSubmit={(values) => console.log(values)}
        >
          <Form>
            <div className="rows grid grid-cols-3 gap-4 p-2">
              <MultiSelect label="Operator Type" options={options} value={selected} onChange={setSelected} />
              <MultiSelect label="Operator" options={options} value={selected} onChange={setSelected} />
              <MultiSelect label="Circle" options={options} value={selected} onChange={setSelected} />
              <MultiSelect label="Amount-Range" options={options} value={selected} onChange={setSelected} />
              <MultiSelect label="Commission" options={options} value={selected} onChange={setSelected} />
              <MultiSelect label="Commission Type" options={options} value={selected} onChange={setSelected} />
              <MultiSelect label="Amount Type" options={options} value={selected} onChange={setSelected} />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600">Add</Button>
              <Button type="button" onClick={() => setOpen(false)} className=" border border-red-400 text-red-500 rounded hover:bg-red-50">
                Cancel
              </Button>
            </div>
          </Form>
        </Formik>
      </AppDialog>
    </div>
  );
}
