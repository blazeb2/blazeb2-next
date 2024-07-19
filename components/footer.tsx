import Link from 'next/link'
import { HeartIcon, TriangleIcon } from 'lucide-react'
import Image from 'next/image'
import { buttonVariants } from './ui/button'

export function Footer() {
  return (
    <footer className="border-t w-full h-16">
      <div className="container flex items-center sm:justify-between justify-center sm:gap-0 gap-4 h-full text-muted-foreground text-sm flex-wrap sm:py-0 py-3">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <p className="text-center">
            Build by
            {' '}
            <Link
              className="px-1 underline underline-offset-2"
              href="https://github.com/ryanuo"
            >
              ryanuo
            </Link>
            . The source code is available on
            {' '}
            <Link
              className="px-1 underline underline-offset-2"
              href="https://github.com/blazeb2/blazeb2-next"
            >
              GitHub
            </Link>
            .
          </p>
        </div>

        <div className="gap-4 items-center hidden md:flex">
          <FooterButtons />
        </div>
      </div>
    </footer>
  )
}

export function FooterButtons() {
  return (
    <>
      <Link
        href="https://vercel.com/templates/next.js/documentation-template"
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
      >
        <TriangleIcon className="h-[0.8rem] w-4 mr-2 text-primary fill-current" />
        Deploy
      </Link>
      <Link
        href="https://github.com/sponsors/ryanuo"
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
      >
        <HeartIcon className="h-4 w-4 mr-2 text-red-600 fill-current" />
        Sponsor
      </Link>
    </>
  )
}
