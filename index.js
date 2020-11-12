const core = require('@actions/core');
const wait = require('./wait');
const fs = require("fs");

var file = './search-data.json'; //(with path)
var fileUrl = './restricted-urls.json'; //(with path)

var filex = './search-data-x.json'; //(with path)

// most @actions toolkit packages have async methods
async function run() {
  try {

    core.info(`Opening search-data.json file ...`);
  
    let data = fs.readFileSync(file, 'utf8');
    let obj = JSON.parse(data);
    let root = obj;
    
    core.info('\x1b[0m',` `);
    core.info(`Opening URL list file ...`);

    let urlList = fs.readFileSync(fileUrl, 'utf8');
    let urls = JSON.parse(urlList);
    
    core.info(` `);
    core.info("Urls to be removed: " + urls)

    for (var n = 0; n< urls.length; n++) {

      let url = urls[n];

      core.info (" > Removing " + url);
      for (var i = 0; i < root.length; i++){
        // look for the entry with a matching `code` value
        if (root[i] && root[i].url.includes(url)){          
          core.info ("   > URL" + root[i].url + " with index " + i + " removed")  ;
          delete root[i]
        }
      }
    
    }
      
    data = JSON.stringify(root, null, 2);
    fs.writeFileSync(file, data, 'utf8');
        
    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true    
    core.info((new Date()).toTimeString());
    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
