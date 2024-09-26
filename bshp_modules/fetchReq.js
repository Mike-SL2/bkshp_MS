/* data acquisition by category name */
msgSrv({'':'fetchData module loaded'});
const fetchData = (category,cbFuncName) =>{
if (!category || !cbFuncName) {msgSrv({'fetchData':'No category or cbFuncName defined'});return null;}
//fetch essential constants define
const requestString = `https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=AIzaSyAOxRLvgkvNyb_NzWAoX2xvkwkVEa03wkU&printType=books&startIndex=0&maxResults=6&langRestrict=en`,
storItemName = `bV-${category}`,
f_options={method:"GET",
	   mode:"cors",
	   headers:{'content-type':'application/json'}		 
};
//fetch call
msgSrv({'fetchData category':category,'fetchData request':requestString});
fetch(requestString,f_options)
	.then((result)=>{return result.json();})	
	.then((data)=>{
			// data net load success
			msgSrv({'fetchData':'data net load success'});
			localStorage.setItem(storItemName,JSON.stringify(data));
			cbFuncName(data);
	})
	.catch(()=>{
			let y = JSON.parse(localStorage.getItem(storItemName));
			if (y) {
				// data localStorage load success
				msgSrv({'fetch from storage - keyName':storItemName});
				cbFuncName(y);
			} else {
				// data localStorage load fail - loading from local file - locbase_respns.js
				msgSrv({'fetch from loc file - category':category});
				cbFuncName(JSON.parse(loc_response[category]));}
	});
};