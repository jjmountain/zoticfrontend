import React, { useState, useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Articles from './routes/articles'
import Article from './routes/article'
import { UserContext } from './UserContext'

export default function AppRouter() {
  const [user, setUser] = useState(null)
  const value = useMemo(() => ({ user, setUser }), [user, setUser])
  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="articles">
              <Route index element={<Articles />} />
              <Route path=":id" element={<Article />} />
            </Route>
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}
