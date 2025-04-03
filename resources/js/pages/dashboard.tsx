import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router } from '@inertiajs/react';
import ChildrenList from '@/components/dashboard/ChildrenList';
import TaskList from '@/components/dashboard/TaskList';
import CompletedTasks from '@/components/dashboard/CompletedTasks';
import type { PageProps } from '@/types';
import TasksCompletedNotApproved from '@/components/dashboard/TasksCompletedNotApproved';
import TasksApprovedNotPaid from '@/components/dashboard/TasksApprovedNotPaid';
import ViewPaidTasksButton from '@/components/dashboard/ViewPaidTasksButton';
import ViewCompletedTasksButton from '@/components/dashboard/ViewCompletedTasksButton';
import ViewActiveTasksButton from '@/components/dashboard/ViewActiveTasksButton';

export default function Dashboard() {
  const { children = [], tasks = [] } = usePage<PageProps>().props;

  const taskList = "data" in tasks ? tasks.data : tasks;

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
