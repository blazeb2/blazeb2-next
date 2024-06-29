import { useLocalStorageState } from 'ahooks'
import { useEffect, useMemo } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { LocalStoreageEnum } from '@/lib/typings/enum'
import { createLogin } from '@/app/api/login'
// 导入 duration 插件
dayjs.extend(duration) // 使用 duration 插件

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

  const layout = () => {
    setLoginInfo(null)
  }

  const restTime = useMemo(() => {
    if (!loginInfo) {
      return 'Login info not available'
    }

    const currentTime = dayjs()
    const loginTime = dayjs(loginInfo.time)

    const remainingTimeMs = 82800 * 1000 - (Number(currentTime) - Number(loginTime))

    const remainingDuration = dayjs.duration(remainingTimeMs)

    const hours = remainingDuration.hours() ?? '0'
    const minutes = remainingDuration.minutes() ?? '0'

    // 返回格式化后的剩余时间字符串
    return `${hours}hour${minutes}min`
  }, [loginInfo])

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

  return { loginInfo, login, layout, restTime }
}
