import { useState } from "react";
import { parseISO } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ApproveTaskButton from "../task-actions/ApproveTaskButton";
import type { Task } from "@/types";
import TaskDetailsModal from "./TaskDetailsModal";

export default function TasksCompletedNotApproved({ tasks }: { tasks: Task[] }) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filtered = tasks.filter(
    (task) => task.status === "completed" && !task.is_approved && !task.paid_amount
  );

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Completed but Not Approved</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {filtered.length > 0 ? (
            filtered.map((task) => (
              <Card
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className="bg-gray-100 border-gray-200 cursor-pointer transition hover:shadow-md"
              >
                <CardContent className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {task.title} - €{task.reward}
                    </p>
                  </div>
                  <ApproveTaskButton taskId={task.id} className="w-[40%]" />
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center">
              No unapproved tasks.
            </p>
          )}
        </CardContent>
      </Card>

      {selectedTask && (
        <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </>
  );
}
