import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes safely, resolving conflicts.
 * Usage: cn('px-4 py-2', isActive && 'bg-brand', className)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Format ISO date string to readable Indonesian locale.
 */
export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

/**
 * Copy text to clipboard and return success boolean.
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/**
 * Generate a short unique ID (not crypto-safe, UI only).
 */
export function uid() {
  return Math.random().toString(36).slice(2, 9)
}