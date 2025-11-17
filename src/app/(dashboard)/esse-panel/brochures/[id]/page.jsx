'use client'

import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { getBrochureById, deleteBrochure } from '@/services/brochures'
import DetailField from '@/components/DetailField'
import DetailActions from '@/components/DetailActions'

const BrochureDetailPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const [brochure, setBrochure] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBrochure = async () => {
      try {
        const data = await getBrochureById(id)

        setBrochure(data)
      } catch (err) {
        console.error('Failed to fetch brochure:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchBrochure()
  }, [id])

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this brochure?')) {
      try {
        await deleteBrochure(id)
        alert('Brochure deleted successfully!')
        router.push('/esse-panel/brochures')
      } catch (err) {
        console.error('Delete failed:', err)
      }
    }
  }

  if (loading) return <p className='p-6'>Loading...</p>
  if (!brochure) return <p className='p-6'>Brochure not found.</p>

  return (
    <div className='p-6'>
      <Card className='w-full mx-auto shadow'>
        <CardHeader title='Brochure Detail' />
        <Divider />

        <CardContent>
          <Grid container spacing={4}>
            <DetailField label='Title' value={brochure.title} />
            <DetailField label='Created at' value={brochure.created_at} />
            <DetailField label='Description' value={brochure.description} />

            {/* File URL */}
            <Grid item xs={12}>
              <Typography variant='subtitle2' className='mb-2'>
                Brochure File
              </Typography>

              {brochure.file_url ? (
                <Box className='flex items-center gap-3'>
                  <Button
                    variant='outlined'
                    color='primary'
                    startIcon={<i className='ri-file-pdf-line text-lg' />}
                    onClick={() => window.open(brochure.file_url, '_blank')}
                  >
                    View PDF
                  </Button>
                  <Typography variant='body2' color='textSecondary'>
                    {brochure.file_url}
                  </Typography>
                </Box>
              ) : (
                <Typography variant='body2' color='textSecondary'>
                  No file uploaded
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <DetailActions id={id} href='brochures' />
      </Card>
    </div>
  )
}

export default BrochureDetailPage
