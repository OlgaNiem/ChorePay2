import TaskSection from "@/components/all-tasks/TaskSection";
import AppLayout from "@/layouts/app-layout";
import { PaginatedTasks } from "@/types";
import { Head, router } from "@inertiajs/react";
import { parseISO, compareDesc, format } from "date-fns";

interface Props {
  tasks: PaginatedTasks;
}

export default function CompletedTasksPage({ tasks }: Props) {
  const completed = tasks.data
    .filter((task) => task.status === "completed")
    .sort((a, b) => compareDesc(parseISO(a.due_date), parseISO(b.due_date)));

  const handlePageChange = (url: string | null) => {
    if (url) {
      router.visit(url);
    }
  };

  return (
    <AppLayout>
      <Head title="Completed Tasks" />
      <div className="p-4 space-y-6">
        <div className="space-y-10">
          <TaskSection title="All Completed Tasks" tasks={completed} />
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
    </AppLayout>
  );
}
