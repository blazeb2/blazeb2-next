'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Online() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.1rem" height="1.1rem" viewBox="0 0 24 24"><path fill="currentColor" d="M13.82 14H9.66c-.1-.66-.16-1.32-.16-2s.06-1.35.16-2h4.68c.09.65.16 1.32.16 2c0 .5-.04 1-.1 1.46c.6-.5 1.32-.89 2.1-1.14V12c0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2v.18c.7.17 1.35.45 1.95.82c.05-.32.05-.66.05-1c0-5.5-4.5-10-10-10C6.47 2 2 6.5 2 12s4.5 10 10 10c.34 0 .68 0 1-.05c-.41-.66-.71-1.4-.87-2.2c-.04.07-.08.14-.13.21c-.83-1.2-1.5-2.53-1.91-3.96h2.41c.31-.75.76-1.42 1.32-2m5.1-6h-2.95a15.7 15.7 0 0 0-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2zm.82 2H8c.35 1.25.8 2.45 1.4 3.56A8 8 0 0 1 5.08 16M8 8H5.08A7.92 7.92 0 0 1 9.4 4.44C8.8 5.55 8.35 6.75 8 8m12.83 7.67L22 14.5v4h-4l1.77-1.77A2.5 2.5 0 1 0 20 20h1.71A3.99 3.99 0 0 1 18 22.5c-2.21 0-4-1.79-4-4s1.79-4 4-4c1.11 0 2.11.45 2.83 1.17" /></svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href="https://blazeb2.ryanuo.cc/" target="_blank">
            New Online
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="https://blazeb2.js.org/" target="_blank">
            Old Online
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
