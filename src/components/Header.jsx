import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <Link className="no-underline" to="/">
      <div className="sm:text-8xl text-5xl text-center mt-8 text-pink-600	opacity-70 italic font-extralight tracking-tighter">
        Zotic News
      </div>
      <motion.div
        // initial={{ scale: 0 }}
        // transition={{ duration: 2, delay: 1 }}
        // animate={{
        //   scale: 1.2,
        // }}
        className="text-xs sm:text-sm uppercase text-center mb-8 text-gray-600	opacity-90 font-light"
      >
        Learn English through the news
      </motion.div>
    </Link>
  )
}
