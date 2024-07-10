'use server'

import type { IDeleteFileParams } from '@/lib/serve/B2'
import { B2 } from '@/lib/serve/B2'

export async function createDelete(formData: IDeleteFileParams) {
  const b2 = new B2()
  const res = await b2.deleteFile(formData)
  return {
    success: true,
    data: res,
  }
}
