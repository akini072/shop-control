import axios from './axios'

export const loadingStock = async () => axios.get('/stock')

export const createStock = async (stock) => axios.post(`/stock/`, stock)

export const updateStock = async (stock) => axios.put(`/stock/${stock._id}`, stock)

export const deleteStock = async (id) => axios.delete(`/stock/${id}`)
