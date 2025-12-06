'use client'

import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

import CardProductCarousel from '@/components/CardProductCarousel'

const ProductSection = () => {
  const data = [
    { id: 1, src: '/images/product/sample-1.jpg', title: 'Marble' },
    { id: 2, src: '/images/product/sample-2.jpg', title: 'Marble' },
    { id: 3, src: '/images/product/sample-3.jpg', title: 'Marble' },
    { id: 4, src: '/images/product/sample-3.jpg', title: 'Marble' },
    { id: 5, src: '/images/product/sample-1.jpg', title: 'Marble' },
    { id: 1, src: '/images/product/sample-2.jpg', title: 'Marble' },
    { id: 2, src: '/images/product/sample-1.jpg', title: 'Marble' },
    { id: 3, src: '/images/product/sample-2.jpg', title: 'Marble' },
    { id: 4, src: '/images/product/sample-3.jpg', title: 'Marble' },
    { id: 5, src: '/images/product/sample-2.jpg', title: 'Marble' }
  ]

  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <Box sx={{ marginTop: isMobile ? -35 : -60 }}>
      <CardProductCarousel
        data={data}
        title='Discover the other collection for you'
        bgColor={'linear-gradient(180deg, #EDEDED, #F9F9F9)'}
        duration={2500}
      />
    </Box>
  )
}

export default ProductSection
