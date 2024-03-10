import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Blogs from './pages/Blogs'
import Login from './pages/Login'
import Register from './pages/Register'
import UserBlogs from './pages/UserBlogs'
import CreateBlog from './pages/CreateBlog'
import BlogDetails from './pages/BlogDetails'
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path='/' element={<h1>welocme to homepage</h1>} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/my-blogs' element={<UserBlogs />} />
        <Route path='/create-blog' element={<CreateBlog />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/blog-details/:id' element={<BlogDetails />} />
      </Routes>
    </>
  )
}

export default App
