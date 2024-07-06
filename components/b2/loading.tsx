import { Icon } from '@iconify/react'
import { cn } from '@/lib/utils'

interface LoadingProps {
  className?: string
  isShow: boolean
}

export function Loading(props: LoadingProps) {
  const { className, isShow } = props
  return (
    isShow
    && (
      <div className={
      cn(
        'fadeIn animated',
        'w-[99vw] h-[95vh]',
        'absolute top-0 left-0',
        'flex justify-center items-center',
        'bg-[#000000a1] dark:bg-[#676767ab] backdrop-blur-sm rounded-sm',
        className,
      )
    }
      >
        <div className="flex items-center dark:bg-white bg-primary px-4 py-2 rounded-md">
          <Icon
            width="1.5rem"
            className={
        cn(
          'dark:text-black text-white',
          'inline-block',
        )
      }
            icon="eos-icons:bubble-loading"
          />
          <span className="text-white dark:text-black text-sm ml-4">loading...</span>
        </div>
      </div>
    )
  )
}
