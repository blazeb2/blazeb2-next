import { FileFolder } from '@/components/b2/file'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <>
      <header className="h-14 border-b-2 border-b-[--b2-other-color]">
        <Button>Button</Button>
      </header>
      <aside><FileFolder /></aside>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <section>1</section>
      </main>
    </>
  )
}
