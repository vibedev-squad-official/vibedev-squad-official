import { supabase } from '@/lib/supabase'

describe('Project Setup Tests', () => {
  test('Supabase client is properly configured', () => {
    expect(supabase).toBeDefined()
    expect(typeof supabase).toBe('object')
    // Test actual client properties instead of non-existent ones
    expect(supabase.auth).toBeDefined()
    expect(supabase.from).toBeDefined()
  })

  test('Environment variables are loaded', () => {
    expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined()
    expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined()
    expect(typeof process.env.NEXT_PUBLIC_SUPABASE_URL).toBe('string')
    expect(typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe('string')
  })
}) 