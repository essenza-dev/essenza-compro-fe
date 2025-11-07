'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { Card, CardContent, CardHeader, CardTitle, Button, Divider, Grid, Typography, Box } from '@mui/material'

import { getBannerById, deleteBanner } from '@/services/banner'

const BannerDetailPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const [banner, setBanner] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getBannerById(id)
        setBanner(data)
      } catch (err) {
        console.error('Failed to fetch banner:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchBanner()
  }, [id])

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this banner?')) {
      try {
        await deleteBanner(id)
        alert('Banner deleted successfully!')
        router.push('/esse-panel/banner')
      } catch (err) {
        console.error('Delete failed:', err)
      }
    }
  }

  if (loading) return <p className='p-6'>Loading...</p>
  if (!banner) return <p className='p-6'>Banner not found.</p>

  return (
    <div className='p-6'>
      <Card className='w-full mx-auto shadow'>
        <CardHeader>
          <CardTitle>Banner Detail</CardTitle>
        </CardHeader>
        <Divider />

        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2'>Title</Typography>
              <Typography variant='body1'>{banner.title}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2'>Subtitle</Typography>
              <Typography variant='body1'>{banner.subtitle || '-'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2'>Link URL</Typography>
              <Typography variant='body1'>{banner.link_url || '-'}</Typography>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography variant='subtitle2'>Order No</Typography>
              <Typography variant='body1'>{banner.order_no}</Typography>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography variant='subtitle2'>Active</Typography>
              <Typography variant='body1'>{banner.is_active ? 'Yes' : 'No'}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='subtitle2' className='mb-2'>
                Banner Image
              </Typography>
              {banner.image ? (
                <img
                  src={banner.image}
                  alt={banner.title}
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

        <Box className='flex justify-between items-center p-4 gap-3'>
          <Button
            variant='outlined'
            color='secondary'
            className='w-1/4'
            startIcon={<i className='ri-arrow-left-line text-lg' />}
            onClick={() => router.push('/esse-panel/banners')}
          >
            Back
          </Button>

          <Box className='flex gap-3 w-1/2 justify-end'>
            <Button
              variant='contained'
              color='error'
              className='w-1/2'
              startIcon={<i className='ri-delete-bin-6-line text-lg' />}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              variant='contained'
              color='primary'
              className='w-1/2'
              startIcon={<i className='ri-pencil-line text-lg' />}
              onClick={() => router.push(`/esse-panel/banners/${id}/edit`)}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Card>
    </div>
  )
}

export default BannerDetailPage
