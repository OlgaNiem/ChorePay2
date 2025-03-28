import TaskSection from "@/components/all-tasks/TaskSection";
import AppLayout from "@/layouts/app-layout";
import { PaginatedTasks } from "@/types";
import { Head, router } from "@inertiajs/react";
import { parseISO, isToday, isBefore, compareAsc, startOfDay } from "date-fns";

interface Props {
  tasks: PaginatedTasks;
}

export default function AllTasks({ tasks }: Props) {
  const taskList = tasks.data;

  const today = startOfDay(new Date());

  const dueToday = taskList.filter(
    (t) => isToday(parseISO(t.due_date)) && t.status !== "completed"
  );
  
  const highOnly = taskList.filter(
    (t) =>
      t.priority === "high" &&
      !isToday(parseISO(t.due_date)) &&
      t.status !== "completed"
  );
  
  const highPriority = [...dueToday, ...highOnly];
  
  const overdue = taskList
  .filter(
    (t) =>
      isBefore(parseISO(t.due_date), today) &&
      t.status !== "completed"
  )
  .sort((a, b) => compareAsc(parseISO(a.due_date), parseISO(b.due_date)));

  
  const upcoming = taskList
    .filter(
      (t) =>
        !highPriority.includes(t) &&
        !overdue.includes(t) &&
        t.status !== "completed"
    )
    .sort((a, b) => compareAsc(parseISO(a.due_date), parseISO(b.due_date)));
  

  const handlePageChange = (url: string | null) => {
    if (url) {
      router.visit(url);
    }
  };

  return (
    <AppLayout>
      <Head title="Tasks" />
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-semibold text-black">Tasks</h1>

      <div className="space-y-10">
        <TaskSection title="High Priority" tasks={highPriority} />
        <TaskSection title="Upcoming Tasks" tasks={upcoming} />
        <TaskSection title="Overdue Tasks" tasks={overdue} />
      </div>

      <div className="flex justify-center  gap-4 pt-6">
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
