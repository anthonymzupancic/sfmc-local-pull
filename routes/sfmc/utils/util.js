const fs = require('fs');
const fsPromises = require("fs").promises;

let d = new Date();
var datestring = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  
module.exports.createDir = async(dirRoot, dirName) => {
   

    try {
        await fsPromises.access(dir, fs.constants.F_OK);
      } catch (e) {
        await fsPromises.mkdir(dir);
      }

      
//   //Create folder directory
//   fs.mkdir(`${dirRoot}/${d.getFullYear()}/${datestring}/${dirName}`, { recursive: true }, function(err) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('Directory Created')
//     }
//   })
};


 
module.exports.createFile = async(dirRoot, dirName, fileName, fileData) => {
   
fs.writeFile(`${dirRoot}/${d.getFullYear()}/${datestring}/${dirName}/${fileName}`, fileData, (err) => {
    if (err) {
        console.log(err)
      } else {
        console.log('Directory Created')
      }
    });
  };


  
