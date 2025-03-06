import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow as dateFnsFormatDistanceToNow } from "date-fns"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDistanceToNow(date) {
  return dateFnsFormatDistanceToNow(new Date(date), { addSuffix: true })
}

