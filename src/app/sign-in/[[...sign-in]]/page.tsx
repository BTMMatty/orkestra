import { dark } from '@clerk/themes'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <SignIn 
        appearance={{
          baseTheme: dark,  // Import the dark theme object, not a string
          variables: {
            colorPrimary: '#FFFFFF',
            colorBackground: '#000000',
            colorText: '#FFFFFF',
            colorInputBackground: '#000000',
            colorInputText: '#FFFFFF',
            colorNeutral: '#FFFFFF',
          },
          elements: {
            formButtonPrimary: 'bg-white text-black hover:bg-white/90',
            card: 'bg-black border border-white/20',
            headerTitle: 'text-white',
            headerSubtitle: 'text-white/70',
            socialButtonsIconButton: 'border-white/30 hover:border-white',
            formFieldInput: 'bg-transparent border-white/30 text-white focus:border-white',
            formFieldLabel: 'text-white/70',
            footerActionLink: 'text-white hover:text-white/80',
          }
        }}
      />
    </div>
  )
}