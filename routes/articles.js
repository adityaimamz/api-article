const express = require('express')
const router = express.Router()
const { getArticle, getAllArticle, storeArticle, updateArticle , destroyArticle } = require('../controllers/articleController')
const { uploadOption }= require('../utils/fileUpload')

//routing
router.get('/', getAllArticle)

router.get('/:slug', getArticle)

router.put('/:slug', uploadOption.single('image'), updateArticle)

router.post('/', uploadOption.single('image'), storeArticle)

router.delete('/:slug', destroyArticle)

router.post('/', (req,res) => {
    res.send('Berhasil Respond')
})

module.exports = router