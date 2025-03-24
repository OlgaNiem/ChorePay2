export const PRIORITIES = ["high", "medium", "low"] as const;

export type Priority = typeof PRIORITIES[number];

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export function getPriorityLabel(priority: Priority): string {
  return PRIORITY_LABELS[priority] ?? "Unknown Priority";
}
