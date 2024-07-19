import { MoveUpRightIcon, TerminalIcon } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { page_routes } from '@/lib/routes-config'

export default function Home() {
  return (
    <div className="flex sm:min-h-[91vh] min-h-[88vh] flex-col items-center justify-center text-center px-2 py-8">
      <Link
        href="https://github.com/blazeb2/blazeb2-next"
        target="_blank"
        className="mb-5 sm:text-lg flex items-center gap-2 underline underline-offset-4"
      >
        Follow along on GitHub
        {' '}
        <MoveUpRightIcon className="w-4 h-4 font-extrabold" />
      </Link>
      <h1 className="text-3xl font-bold mb-4 sm:text-7xl">
        Image hosting tool based on Backblaze B2 and Cloudflare
      </h1>
      <p className="mb-8 sm:text-xl max-w-[800px] text-muted-foreground">
        Simple to operate, free to use, supports one-click deployment (Netlify, Vercel, Heroku, Docker).
      </p>
      <div className="flex flex-row items-center gap-5">
        <Link
          href={`/docs/${page_routes[0].href}`}
          className={buttonVariants({ className: 'px-6', size: 'lg' })}
        >
          Get Stared
        </Link>
      </div>
      <span className="flex flex-row items-center gap-2 text-zinc-400 text-md mt-7 -mb-12 max-[800px]:mb-12">
        <TerminalIcon className="w-4 h-4 mr-1" />
        {' '}
        ~ git clone https://github.com/blazeb2/blazeb2-next.git
      </span>
    </div>
  )
}
