function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

$(function() {
	var _tempName = "css/blue";
	
	$(".colors a").click(function () {
		
		var _targetHref = 'link[href="'+_tempName+'.css"]';
		var _cssName  = "css/"+$(this).attr("rel");
		
		$(_targetHref).attr('href',_cssName+".css");
		
		_tempName = _cssName;
		
		$(".close").click();

	});

	var _close = "close";
	$(".close").rotate(180);

	$(".close").click(function () {
		var _holder = $(".switcher");

		if(_close == "open"){
			_holder.animate({
				left: '-=190'
			  }, 700, function() {
					$(".close").rotate(180);
					_close = "close"
			  });
		}else
		{
			_holder.animate({
				left: '+=190'
			  }, 700, function() {
					$(".close").rotate(0);
					_close = "open"
			  });
		}
	});					
});