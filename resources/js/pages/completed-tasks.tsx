import TaskSection from "@/components/all-tasks/TaskSection";
import AppLayout from "@/layouts/app-layout";
import { CompletedTasksPageProps } from "@/types";
import { Head, router } from "@inertiajs/react";
import { parseISO, compareDesc  } from "date-fns";


export default function CompletedTasksPage({ tasks }: CompletedTasksPageProps) {
  const taskList = tasks.data;

  const completed = taskList
    .filter((t) => t.status === "completed" && !t.is_approved && !t.paid_amount)
    .sort((a, b) => compareDesc(parseISO(a.due_date), parseISO(b.due_date)));

  const approved = taskList
    .filter((t) => t.status === "completed" && t.is_approved && !t.paid_amount)
    .sort((a, b) => compareDesc(parseISO(a.due_date), parseISO(b.due_date)));

    const paid = taskList
    .filter((t) => t.status === "completed" && t.paid_amount)
    .sort((a, b) => compareDesc(parseISO(a.updated_at), parseISO(b.updated_at)));
  

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
          <TaskSection title="Completed but Not Approved" tasks={completed} sectionType="completed" />
          <TaskSection title="Approved but Not Paid" tasks={approved} sectionType="approved" />
          <TaskSection title="Paid Tasks" tasks={paid} sectionType="paid" />
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

