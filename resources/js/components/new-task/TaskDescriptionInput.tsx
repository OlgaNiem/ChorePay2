import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  value: string;
  setValue: (value: string) => void;
  error?: string;
}

const TaskDescriptionInput = ({ value, setValue, error }: Props) => (
  <div className="space-y-2">
    <Label htmlFor="description" className="text-black font-medium">Description</Label>
    <Textarea
      id="description"
      placeholder="Enter task description"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="min-h-24 border-muted bg-muted/50"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default TaskDescriptionInput;
