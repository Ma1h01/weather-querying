import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://igbiuixgwujaarcmfwdv.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnYml1aXhnd3VqYWFyY21md2R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5Mjg2ODUsImV4cCI6MjA0MTUwNDY4NX0.fBXqj5KEI9AE9DL-XT2vhaXt3jZQAoPsvt5-0X0pBcM"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})