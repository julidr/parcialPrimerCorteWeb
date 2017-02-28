var isMobile= false;

$( window ).resize(function() {	
	if($(window).width()<=940 && isMobile==false){
		isMobile=true;
		$("#left-section").hide();
		$("#mobile-left-section").show();
		$("#products-list-mobile").show();
		$("#right-section").hide();
		loadProducts(getProducts());
		//$(".reponsive-section").show();
		//$('div.products').hide();
		//$("div.search-bar").toggleClass("col m9 s12");
		//$("div.right-section-header").toggleClass("center");
		//$('div.mini-filter').show();
		console.log("Changing to mobile");
	}else if($(window).width()>940 && isMobile==true){
		isMobile=false;
		$("#left-section").show();
		$("#mobile-left-section").hide();
		$("#products-list-mobile").hide();
		$("#right-section").show();
		//$("div.right-section-header").toggleClass("center");
		//$('div.mini-filter').hide();
		//$(".reponsive-section").hide();
		//$('div.products').show();
		console.log("Changing to normal");
	}
});

function getMobile(){
	return isMobile;
}

function setMobile(value){
	isMobile = value;
}