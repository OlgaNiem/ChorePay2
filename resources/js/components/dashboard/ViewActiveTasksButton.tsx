import { router } from "@inertiajs/react";

export default function ViewActiveTasksButton() {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={() => router.visit(route("tasks.index"))}
        className="w-full sm:w-auto px-4 py-2 rounded-md shadow-md bg-[#809eff] text-[#090a0e] text-sm font-medium font-poppins hover:bg-blue-600 transition"
      >
        View Active Tasks
      </button>
    </div>
  );
}
