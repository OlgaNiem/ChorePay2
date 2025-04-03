import { useState } from "react"
import { Button } from "@/components/ui/button"
import { router } from "@inertiajs/react"
import { cn } from "@/lib/utils"
import type { TaskActionProps } from "@/types"
import ConfirmPayment from "./ConfirmPayment"


export default function PayRewardButton({
  taskId,
  disabled,
  className,
  onSuccess,
}: TaskActionProps & { onSuccess?: () => void }) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleConfirm = () => {
    router.post(route("tasks.pay", taskId), {}, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        setConfirmOpen(false)
        onSuccess?.()
      },
    })
  }

  return (
    <>
      <Button
        variant="outline"
        className={cn("bg-[#ffd500] hover:bg-[#e6c200] text-black", className)}
        onClick={() => setConfirmOpen(true)}
        disabled={disabled}
      >
        Pay Reward
      </Button>

      <ConfirmPayment
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm Payment"
        description="Do you want to proceed with the payment?"
      />
    </>
  )
}
