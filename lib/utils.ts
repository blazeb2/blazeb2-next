import { type ClassValue, clsx } from 'clsx'

// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
