import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import { AppDialog } from "@/components/common/AppDialog";
import { Formik, Form } from "formik";
import MultiSelect from "@/components/common/formFields/MultiSelectField";
import * as Yup from "yup";
import InputField from "@/components/common/formFields/InputField";
import SelectField from "@/components/common/formFields/SelectField";
import { dropdownService } from "@/api/dropdown/service";

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

  const [dropdown, setDropdown] = useState({
    operatorTypeData: [] as Array<{ id: number; name: string }>,
    operatorData: [] as Array<{ id: number; name: string }>,
    circleData: [] as Array<{ id: number; name: string }>,
    amountTypeData: [] as Array<{ id: number; name: string }>,
    commissionTypeData: [] as Array<{ id: number; name: string }>,
    gstTypeData: [] as Array<{ id: number; name: string }>
  })
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
  const [initialValues, setInitialValues] = useState<FormValues>({
    operatorTypeFilter: '',
    operatorFilter: '',
    circleFilter: '',
    minValue: '',
    maxValue: '',
    commission: '',
    commissionTypeId: '',
    amountTypeId: '',
    gstTypeId: ''

  });

  const [open, setOpen] = useState(false);


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

  useEffect(() => {
    Promise.all([getOperatorTypeDropdownService()]);
  }, []);

  const getOperatorTypeDropdownService = async () => {
    try {
      const res = await dropdownService.OperatorType();
      if (res?.success) {
        const data = res.data as Array<{ value: number; text: string }>;
        setDropdown((prev) => ({
          ...prev,
          operatorTypeData: data.map((operator) => ({ id: operator.value, name: operator.text })),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Package Margin Range Settings</h2>
          <Button onClick={() => setOpen(true)} className="flex items-center gap-1">
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
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
        >
          {() => (
            <Form>
              <div className="relative grid md:grid-cols-2 gap-4 p-2">
                <MultiSelect name='operatorTypeFilter' label="Operator Type" options={options} value={selected} onChange={setSelected} />
                <MultiSelect name='operatorFilter' label="Operator" options={options} value={selected} onChange={setSelected} />
                <MultiSelect name='circleFilter' label="Circle" options={options} value={selected} onChange={setSelected} />
                <InputField name="minValue" label="Min Value" type="text" placeholder="Enter min value" className="border" />
                <InputField name="maxValue" label="Max Value" type="text" placeholder="Enter max value" className="border" />
                <InputField name="commission" label="Commission" type="text" placeholder="Enter commission" className="border" />
                <SelectField name="commissionTypeId" label="Commission Type" options={AccountTypeData} />
                <SelectField name="accountTypeId" label="Account Type" options={AccountTypeData} />
                <SelectField name="gstTypeId" label="GST Type" options={AccountTypeData} />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600">Add</Button>
                <Button type="button" onClick={() => setOpen(false)} className=" border border-red-400 text-red-500 rounded hover:bg-red-50">
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </AppDialog>
    </div>
  );
}
