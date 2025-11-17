'use client'

import BrochuresForm from '@/components/dashboards/brochures/Form'

const BrochuresEditPage = ({ params }) => {
  const id = params?.id

  return <BrochuresForm id={id} />
}

export default BrochuresEditPage
