import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Task } from "@/types";

interface Props {
  task: Task;
}

export default function TaskDetailsModal({ task }: Props) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-gray-800">{task.title}</DialogTitle>
        <DialogDescription className="text-sm text-gray-500">
          Status: <span className="font-medium text-gray-700">{task.status}</span>
        </DialogDescription>
      </DialogHeader>

      <div className="mt-4 grid gap-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Description:</span>
          <span className="text-right text-gray-600">
            {task.description || 'No description provided'}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Priority:</span>
          <span className="capitalize">{task.priority}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Reward:</span>
          <span>€{task.reward}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Due Date:</span>
          <span>{task.due_date}</span>
        </div>
      </div>
    </DialogContent>
  );
}
