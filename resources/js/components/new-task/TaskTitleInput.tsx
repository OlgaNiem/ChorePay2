import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  setValue: (value: string) => void;
  error?: string;
}

const TaskTitleInput = ({ value, setValue, error }: Props) => (
  <div className="space-y-2">
    <Label htmlFor="title" className="text-black font-medium">Task Title</Label>
    <Input
      id="title"
      placeholder="Enter task title"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="border-muted bg-muted/50"
      required
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default TaskTitleInput;
