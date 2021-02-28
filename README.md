# SFMC Local File Pull

## What is this?
This is an in progress script that pulls assets from Salesforce Marketing Cloud Content Builder and writes them locally to dedicated files.

This script can be run with a category ID (folder ID) to narrow the scope or without.

At the moment, the script does not paginate/pull _all_ assets or place them in any sort of foldering structure but may be included at some point!


## Useage
1. Fork repository to your Github Account
2. Clone repository locally
3. Run `npm install` to install dependancies
4. Create `.env` file following using the variables below
5. Run `node index.js`


## SFMC API Configuration
To use the SFMC APIs for this script, create a server-to-server Installed Package and place the values in the `.env` file.


### .env Configuration
```
CLIENT_ID=  /// CLIENT ID HERE ///
CLIENT_SECRET=   /// CLIENT SECRET HERE ///
AUTH_URL=https://   /// SFMC SUBDOMAIN ///   .auth.marketingcloudapis.com/v2/token
REST_URL=https://   /// SFMC SUBDOMAIN ///   .rest.marketingcloudapis.com/
```
