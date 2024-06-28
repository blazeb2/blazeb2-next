import { Wrapper } from '@/components/b2/wrapper'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <>
      <header className="h-14 border-b border-b-[--b2-other-color]">
        <Button>Button</Button>
      </header>
      <Wrapper />
    </>
  )
}
