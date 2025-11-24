import apiClient from '@/utils/apiClient'

const getSocialMedias = async (params = {}) => {
  return await apiClient.get('/social-media', { params })
}

const createSocialMedia = async data => {
  return await apiClient.post('/social-media', data)
}

const getSocialMediaById = async id => {
  return await apiClient.get(`/social-media/${id}`)
}

const updateSocialMedia = async (id, data) => {
  return await apiClient.patch(`/social-media/${id}`, data)
}

const deleteSocialMedia = async id => {
  return await apiClient.delete(`/social-media/${id}`)
}

export { getSocialMedias, createSocialMedia, getSocialMediaById, updateSocialMedia, deleteSocialMedia }
