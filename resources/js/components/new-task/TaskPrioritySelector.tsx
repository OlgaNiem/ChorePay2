import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getPriorityLabel, PRIORITIES, type Priority } from "@/lib/priority";

interface Props {
  value: Priority;
  setValue: (value: Priority) => void;
}

const TaskPrioritySelector = ({ value, setValue }: Props) => (
  <div className="space-y-2">
    <Label className="font-medium text-black">Priority</Label>
    <RadioGroup value={value} onValueChange={setValue} className="flex gap-4">
      {PRIORITIES.map((priority) => (
        <div key={priority} className="flex text-black items-center space-x-2">
          <RadioGroupItem value={priority} id={priority} />
          <Label htmlFor={priority}>{getPriorityLabel(priority)}</Label>
        </div>
      ))}
    </RadioGroup>
  </div>
);

export default TaskPrioritySelector;
