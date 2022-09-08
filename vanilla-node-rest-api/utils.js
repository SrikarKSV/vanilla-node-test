const fs = require("fs");

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf-8", (err) => {
    if (err) {
      console.log(`💥💥 ERROR: ${error}`);
    }
  });
}

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => resolve(body));
    } catch (error) {
      reject(`💥💥 ERROR: ${error}`);
    }
  });
}

module.exports = {
  writeDataToFile,
  getPostData,
};
