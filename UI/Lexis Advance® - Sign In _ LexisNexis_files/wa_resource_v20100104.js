var walocation = "lc";
var wajavaenabled = "jv";
var wajsenabled = "js";
var wacolordepth = "cd";
var wareferrer = "rf";
var waresolution = "rs";
var walanguage = "ln";
var watimezone = "tz";
var watimestamp = "ts";
var waeventtimestamp = "ets";
var wacookies = "ck";
var wasite = "site";
var waevent = "ev";
var waevdata1 = "evdata1";
var waevdata2 = "evdata2";
var waevdata3 = "evdata3";
var waextenallink = "lk";
var waservercode = "sc";
var watitle = "ttl";
var WA_HTTP_URI;
var WA_HTTPS_URI;
var WA_SITEID;
var WA_USERVALUES;
var WA_ANON_COOKIE;
var WA_COOKIES_TO_TRACK;
var WA_MAXDELAY;
var WA_TURN_IT_OFF;
var WA_LTAGANCHOR = null;
var WA_COOKIE_DOMAIN;
var WA_TRACKING_COOKIE;
if (!_wa_isNotUndefinedNullOrEmpty(WA_MAXDELAY))
	WA_MAXDELAY = 0;
var _waStatsGathered = false;
var _waValArray = new Object;
var _waTempValArray = new Object;
var _waRemoveValArray = new Object;
var _waTempRemoveValArray = new Object;
var _waAnonCookieLength = 12;
var _waTagArray = new Array;
var _waTagImageIndex = 0;
var _waTagLocation = WA_HTTP_URI;
try{
if (window.parent.document.location.protocol == "https:")
	_waTagLocation = WA_HTTPS_URI;
if (!_wa_isNotUndefinedNullOrEmpty(_waTagLocation))
	_waTagLocation = document.domain + "/wa_default.watag";
}
catch(e){}
var _waNeedDelay = false;
var _wa_tagdomain;
var _wa_tagport;
_wa_setWaTagDomainAndPort(_waTagLocation);
var _wa_canUseXmlHttp = false;
var _wa_turn_it_off = false;
if (_wa_isNotUndefinedNullOrEmpty(WA_TURN_IT_OFF) && WA_TURN_IT_OFF == true)
	_wa_turn_it_off = true;
if (_wa_getCookie(WA_TRACKING_COOKIE) == "OFF")
	_wa_turn_it_off = true;
function wa_addPermData(name, value) {
	if (_wa_turn_it_off == true)
		return;
	if (name == null && name == undefined && typeof name != "string"
			&& (typeof value != "string" || typeof value != "number"))
		return;
	if (typeof value == "number")
		_waValArray[encodeURIComponent(name)] = value;
	else
		_waValArray[encodeURIComponent(name)] = self.encodeURIComponent ? encodeURIComponent(value)
				: escape(value)
}
function wa_addData(name, value) {
	if (_wa_turn_it_off == true)
		return;
	if (name == null && name == undefined && typeof name != "string"
			&& (typeof value != "string" || typeof value != "number"))
		return;
	if (typeof value == "number")
		_waTempValArray[encodeURIComponent(name)] = value;
	else
		_waTempValArray[encodeURIComponent(name)] = self.encodeURIComponent ? encodeURIComponent(value)
				: escape(value)
}
function wa_removePermData(name) {
	if (_wa_turn_it_off == true)
		return;
	if (typeof name != "string")
		return;
	_waRemoveValArray[encodeURIComponent(name)] = true
}
function wa_removeData(name) {
	if (_wa_turn_it_off == true)
		return;
	if (typeof name != "string")
		return;
	_waTempRemoveValArray[encodeURIComponent(name)] = true
}
function wa_needDelay(waitForIt) {
	if (waitForIt == true && WA_MAXDELAY > 0)
		_waNeedDelay = true;
	else
		_waNeedDelay = false
}
function wa_eventTag(eventName, optionalLocation, optionalReferrer) {
	if (_wa_turn_it_off == true)
		return true;
	wa_addData(waeventtimestamp, _wa_timestamp());
	if (_wa_isNotUndefinedNullOrEmpty(eventName))
		wa_addData(waevent, eventName);
	if (_wa_isNotUndefinedNullOrEmpty(optionalLocation))
		wa_addData(walocation, optionalLocation);
	if (_wa_isNotUndefinedNullOrEmpty(optionalReferrer))
		wa_addData(wareferrer, optionalReferrer);
	_wa_sendTag();
	return true
}
function wa_linkTag(link, optionalLocation, optionalReferrer) {
	if (_wa_turn_it_off == true || !link || !link.href)
		return true;
	var location = optionalLocation;
	var referrer = optionalReferrer;
	if (!_wa_isNotUndefinedNullOrEmpty(location))
		location = link.href;
	if (!_wa_isNotUndefinedNullOrEmpty(referrer))
		referrer = document.location;
	if (_wa_isExternalLink(link.href))
		wa_addData(waextenallink, 1);
	if (_waNeedDelay == true) {
		if (WA_LTAGANCHOR)
			return false;
		var wa_beforeCall = _waTagImageIndex;
		wa_eventTag("", location, referrer);
		var wa_afterCall = _waTagImageIndex;
		if (typeof link.target != "undefined" && link.target != "_self"
				&& link.target != "")
			return true;
		if (wa_beforeCall < wa_afterCall) {
			var wa_functext;
			WA_LTAGANCHOR = link;
			if (link.click) {
				link.origclick = link.onclick;
				link.onclick = "";
				wa_functext = "if(WA_LTAGANCHOR){ WA_LTAGANCHOR.click(); WA_LTAGANCHOR.onclick = WA_LTAGANCHOR.origclick; WA_LTAGANCHOR = null; };"
			} else
				wa_functext = 'if(WA_LTAGANCHOR){ window.location.href = "'
						+ link.href + '"; WA_LTAGANCHOR = null; }';
			var wa_func = new Function(wa_functext);
			_waTagArray[wa_beforeCall].onload = wa_func;
			_waTagArray[wa_beforeCall].onerrror = wa_func;
			_waTagArray[wa_beforeCall].onabort = wa_func;
			setTimeout(wa_functext, WA_MAXDELAY)
		} else
			setTimeout('window.location.href = "' + link.href + '";',
					WA_MAXDELAY);
		return false
	}
	wa_eventTag("", location, referrer);
	return true
}
function wa_pageTag() {
	if (_wa_turn_it_off == true)
		return;
	_wa_sendTag()
}
function _wa_removeDataForReal(target) {
	for (name in _waRemoveValArray)
		delete target[name];
	for (name in _waTempRemoveValArray)
		delete target[name]
}
function _wa_isNotUndefinedNullOrEmpty(obj) {
	var objtype = typeof obj;
	if (objtype == "undefined")
		return false;
	if (obj == null)
		return false;
	if (objtype == "number")
		return true;
	if (objtype == "string")
		if (obj == null || obj == "")
			return false;
	return true
}
function _wa_getCookieVal(offset) {
	var endstr = document.cookie.indexOf(";", offset);
	if (endstr == -1)
		endstr = document.cookie.length;
	return document.cookie.substring(offset, endstr)
}
function _wa_getCookie(name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return self.decodeURIComponent ? decodeURIComponent(_wa_getCookieVal(j))
					: unescape(_wa_getCookieVal(j));
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0)
			break
	}
	return null
}
function _wa_setCookie(name, value, expires, path, domain, secure) {
	var cookieValue = name
			+ "="
			+ (self.encodeURIComponent ? encodeURIComponent(value)
					: escape(value))
			+ (expires ? "; expires=" + expires.toGMTString() : "")
			+ (path ? "; path=" + path : "")
			+ (domain ? "; domain=" + domain : "") + (secure ? "; secure" : "");
	document.cookie = cookieValue
}
function _wa_setSITCookie(name, value, path, domain, secure) {
	var wa_sit_cookie_life = 600000;
	var today = new Date;
	var expires = new Date(today.getTime() + wa_sit_cookie_life);
	var cookieValue = name
			+ "="
			+ (self.encodeURIComponent ? encodeURIComponent(value)
					: escape(value))
			//+ (expires ? "; expires=" + expires.toGMTString() : "")
			+ (path ? "; path=" + path : "")
			+ (domain ? "; domain=" + domain : "") + (secure ? "; secure" : "");
	document.cookie = cookieValue
}
function _wa_getOrMakeCookieId() {
	var cval = _wa_getCookie(WA_ANON_COOKIE);
	if (cval != "" && cval != null)
		return cval;
	cval = _wa_makeRandomString(_waAnonCookieLength);
	cval += "_";
	var now = new Date;
	cval += now.getSeconds();
	cval += now.getMilliseconds();
	var wa_anon_cookie_life = 15552E7;
	var today = new Date;
	var expiry = new Date(today.getTime() + wa_anon_cookie_life);
	_wa_setCookie(WA_ANON_COOKIE, cval, expiry, "/", WA_COOKIE_DOMAIN);
	return cval
}
function _wa_makeRandomString(length_in) {
	var validChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghijklmnopqrstuvwxyz";
	var desiredLength = length_in;
	var output = "";
	for ( var i = 0; i < desiredLength; i++) {
		var num = Math.floor(Math.random() * validChars.length);
		output += validChars.substring(num, num + 1)
	}
	return output
}
function _wa_isExternalLink(url) {
	if (!_wa_isNotUndefinedNullOrEmpty(url))
		return false;
	if (url.toString().indexOf("://") == -1)
		return true;
	var tempUrl = url.toString().toLowerCase();
	var hereUrl = document.location.toString().toLowerCase();
	var linkDomain = tempUrl.substr(tempUrl.indexOf("://") + 3, tempUrl.length);
	var hereDomain = hereUrl.substr(hereUrl.indexOf("://") + 3, hereUrl.length);
	linkDomain = linkDomain.substr(0, linkDomain.indexOf("/"));
	hereDomain = hereDomain.substr(0, hereDomain.indexOf("/"));
	if (linkDomain == hereDomain)
		return false;
	else
		return true
}
function _wa_timestamp() {
	var timenow = new Date;
	return timenow.getTime() + "." + Math.floor(Math.random() * 1E3)
}
function _wa_getBasics() {
	if (!_waStatsGathered) {
		wa_addPermData(wajsenabled, 1);
		var myreferrer;
		try{
			if (top && top.document)
				myreferrer = top.document.referrer;
			else
				myreferrer = document.referrer;
			if (_wa_isNotUndefinedNullOrEmpty(myreferrer))
				wa_addPermData(wareferrer, myreferrer);
			wa_addPermData(walocation, document.location);
			wa_addPermData(waresolution, self.screen.width + "x"
					+ self.screen.height);
			wa_addPermData(wacolordepth, self.screen.colorDepth);
			var userlang;
			if (navigator.language)
				userlang = navigator.language;
			else if (navigator["userLanguage"])
				userlang = navigator["userLanguage"];
			if (_wa_isNotUndefinedNullOrEmpty(userlang))
				if (userlang.length > 2)
					wa_addPermData(walanguage, userlang.substring(0, 2));
				else
					wa_addPermData(walanguage, userlang);
			wa_addPermData(wajavaenabled, navigator.javaEnabled() ? "1" : "0");
		}catch(e){}
		var tz_string;
		var now = new Date;
		var tz_offset = now.getTimezoneOffset();
		var offset_floored;
		tz_string = "GMT";
		if (tz_offset != 0) {
			if (tz_offset > 0)
				tz_string += " -";
			else
				tz_string += " +";
			tz_offset = Math.abs(tz_offset);
			offset_inHours = Math.floor(tz_offset / 60);
			tz_offset -= offset_inHours * 60;
			if (offset_inHours < 10)
				tz_string += "0";
			tz_string += offset_inHours + ":";
			if (tz_offset < 10)
				tz_string += "0";
			tz_string += tz_offset
		}
		wa_addPermData(watimezone, tz_string);
		if (_wa_isNotUndefinedNullOrEmpty(WA_SITEID))
			wa_addPermData(wasite, WA_SITEID);
		if (document.title)
			wa_addPermData(watitle, document.title)
	}
	_waStatsGathered = true
}
function _wa_getExtras() {
	if (typeof WA_USERVALUES != "undefined")
		for (extra in WA_USERVALUES) {
			var extraValues = WA_USERVALUES[extra];
			if (_wa_isNotUndefinedNullOrEmpty(extraValues))
				wa_addData(extra, extraValues)
		}
}
function _wa_getCookiesToTrack() {
	var output = "";
	if (!_wa_isNotUndefinedNullOrEmpty(WA_ANON_COOKIE))
		WA_ANON_COOKIE = "WA_ANONCOOKIE";
	output = WA_ANON_COOKIE + "=" + _wa_getOrMakeCookieId();
	if (typeof WA_COOKIES_TO_TRACK != "undefined"
			&& WA_COOKIES_TO_TRACK.length > 0) {
		var index = 0;
		for (; index < WA_COOKIES_TO_TRACK.length; index++)
			if (WA_COOKIES_TO_TRACK[index] != null) {
				var cookieVal = _wa_getCookie(WA_COOKIES_TO_TRACK[index]);
				if (cookieVal != null && cookieVal != "") {
					if (output != "")
						output += ";";
					output += WA_COOKIES_TO_TRACK[index] + "=" + cookieVal
				}
			}
	}
	wa_addData(wacookies, output)
}
function _wa_makeQueryString() {
	var finalArray = new Object;
	for (name in _waValArray)
		finalArray[name] = _waValArray[name];
	for (name in _waTempValArray)
		finalArray[name] = _waTempValArray[name];
	_wa_removeDataForReal(finalArray);
	delete _waTempValArray;
	_waTempValArray = new Object;
	delete _waTempRemoveValArray;
	_waTempRemoveValArray = new Object;
	var output = "?";
	var firstone = true;
	for (name in finalArray) {
		var thisvalue = finalArray[name];
		if (_wa_isNotUndefinedNullOrEmpty(thisvalue)) {
			if (firstone)
				firstone = false;
			else
				output += "&";
			output += name + "=" + thisvalue
		}
	}
	return output
}
function _wa_sendTag() {
	wa_addData(watimestamp, _wa_timestamp());
	_wa_getExtras();
	_wa_getBasics();
	_wa_getCookiesToTrack();
	var basicInfo = _wa_makeQueryString();
	_wa_getImage(_waTagLocation + basicInfo, _waNeedDelay);
	_waNeedDelay = false
}
function _wa_getImage(url, waitForIt) {
	if (!_wa_isNotUndefinedNullOrEmpty(waitForIt))
		waitForIt = false;
	if (document.images) {
		_waTagArray[_waTagImageIndex] = new Image;
		_waTagArray[_waTagImageIndex].src = url;
		_waTagImageIndex++
	} else
		document.write('<img border="0" width="1" height="1" src="' + url
				+ '" style="display:none"  >')
}
function _wa_setWaTagDomainAndPort(url) {
	var urlpattern = new RegExp("(http|https)://(.*?):*([0123456789]*)/.*$");
	var parsedurl = url.match(urlpattern);
	if (_wa_isNotUndefinedNullOrEmpty(parsedurl)) {
		_wa_tagdomain = parsedurl[2];
		_wa_tagport = parsedurl[3]
	}
}
if (typeof WA_AUTOPAGETAG == "undefined" || WA_AUTOPAGETAG == true)
	wa_pageTag();