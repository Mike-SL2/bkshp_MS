//Iitialization module v.2.0.1 for bookshop prj
'use strict';
const verbose = false, startMark ='    --- ' ;		if (verbose) {console.log(startMark+'Init00 module loaded ---');}
const msgSrv = (msgObj) => {
	if (!verbose) {return;}
	if (typeof msgObj !='object') {console.log('msgSrv error');return;}
	for (let key in msgObj){
		if (key.length<2) {
			console.log(startMark,msgObj[key].match(/\b\w{1,}\b/)[0],':',msgObj[key].match(/\s.+/)[0]);
		} else {console.log(key,': ',msgObj[key]);}}
},
doc0 = document,
//goods categories
siList=['Architecture','Art & Fashion','Biography','Business','Crafts & Hobbies','Drama','Fiction','Food & Drink',
	'Health & Wellbeing','History & Politics','Humor','Poetry','Psychology','Science','Technology','Travel & Maps'],

getProp2 = (DomElement,propertyName) =>{
	   const funcName = 'getProp2 ';
	   let prVal = window.getComputedStyle(DomElement,null).getPropertyValue(propertyName);		
		if (prVal.match(/px/)) {prVal=Math.round(prVal.match( /\d+/ )[0]);}
	msgSrv( {'A':funcName+'func loaded',
		 'DomElement':DomElement,
		 'propertyName':propertyName,
		 'getProp2_return':prVal})
	return prVal;	
},	
//get header color from body background color
headerColor = () => {
	msgSrv({'headerColor func': 'loaded'});
	const body=doc0.body,
	bodyColor= getProp2(body,'background-color'),	headerWrap=doc0.querySelector('.header_wrap');
msgSrv({'body-color':bodyColor});
   if (headerWrap){let headerWrapStyle=headerWrap.style;

	if (bodyColor==='rgba(0, 0, 0, 0)') {headerWrapStyle.backgroundColor = 'white';
	} else {headerWrapStyle.backgroundColor = bodyColor;}

   } else {return;} 
},
// add 'px' to the input value
plusPX = (value=0)=>{
	const px = 'px ';
	if (isNaN(value)) {return '0'+px;
	} else {return Math.round(value)+px;}
};
//-------------------------------------------------------
headerColor();

// this mod defined constants list display
msgSrv({'':'Init00 module global func/const list ---',
	'verbose':verbose,
	'doc0':doc0,	
	'siList':siList,
	'getProp2':getProp2,
	'headerColor':headerColor,
	'plusPX':plusPX});