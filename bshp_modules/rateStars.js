// rateModule  v.5.8.5 for bookshop prj
// dependencies : bshp_modules/Init00.js
'use strict';
const rateModule = (quantity=5, rateModul, 
		    aClr= 'rgb(242, 201, 76)', bClr = 'rgb(238, 237, 245)', space = 20) => { 
const   starWrapClasName = 'starWrap', spcBlkClasName = 'spcBlk',
	moduleName = 'rateModule',     moduleVer =' v.5.8.5 ',
	//error handle function
	dumbFunc = () =>{console.log('dumbFunc');return null;};
	if (!rateModul) {msgSrv({'':moduleName+' No '+moduleName+' DomElement Specified'}); return dumbFunc;} 
// successful loading report
msgSrv({'':moduleName+moduleVer+'loaded ---'});	
const fillColor = getProp2(rateModul,'background-color'),
	/* star SVG image */
	svgStyle2 = `" style="stroke:${fillColor};stroke-width:`,
	svgStyle1 = `${svgStyle2}0.3`, 					svgStylePstFx =`"/>`,
	svgStyle=` Z${svgStyle1};fill:${fillColor}${svgStylePstFx}`,
	path=`<path d="M`, 
starAsy=`<svg viewBox="0 0 12 11" fill=${cnst.none}>
	${path}6 0 L7.80568 3.5147 L11.7063 4.1459 L12 4.1459 L12 0${svgStyle} 	
	${path}12 4.1459  L8.92165 6.9493 L9.52671 11 L12 11${svgStyle}	
	${path}9.52671 11 L6 9.072 L2.179629 11 ${svgStyle}
	${path}2.179629 11 L3.07835 6.9493 L0.293661 4.1459 L0 4.1459 L0 11${svgStyle}
	${path}0 4.2459 L0.293661 4.1459 L4.19432 3.5147 L6 0 L0 0${svgStyle}
	
	${path}0 0 L12 0${svgStyle2}1${svgStylePstFx}
	${path}12 0 L12 11${svgStyle2}1${svgStylePstFx}
	${path}12 11 L0 11${svgStyle2}1${svgStylePstFx}
	${path}0 11 L0 0${svgStyle2}1${svgStylePstFx}
</svg>`,
spaceBlocks = rateModul.querySelectorAll('.'+spcBlkClasName),
starWrapHeightD = getProp2(rateModul,'height'),  starWrapHeight = plusPX(starWrapHeightD),
 starWrapWidthD = starWrapHeightD*12/11, 	 starWrapWidth = plusPX(starWrapWidthD),
rateStep = Math.round(cnst.sto/quantity);
						let starWraps = rateModul.querySelectorAll('.'+starWrapClasName); 
space = plusPX(starWrapWidthD*space/100); 				
msgSrv({'height':moduleName+' '+starWrapHeight});					  		
//.ratStar = rateModul
if (starWraps.length){
	msgSrv({'rateModule':'resizing existing elements'});
	starWraps.forEach((starWrapI)=>{setProp(starWrapI,{'height':starWrapHeight, 'width':starWrapWidth});});
	spaceBlocks.forEach((spaceBlockI)=>{spaceBlockI.style.width=space;});
} else {
starWraps = [];
rateModul.style.display=cnst.flex;				
msgSrv({'rateModule':'building new one'});
/* rating block filling with stars and space hoopers between */
for (let i=0;i<quantity;i++){
	const starWrap=putEl(starWrapClasName,starAsy), spcBlk = putEl(spcBlkClasName);	
	starWraps.push(starWrap);				  
	setProp(starWrap,{'height':starWrapHeight, 'width':starWrapWidth});  				
	rateModul.appendChild(starWrap);
	if (i) {
		spcBlk.style.width=space;
		rateModul.insertBefore(spcBlk,starWrap);};
};} //if (starWraps){...

/* main function - rating background fill */
function ratingDisplay(rate=75) {	
	msgSrv({'rateModule':'rating '+rate});		
		let i=0, clr = bClr;  
		if (rate>cnst.sto) {rate=cnst.sto;}; if (rate<1) {rate=0;};  
	if (rate===cnst.sto || rate===0) {
		if (rate) {clr = aClr;} 
		starWraps.forEach((starWrapI)=>{starWrapI.style.backgroundColor=clr});
		return;
	};
/* I */
rate = Math.round(rate)-rateStep;
while (rate>0){rate=rate-rateStep;    	       
               starWraps[i].style.backgroundColor=aClr;		i++;
};	
/* II */
rate=Math.round((rate+rateStep)*cnst.sto/rateStep);
starWraps[i].style.background=`linear-gradient(to right, ${aClr}, ${aClr} ${rate}%, ${bClr} ${rate}%, ${bClr})`;
i++;
/* III */
while (quantity>i){starWraps[i].style.backgroundColor=bClr;	i++;}
}; return ratingDisplay;
};
