import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const CreateBlog = () => {
  const id = localStorage.getItem('userId')
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    image: '',
  })
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
      const { data } = await axios.post('/api/v1/blog/create-blog', {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      })
      if (data?.success) {
        toast.success('Blog Created')
        navigate('/my-blogs')
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
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
            Create A Pots
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
          <Button type='submit' color='primary' variant='contained'>
            Submit
          </Button>
        </Box>
      </form>
    </>
  )
}

export default CreateBlog
