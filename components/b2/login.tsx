'use client'

import { useEffect } from 'react'
import { createLogin } from '@/app/api/login'

export function Login() {
  useEffect(() => {
    createLogin({ app_id: '', app_secret: '' })
  }, [])
  return (
    <></>
  )
}
