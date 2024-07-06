'use client'

import { Icon } from '@iconify/react'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'

import { cn } from '@/lib/utils'
import { useLogin } from '@/lib/hooks/useLogin'
import { useConfigStore } from '@/lib/store/config'

export const UploadWrap = forwardRef((props, ref) => {
  const { loginInfo } = useLogin()
  const [isShow, setIsShow] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const { selected } = useConfigStore(state => state)

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop(acceptedFiles) {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        uid: uuidv4(),
        preview: URL.createObjectURL(file),
      })))
    },
  })

  const handleUpload = async (f: string | Blob) => {
    if (!loginInfo) {
      return
    }
    const formData = new FormData()
    formData.append('files', f)
    formData.append('info', JSON.stringify({ ...loginInfo, toFile: selected?.folder ?? '' }))
    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
  }

  useEffect(() => {
    if (!files.length) {
      return
    }
    handleUpload(files[0])
  }, [files])

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
      className={cn(
        'dropzone',
        'border-2 my-1 p-2 w-full h-[97%] rounded-md border-dashed',
        'absolute top-2 left-0 z-10',
        'fadeIn animated',
        'dark:bg-[#6b6d758f] bg-[#23232391] backdrop-blur-sm',
        'hover:border-black dark:hover:border-accent cursor-pointer',
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div
        onClick={(e) => {
          e.stopPropagation()
          setIsShow(false)
        }}
        className={
          cn(
            'p-2',
            'absolute top-3 right-3 z-11',
            'cursor-pointer hover:scale-110',
            'flex justify-center items-center',
          )
        }
      >
        <Icon
          icon="rivet-icons:close"
        />
      </div>
      <div className="absolute bottom-48 w-full flex items-center justify-center text-white">
        <div className="rounded-full dark:bg-accent bg-primary flex justify-center gap-1 hover:scale-110 cursor-pointer items-center px-12 py-2 flex-col">
          <Icon icon="icon-park-outline:upload-two" className="text-2xl" />
          <p className="text-center font-bold">Click to Upload or Drag and drop</p>
          <p className="text-xs">Drop any jpg, png, gif, or...</p>
        </div>
      </div>
    </div>
  )
})
UploadWrap.displayName = 'UploadWrap'
