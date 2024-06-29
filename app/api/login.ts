'use server'

import { B2 } from '@/lib/serve/B2'

/**
 * @description 登录
 * @param {string} applicationKeyId
 * @param {string} applicationKey
 * @returns {Promise<any>}
 */
export async function createLogin(formData: { app_id: string, app_secret: string }) {
  const { app_id, app_secret } = formData
  const b2 = new B2().getUploadUrl(app_id, app_secret)
  return b2
}
