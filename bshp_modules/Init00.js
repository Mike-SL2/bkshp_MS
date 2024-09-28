//Iitialization module v.5.0.1 for bookshop prj
'use strict';
const verbose = true, startMark ='    --- ' ;		if (verbose) {console.log(startMark+'Init00 module loaded ---');}
const msgSrv = (msgObj) => {
	if (!verbose) {return;}
	if (typeof msgObj !='object') {console.log('msgSrv error');return;}
	for (let key in msgObj){
		if (key.length<2) {
			console.log(startMark,msgObj[key].match(/\b\w{1,}\b/)[0],':',msgObj[key].match(/\s.+/)[0]);
		} else {console.log(key,': ',msgObj[key]);}}
},
doc0 = document, sto = 100, flex = 'flex',
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
//returns DOM element with className
putEl = (className='',innerContent='',altTxt='') => {
	let aux; 
	if (altTxt) {
		aux = doc0.createElement('img');	aux.src = innerContent;		aux.alt=altTxt;} 
	else {
		if (className.match(/Btn/)) {aux = doc0.createElement('button');}
		else {aux = doc0.createElement('div');}	
		aux.innerHTML=innerContent;} 
	if (className) { aux.className=className; }	return aux;
},
// add 'px' to the input value
plusPX = (value=0)=>{
	const px = 'px ';
	if (isNaN(value)) {return '0'+px;
	} else {
		if (value>1) {return Math.round(value)+px;} 
			else {return value+px;}
	};
},
//cart to local store bridge
processCart = (itemID=null,putToCart=false) => {
msgSrv({'':'processCart func loaded','write to Cart':putToCart,'value':itemID});
     const keyName = 'cart9170436'; 
     let aux=localStorage.getItem(keyName), temp=[];	
 	if (aux) {
		aux=JSON.parse(aux);		
	} else {aux=[];}
	if (itemID===null) {msgSrv({'processCart read Cart': aux}); return aux;}
	if (putToCart) {aux.push(itemID); }
	else { 		
		aux.forEach((i)=>{			
			if (JSON.stringify(itemID)!=JSON.stringify(i)) {temp.push(i);}
		}); aux=temp;						  
	};		localStorage.setItem(keyName,JSON.stringify(aux));	
},
//cart_bage element content fill
cartBage = () =>{
const cart_bage=doc0.querySelector('.cart_bage'), cartItemsQuantity = processCart().length; 
	if (cartItemsQuantity) {
		cart_bage.style.display=flex; cart_bage.innerHTML=cartItemsQuantity;}
	else {	cart_bage.style.display=''; }						  
};


//-------------------------------------------------------
headerColor();

// this mod defined constants list display
msgSrv({'':'Init00 module global func/const list ---',
	'verbose':verbose,
	'doc0':doc0,		'sto':sto, 'flex':flex,	
	'siList':siList,
	'getProp2':getProp2,
	'headerColor':headerColor,
	'putEl':putEl,
	'plusPX':plusPX,
	'processCart':processCart,
	'cartBage':cartBage});