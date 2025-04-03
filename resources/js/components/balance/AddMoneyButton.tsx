import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function AddMoneyButton() {
  return (
    <div className="flex justify-center">
      <Button className="bg-[#ffd500] text-black hover:bg-[#e6c200] flex items-center gap-2">
        <Plus className="w-5 h-5" />
        Add money
      </Button>
    </div>
  )
}
