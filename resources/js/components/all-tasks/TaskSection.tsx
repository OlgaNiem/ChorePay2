import { useState } from "react";
import { TaskSectionProps} from "@/types";
import TaskCard from "./TaskCard";

export default function TaskSection({ title, tasks, sectionType }: TaskSectionProps) {
  const [open, setOpen] = useState(true);

  if (tasks.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-sm text-blue-600 hover:underline"
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>

      {open && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              showActions={sectionType === "completed"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
