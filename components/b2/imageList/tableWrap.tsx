'use client'

import dayjs from 'dayjs'
import { Icon } from '@iconify/react'
import { DeleteImage } from '../deleteImage'
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

interface ITableWrap {
  files: FileUploadInfo[]
  callback?: () => void
}
export function TableWrap(props: ITableWrap) {
  const { files, callback } = props

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
              <DeleteImage file={file} callback={callback} isPopover>
                <Icon
                  className="inline-block cursor-pointer hover:scale-110"
                  icon="ri:delete-bin-6-line"
                />
              </DeleteImage>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
