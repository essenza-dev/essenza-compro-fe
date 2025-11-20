// Component Imports
// import NotAuthorized from '@views/NotAuthorized'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const Error401 = () => {
  // Vars
  const mode = getServerMode()

  // return <NotAuthorized mode={mode} />
  return null
}

export default Error401
