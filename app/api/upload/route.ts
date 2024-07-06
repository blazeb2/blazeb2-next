'use server'

import buf from 'node:buffer'
import type { UploadParamsProps } from '@/lib/serve/B2'
import { B2 } from '@/lib/serve/B2'

export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData()

  const file = formData.getAll('files')[0] as File
  const info = formData.get('info') as string
  const { uploadUrl, authorizationToken, toFile } = JSON.parse(info) as UploadParamsProps
  const b2 = await new B2()
    .uploadSource({
      fileData: buf.Buffer.from(await file.arrayBuffer()),
      format: '.png',
      toFile,
      uploadUrl,
      authorizationToken,
    })

  return Response.json({
    success: true,
    data: b2,
  })
}
