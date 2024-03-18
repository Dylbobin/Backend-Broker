const mongoose = require('mongoose')

//n struct of database
const blogSchema = new mongoose.Schema ({
    // define the schema
    title : String,
    subtitle : String,
    description : String,
})

// helps preform operations in database
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog