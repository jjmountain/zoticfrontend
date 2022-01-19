import React, { useState, useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Articles from './routes/articles'
import Article from './routes/article'
import WordMeUp from './routes/wordmeup'
import { UserContext } from './UserContext'
import { LoadingContext } from './LoadingContext'

export default function AppRouter() {
  const [user, setUser] = useState(null)
  const value = useMemo(() => ({ user, setUser }), [user, setUser])
  const loadingValue = useState(true)
  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
          <LoadingContext.Provider value={loadingValue}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="articles">
              <Route index element={<Articles />} />
              <Route path=":id" element={<Article />} />
            </Route>
            <Route path="word-me-up" element={<WordMeUp />} />
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
        </LoadingContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  )
}
