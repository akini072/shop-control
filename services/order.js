import axios from './axios'

export const loadingOrder = async (delivery) => axios.get(`/order/deliveryStatus/${delivery}`)

export const loadingOrderAll = async () => axios.get(`/order/all`)

export const loadingOrderId = async (id) => axios.get(`/order/one/${id}`)

export const createOrder = async (order) => axios.post('/order', order)

export const updateOrder = async (order, action = 'update') => axios.put(`/order/${order._id}?action=${action}`, order)

export const deleteOrder = async (id) => axios.delete(`/order/${id}`)
