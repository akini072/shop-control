import axios from './axios'
import {
  tokenFormated
} from './authenticate'

export const loadingStock = async () => axios.get('/stock', {
  headers: {
    authorization: await tokenFormated()
  }
})

export const createStock = async (stock) => axios.post(`/stock/`, stock, {
  headers: {
    authorization: await tokenFormated()
  }
})

export const updateStock = async (stock) => axios.put(`/stock/${stock._id}`, stock, {
  headers: {
    authorization: await tokenFormated()
  }
})

export const deleteStock = async (id) => axios.delete(`/stock/${id}`, {
  headers: {
    authorization: await tokenFormated()
  }
})
