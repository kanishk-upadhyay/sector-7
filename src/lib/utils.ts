import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes.
 * Combines `clsx` for conditional class joining and `tailwind-merge` 
 * to handle conflicts (e.g. `bg-red-500` vs `bg-blue-500`).
 * 
 * @param inputs - Class names, objects, or arrays of classes.
 * @returns A merged, deduplicated class string.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
