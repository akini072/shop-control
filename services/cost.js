import axios from './axios'
import {
  tokenFormated
} from './authenticate'

export const loadingCost = async () => axios.get('/cost', {
  headers: {
    authorization: await tokenFormated()
  }
})

export const createCost = async (cost) => axios.post(`/cost/`, cost, {
  headers: {
    authorization: await tokenFormated()
  }
})

export const updateCost = async (cost) => axios.put(`/cost/${cost._id}`, cost, {
  headers: {
    authorization: await tokenFormated()
  }
})

export const deleteCost = async (id) => axios.delete(`/cost/${id}`, {
  headers: {
    authorization: await tokenFormated()
  }
})
