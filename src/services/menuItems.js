import apiClient from '@/utils/apiClient'

const createMenuItem = async data => {
  return await apiClient.post('/menu-items', data)
}

const getMenuItems = async (params = {}) => {
  return await apiClient.get('/menu-items', { params })
}

const getMenuItemById = async id => {
  return await apiClient.get(`/menu-items/${id}`)
}

const updateMenuItem = async (id, data) => {
  return await apiClient.patch(`/menu-items/${id}`, data)
}

const deleteMenuItem = async id => {
  return await apiClient.delete(`/menu-items/${id}`)
}

export { createMenuItem, getMenuItems, getMenuItemById, updateMenuItem, deleteMenuItem }
