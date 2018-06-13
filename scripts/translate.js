const fs = require("fs");
const content = require("../src/translations/en-US.json");

//var content =  fs.readFileSync('src/translations/en-US.json');
var historyMap = {}
var potString=`# SOME DESCRIPTIVE TITLE.
# Copyright (C) YEAR THE PACKAGE'S COPYRIGHT HOLDER
# This file is distributed under the same license as the PACKAGE package.
# FIRST AUTHOR <EMAIL@ADDRESS>, YEAR.
#
#, fuzzy
msgid ""
msgstr ""
"Project-Id-Version: PACKAGE VERSION"
"Report-Msgid-Bugs-To: "
"POT-Creation-Date: 2018-03-09 08:50+0000"
"PO-Revision-Date: YEAR-MO-DA HO:MI+ZONE"
"Last-Translator: FULL NAME <EMAIL@ADDRESS>"
"Language-Team: LANGUAGE <LL@li.org>"
"Language: "
"MIME-Version: 1.0"
"Content-Type: text/plain; charset=CHARSET"
"Content-Transfer-Encoding: 8bit"


`;
for(let i=0,len= content.length; i < len ;i++){
	if(!historyMap[content[i].id]){
		potString+=`#: ${content[i].id}
		msgctxt "${content[i].id}"
		msgid "${(content[i].defaultMessage).replace(/(?:\r\n|\r|\n)/g, ' ')}"
		msgstr ""

		`;
		historyMap[content[i].id] = content[i].id
	}
}
try{
fs.writeFileSync('translation-template.pot',potString,'utf8');
console.log(".pot file successfully created");
}
catch(ex){
	console.log("Error in JSON to .pot creation: "+ex.toString())
}

//console.log(potString);
