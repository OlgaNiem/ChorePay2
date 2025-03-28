import { useState } from 'react';
import { isBefore, isToday, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Task } from '@/types';

export default function CompletedTasks({ tasks }: { tasks: Task[] }) {
  const [showAll, setShowAll] = useState(false);

  const completedTasks = tasks.filter(task => task.status === 'completed');

  const filteredTasks = showAll
    ? completedTasks
    : completedTasks.filter(task => {
        const dueDate = parseISO(task.due_date);
        return isToday(dueDate) || isBefore(dueDate, new Date());
      });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Card key={task.id} className="bg-gray-100 border-gray-200">
              <CardContent className="p-3">
                <p className="font-medium">
                  {task.title} - {task.reward}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-sm text-gray-500">No completed tasks.</p>
        )}
        {completedTasks.length > filteredTasks.length && (
          <div className="pt-4 text-center">
            <Button
              variant="ghost"
              className="text-sm underline text-blue-600 hover:text-blue-800"
              onClick={() => setShowAll(true)}
            >
              Show All Completed Tasks
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
