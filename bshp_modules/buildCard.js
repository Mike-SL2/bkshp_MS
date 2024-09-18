//building card
//dependencies: Init00.js, rst-0.css, cardStyl.css
'use strict';
const buildCard = (container,   opt1={},
     				klas={},
     				opt2={}) => {
let review=' review';
const opt1Default = {
	'imageSrc':'goodImg0.png',
	'imageAlt':'book cover image',
	'author':'Kevin Kwan',
	'caption':'Crazy rich asians',
	'reviewCnt':252,
	'annot':'The Outrageously Funny Debut Novel About Three Super-Rich, Pedigreed Chinese Families And The Gossip about third world war',
	'price':4.99,
	'buyNowBtnTxt':'BuY nOW'
},
klasDefault={
	'goodImgWrap':'goodImgWrap',
	'coverPH':'coverPH',
	'goodImg':'goodImg',
	'spc1':'spc1',
	'goodDesc':'goodDesc',
	'author':'author',
	'caption':'caption',
	'rating':'rating',
	'ratStar':'ratStar',
	'reviewCnt':'reviewCnt',
	'annot':'annot',
	'price':'price',
//buyNowBtn key value should contain 'Btn' in the name
	'buyNowBtn':'buyNowBtn'
},
opt2Default={
	'noCvrImgText':'NO COVER IMAGE',
	'coverShdClr':'lightgray'
},
putEl = (className,innerContent='',altTxt='') => {
	let aux; 
	if (altTxt) {
		aux = doc0.createElement('img');	aux.src = innerContent;		aux.alt=altTxt;} 
	else {
		if (className.match(/Btn/)) {aux = doc0.createElement('button');}
		else {aux = doc0.createElement('div');}	
		aux.innerHTML=innerContent;} 
	aux.className=(className); 	return aux;
},
//fill options with defaults meanings
fillDef = (defaults, inputOptions) => {
	for (let key in defaults){	
		if (!(key in inputOptions)){inputOptions[key]=defaults[key];}
	};
};	fillDef(opt1Default,opt1);	fillDef(klasDefault,klas);	fillDef(opt2Default,opt2);

const goodImgWrap = putEl(klas.goodImgWrap), goodImg = putEl(klas.goodImg,opt1.imageSrc,opt1.imageAlt), 
goodDesc = putEl(klas.goodDesc), rating = putEl(klas.rating),
//set card container height 78% of width
setProp =() => {
	const cardContainerWidth = getProp2 (container,'width'),
		shd1=plusPX(cardContainerWidth*.04),shd2=plusPX(cardContainerWidth*.036),
		shd3=plusPX(cardContainerWidth*.024);	
	container.style.height=plusPX(cardContainerWidth/1.277);
	goodImg.style.boxShadow=plusPX()+shd1+shd2+'-'+shd3+opt2.coverShdClr;
	goodDesc.style.height=plusPX(getProp2 (goodDesc,'width')*1.14);	//width:294 x height:336
};
//build card
container.appendChild(goodImgWrap);
	goodImgWrap.appendChild(putEl(klas.coverPH,opt2.noCvrImgText));	
	goodImgWrap.appendChild(goodImg);
container.appendChild(putEl(klas.spc1));
container.appendChild(goodDesc);
	goodDesc.appendChild(putEl(klas.author,opt1.author));
	goodDesc.appendChild(putEl(klas.caption,opt1.caption));
	goodDesc.appendChild(rating);
		rating.appendChild(putEl(klas.ratStar));
		if (Number(opt1.reviewCnt)>1) {review=review+'s';}
		rating.appendChild(putEl(klas.reviewCnt,opt1.reviewCnt+review));
	goodDesc.appendChild(putEl(klas.annot,opt1.annot));
	goodDesc.appendChild(putEl(klas.price,'$'+opt1.price));
	goodDesc.appendChild(putEl(klas.buyNowBtn,opt1.buyNowBtnTxt.toUpperCase()));
//set card container height			
setProp();
//set card container height on resize event
window.addEventListener('resize',setProp);
};