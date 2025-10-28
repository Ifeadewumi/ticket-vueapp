import { reactive, readonly, toRefs } from 'vue'
import { getSession, saveSession, clearSession } from '../utils/storage'

const sessionState = reactive({
  user: getSession() // Initialize with current session from localStorage
})

export function useSession() {
  const login = (newSession) => {
    saveSession(newSession)
    sessionState.user = newSession
  }

  const logout = () => {
    clearSession()
    sessionState.user = null
  }

  return {
    ...toRefs(sessionState), // Return reactive references to properties of sessionState
    login,
    logout,
  }
}