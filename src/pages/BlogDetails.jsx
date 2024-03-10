import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
const BlogDetails = () => {
  const id = useParams().id
  const [blog, setBlog] = useState({})
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({})
  //GET BLOG DETAILS

  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`)
      if (data?.success) {
        setBlog(data?.blog)
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getBlogDetail()
  }, [id])

  //form

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      })
      if (data?.success) {
        toast.success('Blog Updated')
        navigate('/my-blogs')
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(blog)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={'50%'}
          border={1}
          borderRadius={3}
          padding={3}
          margin='auto'
          boxShadow={'10px 10px 20px #ccc'}
          display='flex'
          flexDirection={'column'}
          marginTop='30px'
        >
          <Typography
            variant='h2'
            textAlign={'center'}
            fontWeight={'bold'}
            padding={3}
            color='gray'
          >
            Update A Pots
          </Typography>

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}
          >
            Title
          </InputLabel>
          <TextField
            value={inputs.title}
            name='title'
            onChange={handleChange}
            margin='normal'
            variant='outlined'
            required
          />

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}
          >
            Description
          </InputLabel>
          <TextField
            value={inputs.description}
            name='description'
            onChange={handleChange}
            margin='normal'
            variant='outlined'
            required
          />

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}
          >
            Image URL
          </InputLabel>
          <TextField
            value={inputs.image}
            name='image'
            onChange={handleChange}
            margin='normal'
            variant='outlined'
            required
          />
          <Button type='submit' color='warning' variant='contained'>
            Update
          </Button>
        </Box>
      </form>
      n
    </div>
  )
}

export default BlogDetails
