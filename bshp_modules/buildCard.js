//building card
//dependencies: Init00.js, rst-0.css, cardStyl.css
const buildCard = (container,   opt1={},
     				klas={},
     				opt2={}) => {
const opt1Default = {
	'imageSrc':'goodImg0.png',
	'imageAlt':'book cover image',
	'author':'HO Commission on Social Determinants of Health, World Health Organization',
	'caption':'Harry Potter: Crochet Wizardry | Crochet Patterns | Harry Potter Crafts',
	'maxReviewCnt':400,
	'reviewCnt':354, 
	'annot':'The Outrageously Funny Debut Novel About Three Super-Rich, Pedigreed Chinese Families And The Gossip about third world war',
	'price':4.99,
	'buyNowBtnTxt':'BuY nOW',
	'inCartTxt':'In CART'
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
	'buyNowBtn':'buyNowBtn',
	'noBuyBtn':'noBuyBtn'
},
opt2Default={
	'noCvrImgText':'NO COVER IMAGE',
	'coverShdClr':'lightgray'
},
//fill options with defaults meanings
fillDef = (defaults, inputOptions) => {
	for (let key in defaults){	
		if (!(key in inputOptions)){inputOptions[key]=defaults[key];}
	};
};	fillDef(opt1Default,opt1);	fillDef(klasDefault,klas);	fillDef(opt2Default,opt2);
const 	
	buyNowBtnCaption = opt1.buyNowBtnTxt.toUpperCase(),
	goodImgWrap = putEl(klas.goodImgWrap), 	goodImg = putEl(klas.goodImg,opt1.imageSrc,opt1.imageAlt),
	goodDesc = putEl(klas.goodDesc), rating = putEl(klas.rating), rateDisplay = putEl(klas.ratStar),					      
	price = putEl(klas.price,opt1.price),  itemID = {'author':opt1.author,'caption':opt1.caption},
	innerCart = processCart(),
//set card container height 78% of width
setPropCard =() => {
	let rateBlk;
	const cardContainerWidth = getProp2 (container,'width'),
		shd1=plusPX(cardContainerWidth*.04),shd2=plusPX(cardContainerWidth*.036),
		shd3=plusPX(cardContainerWidth*.024);
	setProp(container,{'height':plusPX(cardContainerWidth/1.277), 'fontSize':plusPX(cardContainerWidth/54.6)});	
	goodImg.style.boxShadow=plusPX()+shd1+shd2+'-'+shd3+opt2.coverShdClr;
	goodDesc.style.height=plusPX(getProp2 (goodDesc,'width')*1.14);	//width:294 x height:336
rateBlk = rateModule(5,rateDisplay);
rateBlk(Math.round(Number(opt1.reviewCnt)*sto/Number(opt1.maxReviewCnt)));
};
let review=' review', 
	btnClass = klas.buyNowBtn, buyNowBtnCaption1 = buyNowBtnCaption, buyNowBtn;

//build card
setProp(container,{'display':flex, 'flexFlow':'row nowrap'});
rating.style.display=flex;
goodImgWrap.classList.add('flex_centr'); //../styl/rst-0.css
goodImgWrap.style.position='relative';	
setProp(goodImg, {'position':'absolute', 'top':plusPX(), 'left':plusPX(), 'height':sto+'%', 'width':sto+'%'});
								
container.appendChild(goodImgWrap);
	goodImgWrap.appendChild(putEl(klas.coverPH,opt2.noCvrImgText));	
	goodImgWrap.appendChild(goodImg);
container.appendChild(putEl(klas.spc1));
container.appendChild(goodDesc);
	goodDesc.appendChild(putEl(klas.author,opt1.author));
	goodDesc.appendChild(putEl(klas.caption,opt1.caption));
	goodDesc.appendChild(rating);
		rating.appendChild(rateDisplay);			
		if (Number(opt1.reviewCnt)>1) {review=review+'s';}
		rating.appendChild(putEl(klas.reviewCnt,opt1.reviewCnt+review));
	goodDesc.appendChild(putEl(klas.annot,opt1.annot));

	goodDesc.appendChild(price);
	/* button 'BUY NOW' */	   
	  innerCart.forEach ((i)=>{
		if (JSON.stringify(i)===JSON.stringify(itemID)) {
			buyNowBtnCaption1=opt1.inCartTxt;   btnClass = klas.buyNowBtn + " buyNowBtnPressed";}
	  });
		buyNowBtn=  putEl(btnClass,buyNowBtnCaption1);
		if (opt1.price.match( /\d+/ )) {
			buyNowBtn.addEventListener('click',(ev)=>{
				const buyBtn = ev.target;
				if (buyBtn.textContent===buyNowBtnCaption) {buyBtn.textContent=opt1.inCartTxt;									
									 buyBtn.classList.add("buyNowBtnPressed");
									//put item to buyer cart (Init00.js)
									 processCart(itemID,true);
									 
				} else {buyBtn.textContent=buyNowBtnCaption;
					//remove item from buyer cart (Init00.js)
					processCart(itemID,false); 
				      	buyBtn.classList.remove("buyNowBtnPressed");}
				//cart_bage element content fill (Init00.js)
				cartBage();
			});
		} else {price.style.opacity = '0.4';buyNowBtn =  putEl(klas.noBuyBtn,buyNowBtnCaption);}
		goodDesc.appendChild(buyNowBtn);
		
//set card container height			
setPropCard();
//set card container height on resize event
window.addEventListener('resize',setPropCard);
};