import { Icon } from '@iconify/react'
import { Wrapper } from '@/components/b2/wrapper'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <>
      <header className="h-14 flex justify-between items-center px-2 border-b border-b-[--b2-other-color]">
        <div>1</div>
        <Button className="bg-accent text-white hover:bg-accent/80">
          <Icon icon="ph:upload-simple-bold" className="mr-1" />
          Upload
        </Button>
      </header>
      <Wrapper />
    </>
  )
}
