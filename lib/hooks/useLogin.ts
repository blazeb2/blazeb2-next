import { useLocalStorageState } from 'ahooks'
import { useEffect } from 'react'
import { LocalStoreageEnum } from '@/lib/typings/enum'
import { createLogin } from '@/app/api/login'

interface BackblazeB2Config {
  app_id: string
  app_secret: string
  authorizationToken: string
  bucketId: string
  uploadUrl: string
  init_token: string
  apiUrl: string
  downloadUrl: string
  s3ApiUrl: string
  time: number
}
type Info = BackblazeB2Config | null
export function useLogin() {
  const [loginInfo, setLoginInfo] = useLocalStorageState<Info>(LocalStoreageEnum.info, {
    defaultValue: null,
    listenStorageChange: true,
  })

  const login = async ({ app_id, app_secret }: { app_id: string, app_secret: string }) => {
    const res = await createLogin({ app_id, app_secret })

    setLoginInfo({
      app_id,
      app_secret,
      ...res,
      time: (new Date()).getTime(),
    })
  }

  useEffect(() => {
    if (loginInfo) {
      const { app_id, app_secret, time } = loginInfo
      if (new Date().getTime() - time > 82800 * 1000) {
        login({ app_id, app_secret })
      }
    }
  }, [loginInfo])

  return { loginInfo, login }
}
