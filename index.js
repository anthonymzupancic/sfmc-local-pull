const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const axios = require('axios');
const fs = require('fs');

require('dotenv').config()

const authCreds = {
  "client_id": process.env.CLIENT_ID, 
  "client_secret": process.env.CLIENT_SECRET,
  "client_type": 'application/json',
  "grant_type": 'client_credentials'
}

  /////////////////////////////////////////////
  //   Place Content Builder Folder ID Here  //
  /////////////////////////////////////////////

  const sourceFolderID = ""


  //Authenticate API Calls
   auth(authCreds)
  .then((authRes)=> {
    const restBase = authRes.rest_instance_url
    const accessToken = authRes.access_token

    const config = {
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json"
      }
    }

      //Get content builder assets based on folderID
      getAssets(restBase, config, sourceFolderID)
      .then((assetsRes) => {

          //Iterate through items array
          assetsRes.data.items.forEach((item) =>{
              console.log(item.id)

            let data = JSON.stringify(item, null, 2);
            let fileName = `${item.id} - ${item.name}`

            //Write data to new file
            //fileName => ##### - AssetName
            fs.writeFile(fileName, data, (err) => {
                if (err) throw err;
                console.log('Data written to file');
            });

          })

       })

  })
  .catch((err) => {
    console.log(err)
  })



 async function auth(creds) {

  let authURL = process.env.AUTH_URL

  const response = await axios.post(authURL, creds)
  return response.data
  }


  async function getAssets(restBase, config, sourceFolderID) {
    
      //If sourceFolderID provided filter request based on folder else pull from unfiltered assets
      let assetsEndpoint = (typeof sourceFolderID !== 'undefined' || sourceFolderID !== "") ? 
        `${restBase}/asset/v1/content/assets?$filter=category.id=${sourceFolderID}` 
        : `${restBase}/asset/v1/content/assets`
    
    
    const assets = await axios.get(assetsEndpoint, config)
    return assets
  }


 app.listen(port, () => {
  console.log(`running at port ${port}`);
});
