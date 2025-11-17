'use client'

import PagesForm from '@/components/dashboards/pages/Form'

const PagesEditPage = ({ params }) => {
  const id = params?.id

  return <PagesForm id={id} />
}

export default PagesEditPage
