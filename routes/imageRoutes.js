const {Router} = require('express');
const handler = require("./handlers");

const router = Router();

router.post('/uploadImage', handler.handleImageUpload)
router.get('/deleteImage', handler.deleteImage)

module.exports = router;