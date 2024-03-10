import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCards'
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([])

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem('userId')
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`)
      if (data?.success) {
        setBlogs(data?.userBlog.blogs)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getUserBlogs()
  }, [])
  return (
    <div>
      {blogs && blogs.length === 0 ? (
        <h1>create a new blog</h1>
      ) : (
        blogs.map((blog, index) => (
          <BlogCard
            key={index}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      )}
    </div>
  )
}

export default UserBlogs
