import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Menu } from "lucide-react";

interface Child {
  id: number;
  name: string;
}

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
  [key: string]:unknown; // Laravel validation errors
}

const NewTask = () => {
  const { auth, children = [], errors = {} } = usePage<PageProps>().props; // ✅ Добавлен `[]` по умолчанию

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<string>("high");
  const [reward, setReward] = useState<string>("");
  const [assignedTo, setAssignedTo] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    router.post(
      route("store-task"),
      {
        title,
        description,
        priority,
        reward,
        assigned_to: assignedTo,
        due_date: date?.toISOString().split("T")[0],
      },
      {
        onSuccess: () => {
          setLoading(false);
          router.visit(route("dashboard"));
        },
        onError: () => setLoading(false),
      }
    );
  };

  return (
    <Card className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-6 rounded-none">
      <Head title="Create New Task" />

      <form onSubmit={handleSubmit} className="w-full max-w-md border-0 shadow-none rounded-none">
        <div className="flex items-center justify-between p-4 border-b rounded-none">
          <h1 className="text-xl text-black  font-medium">New Task</h1>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <CardContent className="p-4 space-y-6">
          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className=" text-black font-medium">Task Title</Label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-muted bg-muted/50"
              required
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className=" text-black font-medium">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-24 border-muted bg-muted/50"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label className="text-black font-medium">Due Date</Label>
            <div className="border rounded-md p-3 bg-muted/50">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate: Date | undefined) => setDate(selectedDate)}
                className="mx-auto"
              />
            </div>
          </div>

          {/* Assign Task */}
          <div className="space-y-2">
            <Label htmlFor="assigned" className=" text-black font-medium">Assigned to</Label>
            <Select value={assignedTo || "default"} onValueChange={setAssignedTo}>
              <SelectTrigger className="border-muted bg-muted/50">
                <SelectValue placeholder="Choose your child" />
              </SelectTrigger>
              <SelectContent>
                {children.length > 0 ? (
                  children.map((child) => (
                    <SelectItem key={child.id} value={String(child.id)}>
                      {child.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="default" disabled>
                    No children available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors.assigned_to && <p className="text-red-500 text-xs mt-1">{errors.assigned_to}</p>}
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label className="font-medium text-black">Priority</Label>
            <RadioGroup value={priority} onValueChange={setPriority} className="flex gap-4">
              <div className="flex text-black items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high">High</Label>
              </div>
              <div className="flex items-center text-black space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex text-black items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low">Low</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Reward */}
          <div className="space-y-2">
            <Label className="font-medium text-black">Reward (€)</Label>
            <Input
              type="number"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              className="border-muted bg-muted/50"
              placeholder="Enter amount"
              required
            />
            {errors.reward && <p className="text-red-500 text-xs mt-1">{errors.reward}</p>}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? "Saving..." : "Save Task"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default NewTask;
