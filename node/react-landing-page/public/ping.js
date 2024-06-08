  const https = require('https');

  async function checkEPStatus(url) {
      return new Promise(function(myResolve, myReject) {
          https.get(url, (resp) => {
              myResolve(resp.statusCode);
          }).on("error", (err) => {
              console.log("Error: " + err.message);
              myReject(err);
          })
      });
  }
  
  async function getTheStatus(url) {
      var status = await checkEPStatus(url);
      return status;
  }
  
  async function waitForEP(url,resolve,reject) {
      var status = await getTheStatus(url);
      console.log("KEY STATUS:"+status);
      if ( status == 404) { //ingress not fully formed
          waitForEP(url,resolve,reject);
      } else /*if (status == 302)*/ {
          console.log("PASSING BACK(Resolving)");
          resolve();
      }
  }
  
  export function ensureEPIsSet(url) {
      return new Promise(function (resolve, reject) {
          waitForEP(url,resolve,reject);
      });
  }