import { Head, usePage } from "@inertiajs/react";
import type { PageProps, Task } from "@/types";
import ChildTaskList from "@/components/child-dashboard/ChildTaskList";

export default function ChildProfile() {
  const { child, tasks = [] } = usePage<PageProps>().props;

  if (!child) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4EDEC] p-6">
        <p className="text-center text-gray-600 text-lg">Child not found.</p>
      </div>
    );
  }

  const taskList = "data" in tasks ? tasks.data : tasks;

  return (
    <div className="min-h-screen bg-[#F4EDEC] flex flex-col pt-0 font-quicksand">
      <Head title="Child Profile" />

      <div
        className="
          w-full 
          h-[250px] 
          sm:h-[300px] 
          md:h-[400px] 
          lg:h-[480px] 
          xl:h-[550px] 
          bg-cover 
          bg-[center_5%] 
          bg-no-repeat 
          rounded-b-[8px]"
        style={{ backgroundImage: "url('/child-dashboard.png')" }}
      />

      <div className="mt-6 px-6">
        <ChildTaskList child={child} tasks={taskList} />
      </div>
    </div>
  );
}
