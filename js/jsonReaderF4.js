var categories = [];
var products = [];
var allProducts = [];
var tempProducts = [];
var finalArray = [];
var conditions = [0,"all","all",0];
var shoppingCar = [];
var firstClick = false;

$.getJSON("data/dataParcial2.json", function( data ){
	console.log("Archivos Leidos");
	$.each( data, function(key, val){
		if(key==="categories"){
			for(var i=0; i<val.length; i++){
				categories.push(val[i]);
			}
		}
		else{
			for(var i=0; i<val.length; i++){
				products.push(val[i]);
			}
		}
	});
	allProducts= loadProducts(products);
	tempProducts = products;
});

function getProducts(){
	return products;
}

function loadProducts(products){
	console.log("entre");
	var listProducts = [];
	var productsString ="";
	if(getMobile()==false){
		for(var i=0; i<products.length; i++){
			listProducts.push("<li class='product-item col s4 m3'>");
			listProducts.push("<div class='card'>");
			listProducts.push("<div class='card-image'>");
			listProducts.push("<img src='"+products[i].img+"' class='responsive-img'>");
			listProducts.push("<span class='card-title'>"+products[i].name+"</span>");
			listProducts.push("</div>");
			listProducts.push("<div class='card-content'>");
			listProducts.push("<p>"+products[i].description+"</p>");
			listProducts.push("<div class='chip'>");
			listProducts.push(getChipImgCategory(products[i].categories[0]));
			listProducts.push(getCategoryName(products[i].categories[0]));
			listProducts.push("</div>");
			if(products[i].categories.length>1){
				listProducts.push("<div class='chip'>");
				listProducts.push(getChipImgCategory(products[i].categories[1]));
				listProducts.push(getCategoryName(products[i].categories[1]));
				listProducts.push("</div>");
			}
			listProducts.push("</div>");
			listProducts.push("<div class='card-action row'>");
			listProducts.push("<p id='product-price'><b>Price:</b> $"+products[i].price+"</p>");
			if(products[i].available === true){
				listProducts.push("<a class='btn-floating btn-large waves-effect waves-light amber accent-2 add-product' id='add-product' value='"+i+"' onclick='addToCar("+i+")'><i class='material-icons'>add</i></a>");
			}else{
				listProducts.push("<a class='btn-floating btn-large waves-effect waves-light amber accent-2 disabled' id='add-product' value='"+i+"'><i class='material-icons'>add</i></a>");
			}
			
			listProducts.push("</div>");
			listProducts.push("</div>");
			listProducts.push("</li>");
		}
		$("#products-list").append(listProducts.join(""));
	}else{
			for(var i=0; i<products.length; i++){
			listProducts.push("<li class='product-item-mobile col s12'>");
			listProducts.push("<div class='card horizontal'>");
			listProducts.push("<div class='card-image'>");
			listProducts.push("<img src='"+products[i].img+"' class='responsive-img'>");
			listProducts.push("</div>");
			listProducts.push("<div class='card-content'>");
			listProducts.push("<p><b>"+products[i].name+"</b></p>");
			listProducts.push("<p>"+products[i].description+"</p>");
			listProducts.push("<div class='chip'>");
			listProducts.push(getChipImgCategory(products[i].categories[0]));
			listProducts.push(getCategoryName(products[i].categories[0]));
			listProducts.push("</div>");
			if(products[i].categories.length>1){
				listProducts.push("<div class='chip'>");
				listProducts.push(getChipImgCategory(products[i].categories[1]));
				listProducts.push(getCategoryName(products[i].categories[1]));
				listProducts.push("</div>");
			}
			listProducts.push("</div>");
			listProducts.push("<div class='card-action row'>");
			listProducts.push("<p id='product-price'><b>Price:</b> $"+products[i].price+"</p>");
			if(products[i].available === true){
				listProducts.push("<a class='btn-floating btn-large waves-effect waves-light amber accent-2 add-product' id='add-product' value='"+i+"' onclick='addToCar("+i+")'><i class='material-icons'>add</i></a>");
			}else{
				listProducts.push("<a class='btn-floating btn-large waves-effect waves-light amber accent-2 disabled' id='add-product' value='"+i+"'><i class='material-icons'>add</i></a>");
			}
			
			listProducts.push("</div>");
			listProducts.push("</div>");
			listProducts.push("</li>");
		}
		$("#products-list-horizontal").append(listProducts.join(""));
	}
	return listProducts;
}

function getChipImgCategory(category){
	if(category === 1){
		return "<img src='images/drink.png' alt='drink'>";
	}
	else if(category === 2){
		return "<img src='images/lunch.png' alt='lunch'>";
	}
	else if(category === 3){
		return "<img src='images/food.png' alt='food'>";
	}
	else{
		return "<img src='images/sea.png' alt='sea'>";
	}
}

function getCategoryName(category){

	for(var i=0; categories.length; i++){
		if(category== categories[i].categori_id){
			return categories[i].name;
		}
	}
}

function getProductByCategory(category){
	var newArray = [];
	for(var i=0; i<products.length; i++){
		catArray = products[i].categories;
		for(var j= 0; j<catArray.length; j++){
			if(catArray[j]===category){
				newArray.push(products[i]);
			}
		}
	}
	if(getMobile()==false){
		$("#products-list").empty();
	}else{
		$("#products-list-horizontal").empty();
	}
	tempProducts = newArray;
	loadProducts(newArray);
}

function checkCondition(){
	finalArray = checkCategory(products);
	finalArray = checkAvailability(finalArray);
	finalArray = checkBestSell(finalArray);
	finalArray = checkPrice(finalArray);
	if(getMobile()==false){
		$("#products-list").empty();
	}else{
		$("#products-list-horizontal").empty();
	}
	loadProducts(finalArray);
	tempProducts = finalArray;

}

function checkCategory(products){
	var newArray = [];
	for(var j=0; j<products.length; j++){
		if(products[j].categories.length>1){
			if(products[j].categories[0]===conditions[3] || products[j].categories[1]===conditions[3]){
				newArray.push(products[j]);
			}
			if(conditions[3]===0){
				newArray = products;
			}
		}else{
			if(products[j].categories[0]===conditions[3]){
				newArray.push(products[j]);
			}
			if(conditions[3]===0){
				newArray = products;
			}
		}
	}
	return newArray;
}

function checkAvailability(products){
	var newArray = [];
	if(conditions[1]==="all"){
			console.log("todos los products");
			newArray = products;
	}else{
		for(var i=0; i<products.length; i++){
			if(products[i].available==conditions[1]){
				newArray.push(products[i]);
			}
		}
	}
	return newArray;
}

function checkBestSell(products){
	var newArray = [];
	if(conditions[2]==="all"){
		newArray = products;
	}else{
		for(var i=0; i<products.length; i++){
			if(products[i].best_seller==conditions[2]){
				newArray.push(products[i]);
			}
		}
	}
	return newArray;
}

function checkPrice(products){
	var newArray = [];
	if(conditions[0]===0){
		newArray = products;
	}else{
		if(conditions[0]===30.000){
			for(var i=0; i<products.length; i++){
				if(products[i].price>30.000){
					newArray.push(products[i]);
				}
			}
		}else{
			for(var i=0; i<products.length; i++){
				if(products[i].price<10.000){
					newArray.push(products[i]);
				}
			}
		}
	}
	return newArray;

}

$("#available").on("click",function(){
	if($("#available:checked").length==1){
		conditions[1]=true;
		$("#not-available").prop("disabled",true);
	}else{
		conditions[1]="all";
		$("#not-available").prop("disabled",false);
	}
		checkCondition();
});

$("#not-available").on("click",function(){
	if($("#not-available:checked").length==1){
		conditions[1]=false;
		$("#available").prop("disabled",true);
	}else{
		conditions[1]="all";
		$("#available").prop("disabled",false);
	}
	checkCondition();
});

$("#BestSell").on("click",function(){
	if($("#BestSell:checked").length==1){
		conditions[2]=true;
	}else{
		conditions[2]="all";
	}
	checkCondition();
});

$("#food").on("click",function(){
	if($("#food:checked").length==1){
		conditions[3]=3;
	}else{
		conditions[3]=0;
	}
	checkCondition();
});

$("#drinks").on("click",function(){
	if($("#drinks:checked").length==1){
		conditions[3]=1;
	}else{
		conditions[3]=0;
	}
	checkCondition();
});

$("#lunch").on("click",function(){
	if($("#lunch:checked").length==1){
		conditions[3]=2;
	}else{
		conditions[3]=0;
	}
	checkCondition();
});

$("#sea").on("click",function(){
	if($("#sea:checked").length==1){
		conditions[3]=4;
	}else{
		conditions[3]=0;
	}
	checkCondition();
});

$("#big30M").on("click",function(){
	if($("#big30M:checked").length==1){
		conditions[0]=30.000;
		$("#less10M").prop("disabled",true);
	}
	else{
		conditions[0]=0;
		$("#less10M").prop("disabled",false);
	}
	checkCondition();
});

$("#less10M").on("click",function(){
	if($("#less10M:checked").length==1){
		conditions[0]=10.000;
		$("#big30M").prop("disabled",true);
	}else{
		conditions[0]=0;
		$("#big30M").prop("disabled",false);
	}
	checkCondition();
});

$("#availableM").on("click",function(){
	if($("#availableM:checked").length==1){
		conditions[1]=true;
		$("#not-availableM").prop("disabled",true);
	}else{
		conditions[1]="all";
		$("#not-availableM").prop("disabled",false);
	}
		checkCondition();
});

$("#not-availableM").on("click",function(){
	if($("#not-availableM:checked").length==1){
		conditions[1]=false;
		$("#availableM").prop("disabled",true);
	}else{
		conditions[1]="all";
		$("#availableM").prop("disabled",false);
	}
	checkCondition();
});

$("#BestSellM").on("click",function(){
	if($("#BestSellM:checked").length==1){
		conditions[2]=true;
	}else{
		conditions[2]="all";
	}
	checkCondition();
});

$("#foodM").on("click",function(){
	if($("#foodM:checked").length==1){
		conditions[3]=3;
	}else{
		conditions[3]=0;
	}
	checkCondition();
});

$("#drinksM").on("click",function(){
	if($("#drinksM:checked").length==1){
		conditions[3]=1;
	}else{
		conditions[3]=0;
	}
	checkCondition();
});

$("#lunchM").on("click",function(){
	if($("#lunchM:checked").length==1){
		conditions[3]=2;
	}else{
		conditions[3]=0;
	}
	checkCondition();
});

$("#seaM").on("click",function(){
	if($("#seaM:checked").length==1){
		conditions[3]=4;
	}else{
		conditions[3]=0;
	}
	checkCondition();
});

$("#big30").on("click",function(){
	if($("#big30:checked").length==1){
		conditions[0]=30.000;
		$("#less10").prop("disabled",true);
	}
	else{
		conditions[0]=0;
		$("#less10").prop("disabled",false);
	}
	checkCondition();
});

$("#less10").on("click",function(){
	if($("#less10:checked").length==1){
		conditions[0]=10.000;
		$("#big30").prop("disabled",true);
	}else{
		conditions[0]=0;
		$("#big30").prop("disabled",false);
	}
	checkCondition();
});

$("#search").keyup(function(){
	var value = $(this).val();
	console.log(value);
	if(value==""){
		$("#products-list").empty();
		loadProducts(products);
	}
	$(".product-item").each(function(index){
		if($(this).text().indexOf(value)>-1){
			$(this).show();
		}
		else{
			$(this).hide();
		}
	});
});

$("#search-mobile").keyup(function(){
	var value = $(this).val();
	console.log(value);
	if(value==""){
		$("#products-list-horizontal").empty();
		loadProducts(products);
	}
	$(".product-item-mobile").each(function(index){
		if($(this).text().indexOf(value)>-1){
			$(this).show();
		}
		else{
			$(this).hide();
		}
	});
});

$("#selected").on("change",function(){
	if($("#selected").val()==1){
		tempProducts.sort(function(a,b){
			if(a.name.toLowerCase() < b.name.toLowerCase()){
				return -1;
			} if(a.name.toLowerCase() > b.name.toLowerCase()){
				return 1;
			} 
			return 0;
		});
		if(getMobile()==false){
			$("#products-list").empty();
		}else{
			$("#products-list-horizontal").empty();
		}
	 	loadProducts(tempProducts);
	}else if($("#selected").val()==2){
		tempProducts.sort(function(a,b){
			return b.price-a.price;
		});
		if(getMobile()==false){
			$("#products-list").empty();
		}else{
			$("#products-list-horizontal").empty();
		}
	 	loadProducts(tempProducts);
	}else{
		tempProducts.sort(function(a,b){
			return a.price-b.price;
		});
		if(getMobile()==false){
			$("#products-list").empty();
		}else{
			$("#products-list-horizontal").empty();
		}
	 	loadProducts(tempProducts);
	}
});

$("#selectedM").on("change",function(){
	if($("#selectedM").val()==1){
		tempProducts.sort(function(a,b){
			if(a.name.toLowerCase() < b.name.toLowerCase()){
				return -1;
			} if(a.name.toLowerCase() > b.name.toLowerCase()){
				return 1;
			} 
			return 0;
		});
		$("#products-list-horizontal").empty();
	 	loadProducts(tempProducts);
	}else if($("#selectedM").val()==2){
		tempProducts.sort(function(a,b){
			return b.price-a.price;
		});
	    $("#products-list-horizontal").empty();
	 	loadProducts(tempProducts);
	}else{
		tempProducts.sort(function(a,b){
			return a.price-b.price;
		});
		$("#products-list-horizontal").empty();
	 	loadProducts(tempProducts);
	}
});

function addToCar(id){
	shoppingCar.push(tempProducts[id]);
	Materialize.toast('New product added', 2000, 'rounded');
	if(firstClick==false){
		$("#shopCar").append("<span class='new badge amber darken-2' id='newBadge'>"+shoppingCar.length+"</span>");
		firstClick=true;
		$("#shopCarMobile").append("<span class='new badge amber darken-2' id='newBadge2'>"+shoppingCar.length+"</span>");
	}
	else{
		$("#newBadge").text(shoppingCar.length);
		$("#newBadge2").text(shoppingCar.length);
	}

}

function loadShopCar(shoppingCar){
	var tableList = [];
	console.log(shoppingCar);
	for(var i=0; i<shoppingCar.length; i++){
		tableList.push("<tr>");
		tableList.push("<td><img src='"+shoppingCar[i].img+"' class='responsive-img'></td>");
		tableList.push("<td>"+shoppingCar[i].name+"</td>");
		tableList.push("<td>"+shoppingCar[i].price+"</td>");
		tableList.push("<td>"+shoppingCar[i].description+"</td>");
		if(shoppingCar[i].available===true){
			tableList.push("<td>Si</td>");
		}else{
			tableList.push("<td>No</td>");
		}
		if(shoppingCar[i].best_seller===true){
			tableList.push("<td>Si</td>");
		}else{
			tableList.push("<td>No</td>");
		}
		if(shoppingCar[i].categories.length>1){
			tableList.push("<td>"+getCategoryName(shoppingCar[i].categories[0])+"</td>");
			tableList.push("<td>"+getCategoryName(shoppingCar[i].categories[1])+"</td>");
		}else{
			tableList.push("<td>"+getCategoryName(shoppingCar[i].categories[0])+"</td>");
			tableList.push("<td>None</td>");
		}
		tableList.push("<td><a class='btn btn-medium waves-effect waves-light amber accent-2' id='delete-product' value='"+i+"' onclick='deleteProduct("+i+")'><i class='material-icons'>delete</i></a></td>");
		tableList.push("</tr>");
	}
	$("#tableContent").empty();
	$("#tableContent").append(tableList.join(""));
}

function deleteProduct(id){
	shoppingCar.splice(id,1);
	loadShopCar(shoppingCar);
	console.log(shoppingCar.length);
	$("#newBadge").text(shoppingCar.length);
	$("#newBadge2").text(shoppingCar.length);
}

$("#shopCar").on("click",function(){
	if(shoppingCar.length>0){
		loadShopCar(shoppingCar);
	}
});

$("#shopCarMobile").on("click",function(){
	if(shoppingCar.length>0){
		loadShopCar(shoppingCar);
	}
});

