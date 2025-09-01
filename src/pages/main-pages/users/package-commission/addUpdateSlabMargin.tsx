import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Plus } from "lucide-react";

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
  const [editingRow, setEditingRow] = useState<RowData | null>(null);

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
    setEditingRow(newRow);
    setOpen(true);
  };

  const handleEdit = (row: RowData) => {
    setEditingRow(row);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setRows(rows.filter((r) => r.id !== id));
  };

  const handleSave = () => {
    if (editingRow) {
      setRows(rows.map((r) => (r.id === editingRow.id ? editingRow : r)));
    }
    setOpen(false);
  };

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
                    <Button size="icon" variant="outline" onClick={() => handleEdit(row)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="destructive" onClick={() => handleDelete(row.id)}>
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Row</DialogTitle>
          </DialogHeader>
          {editingRow && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  value={editingRow.operatorType}
                  placeholder="Operator Type"
                  onChange={(e) => setEditingRow({ ...editingRow, operatorType: e.target.value })}
                />
                <Input
                  value={editingRow.operator}
                  placeholder="Operator"
                  onChange={(e) => setEditingRow({ ...editingRow, operator: e.target.value })}
                />
                <Input
                  value={editingRow.circle}
                  placeholder="Circle"
                  onChange={(e) => setEditingRow({ ...editingRow, circle: e.target.value })}
                />
                <Input
                  value={editingRow.amountRange}
                  placeholder="Ex. 10-50"
                  onChange={(e) => setEditingRow({ ...editingRow, amountRange: e.target.value })}
                />
                <Input
                  type="number"
                  value={editingRow.commission}
                  placeholder="0.00"
                  onChange={(e) => setEditingRow({ ...editingRow, commission: e.target.value })}
                />
                <Select
                  value={editingRow.commType}
                  onValueChange={(val) => setEditingRow({ ...editingRow, commType: val })}
                >
                  <SelectTrigger><SelectValue placeholder="Comm Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Percent">Percent</SelectItem>
                    <SelectItem value="Flat">Flat</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={editingRow.amtType}
                  onValueChange={(val) => setEditingRow({ ...editingRow, amtType: val })}
                >
                  <SelectTrigger><SelectValue placeholder="Amt Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Discount">Discount</SelectItem>
                    <SelectItem value="Surcharge">Surcharge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
