'use client'

import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { getProductById, deleteProduct } from '@/services/products'
import DetailField from '@/components/DetailField'
import DetailActions from '@/components/DetailActions'

const ProductDetailPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id)

        setProduct(data)
      } catch (err) {
        console.error('Failed to fetch product:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProduct()
  }, [id])

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        alert('Product deleted successfully!')
        router.push('/esse-panel/products')
      } catch (err) {
        console.error('Delete failed:', err)
      }
    }
  }

  if (loading) return <p className='p-6'>Loading...</p>
  if (!product) return <p className='p-6'>Product not found.</p>

  return (
    <div className='p-6'>
      <Card className='w-full mx-auto shadow'>
        <CardHeader title='Product Detail' />
        <Divider />
        <CardContent>
          <Grid container spacing={4}>
            <DetailField label='Product Name' value={product.name} />
            <DetailField label='Category' value={product.category} />
            <DetailField label='Price' value={`Rp ${product.price?.toLocaleString() || '0'}`} />
            <DetailField label='Stock' value={product.stock} />
            <DetailField label='Description' value={product.description} xs={12} />
            <Grid item xs={12}>
              <Typography variant='subtitle2' className='mb-2'>
                Product Image
              </Typography>
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-[220px] h-[120px] object-cover rounded border'
                />
              ) : (
                <Typography variant='body2' color='textSecondary'>
                  No image uploaded
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <DetailActions id={id} href='products' />
      </Card>
    </div>
  )
}

export default ProductDetailPage
