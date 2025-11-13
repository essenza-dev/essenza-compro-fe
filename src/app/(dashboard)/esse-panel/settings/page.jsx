'use client'

import { useState } from 'react'

import SettingsForm from '@/components/dashboards/settings/Form'

import useSnackbar from '@/@core/hooks/useSnackbar'

import { updateGeneralSetting } from '@/services/setting'

import { handleApiResponse } from '@/utils/handleApiResponse'

const GeneralSettings = () => {
  const [isEdit, setIsEdit] = useState(false)

  const { success, error, SnackbarComponent } = useSnackbar()

  const handleSubmit = async e => {
    console.log('eeee', e)
    e.preventDefault()

    await handleApiResponse(
      () =>
        updateGeneralSetting({
          site_name: e.site_name,
          site_description: e.site_description,
          site_logo: e.site_logo,
          favicon: e.favicon,
          meta_keywords: e.meta_keywords,
          meta_description: e.meta_description
        }),
      {
        success: msg => success(msg),
        error: msg => error(msg),
        onSuccess: () => setIsEdit(false),
        onError: () => {}
      }
    )
  }

  return (
    <>
      <SettingsForm
        onCancel={() => setIsEdit(false)}
        onSubmit={handleSubmit}
        onEdit={() => setIsEdit(true)}
        isEdit={isEdit}
      />
      {SnackbarComponent}
    </>
  )
}

export default GeneralSettings
