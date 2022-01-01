const soapJSONPayload = {
    "Name": "Data Extension from sfmc-sdk API_15",
    "Description": "Data Extension from sfmc-sdk API_15",
    "CustomerKey": "Data Extension from sfmc-sdk API_15",
    "IsSendable": true,
    "IsTestable": true,
    "Fields": [{
            "Name": "SubscriberKey",
            "FieldType": "Text",
            "MaxLength": 200,
            "IsRequired": true,
            "IsPrimaryKey": true
        },
        {
            "Name": "EmailAddress",
            "FieldType": "EmailAddress",
            "IsRequired": true
        }
    ],
    "SendableDataExtensionField": {
        "Name": "EmailAddress"
    },
    "SendableSubscriberField": {
        "Name": "Subscriber Key"
    },
    "DataRetentionPeriodLength": 10,
    "DataRetentionPeriod": "Days",
    "RowBasedRetention": true,
    "ResetRetentionPeriodOnImport": false,
    "DeleteAtEndOfRetentionPeriod": false
}

const formatted = formatPayloadArray(soapJSONPayload)
console.log(formatted)


function formatPayloadArray(obj) {
    let orgObj = obj;
    const formatted = formatArray(obj, orgObj)
    return formatted
}

function formatArray(obj, orgObj) {
    console.log('in format Array fn')

    for (let a in obj) {
        if (typeof obj[a] === 'object') {
            if (!Array.isArray(obj[a])) {
                formatArray(obj[a])
            } else {
                let key;
                //console.log(a)
                switch (a) {
                    case 'Fields':
                        key = 'Field';
                        break;
                    case 'Activities':
                        key = 'Activity';
                        break;
                }
                orgObj[a] = {
                    [key]: obj[a]
                }
            }
        }
    }
    return orgObj
}