import { router } from "@inertiajs/react";
import type { Task } from "@/types";

export default function ViewPaidTasksButton({ tasks }: { tasks: Task[] }) {
  const paidTasks = tasks.filter(
    (t) => t.status === "completed" && t.paid_amount
  );

  if (paidTasks.length === 0) return null;

  const handleViewPaid = () => {
    router.visit(route("completed-tasks.index"), {
      data: {
        filter: "paid",
      },
    });
  };

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={handleViewPaid}
        className="w-full sm:w-auto px-4 py-2 rounded-md shadow-md bg-[#809eff] text-[#090a0e] text-sm font-medium font-poppins hover:bg-blue-600 transition"
      >
        View All Paid Tasks
      </button>
    </div>
  );
}
