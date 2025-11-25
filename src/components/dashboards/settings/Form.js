'use client'

import { useEffect, useMemo, useState } from 'react'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'

import CustomTextField from '@/@core/components/custom-inputs/TextField'

import useSnackbar from '@/@core/hooks/useSnackbar'

import { updateSetting, getSettingBySlug } from '@/services/setting'
import { handleApiResponse } from '@/utils/handleApiResponse'

const defaultData = {
  site_name: '',
  site_description: '',
  site_logo_url: '',
  favicon_url: '',
  meta_keywords: '',
  meta_description: ''
}

const SettingsForm = () => {
  const [data, setData] = useState(defaultData)
  const [isEdit, setIsEdit] = useState(false)

  const { success, error, SnackbarComponent } = useSnackbar()

  const fields = useMemo(
    () => [
      { name: 'site_name', label: 'Site Name', placeholder: 'Masukkan nama situs', size: 6, required: true },
      { name: 'favicon_url', label: 'Favicon URL', placeholder: '/favicon.ico', size: 6, required: true },
      { name: 'site_logo_url', label: 'Site Logo URL', placeholder: '/images/logo.png', size: 6, required: true },
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

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const slugs = Object.keys(defaultData)
        const results = await Promise.all(slugs.map(slug => getSettingBySlug(slug)))
        const newData = {}

        results.forEach((res, idx) => {
          const slug = slugs[idx]

          newData[slug] = res?.data?.value || ''
        })
        setData(newData)
      } catch (err) {
        error('Gagal memuat data settings')
      }
    }

    fetchSettings()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    const slugs = Object.keys(data)

    const allRequests = slugs.map(slug => {
      const payload = {
        label: slug.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        value: data[slug] || '',
        description: `Setting for ${slug}`,
        is_active: true
      }

      const res = updateSetting(slug, payload)

      console.log('res', res)

      return res
    })

    console.log(allRequests)

    await handleApiResponse(() => Promise.all(allRequests), {
      success: msg => success('Semua setting berhasil disimpan!'),
      error: msg => error('Gagal menyimpan settings'),
      onSuccess: () => setIsEdit(false),
      onError: () => {}
    })
  }

  const handleChange = e => {
    const { name, value } = e.target

    setData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <>
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
                onClick={() => setIsEdit(true)}
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
                  onClick={handleSubmit}
                  startIcon={<i className='ri-save-3-line text-lg' />}
                >
                  Save
                </Button>

                <Button
                  variant='contained'
                  color='warning'
                  className='w-1/4'
                  onClick={() => setIsEdit(false)}
                  startIcon={<i className='ri-close-line text-lg' />}
                >
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
      {SnackbarComponent}
    </>
  )
}

export default SettingsForm
