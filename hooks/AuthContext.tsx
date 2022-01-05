import React, { useEffect } from 'react'
import { createContext, useContext, useReducer } from 'react'
import http from '../http-common'
import { setStoredToken, getStoredToken } from '../utils/auth-storage'

type Action = { type: 'login' } | { type: 'logout' }
type Dispatch = (action: Action) => void
type State = { auth: boolean }
type AuthProviderProps = { children: React.ReactNode }

const AuthContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

function authReducer(_state: State, action: Action) {
  switch (action.type || null) {
    case 'login': {
      return { auth: true }
    }
    case 'logout': {
      delete http.defaults.headers.common['Authorization']
      setStoredToken('')
      return { auth: false }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, { auth: false })
  const value = { state, dispatch }

  const getAuthState = async () => {
    const token = await getStoredToken()
    if (token) {
      dispatch({ type: 'login' })
    } else {
      dispatch({ type: 'logout' })
    }
  }

  useEffect(() => {
    getAuthState()
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
