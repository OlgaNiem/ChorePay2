import { useState } from "react";
import { isToday, parseISO } from "date-fns";
import { Link } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { Task } from "@/types";
import TaskDetailsModal from "./TaskDetailsModal";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const todayTasks = tasks.filter(
    (task) => isToday(parseISO(task.due_date)) && task.status === "pending"
  );

  const handleApproved = () => {
    setSelectedTask(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Today's Tasks</CardTitle>
        <Link href={route("new-task")}>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
            Add Task
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 text-white">
              <Plus className="h-4 w-4" />
            </div>
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="space-y-2">
        {todayTasks.length > 0 ? (
          todayTasks.map((task) => (
            <Dialog key={task.id}>
              <DialogTrigger asChild>
                <Card
                  onClick={() => setSelectedTask(task)}
                  className="bg-yellow-100 border-yellow-300 cursor-pointer transition hover:shadow-md"
                >
                  <CardContent className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {task.title} - €{task.reward}
                      </p>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={"/placeholder.svg"} alt="Child" />
                      <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                  </CardContent>
                </Card>
              </DialogTrigger>

              {selectedTask && (
                <TaskDetailsModal
                  task={selectedTask}
                  onClose={() => setSelectedTask(null)}
                  showApproveButton
                  onApproved={handleApproved}
                />
              )}
            </Dialog>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center">
            Nothing planned for today
          </p>
        )}
      </CardContent>
    </Card>
  );
}
