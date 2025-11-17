'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import { createBrochure, updateBrochure } from '@/services/brochures'

import useSnackbar from '@/@core/hooks/useSnackbar'
import CustomTextField from '@/@core/components/custom-inputs/TextField'

const initialData = {
  title: '',
  description: '',
  file: null,
  file_url: ''
}

const BrochuresForm = ({ isEdit = false }) => {
  const [data, setData] = useState(initialData)
  const [preview, setPreview] = useState(initialData.file_url || '')

  const router = useRouter()

  const { success, error, SnackbarComponent } = useSnackbar()

  const fields = useMemo(
    () => [
      { name: 'title', label: 'Title', placeholder: 'Brochure Title', size: 6, required: true },
      { name: 'description', label: 'Description', placeholder: 'Brochure Description', size: 6 }
    ],
    []
  )

  const handleSubmit = async e => {
    e.preventDefault()

    await handleApiResponse(() => (isEdit ? updateBrochure(id, data) : createBrochure(data)), {
      success: msg => success(msg),
      error: msg => error(msg),
      onSuccess: () =>
        setTimeout(() => {
          router.push('/esse-panel/banners')
        }, 2000),
      onError: () => {}
    })
  }

  const handleChange = e => {
    const { name, value } = e.target

    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = e => {
    const file = e.target.files[0]

    if (file) {
      setData(prev => ({ ...prev, file }))
      setPreview(file.name)
    }
  }

  const handleRemoveFile = () => {
    setData(prev => ({ ...prev, file: null, file_url: '' }))
    setPreview('')
  }

  return (
    <>
      <Card className='shadow'>
        <CardHeader
          title={initialData.id ? 'Edit Brochure' : 'Add New Brochure'}
          subheader='Isi semua informasi brosur di bawah ini.'
        />
        <Divider />

        <form onSubmit={handleSubmit}>
          <CardContent>
            <Grid container spacing={4}>
              {fields.map(field => (
                <CustomTextField
                  key={field.name}
                  {...field}
                  type={field.type || 'text'}
                  value={data[field.name] || ''}
                  onChange={handleChange}
                  inputProps={field.type === 'number' ? { min: 1 } : {}}
                />
              ))}

              {/* File Upload */}
              <Grid item xs={12}>
                <Typography variant='subtitle2' className='mb-2'>
                  File PDF
                </Typography>

                {preview ? (
                  <Box className='flex items-center justify-between border rounded p-3'>
                    <Typography variant='body2'>{preview}</Typography>
                    <IconButton color='error' size='small' onClick={handleRemoveFile} className='bg-white shadow'>
                      <i className='ri-delete-bin-line text-red-500 text-lg' />
                    </IconButton>
                  </Box>
                ) : (
                  <Button variant='outlined' component='label' startIcon={<i className='ri-upload-2-line text-lg' />}>
                    Upload PDF
                    <input type='file' hidden accept='application/pdf' onChange={handleFileChange} />
                  </Button>
                )}
              </Grid>
            </Grid>
          </CardContent>

          <Divider />

          {/* Footer Buttons */}
          <Box className='flex justify-between gap-3 p-4'>
            <Button
              variant='outlined'
              className='w-1/4'
              color='secondary'
              startIcon={<i className='ri-close-line text-lg' />}
              onClick={() => router.push('/esse-panel/brochures')}
            >
              Cancel
            </Button>

            <Button
              type='submit'
              variant='contained'
              className='w-1/4'
              color='success'
              startIcon={<i className='ri-save-3-line text-lg' />}
            >
              {initialData.id ? 'Update' : 'Save'}
            </Button>
          </Box>
        </form>
      </Card>
      {SnackbarComponent}
    </>
  )
}

export default BrochuresForm
