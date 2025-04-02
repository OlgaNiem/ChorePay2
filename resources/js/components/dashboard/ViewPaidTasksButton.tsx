import { router } from "@inertiajs/react";
import { Task } from "@/types";

export default function ViewPaidTasksButton({ tasks }: { tasks: Task[] }) {
  const hasPaidTasks = tasks.some((t) => t.status === "completed" && t.paid_amount);

  if (!hasPaidTasks) return null;

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={() => router.visit(route("completed-tasks.index"))}
        className="w-full sm:w-auto px-4 py-2 rounded-md shadow-md bg-[#809eff] text-[#090a0e] text-sm font-medium font-poppins hover:bg-blue-600 transition"
      >
        View All Paid Tasks
      </button>
    </div>
  );
}
