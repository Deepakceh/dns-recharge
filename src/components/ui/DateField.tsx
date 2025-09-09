import { useField, useFormikContext } from 'formik';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';

interface DateFieldProps {
  name: string;
  label: string;
  disabled?: boolean;
  className?: string; // ✅ optional className
}

const DateField: React.FC<DateFieldProps> = ({ name, label, disabled, className }) => {
  const { setFieldValue } = useFormikContext<any>();
  const [field, meta] = useField(name);

  const selectedDate = field.value ? new Date(field.value) : undefined;

  return (
    <div className={`relative ${className || ''}`}> {/* ✅ apply className here */}
      <label className="block text-sm font-medium mb-1">{label}</label>

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={`relative w-full text-left px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
              disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
            }`}
            disabled={disabled}
          >
            {selectedDate ? format(selectedDate, 'MM/dd/yyyy') : 'Select date'}
            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500 pointer-events-none" />
          </button>
        </PopoverTrigger>

        <PopoverContent className="p-2 bg-white rounded-md shadow-md mt-1 z-50">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) =>
              setFieldValue(name, date ? format(date, 'yyyy-MM-dd') : '')
            }
          />
        </PopoverContent>
      </Popover>

      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500 mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default DateField;
