import { Card, CardContent } from "@/components/ui/card";
import { TaskCardProps } from "@/types";
import { isToday, parseISO } from "date-fns";
import InfoRow from "./InfoRow";
import PayRewardButton from "../task-actions/PayRewardButton";
import ApproveTaskButton from "../task-actions/ApproveTaskButton";

export default function TaskCard({ task, showActions = false }: TaskCardProps) {
  const isDueToday = isToday(parseISO(task.due_date));

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
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
          <InfoRow label="Priority" value={task.priority} />
          <InfoRow label="Reward" value={`€${task.reward}`} />
          <InfoRow label="Status" value={task.status} />
          <InfoRow label="Due" value={task.due_date} />
          <InfoRow label="Assigned to" value={task.assignee?.name ?? "Unknown"} />
          <InfoRow label="Created at" value={task.created_at?.split("T")[0] ?? "-"} />
          <InfoRow label="Approved" value={task.is_approved ? "Yes" : "No"} />
          <InfoRow label="Paid" value={task.paid_amount ? `€${task.paid_amount}` : "No"} />
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
        
        {showActions && (
          <div className="pt-4 flex justify-between">
            <ApproveTaskButton taskId={task.id} className="w-[48%]" />
            <PayRewardButton taskId={task.id} className="w-[48%]" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
