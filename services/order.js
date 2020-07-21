import axios from './axios'
import {
  tokenFormated
} from './authenticate';


export const loadingOrder = async (delivery, query = '') => axios.get(`/order/deliveryStatus/${delivery}${query ? '?'+query : ''}`, {
  headers: {
    authorization: await tokenFormated()
  }
})

export const loadingOrderAll = async () => axios.get(`/order/all`, {
  headers: {
    authorization: await tokenFormated()
  }
})

export const loadingOrderId = async (id) => axios.get(`/order/one/${id}`, {
  headers: {
    authorization: await tokenFormated()
  }
})

export const createOrder = async (order) => axios.post('/order', order, {
  headers: {
    authorization: await tokenFormated()
  }
})

export const updateOrder = async (order, action = 'update') => axios.put(`/order/${order._id}?action=${action}`, order, {
  headers: {
    authorization: await tokenFormated()
  }
})

export const deleteOrder = async (id) => axios.delete(`/order/${id}`, {
  headers: {
    authorization: await tokenFormated()
  }
})
