import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router } from '@inertiajs/react';
import ChildrenList from '@/components/dashboard/ChildrenList';
import TaskList from '@/components/dashboard/TaskList';
import CompletedTasks from '@/components/dashboard/CompletedTasks';
import type { PageProps } from '@/types';
import TasksCompletedNotApproved from '@/components/dashboard/TasksCompletedNotApproved';
import TasksApprovedNotPaid from '@/components/dashboard/TasksApprovedNotPaid';
import ViewPaidTasksButton from '@/components/dashboard/ViewPaidTasksButton';

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
            <div className="flex justify-center">
              <button
                type='button'
                onClick={() => router.visit(route("tasks.index"))}
                className="w-full sm:w-auto px-4 py-2 rounded-md shadow-md bg-[#809eff] text-[#090a0e] text-sm font-medium font-poppins hover:bg-blue-600 transition"
              >
                View Active Tasks
              </button>
            </div>

          <CompletedTasks tasks={taskList} />
          <TasksCompletedNotApproved tasks={taskList} />
          <TasksApprovedNotPaid tasks={taskList} />
          <ViewPaidTasksButton tasks={taskList} />
          
          <div className="flex justify-center">
              <button
                type='button'
                onClick={() => router.visit(route("completed-tasks.index"))}
                className="w-full sm:w-auto px-4 py-2 rounded-md shadow-md bg-[#809eff] text-[#090a0e] text-sm font-medium font-poppins hover:bg-blue-600 transition"
              >
                View All Completed Tasks
              </button>
            </div>
        </div>
      </div>
    </AppLayout>
  );
}
