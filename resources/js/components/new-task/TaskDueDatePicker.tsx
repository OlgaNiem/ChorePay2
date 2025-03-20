import React from "react";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

interface Props {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const TaskDueDatePicker = ({ date, setDate }: Props) => (
  <div className="space-y-2">
    <Label className="text-black font-medium">Due Date</Label>
    <div className="border rounded-md p-3 bg-muted/50">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="mx-auto"
      />
    </div>
  </div>
);

export default TaskDueDatePicker;
