'use client'

import CardCarousel from '@/components/CardCarousel'

const NewsSection = () => {
  const data = [
    { id: 1, src: '/images/news/news-1.jpg', title: 'Ngopi Kongsi bersama Aristek-arsitek Bandung' },
    { id: 2, src: '/images/news/news-2.jpg', title: 'Gathering Bersama Distributor Bandung serta Owner Toko Bandung' },
    { id: 3, src: '/images/news/news-3.jpg', title: 'Meeting Distributor Nasional Essenza 2019' },
    { id: 4, src: '/images/news/news-4.jpg', title: 'Showroom Essenza Hadir dengan Event – Event Menarik' },
    {
      id: 5,
      src: '/images/news/news-5.webp',
      title: 'Homedec Event di Ice BSD Membuktikan Essenza Tetap Berada di Hati Konsumen'
    }
  ]

  return <CardCarousel data={data} title='News & Event' duration={1500} />
}

export default NewsSection
