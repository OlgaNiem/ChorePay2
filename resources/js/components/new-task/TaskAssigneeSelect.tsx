import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import type { Child } from "@/types";

interface Props {
  children: Child[];
  value: string;
  setValue: (value: string) => void;
  error?: string;
}

const TaskAssigneeSelect = ({ children, value, setValue, error }: Props) => (
  <div className="space-y-2">
    <Label htmlFor="assigned" className="text-black font-medium">
      Assigned to
    </Label>
    <Select value={value || "default"} onValueChange={setValue}>
      <SelectTrigger className="border-muted bg-muted/50">
        <SelectValue placeholder="Choose your child" />
      </SelectTrigger>
      <SelectContent>
        {children.length > 0 ? (
          children.map((child) => (
            <SelectItem key={child.uuid} value={child.uuid}>
              {child.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="default" disabled>
            No children available
          </SelectItem>
        )}
      </SelectContent>
    </Select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default TaskAssigneeSelect;
