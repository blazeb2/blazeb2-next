'use client'

import { Icon } from '@iconify/react'
import { Wrapper } from '@/components/b2/wrapper'
import { Button } from '@/components/ui/button'
import useDark from '@/lib/hooks/useDark'
import { Login } from '@/components/b2/login'
import { Setting } from '@/components/b2/setting'

export default function Home() {
  const { dark, toggle } = useDark()
  return (
    <>
      <header className="h-14 flex justify-between items-center px-2 border-b border-b-[--b2-other-color]">
        <h4><img className="h-8 mx-2 cursor-pointer" src={`/logo${dark ? '_dark' : ''}.png`} alt="blazeb2 logo imgur" /></h4>
        <div className="flex justify-between items-center">
          <Button className="dark:bg-accent h-8 text-white dark:hover:bg-accent/80 mr-2">
            <Icon icon="ph:upload-simple-bold" className="mr-1" />
            Upload
          </Button>

          <div className="rounded-md px-1 mx-1 py-2 dark:hover:bg-gray-800 h-full inline-flex justify-center items-center">
            <Setting />
          </div>

          <button onClick={toggle} className="rounded-md px-1 mx-1 py-2 dark:hover:bg-gray-800 h-full inline-flex justify-center items-center">
            <Icon icon={dark ? 'ph:moon' : 'ph:sun'} className="w-[1.2em] h-[1.2em]" />
          </button>
          <Login />
        </div>
      </header>
      <Wrapper />
    </>
  )
}
