'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import AuthRedirect from '@/components/AuthRedirect'

export default function AuthGuard({ children }) {
  const router = useRouter()
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.replace('/esse-panel/login')
    } else {
      setIsVerified(true)
    }
  }, [router])

  if (!isVerified) {
    return <AuthRedirect />
  }

  return <>{children}</>
}
