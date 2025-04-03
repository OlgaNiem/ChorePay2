export default function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between gap-4 text-sm text-gray-700 font-medium">
      <span>{label}:</span>
      <span className="whitespace-nowrap">{value}</span>
    </div>
  );
}
