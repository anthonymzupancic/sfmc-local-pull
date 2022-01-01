var express = require('express');
var router = express.Router();

var sfmc = require('./utils/auth')

//TODO: move props array to dedicated js file
const deProps = [
    'CategoryID',
    'CreatedDate',
    'CustomerKey',
    'DataRetentionPeriod',
    'DataRetentionPeriodLength',
    'DataRetentionPeriodUnitOfMeasure',
    'DeleteAtEndOfRetentionPeriod',
    'Description',
    'IsSendable',
    'IsTestable',
    'ModifiedDate',
    'Name',
    'ObjectID',
    'ResetRetentionPeriodOnImport',
    'RetainUntil',
    'RowBasedRetention',
    'Status',
];

const deFieldProps = [
    'IsPrimaryKey',
    'IsRequired',
    'MaxLength',
    'ModifiedDate',
    'Name',
    'ObjectID',
    'Ordinal',
    'Scale',
    'FieldType',
];

const queryProps = [
    'Name',
    'DataExtensionTarget.Name',
    'ObjectID',
    'QueryText',
]

const importProps = [
    'DestinationObject',
    'DestinationType',
    'UpdateType',
]

router.get(`/`, async(req, res) => {

    const request = await sfmc.soap.retrieveBulk('DataExtension', deProps, {});
    const resp = request.Results.sort((a, b) => { return new Date(b.CreatedDate) - new Date(a.CreatedDate) })
    res.json(resp)
})

router.get('/create', async(req, res) => {
    try {
        // const soapJSONPayload = {
        //     "Name": "Data Extension from sfmc-sdk API_20",
        //     "Description": "Data Extension from sfmc-sdk API_20",
        //     "CustomerKey": "Data Extension from sfmc-sdk API_20",
        //     "IsSendable": true,
        //     "IsTestable": true,
        //     "Fields": [{
        //             "Name": "SubscriberKey",
        //             "FieldType": "Text",
        //             "MaxLength": 200,
        //             "IsRequired": true,
        //             "IsPrimaryKey": true
        //         },
        //         {
        //             "Name": "EmailAddress",
        //             "FieldType": "EmailAddress",
        //             "IsRequired": true
        //         }
        //     ],
        //     "SendableDataExtensionField": {
        //         "Name": "EmailAddress"
        //     },
        //     "SendableSubscriberField": {
        //         "Name": "Subscriber Key"
        //     },
        //     "DataRetentionPeriodLength": 10,
        //     "DataRetentionPeriod": "Days",
        //     "RowBasedRetention": true,
        //     "ResetRetentionPeriodOnImport": false,
        //     "DeleteAtEndOfRetentionPeriod": false
        // }

        const iter = 6;
        const soapJSONPayload = {
            "Name": "Automation from sfmc-sdk API_" + iter,
            "Description": "Automation from sfmc-sdk API_" + iter,
            "CustomerKey": "Automation from sfmc-sdk API_" + iter,
            //"AutomationTasks": [{}],
            "Notifications": [{
                    "Address": "tony@trendlinei.com",
                    "NotificationType": "Complete",
                    "ChannelType": 1
                },
                {
                    "Address": "tony@trendlinei.com",
                    "NotificationType": "Error",
                    "ChannelType": 1
                }
            ]
        }

        const resp = await sfmc.soap.create('Automation', soapJSONPayload, {})
        console.log(resp)
        res.json(resp)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get(`/name/:name`, async(req, res) => {
    if (!req.params.name) {
        throw new Error('Name is required.')
    }

    const deName = req.params.name;
    const resp = await sfmc.soap.retrieve('DataExtension', deProps, {
        filter: {
            leftOperand: 'Name',
            operator: 'equals',
            rightOperand: deName
        }
    });

    res.json(resp)
})

router.get(`/name/:name/fields`, async(req, res) => {
    if (!req.params.name) {
        throw new Error('Name is required.')
    }

    const deName = req.params.name;
    //TODO: create utils file for re-usable API calls
    const deResp = await sfmc.soap.retrieve('DataExtension', deProps, {
        filter: {
            leftOperand: 'Name',
            operator: 'equals',
            rightOperand: deName
        }
    })
    const deCustomerKey = deResp.Results[0].CustomerKey;

    const request = await sfmc.soap.retrieve('DataExtensionField', deFieldProps, {
        filter: {
            leftOperand: 'DataExtension.CustomerKey',
            operator: 'equals',
            rightOperand: deCustomerKey
        }
    });

    const resp = request.Results.sort((a, b) => { return a.Ordinal - b.Ordinal })
    res.json(resp)
})


router.get(`/existsinquery/:name`, async(req, res) => {
    if (!req.params.name) {
        throw new Error('Name is required.')
    }

    const deName = req.params.name;
    const resp = await sfmc.soap.retrieve('QueryDefinition', queryProps, {
        filter: {
            leftOperand: 'DataExtensionTarget.Name',
            operator: 'equals',
            rightOperand: deName
        }
    });

    res.json(resp)
})

router.get(`/existsinimport/:name`, async(req, res) => {
    if (!req.params.name) {
        throw new Error('Name is required.')
    }

    const deName = req.params.name;
    const resp = await sfmc.soap.retrieve('ImportDefinition', importProps, {
        filter: {
            leftOperand: 'DestinationObject.Name',
            operator: 'equals',
            rightOperand: deName
        }
    });

    res.json(resp)
})

module.exports = router;