import axios from 'axios';
import { tokenExtractor } from '@/utils/tokenExtractor';

export const expressClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
