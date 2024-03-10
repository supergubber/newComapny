import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
const BlogCards = ({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) => {
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate(`/blog-details/${id}`)
  }
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`)
      if (data?.success) {
        toast.success('Blog deleted')
        // navigate('/my-blogs')
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Card
        sx={{
          width: '40%',
          margin: 'auto',
          mt: 2,
          padding: 2,
          boxShadow: '5px 5px 10px #ccc',
          ':hover:': { boxShadow: '10px 10px 20px #ccc' },
        }}
      >
        {isUser && (
          <Box display={'flex'}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}>
              <EditIcon color='info' />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color='error' />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'red' }} aria-label='recipe'>
              {username}
            </Avatar>
          }
          title={username}
          subheader={time}
        />
        <CardMedia component='img' height='194' image={image} alt={username} />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            Title : {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Description : {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  )
}

export default BlogCards
