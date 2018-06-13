const getTextParser = require('gettext-parser');
const util = require('./traverseDir.js');
const fs = require('fs');


util.traverseDir('./translations/',function(err,res){

if(!err){
for(let i=0,len = res.length;i < len ; i++){
	let jsonData = null;
	let processedData = [];
	let filePath = res[i].split("/");
	let fileNameWExt = filePath[filePath.length -1];//res[i].substr(res[i].lastIndexOf("/")+1,res[i].lastIndexOf(".po"));
	let poFileExists = fileNameWExt.indexOf(".po") > -1;
	let fileName = fileNameWExt.split(".")[0];
	if(!poFileExists){
		continue;
	}
	try {
    let contents = fs.readFileSync(res[i]);
    jsonData = getTextParser.po.parse(contents)//po2json.parseFileSync('./translations/ja-JP/ja-JP.po');
    // do something interesting ...
    let translations = jsonData.translations;
    for(let k in translations){
    	if(k !== "" && k.indexOf("gor.dynamic") === -1){
    	let tuple = translations[k];
    	let msgObj = tuple[Object.keys(tuple)[0]];
    	let obj = {};
    	obj["id"] = k;
    	obj["defaultMessage"] = msgObj.msgid
    	processedData.push(obj)
    }
    }
    
    fs.writeFileSync('./src/translations/'+fileName+'.json',JSON.stringify(processedData));
    console.log('./src/translations/'+fileName+'.json successfully created.');
    
} catch (e) {
	console.log(e.toString());
}
}
}
else{
	console.log(err);
}


})
