import axios from 'axios'

export const expressClient = axios.create({
  baseURL: 'http://api.r4dis.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})
