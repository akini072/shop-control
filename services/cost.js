import axios from './axios'

export const loadingCost = async () => axios.get('/cost')

export const createCost = async (cost) => axios.post(`/cost/`, cost)

export const updateCost = async (cost) => axios.put(`/cost/${cost._id}`, cost)

export const deleteCost = async (id) => axios.delete(`/cost/${id}`)
