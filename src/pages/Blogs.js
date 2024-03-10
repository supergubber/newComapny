import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import BlogCards from '../components/BlogCards'

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  //GET BLOGS
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get('/api/v1/blog/all-blog')
      if (data?.success) {
        setBlogs(data?.blogs)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllBlogs()
  }, [])
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <BlogCards
            key={index}
            id={blog?._id}
            isUser={localStorage.getItem('userId') === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))}
    </div>
  )
}

export default Blogs
