const express = require('express')
const app = express();
const port = 3000;
const ArticleRouter = require('./routes/articles')

app.use(express.json());

app.use('/api/v1/articles', ArticleRouter)

app.listen(port, () => {
    console.log(`Jalan cuy at http://localhost:${port}`)
})