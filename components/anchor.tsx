'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type AnchorProps = ComponentProps<typeof Link> & {
  absolute?: boolean
  activeClassName?: string
  disabled?: boolean
}

export default function Anchor({
  absolute,
  className = '',
  activeClassName = '',
  disabled,
  children,
  ...props
}: AnchorProps) {
  const path = usePathname()
  const isMatch = absolute
    ? props.href.toString().split('/')[1] === path.split('/')[1]
    : path === props.href

  if (disabled) {
    return (
      <div className={cn(className, 'cursor-not-allowed')}>{children}</div>
    )
  }
  return (
    <Link className={cn(className, isMatch && activeClassName)} {...props}>
      {children}
    </Link>
  )
}
