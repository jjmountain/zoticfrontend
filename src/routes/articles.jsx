import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import React from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'


export default function Articles() {
  const [articles, setArticles] = useState([])

  const params = useParams()


  useEffect( () => {
    const articlesEndpoint = 'http://localhost:3000/articles'
    fetch(articlesEndpoint, { headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }})
      .then((data) => {
        if (data.ok) {
          return data.json()
        }
        throw new Error('Network error.')
      })
      .then((data) => setArticles(data))
  }, [])


  return (
    <div className="mt-12 max-w-lg mx-auto grid gap-x-20 gap-y-14 lg:grid-cols-3 lg:max-w-none">
      {articles.map((article) => {
        const date = new Date(article.published_at).toDateString()
        return (
          <motion.div
            initial={{ opacity: 0.8 }}
            whileHover={{ scale: 1.1, opacity: 1 }}
            whileTap={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            key={article.title}
            drag
          >
            <div className="flex flex-col rounded-lg shadow-lg">
              <div className="flex-shrink-0">
                <Link
                  className="no-underline"
                  to={`/articles/${article.id}`}
                  key={article.id}
                >
                  <motion.div
                    className="h-48 w-full"
                    // src={article.image_url}
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(${article.image_url})`,
                      backgroundSize: 'cover',
                    }}
                    alt=""
                  >
                    <div className="block mt-2 no-underline flex items-center p-3">
                      <h1 className="text-2xl font-semibold text-white opacity-90">
                        {article.title}
                      </h1>
                    </div>
                  </motion.div>
                </Link>
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <section className="text-sm font-medium text-pink-600 flex justify-between">
                    {article.section}
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime="2020-03-16">{date}</time>
                      <span aria-hidden="true"></span>
                    </div>
                  </section>
                  <div className="">
                    <p className="mt-3 text-base text-gray-700 no-underline font-light">
                      {article.description}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <div className="flex-shrink-0">
                    <a href="#">
                      <span className="sr-only">
                        {article.author.slice(20)}
                      </span>
                    </a>
                  </div>
                  <div>
                    <section className="mt-4 text-sm font-medium text-gray-900">
                      By {article.author} for{' '}
                      <a
                        href={article.source_url}
                        className="hover:underline"
                        target="_blank"
                      >
                        {article.source_name}
                      </a>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
