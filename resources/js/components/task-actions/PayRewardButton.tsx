import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import type { TaskActionProps } from "@/types";

export default function PayRewardButton({
  taskId,
  disabled,
  className,
  onSuccess, 
}: TaskActionProps & { onSuccess?: () => void }) {
  const handlePay = () => {
    router.post(route("tasks.pay", taskId), {}, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return (
    <Button
      variant="outline"
      className={cn("bg-[#ffd500] hover:bg-[#e6c200] text-black", className)}
      onClick={handlePay}
      disabled={disabled}
    >
      Pay Reward
    </Button>
  );
}
