import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Task {
  id: number;
  title: string;
  reward: string;
  status: 'pending' | 'completed';
  assigned_to: number;
}

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Today's Tasks</CardTitle>
        <Link href={route('new-task')}>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
            Add Task
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 text-white">
              <Plus className="h-4 w-4" />
            </div>
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="space-y-2">
        {tasks.filter((task) => task.status === 'pending').length > 0 ? (
          tasks
            .filter((task) => task.status === 'pending')
            .map((task) => (
              <Card key={task.id} className="bg-yellow-100 border-yellow-300">
                <CardContent className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {task.title} - {task.reward}
                    </p>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={'/placeholder.svg'} alt="Child" />
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>
                </CardContent>
              </Card>
            ))
        ) : (
          <p className="text-sm text-gray-500">No tasks for today.</p>
        )}
      </CardContent>
    </Card>
  );
}
