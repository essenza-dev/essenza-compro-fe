import apiClient from '@/utils/apiClient'

const createMenu = async data => {
  return await apiClient.post('/menus', data)
}

const getMenus = async (params = {}) => {
  return await apiClient.get('/menus', { params })
}

const getMenuById = async id => {
  return await apiClient.get(`/menus/${id}`)
}

const updateMenu = async (id, data) => {
  return await apiClient.patch(`/menus/${id}`, data)
}

const deleteMenu = async id => {
  return await apiClient.delete(`/menus/${id}`)
}

const getMenuItemsByMenuId = async menuId => {
  return await apiClient.get(`/menus/${menuId}/items`)
}

export { createMenu, getMenus, getMenuById, updateMenu, deleteMenu, getMenuItemsByMenuId }
