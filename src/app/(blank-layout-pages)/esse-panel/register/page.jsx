// Component Imports
// import Register from '@views/Register'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'Register',
  description: 'Register to your account'
}

const RegisterPage = () => {
  // Vars
  const mode = getServerMode()

  // return <Register mode={mode} />
  return null
}

export default RegisterPage
