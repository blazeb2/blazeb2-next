import { GithubIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { buttonVariants } from './ui/button'
import Search from './search'
import Anchor from './anchor'
import { SheetLeftbar } from './leftbar'
import { Online } from './online'
import { ModeToggle } from '@/components/theme-toggle'
import { page_routes } from '@/lib/routes-config'
import { SheetClose } from '@/components/ui/sheet'

export const NAVLINKS = [
  {
    title: 'Guides',
    href: `/docs/${page_routes[0].href}`,
  },
  {
    title: 'Blog',
    href: 'https://ryanuo.cc/posts/rewrite-blazeb2',
  },
  {
    title: 'Issues',
    href: 'https://github.com/blazeb2/blazeb2-next/issues',
  },
]

export function Navbar() {
  return (
    <nav className="w-full border-b h-16 sticky top-0 z-50 lg:px-4 px-2 backdrop-filter backdrop-blur-xl bg-opacity-5">
      <div className="sm:p-3 p-2 max-w-[1530px] mx-auto h-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-5">
          <SheetLeftbar />
          <div className="flex items-center gap-8">
            <div className="sm:flex hidden">
              <Logo />
            </div>
            <div className="lg:flex hidden items-center gap-5 text-sm font-medium text-muted-foreground">
              <NavMenu />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Search />
            <div className="flex">
              <Online />
              <Link
                href="https://github.com/blazeb2/blazeb2-next"
                className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              >
                <GithubIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <Image src="/logo.png" alt="logo" width={40} height={40} />
      <h2 className="text-md font-bold">Blazeb2-next/docs</h2>
    </Link>
  )
}

export function NavMenu({ isSheet = false }) {
  return (
    <>
      {NAVLINKS.map((item) => {
        const Comp = (
          <Anchor
            key={item.title + item.href}
            activeClassName="text-black dark:text-white font-semibold"
            absolute
            target={item.href.startsWith('http') ? '_blank' : undefined}
            href={item.href}
          >
            {item.title}
          </Anchor>
        )
        return isSheet
          ? (
            <SheetClose key={item.title + item.href} asChild>
              {Comp}
            </SheetClose>
            )
          : (
              Comp
            )
      })}
    </>
  )
}
