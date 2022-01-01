const prop = require('../properties/assets')
const util = require('../utils/util')
var auth = require('./auth')

module.exports.getAssets = async(client) => {
    const resp = await client.rest.get('/asset/v1/content/assets')
    return resp
}

module.exports.getAssetsByType = async(client, assetTypes) => {
    const resp = await client.rest.post(`/asset/v1/content/assets/query`, {
        "page":
        {
            "page": 1,
            "pageSize": 3
        },
    
        "query":
        {
 
                "property":"assetType.name",
                "simpleOperator":"in",
                "value": assetTypes
        }
    })
    return resp
}


module.exports.saveLocal = async(items, localDir) => {
    for(let i = 0; i < items.length; i++){
        const item = items[i]
        
        const itemName = item.name.indexOf('.') > 0 ? item.name.substring(0, item.name.indexOf('.')) : item.name;
        const dirName = `assets/${item.assetType.name}/${item.id}-${itemName}`

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
        let requestData = JSON.stringify(item, null, 2)

        const dir = await util.createDir(localDir, dirName)
        const postFile = await util.createFile(localDir, dirName, `${item.name}.js`, postData)

        console.log(dir)
        console.log(postFile)
    }
  }
