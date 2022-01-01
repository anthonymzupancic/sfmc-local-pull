const { request } = require('express');
var express = require('express');
var router = express.Router();

const auth = require('./utils/auth')
const acct = require('./utils/account-utils')
var sfmc = auth.setAuth();

router.get('/audit', async(req, res) => {
    const mids = await acct.getAccountMids()
    const resp = await acct.getAccountDetail(mids)
    res.json(resp)
})

router.get('/account/:mid', async(req, res) => {
    if (!req.params.mid) throw new Error('MID required')
    const mid = req.params.mid
    const mids = new Array(mid)
    const resp = await acct.getAccountDetail(mids)
    res.json(resp)
})

router.get('/accountuser', async(req, res) => {
    const mids = await acct.getAccountMids()
    const resp = await acct.getAllUserDetails(mids)
    res.json(resp)
})

router.get('/accountuser/:userid', async(req, res) => {
    if (!req.params.userid) throw new Error('User ID required')
    const user_id = req.params.userid
    const resp = await acct.getUserRoles(user_id)
    res.json(resp)
})

router.get('/accountrmm', async(req, res) => {
    const mids = await acct.getAccountMids()
    const resp = await acct.getAllRMMDetails(mids)
    res.json(resp)
})

router.get('/sendclassifications', async(req, res) => {
    const mids = await acct.getAccountMids()
    const resp = await acct.getAllSendClassificationDetails(mids)
    res.json(resp)
})

module.exports = router;