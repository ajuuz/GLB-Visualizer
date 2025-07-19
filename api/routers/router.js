const express = require('express')
const upload = require('../config/multer')
const { addNewModel, getModels, getModel } = require('../controllers/modelController')

const router = express.Router()

router.post('/models',upload.single('model'),addNewModel)
router.get('/models',getModels)
router.get('/models/:modelId',getModel)

module.exports = router;