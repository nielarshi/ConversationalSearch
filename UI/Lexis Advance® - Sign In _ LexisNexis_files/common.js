
var auth =
 	new function() { 		 
 		this.openHelpWin =
 			function(url) { 				
 				// center 800x600 window
 				var left = (screen.width / 2) - 400;
 				var top = (screen.height / 2) - 300;
 				var features = 
 					"width=800,height=600,screenx=" 
 					+ left + 
 					",left=" 
 					+ left + 
 					",screeny=" 
 					+ top + 
 					",top=" 
 					+ top + 
 					",menubar=0,toolbar=0,status=0,resizable=1,scrollbars=1";
 				window.open(url, "formhelp", features); 				
 				return false;
 			}; 	//openHelpWin
};

function disableButton(id) {
	var submitButton = document.getElementById(id);
	submitButton.disabled = true;
	submitButton.className='button tertiary lnkcancelbtn'; 
	return true;
}

function disableButtonForMobile(id) {
	var submitButton = document.getElementById(id);
	submitButton.disabled = true;
	submitButton.className='lx-button lx-secondary'; 
	return true;
}