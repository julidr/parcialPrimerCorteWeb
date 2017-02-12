var pageArray = ['1'];
var j=0;

function paginationInit(lastPage){
	$("#page").append("<ul class='pagination ''>");
	$(".pagination").append("<li class='disabled' id='previous' value='prev'><a href='#!''><i class='material-icons'>chevron_left</i></a></li>");
	$(".pagination").append("<li class='active amber darken-2' id='page1' value='1'><a href='#!'>1</a></li>");
	for(var i=2; i<=lastPage; i++){
		pageArray.push(i);
		$('.pagination').append("<li class='waves-effect' id='page"+i+"' value='"+i+"'><a href='#!'>"+i+"</a></li>");
	}
	$(".pagination").append("<li class='waves-effect' id='next' value='nex'><a href='#!'><i class='material-icons'>chevron_right</i></a></li>");
	$(".pagination").append("</ul>");
}

$("#page").on('click','li',function(){
	var previousPage= $(".active").attr('value');
	var value= $(this).attr('value')+"";
	if(value!="nex" && value!="prev"){
		$(this).addClass("active amber darken-2");
		$("#page"+pageArray[getActualPage(previousPage)]).removeClass('active amber darken-2');
		j=getActualPage(value);
		if(j!=0){
			var arrow= $(".disabled");
			arrow.addClass("waves-effect");
			arrow.removeClass("disabled");
		}
		if(j==pageArray.length-1){
			$("#next").addClass('disabled');
			$("#next").removeClass('waves-effect');
		}
		if(j==0){
			$("#previous").addClass('disabled');
			$("#previous").removeClass('waves-effect');
		}
	}
	else{
		if(value=='nex'){
			goNextPage();
		}
		else{
			goPreviousPage();
		}
	}
})

function getActualPage(value){
	var actualPage=0;
	for(var i=0; i<pageArray.length; i++){
		if(pageArray[i]==value){
			actualPage=i;
		}
	}
	return actualPage;
}

function goNextPage(){
	if(j!=pageArray.length-1){
		$("#page"+pageArray[j]).removeClass('active amber darken-2');
		j++;
		$("#page"+pageArray[j]).addClass('active amber darken-2');
		if(j==pageArray.length-1){
			$("#next").addClass('disabled');
			$("#next").removeClass('waves-effect');
		}	
	}
	if($("#previous").attr('class')=="disabled"){
		$("#previous").addClass("waves-effect");
		$("#previous").removeClass("disabled");
	}
}

function goPreviousPage(){
	if(j!=0){
		$("#page"+pageArray[j]).removeClass('active amber darken-2');
		j--;
		$("#page"+pageArray[j]).addClass('active amber darken-2');
		if(j==0){
			$("#previous").addClass('disabled');
			$("#previous").removeClass('waves-effect');
		}
	}
	if($("#next").attr('class')=="disabled"){
		$("#next").addClass("waves-effect");
		$("#next").removeClass("disabled");
	}
}