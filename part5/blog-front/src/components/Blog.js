import React from 'react'
const Blog = ({blog, render}) => {
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
    <p>Likes: {blog.likes}</p>
    <p>Added by <b>{blog.user ? blog.user.username : 'Unknown'}</b></p>
  </div>) 
  : null

  return (
    <div className="blog" onClick={blogClickHandler}>
      {blog.title} by <b>{blog.author}</b>
      {info}
    </div>
  )
}

export default Blog