import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Task {
  id: number;
  title: string;
  reward: string;
  status: 'pending' | 'completed';
  assigned_to: number;
}

export default function CompletedTasks({ tasks }: { tasks: Task[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {tasks.filter((task) => task.status === 'completed').length > 0 ? (
          tasks
            .filter((task) => task.status === 'completed')
            .map((task) => (
              <Card key={task.id} className="bg-gray-100 border-gray-200">
                <CardContent className="p-3">
                  <p className="font-medium">{task.title} - {task.reward}</p>
                </CardContent>
              </Card>
            ))
        ) : (
          <p className="text-sm text-gray-500">No completed tasks.</p>
        )}
      </CardContent>
    </Card>
  );
}
