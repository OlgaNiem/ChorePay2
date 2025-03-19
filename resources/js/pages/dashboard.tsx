import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface Child {
  id: number;
  name: string;
  avatar: string | null;
}

interface Task {
  id: number;
  title: string;
  reward: string;
  status: "pending" | "completed";
  assigned_to: number;
}

interface PageProps extends Record<string, unknown> {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
      avatar?: string;
    } | null;
  };
  children?: Child[];  // ✅ Ensures children is optional
  tasks?: Task[];      // ✅ Ensures tasks is optional
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

export default function Dashboard() {
  const { auth, children = [], tasks = [] } = usePage<PageProps>().props; // ✅ Defaults to empty arrays

  const getChildAvatar = (childId: number) => {
    const child = children.find((c) => c.id === childId);
    return child?.avatar || "/placeholder.svg";
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      {/* 🏠 Top Bar */}
      <header className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="py-4">
                <h2 className="text-lg font-medium">Menu</h2>
                <nav className="mt-4">
                  <ul className="space-y-2">
                    <li><Button variant="ghost" className="w-full justify-start">Dashboard</Button></li>
                    <li><Button variant="ghost" className="w-full justify-start">Settings</Button></li>
                    <li><Button variant="ghost" className="w-full justify-start">Help</Button></li>
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <span className="font-medium">{auth.user?.name || "Parent"}</span>
        </div>

        {/* Right: Profile Picture */}
        <Avatar className="h-8 w-8">
          <AvatarImage src={auth.user?.avatar || "/placeholder.svg"} alt="Parent" />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
      </header>

      {/* 📌 Main Dashboard Sections */}
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        {/* My Children Section */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">My Children</h2>
            <Link href={route("add-child")}>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
                add child
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 text-white">
                  <Plus className="h-4 w-4" />
                </div>
              </Button>
            </Link>
          </div>

          {/* List of Children */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {children.length > 0 ? (
              children.map((child) => (
                <div key={child.id} className="flex flex-col items-center gap-1 min-w-[80px]">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={child.avatar || "/placeholder.svg"} alt={child.name} />
                    <AvatarFallback>{child.name[0]}</AvatarFallback>
                  </Avatar>
                  <Link href={route("child-profile", { child: child.id })}>
                    <Button variant="outline" size="sm" className="text-xs bg-blue-100 hover:bg-blue-200 border-blue-200 text-blue-700 w-full">
                      View Profile
                    </Button>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No children added yet.</p>
            )}
          </div>
        </section>

        {/* Today's Tasks Section */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">Today's tasks</h2>
            <Link href={route("new-task")}>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
                add task
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 text-white">
                  <Plus className="h-4 w-4" />
                </div>
              </Button>
            </Link>
          </div>

          {/* Task List */}
          <div className="space-y-2">
            {tasks.filter((task) => task.status === "pending").length > 0 ? (
              tasks.filter((task) => task.status === "pending").map((task) => (
                <Card key={task.id} className="bg-yellow-200 border-yellow-300">
                  <CardContent className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{task.title} - {task.reward}</p>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={getChildAvatar(task.assigned_to)} alt="Child" />
                      <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-sm text-gray-500">No tasks for today.</p>
            )}
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">View Existing Tasks</Button>
          </div>
        </section>

        {/* Completed Tasks Section */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">Completed tasks</h2>
          </div>
          <div className="space-y-2">
            {tasks.filter((task) => task.status === "completed").length > 0 ? (
              tasks.filter((task) => task.status === "completed").map((task) => (
                <Card key={task.id} className="bg-gray-100 border-gray-200">
                  <CardContent className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{task.title} - {task.reward}</p>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={getChildAvatar(task.assigned_to)} alt="Child" />
                      <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-sm text-gray-500">No completed tasks.</p>
            )}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
