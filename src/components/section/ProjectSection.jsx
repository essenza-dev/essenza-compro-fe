'use client'

import CardCarousel from '@/components/CardCarousel'

const ProjectSection = () => {
  const data = [
    { id: 1, src: '/images/project/Neo-Soho.jpg', title: 'Neo Soho' },
    { id: 2, src: '/images/project/Gandaria-City.jpg', title: 'Gandaria City' },
    { id: 3, src: '/images/project/Central-Park.jpg', title: 'Central Park' },
    { id: 4, src: '/images/project/CBD-Pluit.jpg', title: 'CBD Pluit' },
    { id: 5, src: '/images/project/Jakarta-International-Stadium.jpg', title: 'Jakarta International Stadium' },
    { id: 6, src: '/images/project/Pacific-Place.jpg', title: 'Pacific Place' },
    { id: 7, src: '/images/project/Trotoar-SCBD.jpg', title: 'Trotoar SCBD' }
  ]

  return (
    <CardCarousel data={data} title='Project' bgColor={'linear-gradient(180deg, #EDEDED, #F9F9F9)'} duration={2500} />
  )
}

export default ProjectSection
