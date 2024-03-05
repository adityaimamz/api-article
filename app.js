const express = require('express')
const app = express();
const dotenv = require('dotenv')
const port = process.env.PORT || 3003;
const cors = require('cors')
const ArticleRouter = require('./routes/articles')
const CategoryRouter = require('./routes/categories')
const morgan = require('morgan')

// Menggunakan konfigurasi dari file .env
dotenv.config()

// Menggunakan middleware untuk parsing request body dalam format JSON
app.use(express.json());
// Menggunakan middleware untuk parsing request body dalam format URL encoded
app.use(express.urlencoded({ extended: true }))

// Menggunakan morgan untuk logging informasi request ke konsol
app.use(morgan('dev'))
// Menggunakan cors untuk mengatasi masalah CORS (Cross-Origin Resource Sharing)
app.use(cors())

// Menggunakan router untuk endpoint '/v1/articles'
app.use('/v1/articles', ArticleRouter)
app.use('/v1/categories', CategoryRouter)

// Aplikasi mendengarkan port yang telah ditentukan
app.listen(port, () => {
    console.log(`Aplikasi berjalan di http://localhost:${port}`)
})