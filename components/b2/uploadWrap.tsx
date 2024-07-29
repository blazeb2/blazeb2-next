'use client'

import { Icon } from '@iconify/react'
import type { Dispatch, SetStateAction } from 'react'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import { useHotkeys } from 'react-hotkeys-hook'

import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useLogin } from '@/lib/hooks/useLogin'
import { useConfigStore } from '@/lib/store/config'
import { useFollowMouse } from '@/lib/hooks/useFollowMouse'

interface UploadResult {
  file: File
  success: boolean
  result?: any
}

interface UploadRes {
  successNum: number
  failNum: number
}
function queue(arr: (() => Promise<UploadResult>)[], setUploadResult?: Dispatch<SetStateAction<UploadRes>>): Promise<void> { // 将返回类型改为 Promise<void>
  let sequence: Promise<void> = Promise.resolve()

  arr.forEach((item) => {
    sequence = sequence.then(() => item?.()).then((res) => {
      setUploadResult?.((state: UploadRes) => {
        const result = {
          ...state,
        }
        if (res.success) {
          result.successNum += 1
        }
        else {
          result.failNum += 1
        }
        return result
      })
    })
  })

  return sequence // 返回 Promise<void>
}

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
  const [uploadResult, setUploadResult] = useState<UploadRes>({
    successNum: 0,
    failNum: 0,
  })
  const [files, setFiles] = useState<FileItem[]>([])
  const { selected } = useConfigStore(state => state)
  const { toast } = useToast()
  const { handleMouseDown, position } = useFollowMouse()

  useHotkeys('esc', () => {
    if (files.length) {
      callback?.()
      setFiles([])
    }
    setIsShow(false)
  }, [files, isShow])

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

    try {
      const res = await (await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      }))?.json()

      if (res?.success) {
        return res.data
      }
      else {
        return null
      }
    }
    catch (error) {
      return null
    }
  }

  useEffect(() => {
    if (files.length === 0 || !isShow)
      return
    const uploadPromises = files.map(file => async () => {
      try {
        const result: any = await handleUpload(file)

        return {
          file,
          success: !!result,
          result, // 根据实际情况保存上传后的数据或信息
        }
      }
      catch (error) {
        // 如果上传失败，返回失败信息
        return {
          file,
          success: false,
          result: null, // 根据具体情况保存失败信息
        }
      }
    })

    queue(uploadPromises, setUploadResult)
  }, [files, isShow])

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

  const handlePaste = (event: any) => {
    const items = event.clipboardData.items
    const uploadWaits = []
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.kind === 'file') {
        const blob = item.getAsFile()
        uploadWaits.push(Object.assign(blob, {
          uid: uuidv4(),
          preview: URL.createObjectURL(blob),
        }))
      }
    }

    if (uploadWaits.length > 0) {
      setIsShow(true)
      setFiles(uploadWaits)
    }
    else {
      toast({
        title: 'No image found.',
        description: 'Please check if there is an image in the clipboard.',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    document.addEventListener('paste', handlePaste)
    return () => {
      document.removeEventListener('paste', handlePaste)
    }
  }, [])

  return isShow && (
    <div
      className={cn(
        'dropzone',
        'border-2 my-1 p-2 w-1/4 h-1/3 rounded-md border-dashed',
        'fixed z-10',
        'fadeIn animated',
        'dark:bg-[#6b6d758f] bg-[#23232391] backdrop-blur-sm',
        'hover:border-black dark:hover:border-accent cursor-pointer',
      )}
      {...getRootProps()}
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <input {...getInputProps()} />
      <div
        onClick={(e) => {
          e.stopPropagation()

          if (files.length) {
            callback?.()
            setFiles([])
            setUploadResult({
              successNum: 0,
              failNum: 0,
            })
          }
          setIsShow(false)
        }}
        className={
          cn(
            'p-2',
            'absolute top-3 right-3 z-20',
            'cursor-pointer hover:scale-110',
            'flex justify-center items-center',
            'text-white',
          )
        }
      >
        <Icon
          icon="hugeicons:drag-drop-horizontal"
          onMouseDown={handleMouseDown}
          onClick={
          (e) => {
            e.stopPropagation()
          }
        }
        />
        <Icon
          icon="rivet-icons:close"
        />
        /ESC
      </div>
      {files?.length > 0 && (
        <div
          className={
                cn(
                  'flex-[2]',
                  'overflow-hidden p-2',
                  'cursor-default',
                )
              }
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className={
                cn(
                  'bg-[#2323239e] border border-[#999]',
                  'm-2 rounded-xl overflow-hidden shadow',
                )
              }
          >
            <div className="p-4 bg-[#333834]">
              <div className="flex justify-between">
                <h3>
                  {`Uploading ${files?.length ?? 0} files`}
                </h3>
                <div
                  className="text-sm cursor-pointer hover:scale-105"
                  onClick={() => {
                    setFiles([])
                    setUploadResult({
                      successNum: 0,
                      failNum: 0,
                    })
                  }}
                >
                  Cancel all
                </div>
              </div>
              <div>
                {`${uploadResult.successNum}/${files.length}`}
                {uploadResult.failNum}
              </div>
            </div>
            <ul className="p-4 max-h-[70vh] overflow-auto scrollbar-thin scrollbar-w-8">
              {files?.map((file) => {
                return (
                  <li
                    key={file.uid}
                    className={
                          cn(
                            'flex',
                            'my-2',
                          )
                        }
                  >
                    <div className="flex-[2] p-2">
                      <img className="w-full" src={file.preview} alt="" />
                    </div>
                    <div className="flex-[5]">{file.name}</div>
                    <div className="flex-1"></div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
})
UploadWrap.displayName = 'UploadWrap'
