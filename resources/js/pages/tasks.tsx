import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PaginatedTasks, Task } from "@/types";
import { router } from "@inertiajs/react";
import { isToday, parseISO } from "date-fns";
import { getPriorityLabel } from "@/lib/priority";

interface Props {
  tasks: PaginatedTasks;
}

export default function AllTasks({ tasks }: Props) {
  const taskList = tasks.data;

  const highPriority = taskList.filter(
    (t) => t.priority === "high" || isToday(parseISO(t.due_date))
  );
  
  const upcoming = taskList.filter(
    (t) =>
      !highPriority.includes(t) 
  );

  const handlePageChange = (url: string | null) => {
    if (url) {
      router.visit(url);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-semibold text-black">Tasks</h1>

      <div className="space-y-10">
        <TaskSection title="High Priority" tasks={highPriority} />
        <TaskSection title="Upcoming Tasks" tasks={upcoming} />
      </div>

      <div className="flex justify-center gap-4 pt-6">
        <button
          type="button"
          onClick={() => handlePageChange(tasks.prev_page_url)}
          disabled={!tasks.prev_page_url}
          className="px-4 py-2 bg-gray-200 text-sm rounded disabled:opacity-50"
        >
          ← Previous
        </button>

        <button
          type="button"
          onClick={() => handlePageChange(tasks.next_page_url)}
          disabled={!tasks.next_page_url}
          className="px-4 py-2 bg-gray-200 text-sm rounded disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function TaskSection({ title, tasks }: { title: string; tasks: Task[] }) {
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
          {tasks.map((task) => {
            const isDueToday = isToday(parseISO(task.due_date));

            return (
              <Card key={task.id} className="rounded-2xl shadow-md hover:shadow-lg transition">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-semibold text-black">{task.title}</h2>
                    {isDueToday && (
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded">
                        Due Today
                      </span>
                    )}
                  </div>

                  {task.description && (
                    <p className="text-sm text-gray-500">{task.description}</p>
                  )}

                  <div className="text-sm space-y-1 border-t pt-2">
                    <p>
                      <span className="font-medium">Priority:</span>{" "}
                      {getPriorityLabel(task.priority)}
                    </p>
                    <p>
                      <span className="font-medium">Reward:</span> €{task.reward}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span> {task.status}
                    </p>
                    <p>
                      <span className="font-medium">Due:</span> {task.due_date}
                    </p>
                    <p>
                      <span className="font-medium">Assigned to:</span>{" "}
                      {task.assignee?.name ?? "Unknown"}
                    </p>
                  </div>

                  {task.assignee?.avatar && (
                    <div className="pt-2 flex items-center gap-2">
                      <img
                        src={task.assignee.avatar}
                        alt={`${task.assignee.name}'s avatar`}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-700">{task.assignee.name}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

