const express = require('express')
const router = express.Router()
const { getAllArticle, storeArticle } = require('../controllers/articleController')

//routing
router.get('/', getAllArticle)

router.post('/', storeArticle)

router.post('/', (req,res) => {
    res.send('Berhasil Respond')
})

module.exports = router