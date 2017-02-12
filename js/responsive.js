var isMobile= false;

$( window ).resize(function() {	
	if($(window).width()<=740 && isMobile==false){
		isMobile=true;
		$("#left-section").hide();
		$("div.search-bar").toggleClass("col m9 s12");
		$("div.right-section-header").toggleClass("center");
		$('div.mini-filter').show();
		console.log("Changing to mobile");
	}else if($(window).width()>740 && isMobile==true){
		isMobile=false;
		$("#left-section").show();
		$("div.right-section-header").toggleClass("center");
		$('div.mini-filter').hide();
		console.log("Changing to normal");
	}
});