'use client'

import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useRef } from 'react'

import { breeSerif } from './fonts'
import { Wrapper } from '@/components/b2/wrapper'
import { Button } from '@/components/ui/button'
import useDark from '@/lib/hooks/useDark'
import { Setting } from '@/components/b2/setting'
import { useLogin } from '@/lib/hooks/useLogin'
import { useMounted } from '@/lib/hooks/useMounted'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ImageLayout } from '@/components/b2/imageLayout'
import { cn } from '@/lib/utils'

function IconWrapper(props: { icon?: string, onClick?: () => void, iconStyle?: string, children?: React.ReactNode }) {
  const { icon, onClick, iconStyle, children } = props
  return (
    <div onClick={onClick} className="cursor-pointer rounded-md px-2 mx-1 py-2 dark:hover:bg-gray-800 h-full inline-flex justify-center items-center">
      {children ? <>{children}</> : <><Icon icon={icon ?? ''} className={iconStyle} /></>}
    </div>
  )
}

export default function Home() {
  const { dark, toggle } = useDark()
  const { loginInfo, layout, getRestTime } = useLogin()
  const { mounted } = useMounted()
  const uploadWrapRef = useRef<{
    show: () => void
    hide: () => void
    toggle: () => void
  }>(null)

  return (
    <>
      <header className="h-14 flex items-center px-2 border-b border-b-[--b2-other-color]">
        <h4 className="w-[300px]">
          <Image width={48} height={40} className="h-8 mx-2 cursor-pointer inline-block" src={`/logo${dark ? '_dark' : ''}.png`} alt="blazeb2 logo imgur" />
          <span className={
            cn(
              'font-normal',
              breeSerif.variable,
              'font-breeSerif',
            )
          }
          >
            Imgur Blazeb2 Next
          </span>
        </h4>
        <div className="flex justify-between items-center flex-auto">
          <ImageLayout />
          <div className="flex justify-between items-center">
            <Button
              onClick={() => {
                uploadWrapRef.current?.toggle()
              }}
              className="dark:bg-accent h-8 text-white dark:hover:bg-accent/80 mr-2"
            >
              <Icon icon="ph:upload-simple-bold" className="mr-1" />
              Upload
            </Button>
            <IconWrapper>
              <Setting />
            </IconWrapper>

            <IconWrapper icon={dark ? 'ph:moon' : 'ph:sun'} iconStyle="w-[1.2em] h-[1.2em]" onClick={toggle} />

            {mounted && loginInfo && (
              <IconWrapper>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger><Icon icon="ri:logout-circle-r-line" onClick={layout} /></TooltipTrigger>
                    <TooltipContent sideOffset={15}>
                      <p>
                        Time until login expires...
                        <br />
                        <span className="text-orange-300">{getRestTime()}</span>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </IconWrapper>
            )}
          </div>
        </div>
      </header>
      <Wrapper uploadWrapRef={uploadWrapRef} />
    </>
  )
}
