import * as PopoverPrimitive from '@radix-ui/react-popover'

import { Icon } from '@iconify/react/dist/iconify.js'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { createDelete } from '@/app/api/delete'
import { useLogin } from '@/lib/hooks/useLogin'
import { useToast } from '@/components/ui/use-toast'
import type { FileUploadInfo } from '@/app/api/list'

interface IDeleteImageProps {
  file: FileUploadInfo
  callback?: () => void
  children: React.ReactNode
  isPopover?: boolean
}
export function DeleteImage(props: IDeleteImageProps) {
  const { file, callback, children, isPopover } = props
  const { loginInfo } = useLogin()
  const { toast } = useToast()

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
        title: (
          <div>
            <Icon className="text-green-700 align-text-top inline-block mr-1" icon="streamline:interface-validation-check-check-form-validation-checkmark-success-add-addition" />
            Delete Success
          </div>
        ) as any,
      })
    }
  }

  return (
    <>
      {
        isPopover
          ? (
            <Popover>
              <PopoverTrigger>
                {children}
              </PopoverTrigger>
              <PopoverContent
                className="w-auto"
              >
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
            )
          : (
            <div
              className="cursor-pointer"
              onClick={() => handleDeleteFile(file)}
            >
              {children}
            </div>
            )
      }
    </>
  )
}
