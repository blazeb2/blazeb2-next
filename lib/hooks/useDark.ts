import { useEffect } from 'react'
import { useConfigStore } from '../store/config'

export default function useDark() {
  const { theme, setTheme } = useConfigStore(state => state)

  useEffect(() => {
    const bodyClassList = document.documentElement.classList
    if (theme === 'dark') {
      bodyClassList.add('dark')
    }
    else {
      bodyClassList.remove('dark')
    }
  }, [theme])

  const toggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  return {
    dark: theme === 'dark',
    toggle,
  }
}
