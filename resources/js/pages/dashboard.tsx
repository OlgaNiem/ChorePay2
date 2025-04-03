import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import ChildrenList from '@/components/dashboard/ChildrenList';
import TaskList from '@/components/dashboard/TaskList';
import CompletedTasks from '@/components/dashboard/CompletedTasks';
import type { PageProps } from '@/types';
import TasksCompletedNotApproved from '@/components/dashboard/TasksCompletedNotApproved';
import TasksApprovedNotPaid from '@/components/dashboard/TasksApprovedNotPaid';
import ViewPaidTasksButton from '@/components/dashboard/ViewPaidTasksButton';
import ViewCompletedTasksButton from '@/components/dashboard/ViewCompletedTasksButton';
import ViewActiveTasksButton from '@/components/dashboard/ViewActiveTasksButton';
import { compareDesc, parseISO } from 'date-fns';

export default function Dashboard() {
  const { children = [], tasks = [] } = usePage<PageProps>().props;

  const taskListRaw = "data" in tasks ? tasks.data : tasks;

  const taskList = [...taskListRaw]
  .filter((task) => !!task.due_date)
  .sort((a, b) => {
    const dateCompare = compareDesc(parseISO(a.due_date), parseISO(b.due_date));
    if (dateCompare !== 0) return dateCompare;

    return compareDesc(parseISO(a.created_at), parseISO(b.created_at));
  });


  return (
    <AppLayout>
      <Head title="Dashboard" />
      <div className="min-h-screen bg-[#F4EDEC] overflow-auto">
        <div className="container mx-auto px-4 py-6 space-y-6">

          <ChildrenList children={children} />
          <TaskList tasks={taskList} />

          <ViewActiveTasksButton />
            
          <CompletedTasks tasks={taskList} />
          <TasksCompletedNotApproved tasks={taskList} />

          <ViewCompletedTasksButton />

          <TasksApprovedNotPaid tasks={taskList} />
          <ViewPaidTasksButton tasks={taskList} />
          
          
        </div>
      </div>
    </AppLayout>
  );
}
