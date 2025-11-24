import apiClient from '@/utils/apiClient'

const createSetting = async data => {
  return await apiClient.post('/settings', data)
}

const getSettings = async (params = {}) => {
  return await apiClient.get('/settings', { params })
}

const getSettingBySlug = async slug => {
  return await apiClient.get(`/settings/${slug}`)
}

const updateSetting = async (slug, data) => {
  return await apiClient.patch(`/settings/${slug}`, data)
}

const deleteSetting = async slug => {
  return await apiClient.delete(`/settings/${slug}`)
}

export { createSetting, getSettings, getSettingBySlug, updateSetting, deleteSetting }
