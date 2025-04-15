import React, { createContext, useState, useEffect } from 'react'
export const UserContext = createContext()
export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])
  const login = (userData) => {
    localStorage.setItem('token', userData.token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
