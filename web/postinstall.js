const fs = require("fs");
const path = require("path");

const jqueryPath = path.join(__dirname, "node_modules/jquery/dist/jquery.min.js");

fs.copyFileSync(jqueryPath, path.join(__dirname, "app/js/libs/jquery/jquery.min.js"));
