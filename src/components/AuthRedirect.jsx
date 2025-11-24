'use client'

import { useEffect } from 'react'

import { usePathname, useRouter } from 'next/navigation'

export default function AuthRedirect() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      const redirectTo = pathname || '/esse-panel'

      router.replace(`/esse-panel/login?redirectTo=${redirectTo}`)
    }
  }, [pathname, router])

  return null
}
