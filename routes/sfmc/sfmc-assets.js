const { request } = require('express');
var express = require('express');
var router = express.Router();

const auth = require('./utils/auth')
const acct = require('./utils/account-utils')
var sfmc = auth.setAuth();

router.get('/audit', async(req, res) => {
    //const mids = await acct.getAccountDetails()
    const account = await acct.getAccountDetail(6275722)
        //const resp = await sfmc.rest.get('/asset/v1/content/assets')
    res.json(account)
})

router.post(`/query`, async(req, res) => {
    if (!req.body.query) {
        const err = 'Query is required.'
        res.status(400).send(err).end()
    }


    const resp = await sfmc.rest.post(`/asset/v1/content/assets/query`, req.body.query)

    res.json(resp)
})

router.get(`/categories`, async(req, res) => {

    //const contentTypes = ['asset', 'dataextension', 'automations', 'list', 'publication', 'queryactivity', 'salesforcedataextension', 'shared_content', 'shared_dataextension', 'ssjsactivity', 'suppression_list', 'synchronizeddataextension', 'triggered_send', 'userinitiatedsends']
    const contentTypes = ['ABTest',
        'asset',
        'automated_email',
        'automations',
        'BuildAudienceActivity',
        'campaign',
        'condensedlpview',
        'content',
        'contextual_suppression_list',
        'dataextension',
        'document',
        'ELTactivity',
        'email',
        'email_hidden_messagemodel',
        'filteractivity',
        'filterdefinition',
        'global_email',
        'global_email_sub',
        'group',
        'Hidden',
        'image',
        'job',
        'list',
        'livecontent',
        'measure',
        'media',
        'message',
        'microsite',
        'micrositelayout',
        'mysubs',
        'organization',
        'playbooks',
        'programs2',
        'publication',
        'queryactivity',
        'salesforcedataextension',
        'salesforcesends',
        'salesforcesendsv5',
        'shared_content',
        'shared_contextual_suppression_list',
        'shared_data',
        'shared_dataextension',
        'shared_email',
        'shared_item',
        'shared_portfolio',
        'shared_publication',
        'shared_salesforcedataextension',
        'shared_suppression_list',
        'shared_survey',
        'shared_template',
        'ssjsactivity',
        'suppression_list',
        'survey',
        'synchronizeddataextension',
        'template',
        'triggered_send',
        'triggered_send_journeybuilder',
        'userinitiatedsends'
    ]
    const resp = {};

    for (let t in contentTypes) {
        const folderReq = await sfmc.soap.retrieveBulk(`DataFolder`, [
            "Name",
            "ParentFolder.ID",
            "ParentFolder.Name",
            "ID",
            "ContentType",
            "CreatedDate",
            "ModifiedDate",
            "Client.ID"
        ], {
            filter: {
                leftOperand: "ContentType",
                simpleOperator: "equals",
                rightOperand: contentTypes[t]
            }
        })

        if (folderReq.OverallStatus === "OK") {
            resp[contentTypes[t]] = folderReq.Results
        }
    }

    res.json(resp)
})

router.get('/assets/id/:id', async(req, res) => {
    if (!req.params.id) {
        throw new Error('Asset ID is required.')
    }

    //Transform param to Number
    const id = Number(req.params.id);
    const resp = await sfmc.rest.get(`/asset/v1/content/assets/${id}`)
    res.json(resp)
})

router.get('/assets/id/:id/file', async(req, res) => {
    if (!req.params.id) {
        throw new Error('Asset ID is required.')
    }

    //Transform param to Number
    const id = Number(req.params.id);
    const resp = await sfmc.rest.get(`/asset/v1/content/assets/${id}/file`)
    res.json(resp)
})


module.exports = router;