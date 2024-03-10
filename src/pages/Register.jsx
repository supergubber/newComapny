import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
const Register = () => {
  const navigate = useNavigate()

  //LOCAL STATE
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  })

  //HANDLE CHANGE INPUT
  const handleChange = (e) => {
    setInputs((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/v1/user/register', {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      if (data.success) {
        toast.success('User Register successfully')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <Box
          maxWidth={450}
          display='flex'
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          margin={'auto'}
          marginTop={5}
          boxShadow={'10px 10px 20px #ccc'}
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant='h4'
            padding={3}
            textAlign={'center'}
            sx={{ textTransform: 'uppercase' }}
          >
            Register
          </Typography>
          <TextField
            placeholder='Name'
            name='name'
            value={inputs.name}
            onChange={handleChange}
            margin='normal'
            type={'text'}
            required
          />
          <TextField
            placeholder='Email'
            name='email'
            value={inputs.email}
            onChange={handleChange}
            margin='normal'
            type={'email'}
            required
          />
          <TextField
            placeholder='Password'
            name='password'
            value={inputs.password}
            onChange={handleChange}
            margin='normal'
            type={'password'}
            required
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            onClick={() => navigate('/login')}
          >
            Already Registered ? Please Login
          </Button>
        </Box>
      </form>
    </>
  )
}

export default Register
