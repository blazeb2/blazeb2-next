'use client'

import { Icon } from '@iconify/react'
import { Wrapper } from '@/components/b2/wrapper'
import { Button } from '@/components/ui/button'
import useDark from '@/lib/hooks/useDark'

export default function Home() {
  const { dark, toggle } = useDark()
  return (
    <>
      <header className="h-14 flex justify-between items-center px-2 border-b border-b-[--b2-other-color]">
        <div><h4><img className="h-8 mx-2 cursor-pointer" src="/logo_dark.png" alt="blazeb2 logo imgur" /></h4></div>
        <div className="flex justify-between items-center">
          <Button className="bg-accent h-8 text-white hover:bg-accent/80">
            <Icon icon="ph:upload-simple-bold" className="mr-1" />
            Upload
          </Button>
          <button onClick={toggle} className="rounded-md px-2 mx-2 py-2 dark:hover:bg-gray-800 h-full inline-flex justify-center items-center">
            <Icon icon={dark ? 'ph:moon' : 'ph:sun'} className="w-[1.2em] h-[1.2em]" />
          </button>
        </div>
      </header>
      <Wrapper />
    </>
  )
}
