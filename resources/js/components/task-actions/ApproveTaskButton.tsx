import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import type { TaskActionProps } from "@/types";

export default function ApproveTaskButton({
  taskId,
  disabled,
  className,
  onSuccess,
}: TaskActionProps & { onSuccess?: () => void }) {
  const handleApprove = () => {
    router.post(
      route("tasks.approve", taskId),
      {},
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          onSuccess?.();
        },
      }
    );
  };

  return (
    <Button
      variant="outline"
      className={cn("bg-[#7D9BF9] hover:bg-[#9c9fe5] text-black", className)}
      onClick={handleApprove}
      disabled={disabled}
    >
      Approve Task
    </Button>
  );
}
