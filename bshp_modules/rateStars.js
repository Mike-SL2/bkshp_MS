// rateModule  v.5.7.0 for bookshop prj
// dependencies : bshp_modules/Init00.js
'use strict';
const rateModule = (quantity=5, rateModul=document.querySelector('.rateModule') , 
		    aClr= 'rgb(242, 201, 76)', bClr = 'rgb(238, 237, 245)', 
		    //gap between stars - percents of star picture width
		    spaceBetween = 10) => { 
let rate=0, 
	/* intervalID for DEMO MODE on/off control */
    	intervalID=null;	
const   starWrapClasName = 'starWrap',
	moduleName = 'rateModule',	moduleVer =' v.5.7.0 ',	demoMode = 'demo mode ', act='activated',
	//error handle function
	dumbFunc = () =>{console.log('dumbFunc');return null;};
	if (rateModul) {  
	       if (rateModul.querySelector('.'+starWrapClasName)) { setProp(rateModul,{'background':es, 'height':es});  
								    rateModul.innerHTML=es;	
								   msgSrv({'':moduleName+' Secondary instance'});}
	} else {msgSrv({'':moduleName+' No '+moduleName+' DomElement Specified'}); return dumbFunc;}
// successful loading report
msgSrv({'':moduleName+moduleVer+'loaded ---'});	
const fillColor = getProp2(rateModul,'background-color'),
starWrapWidth=Math.ceil(getProp2(rateModul,'height')/11*12),
	/* star SVG image */
	svgStyle2 = `" style="stroke:${fillColor};stroke-width:`,
	svgStyle1 = `${svgStyle2}0.3`, 					svgStylePstFx =`"/>`,
	svgStyle=` Z${svgStyle1};fill:${fillColor}${svgStylePstFx}`,
	path=`<path d="M`, 
starAsy=`<svg viewBox="0 0 12 11" fill=${none}>
	${path}6 0 L7.80568 3.5147 L11.7063 4.1459 L12 4.1459 L12 0${svgStyle} 	
	${path}12 4.1459  L8.92165 6.9493 L9.52671 11 L12 11${svgStyle}	
	${path}9.52671 11 L6 9.072 L2.179629 11 ${svgStyle}
	${path}2.179629 11 L3.07835 6.9493 L0.293661 4.1459 L0 4.1459 L0 11${svgStyle}
	${path}0 4.2459 L0.293661 4.1459 L4.19432 3.5147 L6 0 L0 0${svgStyle}
	
	${path}0 0 L12 0${svgStyle2}1${svgStylePstFx}
	${path}12 0 L12 11${svgStyle2}1${svgStylePstFx}
	${path}12 11 L0 11${svgStyle2}1${svgStylePstFx}
	${path}0 11 L0 0${svgStyle2}1${svgStylePstFx}
</svg>`;				
setProp(rateModul,{'display':flex});	spaceBetween = Math.round(starWrapWidth*spaceBetween/100);	
//${path}12 0 L12 11${svgStyle}					
msgSrv({'height':moduleName+' '+getProp2(rateModul,'height'),'gap':moduleName+' '+spaceBetween});
/* rating block filling with stars and space hoopers between */
for (let i=0;i<quantity;i++){
	const starWrap=putEl(starWrapClasName,starAsy), spcBlk = putEl('spcBlk'), 
	      starWrapBorder = putEl();
		setProp(starWrap,{'position':'relative', 'width':plusPX(starWrapWidth)});
		setProp(starWrapBorder,{'zIndex':'2', 'position':'absolute', 
					'top':plusPX(), 'left':plusPX(), 'right':plusPX(), 'bottom':plusPX(),
					'border':plusPX(1)+`solid ${fillColor}`});								
	starWrap.appendChild(starWrapBorder);				
	rateModul.appendChild(starWrap);
	if (i) {
		setProp(spcBlk,{'backgroundColor':fillColor, 'width':plusPX(spaceBetween)});
		rateModul.insertBefore(spcBlk,starWrap);};
};
/* main function - rating background fill */
function ratingDisplay(rate1=75,  demo=false) {	
	let dir=true;  rate = rate1;
	msgSrv({'rateModule':'rating '+rate});	
	const display = () => {
		const maskLineH = plusPX(2);
		if (rate>100) {rate=100;dir=false;} if (rate<0) {rate=0;dir=true;} 
		
		setProp(rateModul,{
			'background': `linear-gradient(to top, ${fillColor} ${maskLineH}, transparent ${maskLineH}, transparent),
				       linear-gradient(to right, ${aClr}, ${aClr} ${rate}%, ${bClr} ${rate}%, ${bClr})`});
		};		
	display();
	if (demo) {		
		if (!intervalID) {
			msgSrv({'rateModule':demoMode+act});
		    rate=0;	
			intervalID=setInterval(()=>{
						    if (dir) {rate++;} else {rate--;}					
						    display();},10);
		};
	} else {if (intervalID) {clearTimeout(intervalID);intervalID=null;msgSrv({'rateModule':demoMode+'dis'+act});}
		}
}; return ratingDisplay;
};
