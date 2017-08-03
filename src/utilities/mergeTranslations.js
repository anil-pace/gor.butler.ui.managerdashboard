/**
 * This node js util is to find out the missing translations in different languages
 * which 
 * @type {[type]}
 */
var fs = require('fs');
var enTranslationMessages =require ('../translations/en-US.json');
const MESSAGES_PATTERN='../translations/**/*.json';
const LANG_DIR       ='../translations/';
const MISSING_TRANS_DIR = LANG_DIR+'missing/';

fs.readdir(LANG_DIR,(err, files)=>{
	for (let i=0;i<files.length;i++){
		let aMissedTranslations=[];
		console.log('Translation files found:'+files[i]);
		console.log('Reading the translation files');
		if (files[i].match(/.json/g) && !files[i].match(/en-US.json/g)){
			fs.readFile(LANG_DIR+files[i], (err, data) => {
				if (err) throw err;
				 // since enTranslationMessages is the base for all translations
				 // so comparing the others with the base and finding the difference
				let objTranslations = JSON.parse(data);
				for (let i = 0 ; i< enTranslationMessages.length; i++){
					let bMissingTranslation = true;
					for (let j = 0 ; j < objTranslations.length; j++){	
						if (enTranslationMessages[i].id===objTranslations[j].id){
							bMissingTranslation = false;
							break ;
						}
					}
					if (bMissingTranslation){
						aMissedTranslations.push(JSON.stringify(enTranslationMessages[i],null,'\t'));
					}
				}
				let fsText = null;
				fsText ='[\n'+aMissedTranslations.join (',\n')+'\n]';
				fs.writeFile(MISSING_TRANS_DIR+'missing-'+files[i],fsText, (err) => {
					if (err) throw err;
					console.log('Missing Translations Saved for:'+files[i]+
					            'in file: '+MISSING_TRANS_DIR+'missing-'+files[i] );
				});
			});
		}
	}
})