import { Card, CardContent } from "@/components/ui/card";
import { PaginatedTasks } from "@/types";
import { router } from "@inertiajs/react";

interface Props {
  tasks: PaginatedTasks;
}

export default function AllTasks({ tasks }: Props) {
  const taskList = tasks.data;

  const handlePageChange = (url: string | null) => {
    if (url) {
      router.visit(url);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-semibold text-black">Tasks</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {taskList.map((task) => (
          <Card key={task.id} className="rounded-2xl shadow-md hover:shadow-lg transition">
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-sm text-muted-foreground">{task.description}</p>
              <div className="text-sm space-y-1 pt-2">
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Reward:</strong> ${task.reward}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Due:</strong> {task.due_date}</p>
                <p><strong>Assigned to:</strong> {task.assignee?.name ?? 'Unknown'}</p>
                {task.assignee?.avatar && (
                  <img
                    src={task.assignee.avatar}
                    alt={`${task.assignee.name}'s avatar`}
                    className="w-10 h-10 rounded-full mt-1"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
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
