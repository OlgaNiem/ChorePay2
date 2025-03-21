import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewTaskForm from "@/components/new-task/NewTaskForm";
import type { Child } from "@/types";

interface PageProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
  children: Child[];
  errors?: Record<string, string>;
  [key: string]: unknown;
}

const NewTask = () => {
  const { children = [], errors = {} } = usePage<PageProps>().props;

  return (
    <Card className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-6 rounded-none">
      <Head title="Create New Task" />

      <div className="w-full max-w-md border-0 shadow-none rounded-none">
        <div className="flex items-center justify-between p-4 border-b rounded-none">
          <h1 className="text-xl text-black font-medium">New Task</h1>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <NewTaskForm children={children} errors={errors} />
      </div>
    </Card>
  );
};

export default NewTask;
