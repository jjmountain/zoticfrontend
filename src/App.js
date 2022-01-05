import React, { useContext } from 'react'
import { Header } from './components/Header'
import { motion } from 'framer-motion'
import { Outlet, Link } from 'react-router-dom'
import { UserContext } from './UserContext'
import Login from './routes/login'

export default function App() {
  const { user, setuser } = useContext(UserContext)

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Header />
        <div className="w-full flex justify-center">
          <Link className="" to="/articles">
            Articles
          </Link>
        </div>
        <Outlet />
      </motion.div>
    </>
  )
}
