'use client'

import { useRouter } from 'next/navigation'

import BannersForm from '@/components/dashboards/banners/Form'

import useSnackbar from '@/@core/hooks/useSnackbar'

import { createBanner } from '@/services/banner'

import { handleApiResponse } from '@/utils/handleApiResponse'

const BannersAddPage = () => {
  const router = useRouter()

  const { success, error, SnackbarComponent } = useSnackbar()

  const handleSubmit = async e => {
    e.preventDefault()

    await handleApiResponse(
      () =>
        createBanner({
          title: e.title,
          subtitle: e.subtitle,
          image: e.image,
          link_url: e.link_url,
          order_no: e.order_no,
          is_active: e.is_active
        }),
      {
        success: msg => success(msg),
        error: msg => error(msg),
        onSuccess: () =>
          setTimeout(() => {
            router.push('/esse-panel/banners')
          }, 2000),
        onError: () => {}
      }
    )
  }

  return (
    <>
      <BannersForm onCancel={() => router.push('/esse-panel/banners')} onSubmit={handleSubmit} />
      {SnackbarComponent}
    </>
  )
}

export default BannersAddPage
