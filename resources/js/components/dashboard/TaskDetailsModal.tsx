import ApproveTaskButton from "../task-actions/ApproveTaskButton";
import PayRewardButton from "../task-actions/PayRewardButton";
import type { Task } from "@/types";

export default function TaskDetailsModal({
  task,
  onClose,
  showApproveButton = false,
  showPayRewardButton = false,
  onApproved,
  onPaid,
}: {
  task: Task;
  onClose: () => void;
  showApproveButton?: boolean;
  showPayRewardButton?: boolean;
  onApproved?: () => void;
  onPaid?: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>

        <div className="mt-4 grid gap-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span className="capitalize">{task.status}</span>
          </div>

          {task.description && (
            <div className="flex justify-between">
              <span className="font-medium">Description:</span>
              <span className="text-right text-gray-600">{task.description}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="font-medium">Reward:</span>
            <span>€{task.reward}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Due Date:</span>
            <span>{task.due_date}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Approved:</span>
            <span>{task.is_approved ? "Yes" : "No"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Paid:</span>
            <span>{task.paid_amount ? `€${task.paid_amount}` : "No"}</span>
          </div>
        </div>

        {showApproveButton && !task.is_approved && (
          <div className="pt-4">
            <ApproveTaskButton taskId={task.id} className="w-full" onSuccess={onApproved} />
          </div>
        )}

        {showPayRewardButton && !task.paid_amount && (
          <div className="pt-4">
            <PayRewardButton taskId={task.id} className="w-full" onSuccess={onPaid} />
          </div>
        )}
      </div>
    </div>
  );
}
