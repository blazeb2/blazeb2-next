'use client'

import { useRef } from 'react'
import { ImagePreview } from '../imagePreview'
import { FlexWrap } from './flexWrap'
import { TableWrap } from './tableWrap'
import { MasonryWrap } from './masonryWrap'
import type { FileUploadInfo } from '@/app/api/list'
import { useConfigStore } from '@/lib/store/config'

interface ImageListProps {
  data: FileUploadInfo[]
  callback: () => void
}
export function ImageList(props: ImageListProps) {
  const { data, callback } = props
  const previewRef = useRef<{ showImage: (src: string) => void }>(null)
  const { imgLayout } = useConfigStore(state => state)

  const renderImage = (files: FileUploadInfo[]) => {
    switch (imgLayout) {
      case 'grid':
        return files.map(file => <FlexWrap file={file} key={file.fileName} previewRef={previewRef} />)
      case 'table':
        return <TableWrap files={files} callback={callback} />
      case 'masonry':
        return <MasonryWrap files={files} />
      default:
        return <></>
    }
  }

  return (
    <>
      <div className="flex flex-wrap relative max-h-[90vh]">
        {renderImage(data)}
      </div>
      <ImagePreview ref={previewRef} />
    </>
  )
}
