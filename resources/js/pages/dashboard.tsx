import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ChildrenList from '@/components/dashboard/ChildrenList';
import TaskList from '@/components/dashboard/TaskList';
import CompletedTasks from '@/components/dashboard/CompletedTasks';

interface Child {
  id: number;
  name: string;
  avatar: string | null;
}

interface Task {
  id: number;
  title: string;
  reward: string;
  status: 'pending' | 'completed';
  assigned_to: number;
}

interface PageProps extends Record<string, unknown> {
  auth: { user: { id: number; name: string; email: string; avatar?: string } | null };
  children?: Child[];
  tasks?: Task[];
}

export default function Dashboard() {
  const { auth, children = [], tasks = [] } = usePage<PageProps>().props;

  return (
    <AppLayout>
      <Head title="Dashboard" />
      <DashboardHeader user={auth.user} />
      <div className="container mx-auto px-4 py-6 space-y-6">
        <ChildrenList children={children} />
        <TaskList tasks={tasks} />
        <CompletedTasks tasks={tasks} />
      </div>
    </AppLayout>
  );
}
