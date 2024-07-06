import * as crypto from 'node:crypto'
import { Buffer } from 'node:buffer'
import { v4 as uuidv4 } from 'uuid'

interface StorageConfig {
  absoluteMinimumPartSize: number
  accountId: string
  allowed: {
    bucketId: string
    bucketName: string
    capabilities: string[]
    namePrefix: null | string
  }
  apiUrl: string
  authorizationToken: string
  downloadUrl: string
  recommendedPartSize: number
  s3ApiUrl: string
}

export interface ListParamsProps {
  apiUrl: string
  bucketId: string
  startFileName: string
  maxFileCount: number
  prefix: string
  delimiter: string
  initToken: string
}

export interface UploadParamsProps {
  uploadUrl: string
  authorizationToken: string
  fileData: Buffer
  toFile: string
  format: string
}

export class B2 {
  private applicationKeyId: string
  private applicationKey: string

  constructor() {
    this.applicationKeyId = 'applicationKeyId'
    this.applicationKey = 'applicationKey'
  }

  private async main(): Promise<StorageConfig> {
    const idAndKey = `${this.applicationKeyId}:${this.applicationKey}`
    const encoded = Buffer.from(idAndKey, 'utf8').toString('base64')
    const basicAuthString = `Basic ${encoded}`

    const url = 'https://api.backblazeb2.com/b2api/v2/b2_authorize_account'
    const response = await fetch(url, { headers: { Authorization: basicAuthString } })
    return await response.json()
  }

  public async getUploadUrl(applicationKeyId: string, applicationKey: string): Promise<any> {
    this.applicationKeyId = applicationKeyId
    this.applicationKey = applicationKey
    const data = await this.main()

    const bucketId = data?.allowed?.bucketId ?? ''
    const authorizationToken = data?.authorizationToken ?? ''
    const apiUrl = data?.apiUrl ?? ''
    const url = `${apiUrl}/b2api/v2/b2_get_upload_url`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': authorizationToken || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bucketId }),
    })

    const responseData = await response.json()

    return {
      ...responseData,
      init_token: authorizationToken,
      apiUrl,
      downloadUrl: data?.downloadUrl,
      s3ApiUrl: data?.s3ApiUrl,
    }
  }

  public async uploadSource(params: UploadParamsProps): Promise<any> {
    const { uploadUrl, authorizationToken, fileData, toFile, format } = params
    const b2FileName = `${toFile}${uuidv4()}.${format}`
    const contentType = 'b2/x-auto'
    const sha1OfFileData = crypto.createHash('sha1').update(fileData).digest('hex')

    const headers = {
      'Authorization': authorizationToken,
      'X-Bz-File-Name': b2FileName,
      'Content-Type': contentType,
      'X-Bz-Content-Sha1': sha1OfFileData,
      'X-Bz-Info-Author': 'unknown',
      'X-Bz-Server-Side-Encryption': 'AES256',
    }

    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers,
      body: fileData,
    })

    return await response.json()
  }

  public async queryList(params: ListParamsProps): Promise<any> {
    const { apiUrl, bucketId, initToken, startFileName, maxFileCount, prefix, delimiter } = params
    if (!startFileName)
      params.startFileName = ''
    if (!maxFileCount)
      params.maxFileCount = 10
    if (!prefix)
      params.prefix = ''
    if (!delimiter)
      params.delimiter = ''

    const url = `${apiUrl}/b2api/v2/b2_list_file_names`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': initToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startFileName,
        maxFileCount,
        prefix,
        delimiter,
        bucketId,
      }),
    })

    return await response.json()
  }
}
