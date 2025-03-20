import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  setValue: (value: string) => void;
  error?: string;
}

const TaskRewardInput = ({ value, setValue, error }: Props) => (
  <div className="space-y-2">
    <Label className="font-medium text-black">Reward (€)</Label>
    <Input
      type="number"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="border-muted bg-muted/50"
      placeholder="Enter amount"
      required
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default TaskRewardInput;
