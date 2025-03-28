import { Head, usePage } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import NewTaskForm from "@/components/new-task/NewTaskForm";
import type { PageProps } from "@/types";
import AppLayout from "@/layouts/app-layout";

const NewTask = () => {
  const { children = [], errors = {} } = usePage<PageProps>().props;

  return (
    <Card className="min-h-screen w-full  flex flex-col items-center justify-center p-6 rounded-none">
      <Head title="Create New Task" />

      <div className="w-full max-w-md border-0 shadow-none rounded-none">
        <div className="flex items-center justify-between p-4 border-b rounded-none">
          <h1 className="text-xl text-black font-medium">New Task</h1>
        </div>

        <NewTaskForm children={children} errors={errors} />
      </div>
    </Card>
  );
};

NewTask.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default NewTask;
