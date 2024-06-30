'use client'

import type { FileUploadInfo } from '@/app/api/list'

interface flexWrapProps {
  file: FileUploadInfo
  previewRef: React.RefObject<{ showImage: (src: string) => void }>
}
export function FlexWrap(props: flexWrapProps) {
  const { file, previewRef } = props
  return (
    <div key={file.fileName} className="sm:w-1/6 p-2 h-40">
      <div className="dark:bg-[#282C2D] bg-[#F4F7FA] m-2 h-full w-full flex justify-center items-center px-1 overflow-hidden">
        <div
          className="h-3/4 overflow-hidden w-full cursor-pointer transition ease-in delay-150 hover:scale-110"
          onClick={() => {
            previewRef.current?.showImage(`https://cloud.ryanuo.cc/${file.fileName}`)
          }}
          style={{
            backgroundImage: `url(https://cloud.ryanuo.cc/${file.fileName})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        </div>
      </div>
    </div>
  )
}
