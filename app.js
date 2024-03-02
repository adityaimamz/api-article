const express = require('express')
const app = express();
const dotenv = require('dotenv')
const port = process.env.PORT || 3000;
const cors = require('cors')
const ArticleRouter = require('./routes/articles')
const morgan = require('morgan')

dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// app.use((req, res, next) => {
//     req.requestTime = Date.now();
//     next()
// })

app.use(morgan('dev'))
app.use(cors())

app.use('/v1/articles', ArticleRouter)

app.listen(port, () => {
    console.log(`Jalan cuy at http://localhost:${port}`)
})