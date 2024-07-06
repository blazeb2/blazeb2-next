'use client'

import { Icon } from '@iconify/react'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'

import { cn } from '@/lib/utils'
import { useLogin } from '@/lib/hooks/useLogin'
import { useConfigStore } from '@/lib/store/config'

interface FileItem extends File {
  uid: string
  preview?: string
}
interface UploadWrapProps {
  className?: string
  callback?: () => void
}
export const UploadWrap = forwardRef((props: UploadWrapProps, ref) => {
  const { callback } = props
  const { loginInfo } = useLogin()
  const [isShow, setIsShow] = useState(false)
  const [files, setFiles] = useState<FileItem[]>([])
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
          callback?.()
          setFiles([])
          setIsShow(false)
        }}
        className={
          cn(
            'p-2',
            'absolute top-3 right-3 z-20',
            'cursor-pointer hover:scale-110',
            'flex justify-center items-center',
          )
        }
      >
        <Icon
          icon="rivet-icons:close"
        />
      </div>
      <div className={
        cn(
          'absolute w-full text-white z-10',
          'flex items-center justify-center',
          files.length > 0 ? 'h-screen' : 'bottom-48',
        )
      }
      >
        <div className="flex-1 flex justify-center gap-1 items-center flex-col">
          <div className={
          cn(
            'rounded-full dark:bg-accent bg-primary hover:scale-110 cursor-pointer px-12 py-2',
            'flex justify-center gap-1 items-center flex-col',
          )
        }
          >
            <Icon icon="icon-park-outline:upload-two" className="text-2xl" />
            <p className="text-center font-bold">Click to Upload or Drag and drop</p>
            <p className="text-xs">Drop any jpg, png, gif, or...</p>
          </div>
        </div>
        {
          files?.length > 0 && (
            <ul className="flex-[2]">
              {files?.map(file => <li key={file.uid}>{file.name}</li>)}
            </ul>
          )
        }
      </div>
    </div>
  )
})
UploadWrap.displayName = 'UploadWrap'
