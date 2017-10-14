$(document).ready(function(){
	if ($(window).width() < 760){
		//console.log("first if");
		$("ol.steps li.current + li").hide();
		if ( $("#marketingArea").length ) {
			//console.log("Test two");
			$("#marketingArea").remove();
		}
	}
	else {
		$("#mobile-step2-button").hide();
	}
	
	//CONDITIONAL CSS FOR IE10 AND IE11 
	var userAgent = navigator.userAgent;
	var re = /(MSIE 10)|(?=.*rv:11)(?=.*like Gecko)/g;
	var found = userAgent.match(re);
	if (found) {
		var doc = document.documentElement;
		doc.setAttribute('data-useragent', 'ie10');
	}
	
	var userLoginId = 'user';
	function forgotPassword(url) {
		var urlLoc = url + document.getElementById('userid').value;
	    this.location.href = urlLoc;
	}
	function forgotUserId(url) {
	    this.location.href = url;
	}
	// mobile footer menu functionality
	var menu_toggle = $(".mobile-footer-menu-toggle");
	var menu_button = $(".mobile-footer-menu-toggle span.icon");
	var mobile_menu = $(".footer-nav-item:not(.relx)");
	
	menu_toggle.click(function(){
			mobile_menu.toggle();	
			menu_button.toggleClass("la-TriangleDown");
			menu_button.toggleClass("la-TriangleRight");
			
		});
	
	//REMOVE MARKETING AREA AND HANDLE PROGRESS INDICATOR
	$(window).resize(function(){
		setTimeout(function() {
			if ($(window).width() <= 759){
				$("#marketingArea").hide();
				$("section#loginArea").addClass("form-fix");
				$("#wrapper").addClass("responsive-padding");
			}	
			else {
				mobile_menu.show();
				//and put back to normal...
				$("#marketingArea").show();
				$("section#loginArea").removeClass("form-fix");
				$("#wrapper").removeClass("responsive-padding");
			}			 
		}, 250);
	});	
	
		
	//	login sign in error and tips
	var b = $('#signInHelp');
	var c = $('#helpLinks');
	var x = $('#helpLinks .close-btn');
	
	$(b).click(function() {
		if ($(c).is(':hidden')) {
			$(c).show();
			$(".modal-title").focus();
		} else {
			$(c).hide();
		}
	});
	$(x).click(function() {
		$(c).hide();
	});
	$(document).keydown(function(e) {
		if (e.keyCode == 27) { 
			if( $(c).is(':visible') ) {
				$(c).hide();
			}
		}   // esc
	});
	
	// IDP BALLOON BOX
	function balloon() {
		var box = $('#idpLoginLinks');
		var close_button = $('#idpLoginLinks .close-btn');
		
		// toggle box
		if ($(box).is(':hidden')) {
			$(box).show();
			$('.modal-title').focus();
		} else {
			$(box).hide();
		}
		
		// close button functionality
		$(close_button).click(function () {
			$(box).hide();
		});
		
		// escape key closes pop-up
		$(document).keydown(function (e) {
			if (e.keyCode === 27) {
				if ($(box).is(':visible')) {
					$(box).hide();
				}
			}
		});
		
	}
	
	// IDP POP-UP BOX
	$('#idpSignIn').click(balloon);
		
	var buttonpressed=false;
    $('#signInIDPBtn').click(function() {
          buttonpressed = true;
    });
    
    function idpProfileballoon() {
		var box = $('#idpProfileLinks');
		var close_button = $('#idpProfileLinks .close-btn');
		
		// toggle box
		if ($(box).is(':hidden')) {
			$(box).show();
			$('.modal-title').focus();
		} else {
			$(box).hide();
		}
		
		// close button functionality
		$(close_button).click(function () {
			$(box).hide();
		});
		
		// escape key closes pop-up
		$(document).keydown(function (e) {
			if (e.keyCode === 27) {
				if ($(box).is(':visible')) {
					$(box).hide();
				}
			}
		});
		
	}
    
 // IDP Profile link POP-UP BOX
	$('#idpProfileLinkId').click(idpProfileballoon);
		
	var idpProfileLinkbuttonpressed=false;
    $('#signInIDPProfileLinkBtn').click(function() {
    	idpProfileLinkbuttonpressed = true;
    });
	
	//VALIDATION
	$('form').submit(function(e){		
		if(buttonpressed){e.preventDefault();
		buttonpressed=false;
	} else {$('input[type=text]:enabled, input[type=password]:enabled').each(function(){
		var sID = $(this).attr('id');
		if(sID=="telephoneNumber" || sID=="alternateTelephone" || sID=="passcode" || sID=="produserid" || sID=="prodpassword" || sID=="validatePassword") return;
	    var self = $(this),
	    thisVal = self.val();
	    if($.trim(thisVal) === "" || thisVal.length === 0) {
	    	if ( $('form').hasClass('validate') ){
	    		e.preventDefault();
	    	}
	    	self.addClass('error');
	        self.siblings('span.error').addClass('show');
	        $('#errorMessageArea').addClass('show');
	        $('#errorMessageArea p#'+ sID +'Error').addClass('show');
	    } else {
	    	self.removeClass('error');
	        self.siblings('span.error').removeClass('show');
	        $('#errorMessageArea p#'+ sID +'Error').removeClass('show');
	    }
	});}});
	
	//RETRIEVE CREDENTIALS SCRIPT
	$("input:radio").click(function(){
		if( $('#forgotID').is(':checked') ) {
			$('#retrieveByEmail').show();
			$('#emailAddress').removeAttr('disabled');
			$('#retrieveByPassword').hide();
			$('#userID').attr('disabled','disabled');
		}
		if( $('#forgotPwd').is(':checked') ) {
			$('#retrieveByPassword').show();
			$('#userID').removeAttr('disabled');
			$('#retrieveByEmail').hide();
			$('#emailAddress').attr('disabled','disabled');
		}
		
	});
		
	//LOCK TABS TO POP-UP
	$("#updateProfile").keydown(function(e) {
		if (e.keyCode == 9 && !e.shiftKey) {
		    $("button.close-btn").focus();
		    return false;
		};
	});

	$("button.close-btn").keydown(function(e) {
		if (e.keyCode == 9 && e.shiftKey) {
			$("#updateProfile").focus();
			return false;
		};
	});
	//CHECK ERROR CONDITION IN THE PAGE
	if ($('.server-validation').length>0) {
		serverValidation();
	}
	
	function remove_access() {
		var dialog = $('.wam-dialog-container');
		var title = $('.wam-dialog-header h2');
	    var first_tab = $('.wam-dialog-header .close-btn');
	    var last_tab = $('.wam-dialog *').last();
	    var return_focus = this;
	    $('.wam-dialog-body p.clientName').html("Are you sure you want to remove access for <strong>"+this.getAttribute('data-client-app-name')+"?</strong>");
	    $('.wam-dialog-body p.clientDescription').html(this.getAttribute('data-client-app-name')+" will no longer be able to access the Lexis Advance® features.");
	    var config = {};
	    config.perm_id = this.getAttribute('data-perm-id');
	    config.client_id = this.getAttribute('data-client-id');
	    config.aci_value = this.getAttribute('data-aci');

		// SHOW DIALOG
		dialog.show();

		// SET FOCUS TO TITLE
	    title.focus();

	    // LOCK TABS TO THE POP-UP (FORWARD)
		last_tab.keydown(function (e) {
	    	if (e.keyCode === 9 && !e.shiftKey) {
	        	first_tab.focus();
	        	return false;
	    	}
		});

	    // LOCK TABS TO THE POP-UP (BACKWARD)
	    first_tab.keydown(function (e) {
	        if (e.keyCode === 9 && e.shiftKey) {
	            last_tab.focus();
	            return false;
	        }
	    });

	    // PREVENT TABBING BACKWARD FROM THE TITLE
	    title.keydown(function (e) {
	        if (e.keyCode === 9 && e.shiftKey) {
	            return false;
	        }
	    });

	    // CLOSE AND RETURN FOCUS
	    function close_dialog() {
	        dialog.hide();
	        return_focus.focus();
	        return false;
	    }

	    // CLOSE WITH KEYBOARD
	    first_tab.click(close_dialog);

	    // CLOSE WITH ESCAPE KEY
	    dialog.keydown(function (e) {
	        if (e.keyCode === 27) {
	            close_dialog();
	            return false;
	        }
	    });
	    
	    //CLOSE FROM OK BUTTON
	    function close_ok_dialog() {
	    	dialog.hide();
	    	return_focus.focus();
	    }
	    
	    $('.wam-dialog-footer button.ok').click(config, revokeOauthClient);
//	    $('.wam-dialog-footer button.ok').click(close_ok_dialog);
	    $('.wam-dialog-footer button.cancel').click(close_dialog);

	    //console.log('Testing the remove access function');

	    function revokeOauthClient(x) {//UsrPermId, clientId
	    	
			var revokeOauth_form=document.createElement("FORM");
	   		var param1=document.createElement("INPUT");
	   		var param2=document.createElement("INPUT");
	   		var aci=x.data.aci_value;//aci value

	   		document.body.appendChild(revokeOauth_form);
	   		revokeOauth_form.name="revokeOauthForm";
	   		revokeOauth_form.method="POST";
	   		revokeOauth_form.action='revokeClientAppAccess?aci='+aci;
	   		param1.type='HIDDEN';
	   		param1.name="UsrPermId";
	   		param1.value=x.data.perm_id;//UsrPermId
	   		revokeOauth_form.appendChild(param1);
	   		param2.type='HIDDEN';
	   		param2.name="clientId";
	   		param2.value=x.data.client_id;//clientId
	   		revokeOauth_form.appendChild(param2); 
	   		dialog.hide();
	   		revokeOauth_form.submit();
	    }    

	}
	if(pageName=="clientApplicationAccess")
	{
		$('.remove-access button').click(remove_access);
	}
});

//HIGHLIGHT RED FIELDS ON SERVER-SIDE ERROR	
function serverValidation() {
	$('#password, #userid, #challengeAns, #newPassword, #verifyPassword').addClass('error');
	$('#challengeAnsError, .icon.la-Error, .icon.la-Warning, .error').addClass('show');
}

$("#dismiss").click(function(){
	$("#ToolBar").css("display" ,"none");
});

