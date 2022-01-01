var express = require('express');
var router = express.Router();

var sfmc = require('./utils/auth')


router.get('/', async(req, res) => {
    const resp = await sfmc.rest.get('/interaction/v1/interactions')
    res.json(resp)
})



module.exports = router;