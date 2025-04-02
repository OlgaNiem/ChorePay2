import type { Task } from "@/types";
import ApproveTaskButton from "../task-actions/ApproveTaskButton";
import PayRewardButton from "../task-actions/PayRewardButton";

export default function TaskDetailsModal({
  task,
  onClose,
  showApproveButton = false,
  showPayRewardButton = false,
  onPaid,
}: {
  task: Task;
  onClose: () => void;
  showApproveButton?: boolean;
  showPayRewardButton?: boolean;
  onPaid?: () => void;
}) {
  const handleApproved = () => {
    onClose();
  };

  const handlePaid = () => {
    onClose();
    onPaid?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
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
        <p className="text-sm text-gray-500">
          Status: <span className="font-medium text-gray-700">{task.status}</span>
        </p>

        <div className="mt-4 grid gap-3 text-sm text-gray-700">
          {task.description && (
            <div className="flex justify-between">
              <span className="font-medium">Description:</span>
              <span className="text-right text-gray-600">
                {task.description}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="font-medium">Priority:</span>
            <span className="capitalize">{task.priority}</span>
          </div>

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
            <ApproveTaskButton
              taskId={task.id}
              className="w-full"
              onSuccess={handleApproved}
            />
          </div>
        )}

        {showPayRewardButton && task.is_approved && !task.paid_amount && (
          <div className="pt-4">
            <PayRewardButton
              taskId={task.id}
              className="w-full"
              onSuccess={handlePaid}
            />
          </div>
        )}
      </div>
    </div>
  );
}
