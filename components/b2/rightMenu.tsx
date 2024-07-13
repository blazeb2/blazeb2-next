import React from 'react'
import { Icon } from '@iconify/react'
import { DeleteImage } from './deleteImage'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'

import type { FileUploadInfo } from '@/app/api/list'

interface RightMenuProps {
  children: React.ReactNode
  file: FileUploadInfo
  callback?: () => void
}

export function RightMenu(props: RightMenuProps) {
  const { children, file, callback } = props

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            <DeleteImage file={file} callback={callback}>
              <Icon
                className="inline-block cursor-pointer hover:scale-110 align-text-top mr-1"
                icon="ri:delete-bin-6-line"
              />
              Delete
            </DeleteImage>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  )
}
