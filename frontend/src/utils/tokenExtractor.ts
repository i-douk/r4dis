import { supabase } from '@/lib/supabaseClient'
import { z } from "zod";

export const tokenExtractor = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) return { error }
  const token = data.session?.access_token
  return token
}

export function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') 
    .trim()
    .replace(/\s+/g, '-');
}

export function isValidSlug(slug:string) {
  return /^[a-z0-9-]+$/.test(slug);
}
