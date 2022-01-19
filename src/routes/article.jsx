import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Article() {
  const [article, setArticle] = useState([])
  const params = useParams()

  useEffect(() => {
    console.log(process.env.NODE_ENV === 'development')
    const endpointBase = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://powerful-reaches-57137.herokuapp.com'
    fetch(`${endpointBase}/articles/${params.id}.json`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
      .then((data) => {
        if (data.ok) {
          return data.json()
        }
        throw new Error('Network error.')
      })
      .then((data) => setArticle(data))
  }, [])

  const date = new Date(article.published_at).toDateString()

  return (
    article && (
      <div className="max-w-3xl mx-auto">
        <h1>{article.title}</h1>
        <h3>
          By {article.author} for{' '}
          <a href={article.source_url} rel="noreferrer" target="_blank">
            {article.source_name}
          </a>{' '}
          on {date}
        </h3>
        <h3></h3>
        <p
          dangerouslySetInnerHTML={{
            __html: article.body_html,
          }}
        ></p>
      </div>
    )
  )
}
