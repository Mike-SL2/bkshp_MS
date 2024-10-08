//Iitialization module v.7.0.2 for bookshop prj
'use strict';
const verbose = false, startMark ='    --- ' ;		if (verbose) {console.log(startMark+'Init00 module loaded ---');}
//false true
const msgSrv = (msgObj) => {
	if (!verbose) {return;}
	if (typeof msgObj !='object') {console.log('msgSrv error');return;}
	for (let key in msgObj){
		if (key.length<2) {
			console.log(startMark,msgObj[key].match(/\b\w{1,}\b/)[0],':',msgObj[key].match(/\s.+/)[0]);
		} else {console.log(key,': ',msgObj[key]);}}
},
cnst = {'doc0':document, 'sto':100, 'flex':'flex', 'es':'', 'blk':'block', 'none':'none', 'loadDelay':500, 'cardQuantity':6},
//goods categories
siList=['Architecture','Art & Fashion','Biography','Business','Crafts & Hobbies','Drama','Fiction','Food & Drink',
	'Health & Wellbeing','History & Politics','Humor','Poetry','Psychology','Science','Technology','Travel & Maps'],

getProp2 = (DomElement,propertyName) =>{
	   const funcName = 'getProp2 ';
	   let prVal = window.getComputedStyle(DomElement,null).getPropertyValue(propertyName);		
		if (prVal.match(/px/)) {prVal=Math.round(prVal.match( /\d+/ )[0]);}
	msgSrv( {'A':funcName+'func loaded',
		 'getProp2 DomElement':DomElement,
		 'getProp2 propertyName':propertyName,
		 'getProp2_return':prVal})
	return prVal;	
},
//setting style properties	
setProp = (domEl,propObj)=>{
	const elementStyle = domEl.style; 
	for (let prop in propObj){	elementStyle[prop]=propObj[prop];	}
},
//get header color from body background color
headerColor = () => {
	msgSrv({'headerColor func': 'loaded'});
	const body=cnst.doc0.body,
	bodyColor= getProp2(body,'background-color'),	headerWrap=cnst.doc0.querySelector('.header_wrap');
msgSrv({'body-color':bodyColor});
   if (headerWrap){let headerWrapStyle=headerWrap.style;

	if (bodyColor==='rgba(0, 0, 0, 0)') {headerWrapStyle.backgroundColor = 'white';
	} else {headerWrapStyle.backgroundColor = bodyColor;}

   } else {return;} 
},
//returns DOM element with className
putEl = (className=cnst.es,innerContent=cnst.es,altTxt=cnst.es) => {
	let aux; 
	if (altTxt) {
		aux = cnst.doc0.createElement('img');	aux.src = innerContent;		aux.alt=altTxt;} 
	else {
		if (className.match(/Btn/)) {aux = cnst.doc0.createElement('button');}
		else {aux = cnst.doc0.createElement('div');}	
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
processCart = (itemID=null, putToCart=false, emptyCart=false) => {
msgSrv({'':'processCart func loaded','write to Cart':putToCart,'value':itemID});
     const keyName = 'cart9170436'; 
     let aux=localStorage.getItem(keyName), temp=[], putToCartEnable = true;	
 	if (aux) {
		  if (emptyCart) {localStorage.setItem(keyName,JSON.stringify([]));
				  msgSrv({'processCart': 'client cart has been cleaned out'});return true;}
		  aux=JSON.parse(aux);		
	  } else {aux=[];}
	aux.forEach((i)=>{			
			if (JSON.stringify(itemID)===JSON.stringify(i)) {putToCartEnable = false;} else {temp.push(i);}
			});
	//returns cart contents when called with no args 
	if (itemID===null) {msgSrv({'processCart read Cart': aux}); return aux;}
	//put an item to the cart if the cart doesn't have it
	if (putToCart) {if (putToCartEnable) {aux.push(itemID);} else { msgSrv({'processCart': 'item is already in cart','processCart rejected':itemID});
									return  putToCartEnable;}}
	else { 	
	      putToCartEnable = true;	
	      aux=temp;						  
	};		localStorage.setItem(keyName,JSON.stringify(aux));
// returns true if cart operation was successful
return putToCartEnable;	
},
//cart_bage element content fill
cartBage = () =>{
const cart_bage=cnst.doc0.querySelector('.cart_bage'), cartItemsQuantity = processCart().length; 
msgSrv({'':'cartBage func loaded','cartBage volume':cartItemsQuantity});
	if (cartItemsQuantity) {
		cart_bage.style.display=cnst.flex; cart_bage.innerHTML=cartItemsQuantity;}
	else {	cart_bage.style.display=cnst.es; }						  
};

//-------------------------------------------------------
headerColor();

// this mod defined constants list display
const shC173392 = function () {
const globConstList = {
	'verbose':verbose,
	'cnst':cnst,
	'siList':siList,
	'getProp2':getProp2,
	'setProp':setProp,
	'headerColor':headerColor,
	'putEl':putEl,
	'plusPX':plusPX,
	'processCart':processCart,
	'cartBage':cartBage}, prefix2 ='Init00 --- ';
let globConstListPlus ={'':prefix2+'module global func/const list ---'}, keyName2;
for (let key in globConstList) {keyName2 = prefix2+key;
				globConstListPlus[keyName2] = globConstList[key];}
msgSrv(globConstListPlus);
}();





