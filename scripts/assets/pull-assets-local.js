const auth = require('../../routes/sfmc/utils/auth')
const util = require('../../routes/sfmc/utils/util')
const assets = require('../../routes/sfmc/utils/asset')
const config = require('../../config/sp_sandbox.json')
const localDir = config.local_dir;

const assetTypes = ['htmlemail', 'templatebasedemail']

pullAssets()

async function pullAssets(){
    const sfmc = await auth.setAuth(6275722)
    const pullAssetsReq = await assets.getAssetsByType(sfmc, assetTypes)
    const items = pullAssetsReq.items;
    assets.saveLocal(items, localDir);
    //console.log(pullAssetsReq)
    //util.createDir(localDir, 'assets', 'test folder')
}