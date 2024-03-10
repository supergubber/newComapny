const blogModel = require('../models/blogModel')
const userModel = require('../models/userModels')
const mongoose = require('mongoose')

//GET ALL BLOGS
exports.getAllBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate('user')
    if (!blogs) {
      return res.status(200).json({
        success: false,
        message: 'No Blog Found',
      })
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: 'All Blogs Lists',
      blogs,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Error while getting blogs',
      error,
    })
  }
}

//CREATE BLOG
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body
    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).json({
        success: false,
        message: 'Please Provide All Fields',
      })
    }
    const exisitingUser = await userModel.findById(user)
    //validation
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: 'unable to find user',
      })
    }

    const newBlog = new blogModel({ title, description, image, user })
    const session = await mongoose.startSession()
    session.startTransaction()
    await newBlog.save({ session })
    exisitingUser.blogs.push(newBlog)
    await exisitingUser.save({ session })
    await session.commitTransaction()
    await newBlog.save()

    return res.status(201).send({
      success: true,
      message: 'Blog Created',
      newBlog,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Error while creating blogs',
      error,
    })
  }
}

//UPDATE BLOG
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params
    //
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    )

    return res.status(200).send({
      success: true,
      message: 'Blog Updated!',
      blog,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Error while updating blogs',
      error,
    })
  }
}

//SINGLE BLOG
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params
    const blog = await blogModel.findById(id)
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: 'Blog not found with is id',
      })
    }
    return res.status(200).send({
      success: true,
      message: 'fetch single blog',
      blog,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Error while getting a single  blog',
      error,
    })
  }
}

//DELETE BLOG
exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      // .findOneAndDelete(req.params.id)
      .findByIdAndDelete(req.params.id)
      .populate('user')
    // console.log(blog)
    await blog.user.blogs.pull(blog)
    await blog.user.save()
    return res.status(200).send({
      success: true,
      message: 'Blog Deleted',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Error while deleting blogs',
      error,
    })
  }
}

//GET USER BLOG
exports.userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate('blogs')
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: 'blogs not found with this id',
      })
    }
    return res.status(200).send({
      success: true,
      message: 'use blogs',
      userBlog,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      success: false,
      message: 'error in user blog',
      error,
    })
  }
}
