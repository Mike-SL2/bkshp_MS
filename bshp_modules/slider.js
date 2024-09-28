//slider module v.3.0.5 for bookshop prj
// dependencies : bshp_modules/Init00.js - plusPX func, putEl func
'use strict';
msgSrv({'':'slider module v.3.0.5 loaded'});
const slider=function(speed="slow", frameclass="sliderContainer", 	bPrefx="img/slide", 	bPstf="png"){
msgSrv({'slider speed' : speed,'frameclass': frameclass});

		const container = doc0.querySelector('.'+frameclass),
		      picFrame = putEl(),	warnBlk = putEl(),  
		      pFStl=picFrame.style,	wbStl = warnBlk.style,		      		      
		      prcnt = '%',		bPstfx="."+bPstf, 
		      cntr = 'center', 		 		zpx =`${cntr}, `+plusPX()+cntr,	/* center, 0px center */
		      backGndCLr = getProp2(container,'background-color'); 
	     
		if (!container) return function (){const noPrnt ='Slider no parent/wrong container name for slider module'; 
						   doc0.write(noPrnt+'<br>');	                  msgSrv({'':noPrnt});};
		let previousSlide = null, movSlow, frmWidth, 
		picShiftX,
		frameStep,warnFontSize,loadErr=false; 
function frameDim(){
	const picRatio = 1.58;
	frmWidth = getProp2(container,'width');	
        frameStep = 1+Math.floor(frmWidth/200);	warnFontSize = (1+Math.floor(frmWidth/50));
	pFStl.height=plusPX(frmWidth/picRatio);
};
frameDim();
window.addEventListener('resize',frameDim);												

	pFStl.width=sto+prcnt; 		 pFStl.backgroundSize='contain';	pFStl.backgroundColor=backGndCLr;	
	pFStl.backgroundRepeat='no-repeat';
	pFStl.display=flex;		 pFStl.justifyContent =cntr;		pFStl.alignItems =cntr;	
	
	container.appendChild(picFrame);	
					 wbStl.color='gray';				wbStl.fontSize=plusPX(warnFontSize*1.7);
					 wbStl.backgroundColor='gainsboro';		wbStl.textAlign =cntr;
					 						wbStl.fontWeight='600';
					 wbStl.maxWidth='90'+prcnt;	 		wbStl.letterSpacing=plusPX(frameStep);		 
					 wbStl.overflowWrap='break-word';		wbStl.opacity='0.95';
					 wbStl.padding='1'+prcnt;			wbStl.display='none';
	picFrame.appendChild(warnBlk);   
        switch (speed) 	{case "slow":	 movSlow = 25;	break;
		 	 case "moderate":movSlow = 15;	break;
		 	 case "normal":	 movSlow = 8;	break;
		 	 case "fast":	 movSlow = 3;	break;
			 case "veryfast":movSlow = 0;	break;	default: movSlow = 10;}								 	
	function slider(nextSlide=0){
		let probeImg = putEl('',`${bPrefx}${nextSlide}${bPstfx}`,'slide picture'), idA, movInterval, loadFail = true;
		msgSrv({'slider module':nextSlide+' image: '+probeImg.src});

		    warnBlk.innerHTML=`<span style="color:salmon;">No image available at</span><br>${probeImg.src}`;
		probeImg.addEventListener("error", () => {wbStl.display='block';});
		    
		probeImg.addEventListener("load", () => {
				wbStl.display='none';
				if (previousSlide===null) {pFStl.backgroundImage=`url('${bPrefx}${nextSlide}${bPstfx}')`;				
				} else {
				if (previousSlide!=nextSlide) {	
					pFStl.backgroundImage=`url('${bPrefx}${nextSlide}${bPstfx}'), url('${bPrefx}${previousSlide}${bPstfx}')`;
					picShiftX = frmWidth;
					function frameMoving (){
							// Xpx center, 0px center 
						pFStl.backgroundPosition=plusPX(picShiftX)+zpx;
				        	movInterval = null;
						if (picShiftX>0) {
						      picShiftX-=frameStep;
						      if (movSlow) {
							  movInterval = setTimeout (()=>{requestAnimationFrame(frameMoving);},movSlow);
						      } else {requestAnimationFrame(frameMoving);}
						} else {
							cancelAnimationFrame(idA);
							pFStl.backgroundImage=`url('${bPrefx}${nextSlide}${bPstfx}')`;
								// 0px center, 0px center 
							pFStl.backgroundPosition=plusPX()+zpx;	}
					};
					idA = requestAnimationFrame(frameMoving);
				};};	previousSlide = nextSlide;	
		    });			
	};
return slider;},

slideShow=function(amount=0, timeout = 0, inactClr="palegreen", actClr="fuchsia", 
		   frameclass="sliderSwitch", sliderName=launchSlide){
		const switchBlock = doc0.querySelector('.'+frameclass);
if (!switchBlock) return function (){const noPrnt ='SliderControl: no parent/wrong container name for sliderControl module'; 
				     doc0.write(noPrnt+'<br>');	                  msgSrv({'':noPrnt});
				    };
		const   slideControlButtonClassName = "slideCtrlButton",
			swBlkStl = switchBlock.style,   slideShowPauseCount = 2;
			swBlkStl.display=flex;	swBlkStl.justifyContent='space-between';
		let ctrlBtn = null,cBtnStl, pauseShow = 0, slideNum = 0,
		    swHeightNum,  swWidthNum,  maxAmount, amountMinusOne;
function switchDim (){
	swHeightNum = getProp2(switchBlock,'height');		
	swWidthNum = getProp2(switchBlock,'width');			
};
	switchDim ();
maxAmount = Math.round((swWidthNum/swHeightNum+0.5)/1.5);	
if ((amount<2) || (amount>maxAmount))  {amount = maxAmount};		
amountMinusOne = amount-1;
// switch block clear
switchBlock.innerHTML='';
for (let i=0;i<amount;i++) {ctrlBtn =putEl(slideControlButtonClassName); cBtnStl = ctrlBtn.style;		cBtnStl.cursor='pointer';
			    cBtnStl.backgroundColor=inactClr;		 cBtnStl.borderRadius='50%';
			    cBtnStl.width=plusPX(swHeightNum);		 cBtnStl.height=plusPX(swHeightNum);	
switchBlock.appendChild(ctrlBtn);
};
ctrlBtn	= doc0.querySelectorAll('.'+slideControlButtonClassName);
// switch block onresize
window.addEventListener('resize',()=>{	
		switchDim ();
		ctrlBtn.forEach((i)=>{i.style.width=plusPX(swHeightNum);	i.style.height=plusPX(swHeightNum);});	
});	
function swState(activeBtnNumber){
		ctrlBtn.forEach((i,n)=>{if (activeBtnNumber===n){i.style.backgroundColor=actClr;  sliderName(n);  slideNum=n;
					} 	else		{i.style.backgroundColor=inactClr;}})
};	ctrlBtn.forEach((i)=>{
		i.addEventListener('click',(ev)=>{
			pauseShow = slideShowPauseCount;
			ctrlBtn.forEach((i1,n)=>{if (ev.target===i1) {swState(n);}});
		});
});
if ((timeout>0) && (timeout<101)) {
	      timeout *= 1000;
	      swState(slideNum);
	      setInterval(()=>{if (pauseShow) {pauseShow--;}
			       else {slideNum+=1; 
				     if (slideNum>amountMinusOne){slideNum=0;}					 
				     swState(slideNum);}
			      },timeout);}			 	
	function slide(n=0){
				swState(n);				
	};
return slide;};
const launchSlide = slider('moderate');

slideShow(3,8);
