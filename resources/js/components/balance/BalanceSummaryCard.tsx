import { Card, CardContent } from "@/components/ui/card"

export default function BalanceSummaryCard({
  income,
  expense,
  total,
}: {
  income: string
  expense: string
  total: string
}) {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
      <CardContent className="p-4 space-y-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold text-black">Total Balance</h2>
        <span>€{total}</span>
      </div>
        <div className="border-t pt-3 space-y-2 text-sm text-gray-700 font-medium">
          <div className="flex justify-between">
            <span>Added to Balance</span>
            <span>€{income}</span>
          </div>
          <div className="flex justify-between">
            <span>Expenses</span>
            <span>€{expense}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
