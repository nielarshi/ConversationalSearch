


var clearObj=new Object();

var intlData= new Array();
$(document).ready(function(){
 

   /*      
	$('#passcode').bind('copy paste cut',function(e) {
		e.preventDefault(); //disable cut,copy,paste
		return;
		});
	*/
	
	$('.numberValid').keyup(function() {
				if (this.value.match(/[^0-9-]/g)) {
				    this.value = this.value.replace(/[^0-9-]/g, '');
                }
				
            });     
      


});
function delivery_methods() {
	var telephone_mode = $('#phnShow  ul span input');
		alternate_mode = $('#altPhnShow  ul span input');

	$('#email').change(function () {
		telephone_mode.prop('disabled', true);
		alternate_mode.prop('disabled', true);
		alternate_mode.prop('checked', false);
		telephone_mode.prop('checked', false);
		//alternate_mode.hide();
		//$('input[type=radio]:first', this).attr('checked', true);
	});

	$('#telephone').change(function () {
		
		telephone_mode.prop('disabled', false);
		alternate_mode.prop('disabled', true);
		alternate_mode.prop('checked', false);
		$('#phnShow  ul span input[type=radio]:first').prop('checked', true);
		//telephone_mode.toggle();
		//alternate_mode.hide();
	});

	$('#alternateTelephone').change(function () {
		alternate_mode.prop('disabled', false);
		telephone_mode.prop('disabled', true);
		telephone_mode.prop('checked', false);
		$('#altPhnShow  ul span input[type=radio]:first').prop('checked', true);
		//telephone_mode.hide();
	});
}

var browser={
		"firefox":"Firefox",
		"ie":"MSIE",
		"chrome":"Chrome"
	};
function getBrowser()
{
	var browserName="";
	if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){ 
		browserName="Firefox"; 
	}
	if (/MSIE[\/\s](\d+\.\d+)/.test(navigator.userAgent)){ 
		browserName="MSIE"; 
		}
	if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)){ 
		browserName="Opera"; 
		}
	return browserName;
}
