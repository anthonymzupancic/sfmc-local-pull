var express = require('express');
var config = require('../../../config/sp_sandbox.json')

const SDK = require('sfmc-sdk');

module.exports.setAuth = (mid) => {
    const sfmc = new SDK({
            client_id: config.auth_client_id,
            client_secret: config.client_secret,
            auth_url: config.auth_base,
            account_id: mid ? Number(mid) : Number(config.auth_mid),
        },
        true
    );

    return sfmc
};