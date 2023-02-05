const {Router} = require('express');
const handler = require("./handlers");

const router = Router();

router.post('/updateAcccountInfo', handler.updateAccInfo);
// router.get('/deleteImage', handler.deleteImage)

module.exports = router;