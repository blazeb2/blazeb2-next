'use client'

import dayjs from 'dayjs'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import type { FileUploadInfo } from '@/app/api/list'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { createDelete } from '@/app/api/delete'
import { useLogin } from '@/lib/hooks/useLogin'
import { useToast } from '@/components/ui/use-toast'

interface ITableWrap {
  files: FileUploadInfo[]
  callback?: () => void
}
export function TableWrap(props: ITableWrap) {
  const { files, callback } = props
  const { loginInfo } = useLogin()
  const { toast } = useToast()

  function formatFileSize(bytes: number) {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
    }
    else if (bytes >= 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`
    }
    else {
      return `${bytes} bytes`
    }
  }

  const handleDeleteFile = async (file: FileUploadInfo) => {
    if (!loginInfo)
      return
    const { init_token, apiUrl } = loginInfo
    const res = await createDelete({
      fileName: file.fileName,
      fileId: file.fileId as string,
      init_token,
      apiUrl,
    })

    if (res.success) {
      callback?.()
      toast({
        title: 'Delete Success',
      })
    }
  }

  return (
    <Table>
      <TableCaption>A list of your image.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>FileName</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>UploadTime</TableHead>
          <TableHead className="text-right">Option</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map(file => (
          <TableRow key={file.fileName}>
            <TableCell className="font-medium w-fit">{file.fileName}</TableCell>
            <TableCell>{file.contentType}</TableCell>
            <TableCell>{formatFileSize(Number(file.contentLength))}</TableCell>
            <TableCell>{dayjs(file.uploadTimestamp).format('YYYY-MM-DD HH:mm:ss').toString()}</TableCell>
            <TableCell className="text-center">
              <Popover>
                <PopoverTrigger>
                  <Icon
                    className="inline-block cursor-pointer hover:scale-110"
                    icon="ri:delete-bin-6-line"
                  />
                </PopoverTrigger>
                <PopoverContent className="w-auto">
                  <div className="mb-1">确认删除？</div>
                  <Button
                    size="sm"
                    className="mr-1 h-6"
                    onClick={() => {
                      handleDeleteFile(file)
                    }}
                  >
                    <PopoverPrimitive.Close>
                      确认
                    </PopoverPrimitive.Close>
                  </Button>
                  <PopoverPrimitive.Close>
                    <Button size="sm" className="h-6">取消</Button>
                  </PopoverPrimitive.Close>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
