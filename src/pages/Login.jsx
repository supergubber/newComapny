import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/store'
import toast from 'react-hot-toast'
const Login = () => {
  //NAVIGATE
  const navigate = useNavigate()
  //REDUX STATE
  const dispatch = useDispatch()
  //LOCAL STATE
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/v1/user/login', {
        email: inputs.email,
        password: inputs.password,
      })
      if (data.success) {
        localStorage.setItem('userId', data?.user._id)
        dispatch(authActions.login())
        toast.success('User login successfully')
        navigate('/')
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
            LOGIN
          </Typography>
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
            onClick={() => navigate('/register')}
          >
            NOT A USER ? Please REGISTER
          </Button>
        </Box>
      </form>
    </>
  )
}

export default Login
