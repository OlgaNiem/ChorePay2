import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import ChildrenList from '@/components/dashboard/ChildrenList';
import TaskList from '@/components/dashboard/TaskList';
import CompletedTasks from '@/components/dashboard/CompletedTasks';
import type { PageProps } from '@/types';

export default function Dashboard() {
  const { auth, children = [], tasks = [] } = usePage<PageProps>().props;

  return (
    <AppLayout>
      <Head title="Dashboard" />
      <div className="container mx-auto px-4 py-6 space-y-6">
        <ChildrenList children={children} />
        <TaskList tasks={tasks} />
        <CompletedTasks tasks={tasks} />
      </div>
    </AppLayout>
  );
}
