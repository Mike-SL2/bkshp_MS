//sidebar menu build & selector module v.1.2.0 for bookshop prj
//sidebar menu build
const sbList=function(){
msgSrv({'':'sidebar_menu_module loaded'});
const sidebar=doc0.querySelector('.sidebarTextBlock'), 
      liPrefx='<div class="sibarMark"></div>';
siList.forEach((i)=>{let siItem = putEl('sidebarItem',liPrefx+i); sidebar.appendChild(siItem);});
}();	

//sidebar selector
const sbItemSel=function(){let selectedItem =0; // initial condition - category 0 selected
			   const sbItems=doc0.querySelectorAll('.sidebarItem'), sbMarkers=doc0.querySelectorAll('.sibarMark'),
			         selectedFontWeight='900', selectedFontSizeFactor=1.1, markerSign='&#8226;';

msgSrv({'':'sidebar_selector_module loaded'});
			sbItems.forEach((i)=>{i.addEventListener('click',(ev)=>{categorySelected(sbItemSel(ev));})});
			function rst0(x=null){let locItemStl = sbItems[selectedItem].style;
				           
				  if (x===null) {locItemStl.fontWeight='';  locItemStl.fontSize='';
						 sbMarkers[selectedItem].innerHTML='';
						 msgSrv({'sidebar selector':'item '+selectedItem+' mark clear "'+siList[selectedItem]+'"'});}
					   else {locItemStl = sbItems[x].style;
						 locItemStl.fontWeight=selectedFontWeight;
						 locItemStl.fontSize=plusPX(getProp2(sbItems[1],'font-size')*selectedFontSizeFactor);	  	   
					sbMarkers[x].innerHTML=markerSign;
					msgSrv({'sidebar selector':'item '+selectedItem+' mark set "'+siList[selectedItem]+'"'});}
			};
			rst0(selectedItem);	
			function sbItemSel(ev){				
				rst0();
				sbItems.forEach((i,n)=>{if (i===ev.target) {selectedItem=n;}});				
				rst0(selectedItem);					 			
			return selectedItem};
return selectedItem;}();