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

  let d = new Date();
  var datestring = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  console.log(datestring)

  let dirRoot = "./" + d.getFullYear() + "/" + datestring
 
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
            let assetType = item.assetType.displayName;
            let fileName = item.name

            //Create JSON structure for new asset post
            let post = {};
            post.name = item.name
            post.assetType = item.assetType;
            post.category = item.category;

            if (item.content) {post.content = item.content};
            if (item.meta) {post.meta = item.meta}
            if (item.slots) {post.slots = item.slots}
            if (item.views) {post.views = item.views}


            let postData = JSON.stringify(post, null, 2) 

            //Create folder directory
            fs.mkdir(dirRoot + "/" + assetType + "/" + fileName, { recursive: true }, function(err) {
              if (err) {
                console.log(err)
              } else {
                console.log("New directory successfully created.")
              }
            })


            setTimeout(()=>{
              //Write data to new file
              //fileName => ##### - AssetName
              fs.writeFile(dirRoot + "/" + assetType + "/" + fileName + "/" + fileName + ".json", data, (err) => {
                  if (err) console.log(err);
                  console.log('Data written to file');
              });

              //Write JSON file for API post
              fs.writeFile(dirRoot + "/" + assetType + "/" + fileName + "/" + "post_" + fileName + ".json", postData, (err) => {
                  if (err) console.log(err);
                  console.log('Data written to post file');
              });
            },200)
            

          })

       })

  })
  .catch((err) => {
    console.log(err)
  })



 async function auth(creds) {
  let authURL = process.env.AUTH_URL

  const response =  await axios.post(authURL, creds)
  return response.data
  }


  async function getAssets(restBase, config, categoryID) {
    
    const assets = await axios.get(restBase + '/asset/v1/content/assets?$filter=category.id=' + categoryID, config)
    return assets
  }


 app.listen(port, () => {
  console.log(`running at port ${port}`);
});
