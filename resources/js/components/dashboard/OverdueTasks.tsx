import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Task } from "@/types";
import TaskCard from "@/components/all-tasks/TaskCard";

export default function OverdueTasks({ tasks }: { tasks: Task[] }) {
  const overdueTasks = tasks.filter((t) => t.status !== "completed");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overdue Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {overdueTasks.length > 0 ? (
          overdueTasks.map((task) => (
            <TaskCard key={task.id} task={task} showActions />
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center">No overdue tasks</p>
        )}
      </CardContent>
    </Card>
  );
}
