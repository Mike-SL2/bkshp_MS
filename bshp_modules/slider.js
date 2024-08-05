//slider modeule v.3.0.1 for bookshop prj
'use strict';
console.log('slider module loaded');
function getPropNum(blockName,propertyName){ 
	const property = window.getComputedStyle(blockName,null).getPropertyValue(propertyName);
return property.match(/\d+/)[0];  
};
const slider=function(speed="slow", frameclass="sliderContainer", 	bPrefx="img/slide", 	bPstf="png"){
const diagMessages = false;
if (diagMessages) {console.log('diag Messages Enabled');
		   console.log('slider: speed',speed,'|',' frameclasss:',frameclass);}
		const doc1 = document, 				container = doc1.querySelector('.'+frameclass),
		      picFrame = doc1.createElement('div'),	warnBlk = doc1.createElement('div'),  
		      pFStl=picFrame.style,			wbStl = warnBlk.style,		      		      
		      sto=100,		prcnt = '%',		bPstfx="."+bPstf, 
		      cntr = 'center', 	px = 'px', 		zpx =`px ${cntr}, ${cntr} ${cntr}`; 
	      
		if (!container) return function (){const noPrnt ='Slider: no parent/wrong container name for slider module'; 
						   doc1.write(noPrnt+'<br>');	                  console.log(noPrnt);};
		let previousSlide = null, movSlow, frmWidth, 
		picShiftX,
		frameStep,warnFontSize,loadErr=false;
function frameDim(){
	const picRatio = 1.58;
	frmWidth = getPropNum(container,'width');	
        frameStep = 1+Math.floor(frmWidth/200);	warnFontSize = (1+Math.floor(frmWidth/50));
	pFStl.height=Math.round(frmWidth/picRatio)+px;
};
frameDim();
window.addEventListener('resize',frameDim);												

	pFStl.width=sto+prcnt; 		 pFStl.backgroundSize='contain';	pFStl.backgroundColor='whitesmoke';	
	pFStl.backgroundRepeat='no-repeat';
	pFStl.display='flex';		 pFStl.justifyContent =cntr;		pFStl.alignItems =cntr;	
	
	container.appendChild(picFrame);	
					 wbStl.color='gray';				wbStl.fontSize=Math.floor(warnFontSize*1.7)+px;
					 wbStl.backgroundColor='gainsboro';		wbStl.textAlign =cntr;
					 						wbStl.fontWeight='600';
					 wbStl.maxWidth='90'+prcnt;	 		wbStl.letterSpacing=frameStep+px;		 
					 wbStl.overflowWrap='break-word';		wbStl.opacity='0.95';
					 wbStl.padding='1'+prcnt;			wbStl.display='none';
	picFrame.appendChild(warnBlk);   
        switch (speed) 	{case "slow":	 movSlow = 25;	break;
		 	 case "moderate":movSlow = 15;	break;
		 	 case "normal":	 movSlow = 8;	break;
		 	 case "fast":	 movSlow = 3;	break;
			 case "veryfast":movSlow = 0;	break;	default: movSlow = 10;}								 	
	function slider(nextSlide=0){
		let probeImg = doc1.createElement('img'), idA, movInterval, loadFail = true;
		    probeImg.src = `${bPrefx}${nextSlide}${bPstfx}`;
		if (diagMessages) {console.log(nextSlide,'img src path: ',probeImg.src);}
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
						pFStl.backgroundPosition=`${picShiftX}${zpx}`;
				        	movInterval = null;
						if (picShiftX>0) {picShiftX-=frameStep;
						   if (movSlow) {
							movInterval = setTimeout (()=>{requestAnimationFrame(frameMoving);},movSlow);}
						   else 			      {requestAnimationFrame(frameMoving);}
						} else {
							cancelAnimationFrame(idA);
							pFStl.backgroundPosition=`0${zpx}`;	}
					};
					idA = requestAnimationFrame(frameMoving);
				};};	previousSlide = nextSlide;	
		    });			
	};
return slider;},

slideShow=function(amount=0, timeout = 0, inactClr="palegreen", actClr="fuchsia", 
		   frameclass="sliderSwitch", sliderName=launchSlide){
		const doc1 = document, px = 'px',	switchBlock = doc1.querySelector('.'+frameclass);
if (!switchBlock) return function (){const noPrnt ='SliderControl: no parent/wrong container name for sliderControl module'; 
				     doc1.write(noPrnt+'<br>');	                  console.log(noPrnt);
				    };
		const   slideControlButtonClassName = "slideCtrlButton",
			swBlkStl = switchBlock.style,   slideShowPauseCount = 2;
			swBlkStl.display='flex';	swBlkStl.justifyContent='space-between';
		let ctrlBtn = null,cBtnStl, pauseShow = 0, slideNum = 0,
		    swHeightNum,  swWidthNum,  maxAmount, amountMinusOne;
function switchDim (){
	swHeightNum = getPropNum(switchBlock,'height');		
	swWidthNum = getPropNum(switchBlock,'width');			
};
	switchDim ();
maxAmount = Math.round((swWidthNum/swHeightNum+0.5)/1.5);	
if ((amount<2) || (amount>maxAmount))  {amount = maxAmount};		
amountMinusOne = amount-1;
// switch block clear
switchBlock.innerHTML='';
for (let i=0;i<amount;i++) {ctrlBtn =doc1.createElement('div'); cBtnStl = ctrlBtn.style;		cBtnStl.cursor='pointer';
			    cBtnStl.backgroundColor=inactClr;	cBtnStl.borderRadius='50%';
				cBtnStl.width=swHeightNum+px;		cBtnStl.height=swHeightNum+px;
ctrlBtn.classList.add(slideControlButtonClassName);	
switchBlock.appendChild(ctrlBtn);
};
ctrlBtn	= doc1.querySelectorAll('.'+slideControlButtonClassName);
// switch block onresize
window.addEventListener('resize',()=>{	
		switchDim ();
		ctrlBtn.forEach((i)=>{i.style.width=swHeightNum+px;	i.style.height=swHeightNum+px;});	
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
