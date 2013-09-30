$(function() {
	
	// COUNTDOWN VARIABLES
	var year = 2014;
	var month = 8; // add to  -1 value
	var day = 10;
	var hour = 21;
	var min = 54;
	var sec = 54;
	var msec = 0;
	
	// COUNTDOWN INIT
	date = new Date(year,month,day,hour,min,sec,msec);
	$('.countdown').countdown({until: date});
	
	 // Placeholder text init ie fixed for placeholder...
	Placeholder.init();
	
	// GOOGLE MAP VARIABLES
	var _myLatlng 	= new google.maps.LatLng(40.714623,-74.006605 ); // Long and Lat of the Location (Pointer and View)
	
	// GOOGLE MAP INIT
	google.maps.event.addDomListener(window, 'load', initialize(_myLatlng));
	google.maps.event.addDomListener(window, 'resize', function() {
		map.setCenter(myLatlng);
	});
	
	
	var ie = $.browser.msie;
	var version = $.browser.version;
	var modernBrowsers = true;
	
	if(ie)
	{
		//check browser version
		if(version <= "8.0")
		{
			modernBrowsers = false;
		}
	}
	
	
	if(modernBrowsers)
	{
		// kontext
		// Create a new instance of kontext
		var k = kontext( document.querySelector( '.kontext' ) );
	
		// key listeners
		document.addEventListener( 'keyup', function( event ) {
			if( event.keyCode === 37 ) k.prev();
			if( event.keyCode === 39 ) k.next();
		}, false );

		var touchX = 0;
		var touchConsumed = false;

		// touch listeners
		document.addEventListener( 'touchstart', function( event ) {
			touchConsumed = false;
			lastX = event.touches[0].clientX;
		}, false );

		document.addEventListener( 'touchmove', function( event ) {
			event.preventDefault();

			if( !touchConsumed ) {
				if( event.touches[0].clientX > lastX + 10 ) {
					k.prev();
					touchConsumed = true;
				}
				else if( event.touches[0].clientX < lastX - 10 ) {
					k.next();
					touchConsumed = true;
				}
			}
		}, false );
		
		// kontext call to actions
		$(".stay-tuned").click(function(){
			k.show( 0 );
		});
		
		$(".notify").click(function(){
			//Notify is a secondry layer
			k.show( 1 );
		});
		
		$(".get-in-touch").click(function(){
			k.show( 2 );
		});
		
		// iOS Hover Event Class Fix
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
			$(".call-to-action").click(function(){ 
				$(this).hover();
			});
		}
			
		//Check apple device
		var deviceAgent = navigator.userAgent.toLowerCase();
		var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
		if (agentID) {
			$(".switcher").hide(); 
		}
	}
	else
	{
		$(".layer").css("visibility","visible");
		//w1ithout kontext animation but fadein - fadeout for ie8 and other stupid browsers...
		$(".stay-tuned").click(function(){
			$(".one").fadeIn();
			$(".two").hide();
			$(".three").hide();
		});
		
		$(".notify").click(function(){
			$(".two").fadeIn();
			$(".one").hide();
			$(".three").hide();
		});
		
		$(".get-in-touch").click(function(){
			$(".three").fadeIn();
			$(".one").hide();
			$(".two").hide();
		});
		
	}
	
	 // NEWSLETTER 

	function looksLikeMail(str) {
		var lastAtPos 	= str.lastIndexOf('@');
		var lastDotPos 	= str.lastIndexOf('.');
		var result 		= (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2)
		return result;
	}

	// SUBMIT

    $(".newsletter").submit(function (e) {
		
		e.preventDefault();
		
		var emailAddress 	= $('.e-mail').attr('value');
		//console.log(emailAddress);
		
		if(looksLikeMail(emailAddress)){
			$.ajax({
                type: "POST",
                url: "form.php",
                data: 'email=' + emailAddress,
                success: function(data) {
					//console.log(data);
					
					if(data == true){
					   $('.error').text('Your e-mail address has been sent!').effect("pulsate", { times:3 }, 1000);
					} else {
					   $('.error').text('Houston! we have a problem! please, try again!').effect("pulsate", { times:3 }, 700);
					}
				  
				}
            });
		}else{
			 $('.error').text('Please, enter a valid e-mail').effect("pulsate", { times:3 }, 700);
		}
		
		return false;
	});

    $('.error').hide();
});


