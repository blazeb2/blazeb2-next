import { useToggle } from 'ahooks'
import { useEffect } from 'react'

export default function useDark() {
  const [state, { toggle }] = useToggle('dark', 'light')

  useEffect(() => {
    if (state === 'dark') {
      document.documentElement.classList.add('dark')
    }
    if (state === 'light') {
      document.documentElement.classList.remove('dark')
    }
  }, [state])
  return {
    dark: state === 'dark',
    toggle,
  }
}
