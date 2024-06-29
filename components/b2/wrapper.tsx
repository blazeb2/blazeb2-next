'use client'

import * as React from 'react'
import type { LucideIcon } from 'lucide-react'
import { Folder, Layout, Workflow } from 'lucide-react'
import { Icon } from '@iconify/react'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import { Tree } from '@/components/ui/tree'
import type { FileUploadInfo } from '@/app/api/list'
import { createList } from '@/app/api/list'
import { useLogin } from '@/lib/hooks/useLogin'

interface FolderTree {
  id: string
  name: string
  icon?: LucideIcon
  folder?: string
  children?: FolderTree[]
}

export function Wrapper() {
  const [content, setContent] = React.useState('Admin Page')

  const { loginInfo } = useLogin()
  const [folder, setFolder] = useState<FolderTree[]>([])

  const formatData = (i: FileUploadInfo) => {
    const len = i.fileName.split('/')
    return {
      id: uuidv4(),
      name: len[len.length - 2],
      folder: i.fileName,
      children: [],
    }
  }

  const updateFolderTree = (currentFolders: FolderTree[], currentId: string | undefined, folderList: any[]): FolderTree[] => {
    return currentFolders.map((folder) => {
      if (folder.id === currentId) {
        const updatedChildren = folderList.map(i => formatData(i))
        return {
          ...folder,
          children: updatedChildren,
        }
      }
      else {
        return {
          ...folder,
          children: updateFolderTree(folder.children || [], currentId, folderList),
        }
      }
    })
  }
  const getFolderTree = (id?: string, prefix: string = '') => {
    createList({
      apiUrl: loginInfo?.apiUrl ?? '',
      bucketId: loginInfo?.bucketId ?? '',
      startFileName: '',
      maxFileCount: 50,
      prefix,
      delimiter: '/',
      initToken: loginInfo?.init_token ?? '',
    }).then((res) => {
      if (res.success) {
        const folderList = res?.data?.files?.filter(item => item.action === 'folder')
        if (folderList) {
          if (folder.length === 0) {
            setFolder(folderList.map(i => formatData(i)))
            return
          }

          const updatedFolders = updateFolderTree(folder, id, folderList)
          setFolder(updatedFolders)
        }
        else {
          // Handle empty folder list scenario
          if (!id) {
            setFolder([])
          }
        }
      }
    })
  }

  useEffect(() => {
    if (loginInfo)
      getFolderTree() // 获取根文件夹列表
  }, [loginInfo])

  return (
    <div className="flex min-h-full space-x-2">
      <aside className="flex-shrink-0 w-[300px] h-full p-2 border-r border-r-[--b2-other-color]">
        <div className="flex items-center justify-between p-2 text-[--b2-text-color-bold]">
          <h4>File Manage</h4>
          <Icon icon="fluent:folder-add-32-regular" className="h-[1.5em] w-[1.5em] cursor-pointer hover:scale-110" />
        </div>
        <Tree
          data={folder}
          className="h-[--aside-height]"
          onSelectChange={(item) => {
            if (item?.children?.length === 0) {
              getFolderTree(item.id, (item as FolderTree).folder)
              setContent(item.name)
            }
          }}
          folderIcon={Folder}
          itemIcon={Workflow}
        />
      </aside>
      <section className="flex-1">{content}</section>
    </div>
  )
}
