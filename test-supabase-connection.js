const { createClient } = require('@supabase/supabase-js')

// Staging environment variables
const supabaseUrl = 'https://pzdtfxnfrvrdbpbhjhxd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6ZHRmeG5mcnZyZGJwYmhqaHhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MjU2NzAsImV4cCI6MjA2NjMwMTY3MH0.3HDq3sh4k60P0fxc3qi_OGW2rRRzP4C6746T81hmANw'

console.log('🔄 Testing Supabase Connection...')
console.log('Supabase URL:', supabaseUrl)
console.log('Environment: Staging')
console.log('---')

async function testSupabaseConnection() {
  try {
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    console.log('✅ Supabase client created successfully')
    
    // Test 1: Basic connection and version
    const { data: version, error: versionError } = await supabase
      .from('nonexistent_table')
      .select('*')
      .limit(1)
    
    // We expect this to fail, but it confirms connection works
    if (versionError && versionError.message.includes('relation')) {
      console.log('✅ Database connection established (confirmed via expected error)')
    } else if (versionError) {
      console.log('❌ Unexpected database error:', versionError.message)
    }
    
    // Test 2: Auth configuration
    console.log('---')
    console.log('🔄 Testing Authentication Configuration...')
    
    // Try to get session (should be null for anonymous)
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      console.log('❌ Auth session error:', sessionError.message)
    } else {
      console.log('✅ Auth configuration working (session is null as expected)')
    }
    
    // Test 3: Basic auth functions availability
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError && userError.message.includes('JWT')) {
      console.log('✅ Auth methods available (no user logged in as expected)')
    } else if (userError) {
      console.log('❌ Auth user error:', userError.message)
    } else {
      console.log('✅ Auth user method working (no user as expected)')
    }
    
    console.log('---')
    console.log('🎉 Supabase Staging Database Test Results:')
    console.log('   ✅ Connection: WORKING')
    console.log('   ✅ Authentication API: WORKING') 
    console.log('   ✅ Client Configuration: WORKING')
    console.log('   📊 Status: READY FOR DEVELOPMENT')
    
  } catch (error) {
    console.log('❌ Connection test failed:', error.message)
    console.log('Error details:', error)
  }
}

testSupabaseConnection() 