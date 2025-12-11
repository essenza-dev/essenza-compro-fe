'use client'

import useMediaQuery from '@/@menu/hooks/useMediaQuery'

import HeaderNewsSection from '@/components/section/headerNewsSection'
import EndSection from '@/components/section/EndSection'
import NewsSection from '@/components/section/NewsSection'

const NewsPage = () => {
  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <>
      <HeaderNewsSection />
      <NewsSection />
      <EndSection />
    </>
  )
}

export default NewsPage
