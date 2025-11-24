'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

export default function EssePanelIndexPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.replace('/esse-panel/login')

      return
    }

    router.replace('/esse-panel/dashboard')
  }, [router])

  return null
}
