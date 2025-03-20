import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { CardContent } from "@/components/ui/card";
import TaskTitleInput from "./TaskTitleInput";
import TaskDescriptionInput from "./TaskDescriptionInput";
import TaskDueDatePicker from "./TaskDueDatePicker";
import TaskAssigneeSelect from "./TaskAssigneeSelect";
import TaskPrioritySelector from "./TaskPrioritySelector";
import TaskRewardInput from "./TaskRewardInput";
import SubmitButton from "./SubmitButton";

interface Child {
  id: number;
  name: string;
}

interface Props {
  children: Child[];
  errors: Record<string, string>;
}

const NewTaskForm = ({ children, errors }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("high");
  const [reward, setReward] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    router.post(route("store-task"), {
      title,
      description,
      priority,
      reward,
      assigned_to: assignedTo,
      due_date: date?.toISOString().split("T")[0],
    }, {
      onSuccess: () => {
        setLoading(false);
        router.visit(route("dashboard"));
      },
      onError: () => setLoading(false),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="p-4 space-y-6">
        <TaskTitleInput value={title} setValue={setTitle} error={errors.title} />

        <TaskDescriptionInput value={description} setValue={setDescription} error={errors.description} />

        <TaskDueDatePicker date={date} setDate={setDate} />

        <TaskAssigneeSelect children={children} value={assignedTo} setValue={setAssignedTo} error={errors.assigned_to} />

        <TaskPrioritySelector value={priority} setValue={setPriority} />

        <TaskRewardInput value={reward} setValue={setReward} error={errors.reward} />

        <SubmitButton loading={loading} />
      </CardContent>
    </form>
  );
};

export default NewTaskForm;
