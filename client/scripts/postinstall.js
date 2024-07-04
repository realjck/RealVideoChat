const fs = require("fs");
const path = require("path");

const ablyPath = path.join(__dirname, "../node_modules/ably/build/ably.min.js");
const jqueryPath = path.join(__dirname, "../node_modules/jquery/dist/jquery.min.js");


fs.copyFileSync(ablyPath, path.join(__dirname, "../web/app/js/libs/ably/ably.min.js"));
fs.copyFileSync(jqueryPath, path.join(__dirname, "../web/app/js/libs/jquery/jquery.min.js"));
