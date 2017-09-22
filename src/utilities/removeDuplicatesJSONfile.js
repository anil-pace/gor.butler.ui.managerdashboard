/**
 * This node js util is to find out the missing translations in different languages
 * which 
 * @type {[type]}
 */
 var fs = require('fs');
 var enTranslationMessages =require ('../translations/en-US.json');
 const MESSAGES_PATTERN='../translations/**/*.json';
 const LANG_DIR       ='../translations/';
 const UNIQUE_JSON_DIRECTORY = LANG_DIR+'UNIQUE/';

 fs.readdir(LANG_DIR,(err, files)=>{
 	for (let x=0;x<files.length;x++){
 		let aMissedTranslations=[];
 		console.log('Translation files found:'+files[x]);
 		console.log('Reading the translation files');
 		if (files[x].match(/.json/g) && !files[x].match(/en-US.json/g)){
 			fs.readFile(LANG_DIR+files[x], (err, data) => {
 				if (err) throw err;
				// since enTranslationMessages is the base for all translations
				// so comparing the others with the base and finding the difference
				let objTranslations = JSON.parse(data);
				
				let strUniqueObjects=[];
				//as objTranslations is an array of objects
				Object.keys(objTranslations).forEach(function(key) {
					if (!strUniqueObjects.hasOwnProperty(key)){
						strUniqueObjects.push(JSON.stringify(objTranslations[key],null,'\t'));
					}
				});

				let fsText = '[\n'+strUniqueObjects.join (',\n')+'\n]';
				console.log('Number of translations in '+files[x]+ objTranslations.length);
				console.log('Number of UNIQUE translations in '+files[x]+ strUniqueObjects.length);
				fs.writeFile(UNIQUE_JSON_DIRECTORY+'UNIQUE-'+files[x],fsText, (err) => {
					if (err) throw err;
					console.log('UNIQUE Translations Saved for:'+files[x]+
					            'in file: '+UNIQUE_JSON_DIRECTORY+'UNIQUE-'+files[x] );
				});
			});
 		}
 	}
 })
