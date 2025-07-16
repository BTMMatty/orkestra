require('dotenv').config({ path: '.env.local' });

console.log('🔍 Checking Orkestra Environment...\n');

const required = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_KEY'
];

const optional = [
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  'CLERK_SECRET_KEY',
  'ANTHROPIC_API_KEY'
];

console.log('Required Variables:');
required.forEach(key => {
  const value = process.env[key];
  if (value) {
    console.log(`✅ ${key}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`❌ ${key}: Missing!`);
  }
});

console.log('\nOptional Variables:');
optional.forEach(key => {
  const value = process.env[key];
  console.log(`${value ? '✅' : '⚠️ '} ${key}: ${value ? 'Set' : 'Not set'}`);
});
