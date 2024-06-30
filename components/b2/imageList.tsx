import type { FileUploadInfo } from '@/app/api/list'

interface ImageListProps {
  data: FileUploadInfo[]
}

export function ImageList(props: ImageListProps) {
  const { data } = props
  return (
    <div className="flex flex-wrap">
      {
        data?.map((item) => {
          return (
            <div key={item.fileName} className="sm:w-1/6 p-2 h-40">
              <div className="dark:bg-[#282C2D] bg-[#F4F7FA] m-2 h-full w-full flex justify-center items-center px-1 overflow-hidden">
                <div
                  className="h-3/4 overflow-hidden w-full cursor-pointer transition ease-in delay-150 hover:scale-110 "
                  style={{
                    backgroundImage: `url(https://cloud.ryanuo.cc/${`${item.fileName}`})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
