'use client'

import { useRouter } from 'next/navigation'

import ProductsForm from '@/components/dashboards/products/Form'

const ProductsAddPage = () => {
  const router = useRouter()

  const handleSubmit = e => {}

  return <ProductsForm onCancel={() => router.push('/esse-panel/products')} onSubmit={handleSubmit} />
}

export default ProductsAddPage
