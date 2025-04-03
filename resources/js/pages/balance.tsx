import { Head } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import type { BalanceProps } from "@/types"
import BalanceSummaryCard from "@/components/balance/BalanceSummaryCard"
import AddMoneyButton from "@/components/balance/AddMoneyButton"

export default function BalancePage({ income, expense, totalBalance }: BalanceProps) {
  return (
    <AppLayout>
      <Head title="My Balance" />

      <div className="w-full max-w-2xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-semibold font-poppins text-black">My Balance</h1>
        <p className="text-sm text-muted-foreground font-quicksand">Track your spending and funding</p>

        <BalanceSummaryCard income={income} expense={expense} total={totalBalance} />
        <AddMoneyButton />
      </div>
    </AppLayout>
  )
}
