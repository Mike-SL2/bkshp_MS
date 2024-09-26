//sidebar menu build & selector module v.2.3.0 for bookshop prj
//sidebar menu build section
const sbList=function(){
msgSrv({'':'sidebarMenu module loaded'});
/*
	<div class="sidebarItem">
		<div class="sibarMark"></div>	// - firstChild
		Art & Fashion			// - lastChild
	</div>
*/
const sidebar=doc0.querySelector('.sidebarTextBlock'), 
      liPrefx='<div class="sibarMark"></div>';
siList.forEach((i)=>{let siItem = putEl('sidebarItem',liPrefx+i); sidebar.appendChild(siItem);});
}();	

//sidebar selector section
const sbItemSel=function(){
			   const sbItems=doc0.querySelectorAll('.sidebarItem'), sbMarkers=doc0.querySelectorAll('.sibarMark'),
			         selectedFontWeight='900', selectedFontSizeFactor=1.2, markerSign='&#8226;';
			// initial condition - category 0 selected
			   let selectedItem =0, unselectedFontSize;
			function getFontSize (){unselectedFontSize=getProp2(sbItems[selectedItem],'font-size');}
			getFontSize();
msgSrv({'':'sidebarSelector module loaded'});
			sbItems.forEach((i)=>{i.addEventListener('click',(ev)=>{categorySelect(sbItemSel(ev));})});

			function rst0(x=null){let locItemStl = sbItems[selectedItem].style;
				           
				  if (x===null) {locItemStl.fontWeight='';  locItemStl.fontSize='';
						 sbMarkers[selectedItem].innerHTML='';
						 getFontSize();
						 msgSrv({'sidebar selector':'item '+selectedItem+' mark clear "'+siList[selectedItem]+'"'});}
					   else {locItemStl = sbItems[x].style;
						 locItemStl.fontWeight=selectedFontWeight;
						 locItemStl.fontSize = plusPX(unselectedFontSize*selectedFontSizeFactor);	  	   
					sbMarkers[x].innerHTML=markerSign;
					msgSrv({'sidebar selector':'item '+selectedItem+' mark set "'+siList[selectedItem]+'"'});}
			};
			rst0(selectedItem); window.addEventListener('resize',()=>{rst0();rst0(selectedItem);});	
			function sbItemSel(ev){				
				rst0();
				sbItems.forEach((i,n)=>{if (i===ev.target) {selectedItem=n;}});				
				rst0(selectedItem);				 			
			return {'number':selectedItem,'name':ev.target.lastChild.textContent};};
return selectedItem;}();