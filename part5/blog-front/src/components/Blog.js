import React from 'react'

const Blog = ({blog, render, button, del}) => {
  if (blog.visible === undefined) {
    blog.visible = false
  }

  const blogClickHandler = () => {
    blog.visible = !blog.visible
    render()
  }

  const info = blog.visible ? 
  (<div>
    <p>Url: <a href={blog.url}>{blog.url}</a></p>
    <p>Likes: {blog.likes} <button onClick={button}>Like</button></p>
    <p>Added by <b>{blog.user ? blog.user.username : 'Anonymous'}</b></p>
    <button onClick={del}>Delete</button>
  </div>) 
  : null

  return (
    <div className="blog">
      <div onClick={blogClickHandler}>
        {blog.title} by <b>{blog.author}</b>
      </div>
      {info}
    </div>
  )
}

export default Blog