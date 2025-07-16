// src/lib/auth/auth-provider.ts
export interface AuthProvider {
  getCurrentUser: () => Promise<User | null>
  signIn: (credentials: any) => Promise<void>
  signOut: () => Promise<void>
}

// Mock auth for demo/development
export class MockAuthProvider implements AuthProvider {
  async getCurrentUser() {
    return {
      id: 'demo-user',
      email: 'demo@orkestra.ai',
      name: 'Demo User'
    }
  }
  
  async signIn() {
    // No-op for demo
  }
  
  async signOut() {
    // No-op for demo
  }
}

// Clerk auth for production (optional)
export class ClerkAuthProvider implements AuthProvider {
  // Clerk implementation
}

// Export based on env
export const authProvider = process.env.USE_CLERK === 'true' 
  ? new ClerkAuthProvider() 
  : new MockAuthProvider()