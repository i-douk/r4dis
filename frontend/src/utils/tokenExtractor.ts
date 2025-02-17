import { supabase } from "@/lib/supabaseClient"

export const tokenExtractor = async () => {
    const { data , error } = await supabase.auth.getSession()
    if (error) return { error}
    return data.session?.access_token
}