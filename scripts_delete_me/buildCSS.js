const fs = require('fs');
const child_process = require('child_process');

var files = fs.readdirSync('src/assets/css/components/');

files.forEach(function(file) {
  let cssFileName = (file.split("_")[1].split(".")[0]);
  child_process.execSync("node-sass src/assets/css/components/"+file+" -o public/assets/components/"+cssFileName+" --output-style expanded")
});

//console.log(files);