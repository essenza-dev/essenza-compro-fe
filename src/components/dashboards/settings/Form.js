'use client'

import { useMemo, useState } from 'react'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'

import CustomTextField from '@/@core/components/custom-inputs/TextField'

const defaultData = {
  site_name: 'PT. Maju Jaya Keramik',
  site_description: 'Distributor ubin dan keramik terpercaya dengan berbagai pilihan motif, warna, dan ukuran.',
  site_logo: '/images/logo.png',
  favicon: '/favicon.ico',
  meta_keywords: 'keramik, ubin, granit, lantai, interior, bangunan',
  meta_description:
    'PT. Maju Jaya Keramik menyediakan ubin dan keramik berkualitas tinggi untuk hunian dan proyek Anda.'
}

const SettingsForm = ({ isEdit, onSubmit, onCancel, onEdit }) => {
  const [data, setData] = useState(defaultData)

  const fields = useMemo(
    () => [
      { name: 'site_name', label: 'Site Name', placeholder: 'Masukkan nama situs', size: 6, required: true },
      { name: 'favicon', label: 'Favicon URL', placeholder: '/favicon.ico', size: 6, required: true },
      { name: 'site_logo', label: 'Site Logo URL', placeholder: '/images/logo.png', size: 6, required: true },
      {
        name: 'meta_keywords',
        label: 'Meta Keywords',
        placeholder: 'kata kunci SEO dipisahkan koma',
        size: 6,
        required: true
      },
      {
        name: 'site_description',
        label: 'Site Description',
        placeholder: 'Deskripsi singkat tentang situs atau perusahaan',
        multiline: true,
        rows: 3,
        required: true
      },
      {
        name: 'meta_description',
        label: 'Meta Description',
        placeholder: 'Deskripsi untuk meta tag SEO',
        multiline: true,
        rows: 3
      }
    ],
    []
  )

  const handleChange = e => {
    const { name, value } = e.target

    setData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Card>
      <CardHeader title='General Settings' />
      <Divider />
      <CardContent>
        <Grid container spacing={5} className='mbe-5'>
          {fields.map(field => (
            <CustomTextField
              key={field.name}
              {...field}
              disabled={!isEdit}
              value={data[field.name] || ''}
              onChange={handleChange}
            />
          ))}
        </Grid>
        <Divider className='mb-5' />
        <Box className='text-right flex justify-between flex-row-reverse gap-4'>
          {!isEdit ? (
            <Button
              variant='contained'
              color='info'
              className='w-1/4'
              onClick={onEdit}
              startIcon={<i className='ri-pencil-line text-lg' />}
            >
              Edit
            </Button>
          ) : (
            <>
              <Button
                variant='contained'
                color='success'
                className='w-1/4'
                onClick={onSubmit}
                startIcon={<i className='ri-save-3-line text-lg' />}
              >
                Save
              </Button>

              <Button
                variant='contained'
                color='warning'
                className='w-1/4'
                onClick={onCancel}
                startIcon={<i className='ri-close-line text-lg' />}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default SettingsForm
