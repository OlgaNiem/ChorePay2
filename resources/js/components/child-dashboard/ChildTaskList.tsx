import { useState } from "react";
import { isToday, parseISO } from "date-fns";
import { router } from "@inertiajs/react";
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Task, Child } from "@/types";

interface Props {
  child: Child;
  tasks: Task[];
}

export default function ChildTaskList({ child, tasks }: Props) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const inProgressTasks = tasks.filter(
    (task) =>
      task.assigned_to === child.uuid &&
      task.status === "pending" &&
      isToday(parseISO(task.due_date))
  );

  const handleMarkAsDone = (taskId: string) => {
    setSelectedTask(null); 
    router.post(route('tasks.complete', taskId));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Today's tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {inProgressTasks.length > 0 ? (
            inProgressTasks.map((task) => (
              <Card
                key={task.id}
                className="bg-yellow-100 border-yellow-300 cursor-pointer"
                onClick={() => setSelectedTask(task)}
              >
                <CardContent className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {task.title} - €{task.reward}
                    </p>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={child.avatar || "/placeholder.svg"} alt={child.name} />
                    <AvatarFallback>{child.name[0]}</AvatarFallback>
                  </Avatar>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-sm text-gray-500">Nothing in progress for today.</p>
          )}
        </CardContent>
      </Card>

      {selectedTask && (
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedTask.title}</DialogTitle>
              <DialogDescription>Task details and actions</DialogDescription>
            </DialogHeader>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Description:</strong> {selectedTask.description || "No description"}</p>
              <p><strong>Priority:</strong> {selectedTask.priority}</p>
              <p><strong>Reward:</strong> €{selectedTask.reward}</p>
              <p><strong>Due Date:</strong> {selectedTask.due_date}</p>
              <p><strong>Status:</strong> {selectedTask.status}</p>
            </div>

            <Button
              className="bg-green-500 hover:bg-green-600 text-white mt-4"
              onClick={() => handleMarkAsDone(selectedTask.id)}
            >
              Mark as Done
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
