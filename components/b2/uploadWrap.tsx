'use client'

import { Icon } from '@iconify/react'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

export const UploadWrap = forwardRef((props, ref) => {
  const [isShow, setIsShow] = useState(false)

  useImperativeHandle(ref, () => ({
    show() {
      setIsShow(true)
    },
    hide() {
      setIsShow(false)
    },
    toggle() {
      setIsShow(!isShow)
    },
  }))

  useEffect(() => {
    const sectionB2 = document.querySelector('#section-b2') as HTMLElement | null

    if (sectionB2) {
      if (isShow) {
        sectionB2.style.overflow = 'hidden'
        sectionB2.style.marginRight = '0.625rem'
      }
      else {
        sectionB2.style.overflow = 'auto'
        sectionB2.style.marginRight = '0px'
      }
    }
  }, [isShow])
  return isShow && (
    <div
      onClick={() => {
        // console.log(1)
      }}
      className="border-2 my-1 p-2 w-full h-full z-10 rounded-md border-dashed absolute top-2 left-0 dark:bg-[#6b6d758f] bg-[#23232391]"
    >
      <Icon
        onClick={(e) => {
          e.stopPropagation()
          setIsShow(false)
        }}
        className="absolute top-3 right-3 z-11 cursor-pointer hover:scale-110"
        icon="rivet-icons:close"
      />
      <div className="absolute bottom-32 w-full flex items-center justify-center">
        <div className="bg-slate-50 flex justify-center items-center p-5 flex-col rounded-md">
          <Icon icon="icon-park-outline:upload-two" className="text-2xl" />
          <p className="text-center font-bold">Just,drag and drop</p>
          <p className="text-xs">Drop any jpg, png, gif, or...</p>
        </div>
      </div>
    </div>
  )
})
UploadWrap.displayName = 'UploadWrap'
