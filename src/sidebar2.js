//sidebar menu build v.4.2.2 for bookshop prj
//sidebar menu build section
'use strict';

import {cnst, siList, putEl} from './Init00.js'; 

const sbList=function(){
/*
	<div class="sidebarItem">
		<div class="sibarMark"></div>	// - firstChild
		Art & Fashion			// - lastChild
	</div>
*/
const sidebar=cnst.d7.querySelector('.sidebarTextBlock'), 
      liPrefx='<div class="sibarMark"></div>';
siList.forEach((i)=>{let siItem = putEl('sidebarItem',liPrefx+i); sidebar.appendChild(siItem);});
}();	

export {sbList};