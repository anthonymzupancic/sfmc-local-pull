const prop = require('../properties/accounts')
var auth = require('./auth')
var sfmc = auth.setAuth();

module.exports.getAccountMids = async() => {
    const req = await sfmc.soap.retrieve('List', [
        'ID',
        'Client.ID',
        'ListName'
    ], {
        QueryAllAccounts: true,
        filter: {
            leftOperand: 'ListName',
            operator: 'equals',
            rightOperand: 'All Subscribers'
        }
    })

    const resp = [];
    await req.Results.forEach((a) => { resp.push(a.Client.ID) })

    return resp
}
