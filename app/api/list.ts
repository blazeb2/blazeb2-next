'use server'

import type { ListParamsProps } from '@/lib/serve/B2'
import { B2 } from '@/lib/serve/B2'

export interface FileUploadInfo {
  accountId: string
  action: string
  bucketId: string
  contentLength: number
  contentMd5: string | null
  contentSha1: string | null
  contentType: string | null
  fileId: string | null
  fileInfo: Record<string, any> // fileInfo 是一个空对象，可以用 Record<string, any> 表示任意键值对的对象
  fileName: string
  uploadTimestamp: number
}

interface FileResponse {
  files: FileUploadInfo[]
  nextFileName: string | null
}

export async function createList(formData: ListParamsProps) {
  try {
    const b2 = await new B2().queryList(formData) as FileResponse
    return {
      success: true,
      data: b2,
    }
  }
  catch (error) {
    return {
      error: 'data get error',
      success: false,
    }
  }
}
