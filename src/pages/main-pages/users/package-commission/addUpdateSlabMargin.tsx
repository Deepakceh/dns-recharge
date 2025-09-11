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
import { getValidationSchema } from "@/utils/validation";
import CircleLoader from "@/components/common/loader/CircleLoader";
import { userService } from "@/api/user/services";
import { showToast } from "@/utils/toast";
import { useParams } from "react-router-dom";

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
interface FormValues {
  operatorTypeFilter: string;
  operatorFilter: string;
  circleFilter: string;
  minValue: string;
  maxValue: string;
  commission: string;
  commissionTypeId: string;
  amountTypeId: string;
  gstTypeId: string;
}

interface UserState {
  page: number;
  size: number;
  search: string;
  data: RowData[];
}

const validationSchema = () => Yup.object({
  operatorTypeFilter: getValidationSchema({ isRequired: true }),
  // operatorFilter: getValidationSchema({ isRequired: true }),
  // circleFilter: getValidationSchema({ isRequired: true }),
  minValue: getValidationSchema({ isRequired: true, }),
  maxValue: getValidationSchema({ isRequired: true }),
  commission: getValidationSchema({ isRequired: true }),
  commissionTypeId: getValidationSchema({ isRequired: true }),
  amountTypeId: getValidationSchema({ isRequired: true }),
  gstTypeId: getValidationSchema({ isRequired: true }),
});

const AddUpdateSlabMargin: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [loader, setLoader] = useState(false)
  const [dropdown, setDropdown] = useState({
    operatorType: [] as Array<{ id: number; name: string }>,
    operator: [] as Array<{ id: number; name: string }>,
    circle: [] as Array<{ id: number; name: string }>,
    commissionType: [] as Array<{ id: number; name: string }>,
    amountType: [] as Array<{ id: number; name: string }>,
    gstType: [] as Array<{ id: number; name: string }>
  })
  const [slabMargin, setSlabMargi] = useState<UserState>({
    page: 1,
    size: 100,
    search: "",
    data: [],
  });


  const [initialValues] = useState<FormValues>({
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


  useEffect(() => {
    Promise.all([getOperatorTypeDropdownService(),getOperatorDropdownService(), getCircleDropdownService(),
    getCommissionTypeDropdownService(), getAmountTypeDropdownService(), getGstTypeDropdownService()
    ]);
  }, []);

  useEffect(() => {
    getPackageMarginService(slabMargin.page, slabMargin.size);
  }, [slabMargin.page, slabMargin.size]);

  const getPackageMarginService = async (page: number, size: number,) => {
    try {
      const res = await userService.GetPackageWiseSlabMargins({ page, size });
      if (res?.success) {
        setSlabMargi((prev) => ({
          ...prev,
          data: res.data as RowData[],
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getOperatorTypeDropdownService = async () => {
    try {
      const res = await dropdownService.OperatorType();
      if (res?.success) {
        const data = res.data as Array<{ id: number; typeName: string }>;
        setDropdown((prev) => ({
          ...prev,
          operatorType: data.map((item) => ({ id: item?.id, name: item?.typeName })),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

   const getOperatorDropdownService = async () => {
     try {
      const res = await dropdownService.OperatorDropdown();
      const data = res.data as Array<{ id: number; name: string }>;
      setDropdown((prev) => ({
        ...prev,
        operator: data.map((item) => ({ id: item?.id, name: item?.name })),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const getCircleDropdownService = async () => {
    try {
      const res = await dropdownService.Circle();
      if (res?.success) {
        const data = res.data as Array<{ id: number; circleName: string }>;
        setDropdown((prev) => ({
          ...prev,
          circle: data.map((item) => ({ id: item?.id, name: item?.circleName })),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getCommissionTypeDropdownService = async () => {
    try {
      const res = await dropdownService.CommissionType();
      if (res?.success) {
        const data = res.data as Array<{ id: number; typeName: string }>;
        setDropdown((prev) => ({
          ...prev,
          commissionType: data.map((item) => ({ id: item?.id, name: item?.typeName })),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getAmountTypeDropdownService = async () => {
    try {
      const res = await dropdownService.AmountType();
      if (res?.success) {
        const data = res.data as Array<{ id: number; typeName: string }>;
        setDropdown((prev) => ({
          ...prev,
          amountType: data.map((item) => ({ id: item?.id, name: item?.typeName })),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getGstTypeDropdownService = async () => {
    try {
      const res = await dropdownService.GstType();
      if (res?.success) {
        const data = res.data as Array<{ id: number; gstName: string }>;
        setDropdown((prev) => ({
          ...prev,
          gstType: data.map((item) => ({ id: item?.id, name: item?.gstName })),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (values: FormValues) => {
    setLoader(true)
    try {
      const res = await userService.AddUpdatePackageSlabMargin({ ...values, packageId: id || undefined });
      setLoader(false)
      if (res?.success) {
        showToast.success(res.message || ("Added successfully"));
        setOpen(false);
      } else {
        showToast.error(res?.message || "Failed");
      }
    } catch (err) {
      console.error(err);
      setLoader(false)
    }
  };


  return (
    <>
      {loader && <CircleLoader />}
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
              {slabMargin.data?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.operatorType || "--Select--"}</TableCell>
                  <TableCell>{user.operator || "--Select--"}</TableCell>
                  <TableCell>{user.circle || "--Select--"}</TableCell>
                  <TableCell>{user.amountRange || "Ex. 10-50"}</TableCell>
                  <TableCell>{user.commission}</TableCell>
                  <TableCell>{user.commType || "Percent"}</TableCell>
                  <TableCell>{user.amtType || "Discount"}</TableCell>
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
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="grid md:grid-cols-3 gap-6">
                  <MultiSelect name='operatorTypeFilter' label="Operator Type" options={dropdown.operatorType}/>
                  <MultiSelect name='operatorFilter' label="Operator" options={dropdown.operator} />
                  <MultiSelect name='circleFilter' label="Circle" options={dropdown.circle} />
                  <InputField name="minValue" label="Min Value" type="text" inputMode="int" placeholder="Enter min value" className="border" />
                  <InputField name="maxValue" label="Max Value" type="text" inputMode="int" placeholder="Enter max value" className="border" />
                  <InputField name="commission" label="Commission" type="text" inputMode="int" placeholder="Enter commission" className="border" />
                  <SelectField name="commissionTypeId" label="Commission Type" options={dropdown.commissionType} />
                  <SelectField name="amountTypeId" label="Amount Type" options={dropdown.amountType} />
                  <SelectField name="gstTypeId" label="GST Type" options={dropdown.gstType} />
                </div>
                <div className="flex justify-end gap-2 mt-3">
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
    </>
  );
}
export default AddUpdateSlabMargin;

