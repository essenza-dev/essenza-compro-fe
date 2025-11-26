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
import BackdropLoading from '@/components/BackdropLoading'
import FormActions from '@/components/FormActions'

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
  const [loading, setLoading] = useState(false)

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
    setLoading(true)

    const slugs = Object.keys(data)

    const combinedRequest = async () => {
      const results = []
      const errors = []

      for (const slug of slugs) {
        const payload = {
          label: slug.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          value: data[slug] || '',
          description: `Setting for ${slug}`,
          is_active: true
        }

        const res = await updateSetting(slug, payload)

        if (res.success) {
          results.push({ slug, ...res })
        } else {
          errors.push({
            slug,
            message: res?.message || 'Unknown error'
          })
        }
      }

      if (errors.length > 0) {
        const errorItems = errors
          .map(item => {
            return (
              '- ' +
              item.slug
                .split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            )
          })
          .join('\n')

        return {
          success: false,
          status: 400,
          message: `Some settings failed to save:\n${errorItems}`,
          errors,
          data: results
        }
      }

      return {
        success: true,
        status: 200,
        message: 'All settings updated successfully',
        data: results
      }
    }

    await handleApiResponse(combinedRequest, {
      success: () => success('All settings updated successfully'),
      error: msg => error(<span className='whitespace-pre-wrap'>{msg}</span>),
      onSuccess: () => {
        setIsEdit(false)
        setLoading(false)
      },
      onError: () => {
        setLoading(false)
      }
    })
  }

  const handleChange = e => {
    const { name, value } = e.target

    setData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          </CardContent>
          <Divider />
          {!isEdit ? (
            <Box className={`flex justify-between p-4`}>
              <Button
                variant='contained'
                color='info'
                size='small'
                className='w-1/6'
                onClick={() => setIsEdit(true)}
                startIcon={<i className='ri-pencil-line text-lg' />}
              >
                Edit
              </Button>
            </Box>
          ) : (
            <FormActions onCancel={() => setIsEdit(false)} isEdit={isEdit} />
          )}
        </Card>
      </form>
      {SnackbarComponent}
      <BackdropLoading open={loading} />
    </>
  )
}

export default SettingsForm
