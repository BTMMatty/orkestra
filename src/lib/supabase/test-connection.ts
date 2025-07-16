import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log('Testing Supabase connection...')
console.log('URL:', supabaseUrl)
console.log('Key exists:', !!supabaseAnonKey)

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('accounts')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Query Error:', error)
    } else {
      console.log('✅ Connection successful!')
    }

    const { data: { user } } = await supabase.auth.getUser()
    console.log('Auth user:', user || 'No user logged in')

  } catch (err) {
    console.error('Connection failed:', err)
  }
}

testConnection()
