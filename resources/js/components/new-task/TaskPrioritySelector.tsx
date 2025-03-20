import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

const priorities = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const TaskPrioritySelector = ({ value, setValue }: Props) => (
  <div className="space-y-2">
    <Label className="font-medium text-black">Priority</Label>
    <RadioGroup value={value} onValueChange={setValue} className="flex gap-4">
      {priorities.map((priority) => (
        <div key={priority.value} className="flex text-black items-center space-x-2">
          <RadioGroupItem value={priority.value} id={priority.value} />
          <Label htmlFor={priority.value}>{priority.label}</Label>
        </div>
      ))}
    </RadioGroup>
  </div>
);

export default TaskPrioritySelector;
