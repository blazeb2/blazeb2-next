import { useRef } from 'react'
import { ImagePreview } from '../imagePreview'
import { FlexWrap } from './flexWrap'
import type { FileUploadInfo } from '@/app/api/list'

interface ImageListProps {
  data: FileUploadInfo[]
}
export function ImageList(props: ImageListProps) {
  const { data } = props
  const previewRef = useRef<{ showImage: (src: string) => void }>(null)

  return (
    <>
      <div className="flex flex-wrap">
        {data?.map((item) => {
          return (
            <FlexWrap file={item} key={item.fileName} previewRef={previewRef} />
          )
        })}
      </div>
      <ImagePreview ref={previewRef} />
    </>
  )
}
