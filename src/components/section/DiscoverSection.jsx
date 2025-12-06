'use client'

import CardCarousel from '@/components/CardCarousel'

const DiscoverSection = () => {
  const data = [
    { id: 1, src: '/images/illustrations/photos/banner-1.png', title: 'Marble' },
    { id: 2, src: '/images/illustrations/photos/banner-2.png', title: 'Cemento' },
    { id: 3, src: '/images/illustrations/photos/banner-3.png', title: 'Stone' },
    { id: 4, src: '/images/illustrations/photos/banner-4.jpg', title: 'Classic' },
    { id: 5, src: '/images/illustrations/photos/banner-5.jpg', title: 'Graniti' }
  ]

  return (
    <CardCarousel
      data={data}
      isCategory={true}
      title='Discover the other collection for you'
      bgColor={'linear-gradient(180deg, #EDEDED, #F9F9F9)'}
      duration={2000}
    />
  )
}

export default DiscoverSection
