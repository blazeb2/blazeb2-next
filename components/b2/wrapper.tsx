'use client'

import * as React from 'react'
import { Folder, Workflow } from 'lucide-react'
import { Icon } from '@iconify/react'
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from 'react'

import { ImageList } from './imageList'
import { UploadWrap } from './uploadWrap'
import { Loading } from './loading'
import { CreateFolderModal } from './createFolderModal'
import { Tree } from '@/components/ui/tree'
import type { FileUploadInfo } from '@/app/api/list'
import { createList } from '@/app/api/list'
import { useLogin } from '@/lib/hooks/useLogin'
import type { FolderTree } from '@/lib/store/config'
import { useConfigStore } from '@/lib/store/config'

interface IWrapper {
  uploadWrapRef: React.RefObject<{
    show: () => void
    hide: () => void
  }>
}
export function Wrapper(props: IWrapper) {
  const [imageList, setImageList] = React.useState<FileUploadInfo[]>([])
  const { uploadWrapRef } = props
  const { selected, setSelected, folder, setFolder } = useConfigStore(state => state)
  const [isLoading, setIsLoading] = React.useState(false)

  const { loginInfo } = useLogin()

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
  const getFolderTree = (loginInfo: any, id?: string, prefix: string = '') => {
    setIsLoading(true)
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
        const imgs = res?.data?.files?.filter(item => item.action === 'upload') || []
        setImageList(imgs)
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
    }).finally(() => {
      setIsLoading(false)
    })
  }

  useEffect(() => {
    const f = JSON.parse(localStorage.getItem('b2-config-storage') || '{}')?.state?.folder || []
    if (loginInfo && f?.length === 0) {
      getFolderTree(loginInfo) // 获取根文件夹列表
    }

    if (loginInfo && selected?.id) {
      getFolderTree(loginInfo, selected.id, selected.folder)
    }
  }, [loginInfo, selected])

  const resetResquest = () => {
    getFolderTree(loginInfo, selected.id, selected.folder)
  }

  return (
    <div className="flex min-h-full space-x-2 relative">
      <aside className="flex-shrink-0 w-[300px] h-full p-2 border-r border-r-[--b2-other-color]">
        <div className="flex items-center justify-between p-2 text-[--b2-text-color-bold]">
          <h4>File Manage</h4>
          <div className="flex gap-2">
            <Icon
              icon="solar:refresh-bold-duotone"
              className="h-[1.5em] w-[1.5em] cursor-pointer hover:scale-110"
              onClick={() => {
                if (!loginInfo)
                  return
                setFolder([])
                getFolderTree(loginInfo)
                setSelected({
                  folder: '',
                  id: '',
                })
              }}
            />
            <CreateFolderModal />
          </div>
        </div>
        <Tree
          initialSlelectedItemId={selected?.id}
          data={folder}
          className="h-[--aside-height]"
          onSelectChange={(item) => {
            setSelected({
              folder: (item as FolderTree).folder as string,
              id: (item as FolderTree).id,
            })
          }}
          folderIcon={Folder}
          itemIcon={Workflow}
        />
      </aside>
      <section id="section-b2" className="flex-1 overflow-y-auto min-h-[max-content] scrollbar-thin scrollbar-w-8 p-2 relative">
        <UploadWrap
          ref={uploadWrapRef}
          callback={resetResquest}
        />
        <ImageList data={imageList} callback={resetResquest} />
      </section>
      <Loading isShow={isLoading} />
    </div>
  )
}
